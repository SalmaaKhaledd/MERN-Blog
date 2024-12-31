import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
          <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Salma's
            </span>
            Blog
            </Link>
          </div>
          
          <Footer.LinkGroup className='mt-5'>
            <div className='w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 justify-normal'>
            <Link to='/' className='text-sm'>Home</Link>
            <Link to='/about' className='text-sm'>About</Link>
            <Link to='/sign-in' className='text-sm'>Sign In</Link>
            <Link to='/sign-up' className='text-sm'>Sign Up</Link>
            </div>
          </Footer.LinkGroup>
           <Footer.Divider />
           <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <Footer.Copyright
              href='#'
              by="Salma's blog"
              year={new Date().getFullYear()}
            />
           </div>
           </div>

    </Footer>
  )
}
