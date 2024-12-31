import { Navbar, TextInput, Button} from 'flowbite-react'
import React from 'react'
import { Link ,NavLink, useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'



function Header() {
   const path=useLocation().pathname
  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
        Salma's
      </span>
      Blog
      </Link>
      <form>
        <TextInput 
            type = 'text'
            placeholder = 'Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline' // hide on small screens
        
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className='flex flex-wrap gap-2 md:order-2 '>
        <Button className='w-12 h-10  sm:inline' color='gray' pill>
          <FaMoon /> 
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToPink' outline> 
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
          <Navbar.Link as={'div'}>
            <NavLink to="/" exact='true'   className='active'>
            Home
            </NavLink>
          </Navbar.Link>
          <Navbar.Link  as={'div'}> {/* as={'div'} to avoid error(cannot have a link inside a link) */}
            <NavLink to='/about' className='active'> 
            About
            </NavLink>
          </Navbar.Link>
          <Navbar.Link  as={'div'}>
            <Link to='/projects' className='active'>
            Projects
            </Link>
          </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
  )
}

export default Header