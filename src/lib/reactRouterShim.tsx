"use client";
import React, { forwardRef } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter, useParams as nextUseParams } from "next/navigation";

// Link shim that supports the `to` prop from react-router
interface LinkShimProps extends Omit<NextLinkProps, "href"> {
  to: NextLinkProps["href"];
  className?: string;
  children?: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkShimProps>(
  ({ to, children, ...rest }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NextLink href={to} ref={ref} {...rest}>
      {children}
    </NextLink>
  ),
);
Link.displayName = "LinkShim";

// Simple navigate hook using Next router
export const useNavigate = () => {
  const router = useRouter();
  return (url: string, options?: { replace?: boolean }) => {
    if (options?.replace) router.replace(url);
    else router.push(url);
  };
};

// Params hook maps to Next's useParams (only works within Server Components). For client fallback, return empty object.
export const useParams = () => {
  try {
    // @ts-ignore - next/navigation may throw if used outside the expected context
    return nextUseParams();
  } catch {
    return {} as Record<string, string>;
  }
};

export default {
  Link,
  useNavigate,
  useParams,
}; 