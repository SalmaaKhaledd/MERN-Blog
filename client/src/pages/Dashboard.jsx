import React from 'react'
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts';


function Dashboard() {
  // Provides access to the current location object, which includes the URL’s pathname, search (query parameters), and hash.
  const location = useLocation();
  const [tab, setTab] = useState('');
  //Runs a side effect whenever the location.search changes.
  useEffect(() => {
    //UrlSearchParams is a built-in browser API for parsing query strings in the URL.
    //location.search: Refers to the query string in the URL, which comes after the ?.
    //	For example, in http://example.com?tab=home, location.search would be "?tab=home".
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
  <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md:w-56 '>
      <DashSidebar />
    </div>
   {/* profile */}
      {tab === 'profile' && <DashProfile />}
   {/* posts */}
      {tab === 'posts' && <DashPosts />}
  </div>
  );
}

export default Dashboard  