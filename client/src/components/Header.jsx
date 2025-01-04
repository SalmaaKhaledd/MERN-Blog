import { Navbar, TextInput, Button, Dropdown, Avatar} from 'flowbite-react'
import React from 'react'
import { Link ,NavLink, useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {useSelector} from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';





function Header() {
   const path=useLocation().pathname
   const {currentUser}=useSelector(state=>state.user)
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

   const handleSignout = async () => {
       try {
         const res = await fetch('/api/user/signout', {
           method: 'POST',
         });
         const data = await res.json();
         console.log('Response status:', res.status, 'Response data:', data);
         if (!res.ok) {
           console.log(data.message);
         } else {
           dispatch(signOutSuccess());
         }
       } catch (error) {
         console.log(error.message);
       }
       };

    const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
        Salma's
      </span>
      Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput 
            type = 'text'
            placeholder = 'Search...'
            rightIcon={AiOutlineSearch}
            className=' hidden lg:block' // hide on small screens
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        
        />
      </form>
      <Button className='block lg:hidden w-12 h-10' color='gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className='flex flex-wrap gap-2 md:order-2 '>
        {/* dynamic signin based on user status */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout} >Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToPink' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
          <Navbar.Link as={'div'}>
            <NavLink to="/" exact='true'   className='active'>
            Home
            </NavLink>
          </Navbar.Link>
          <Navbar.Link  as={'div'}> {/* as={'div'} to avoid error(cannot have a link inside a link) */}
            <NavLink to='/dashboard?tab=profile' className='active'> 
           Profile
            </NavLink>
          </Navbar.Link>
          {currentUser?.isAdmin && (
          <Navbar.Link  as={'div'}> 
            <NavLink to='/dashboard?tab=posts' className='active'> 
           Posts
            </NavLink>
          </Navbar.Link>)}
          </Navbar.Collapse>
        </Navbar>
  )
}

export default Header