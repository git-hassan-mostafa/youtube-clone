import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from './Context'
function SideBarContent({feeds}) {
    const {setFeeds,setIsOpen}=useGlobalContext()
    const [isHover,setIsHover]=useState(false)
      const NavStyle=({isActive})=>{
    return{
        color: isActive|| isHover ?'white' : 'red',
        backgroundColor: isActive ||isHover? 'red':'white',
        textDecoration: 'none',
        display:'block',
        border:'1px solid red',
        padding:'7px 5px',
        borderRadius:'20px',
        textAlign:'center',
        fontSize:'15px',
        fontWeight:'500',
        marginBottom:'12px',
        marginTop:'10px',
        transition:'0.2s',
    }
}
  return (
    <>
        <NavLink
        onMouseOver={()=>setIsHover(true)}
        onMouseOut={()=>setIsHover(false)}
        style={NavStyle} className='side-bar-link'
        to={`/feeds/${feeds}`}
         onClick={() => {
          setFeeds(feeds)
          setIsOpen(false)
        }}>
          {feeds}
        </NavLink>
    </>
  )
}

export default SideBarContent
