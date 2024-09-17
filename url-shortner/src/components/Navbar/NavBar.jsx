import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export const NavBar = () => {
  const menuSideBarRef=useRef();
  const [isMenuSideBarActive,setIsMenuSideBarActive]=useState(false)

  //function that use to togle between open menu side bar and close menu sidebar
  const toggleMenuSideBar=()=>{

if(isMenuSideBarActive){

  menuSideBarRef.current.classList.add('hide-menu-sidebar');
  setIsMenuSideBarActive(false);
}
else{
  menuSideBarRef.current.classList.remove('hide-menu-sidebar')
  setIsMenuSideBarActive(true)
}

  }

  return (
    <div className='navbar-container'>
      {/*menu side bar that open in mobiles */}
  <div ref={menuSideBarRef} className='menu-sidebar-container hide-menu-sidebar'>
    <div onClick={toggleMenuSideBar} className='menu-sidebar-extra-part'>

    </div>
  <div className='menu-sidebar'>
  <div onClick={toggleMenuSideBar} className='close-option'>
  <i class="fa-solid fa-x nav-option"></i>
  </div>

  <NavLink  className={({isActive})=>isActive?'active-nav':'nav-option'} to={'/'}>Home</NavLink>
<NavLink className={({isActive})=>isActive?'active-nav':'nav-option'} to={'/url-analytics'} >URL Analytics</NavLink>
<NavLink className={({isActive})=>isActive?'active-nav':'nav-option'} to={'/qr-code'}>QR Code</NavLink>

      </div>
  </div>
{/*--*/}

{/*now this is navbar that will so in monitors , laptop desktop etc large screen */}
<NavLink to={'/'} className='logo'>
<i class="fa-solid fa-link logo-icon"></i>
QuickLink
</NavLink>


{/*nav options for toggling among different pages of site */}
<div className='nav-options'>

<NavLink  className={({isActive})=>isActive?'active-nav':'nav-option'} to={'/'}>Home</NavLink>
<NavLink className={({isActive})=>isActive?'active-nav':'nav-option'} to={'/url-analytics'} >URL Analytics</NavLink>
<NavLink className={({isActive})=>isActive?'active-nav':'nav-option'} to={'/qr-code'}>QR Code</NavLink>

</div>

<div onClick={toggleMenuSideBar} className='menu'>
<i  class="fa-solid fa-bars menuicon"></i>
</div>


    </div>
  )
}
