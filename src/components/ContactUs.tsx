'use client'

import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa'

const ContactUs: React.FC = () => {
  const socialIcons = [FaFacebookF, FaInstagram, FaTwitter]

  return (
    <>
      <div className='w-full max-w-5xl py-12 flex flex-col md:flex-row items-center justify-between mx-auto'>
        <div className='text-center md:text-left'>
          <span className='text-lg font-medium text-rwa'>Get Started</span>
          <h1 className='text-5xl font-black mb-4'>
            Get in touch with us.
            <br />
            We're here to <span className='text-rwa'>assist you</span>.
          </h1>
        </div>

        <div className='flex flex-col gap-4'>
          {socialIcons.map((Icon, i) => (
            <a
              key={i}
              href='#'
              className='w-12 h-12 rounded-full bg-rwa hover:bg-rwa/70 text-white flex items-center justify-center transition'
            >
              <Icon className='text-xl' />
            </a>
          ))}
        </div>
      </div>

      <section className='w-full bg-[#f7f9fc] py-15 px-4 text-center flex justify-center relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-30 left-95 w-32 h-32 bg-rwa/60 rounded-full'></div>
          <div className='absolute top-40 right-20 w-24 h-24 bg-rwa/50 rounded-full'></div>
          <div className='absolute bottom-32 left-1/4 w-16 h-16 bg-rwa/75 rounded-full'></div>
          <div className='absolute bottom-20 right-1/3 w-40 h-40 bg-rwa/55 rounded-full'></div>
          <div className='absolute top-60 left-3/4 w-20 h-20 bg-rwa/65 rounded-full'></div>
          <div className='absolute bottom-48 left-16 w-28 h-28 bg-rwa/70 rounded-full'></div>
        </div>

        <div className='max-w-5xl flex flex-col items-center gap-8 flex-1 relative z-10'>
          <div className='w-full'>
            <h2 className='text-6xl font-bold'>Contact Us</h2>
            <p className='text-gray-600'>
              Any question or remarks? Just write us a message!
            </p>
          </div>

          {/* Form container with glassmorphism */}
          <div className='w-full shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden p-2 border border-white/50 backdrop-blur-sm bg-white/20'>
            <div className='text-white w-full md:w-1/2 p-8 flex flex-col items-start justify-between relative rounded-2xl bg-rwa/40'>
              <h3 className='z-30 text-3xl font-bold'>Contact Information</h3>
              <p className='z-30 text-white font-semibold text-2xl flex items-center gap-2'>
                <FaEnvelope /> support@solutions.rwa.inc
              </p>
              <img
                src='/decorationbanner.webp'
                className='h-full w-full mx-auto absolute bottom-0 right-0 opacity-40 rounded-br-2xl'
              />
            </div>

            <div className='w-full md:w-1/2 p-8'>
              <form className='space-y-6'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='w-full'>
                    <label className='block text-start text-sm font-medium text-gray-900 mb-1'>
                      Name
                    </label>
                    <input
                      type='text'
                      placeholder='First Name'
                      className='w-full border-b border-rwa focus:outline-none focus:border-rwa/60 pb-2'
                    />
                  </div>
                  <div className='w-full'>
                    <label className='block text-start text-sm font-medium text-gray-900 mb-1'>
                      Lastname
                    </label>
                    <input
                      type='text'
                      placeholder='Last Name'
                      className='w-full border-b border-rwa focus:outline-none focus:border-rwa/60 pb-2'
                    />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='w-full'>
                    <label className='block text-start text-sm font-medium text-gray-900 mb-1'>
                      Email
                    </label>
                    <input
                      type='email'
                      placeholder='Email'
                      className='w-full border-b border-rwa focus:outline-none focus:border-rwa/60 pb-2'
                    />
                  </div>
                  <div className='w-full'>
                    <label className='block text-start text-sm font-medium text-gray-900 mb-1'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      placeholder='Phone Number'
                      className='w-full border-b border-rwa focus:outline-none focus:border-rwa/60 pb-2'
                    />
                  </div>
                </div>

                <div className='text-left'>
                  <p className='text-md font-medium text-rwa mb-2'>
                    Select Subject?
                  </p>
                  <div className='flex flex-wrap gap-4'>
                    {(
                      [
                        'Services',
                        'Account Access',
                        'Application',
                        'Partners',
                      ] as const
                    ).map((option) => (
                      <label key={option} className='flex items-center gap-2'>
                        <input
                          type='radio'
                          name='subject'
                          className='accent-rwa/60 focus:ring-rwa/60'
                        />
                        <span className='text-sm text-gray-900'>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-start text-sm font-medium text-gray-900 mb-2'>
                    Message
                  </label>
                  <textarea
                    placeholder='Write your message...'
                    rows={4}
                    className='w-full border-b border-rwa focus:outline-none focus:border-rwa/60 resize-none pb-2'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='w-full bg-rwa hover:bg-rwa/70 text-white py-3 rounded-lg transition'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className='bg-white py-12 border-t border-gray-200'>
        <div className='max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-gray-700 text-sm'>
          <div>
            <p className='text-rwa font-medium mb-2'>Contact Info</p>
            <h3 className='text-2xl font-bold'>
              We are always happy <br />
              to <span className='text-rwa'>assist you</span>
            </h3>
          </div>
          <div>
            <p className='font-semibold mb-1'>Email Address</p>
            <p className='text-rwa'>support@solutions.rwa.inc</p>
          </div>
          <div>
            <p className='font-semibold mb-1'>Assistance hours:</p>
            <p>Monday - Friday 6 am to 8 pm EST</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
