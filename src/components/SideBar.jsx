import { ArrowBack, SentimentSatisfiedSharp } from '@mui/icons-material'
import { Stack, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from './Context'
import SideBarContent from './SideBarContent'
const SideBar = ({ feeds }) => {
  const { isOpen, setIsOpen } = useGlobalContext()
  return (
    <aside className={`sideBar ${isOpen && 'show'}`}>
      <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
        <IconButton
          onClick={() => setIsOpen(false)}
          sx={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          <ArrowBack />
        </IconButton>
        <h2>Feeds</h2>
      </Stack>
      {feeds.map((item, i) => (
        <SideBarContent key={i} feeds={item} />
      ))}
      
    </aside>
  )
}

export default SideBar
