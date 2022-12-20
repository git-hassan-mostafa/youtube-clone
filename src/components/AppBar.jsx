import React, { useEffect, useRef, useState } from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGlobalContext } from './Context';
const AppBar = () => {
  const navigate = useNavigate()
  const [isSearch, setIsSearch] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const { setIsOpen, setSideBarShow, setSearch, search, sideBarShow, setFeeds, setSearchButtonClicked } = useGlobalContext()
  useEffect(() => {
    window.addEventListener('resize', _ => {
      if (window.innerWidth >= 898) {
        setIsSearch(false)
        // setIsOpen(false)
      }
      else return null
    })
  })
  const styleLeft = {
    backgroundColor: '#CCD1D1',
    borderRadius: '50% 0 0 50%',
    padding: '6px 7px 7px',
    border: '1px solid grey',


  }
  const styleRight = {
    backgroundColor: '#CCD1D1',
    borderRadius: '0 50% 50% 0',
    padding: '6px 7px 7px',
    border: '1px solid grey'
  }
  const styleRight2 = {
    backgroundColor: '#CCD1D1',
    borderRadius: '0 50% 50% 0',
    padding: '7px 7px',
    border: '1px solid grey',
    textAlign: 'center',
    marginBottom: '1px'
  }
  return (
    <Stack sx={{
      position: 'sticky',
      top: '0px',
      zIndex: '4',
      backgroundColor: 'white'
    }} >
      {

        !isSearch ?
          <Stack direction='row' justifyContent='space-between' sx={{
            backgroundColor: 'white',
            height: '50px',
            display: 'flex',
            justiftContent: 'center',
            alignItems: 'center',
            boxShadow: {
              // sm: '0'
            }
            ,
            alignItems: 'center',
            padding: {
              md: '0 20px'
            }
          }}>
            <IconButton
              onClick={() => {
                setIsOpen(true)
                setSideBarShow(true)
              }}
              sx={{
                display: {
                  md: 'none'
                },
              }}>
              <MenuIcon

                sx={{
                  color: 'black',
                  fontSize: '35px',

                  cursor: 'pointer'
                }} />
            </IconButton>

            <Stack justifyContent='center' direction='row' alignItems='center' >
              <IconButton
                onClick={() => {
                  setIsOpen(prev => !prev)
                  setSideBarShow(!sideBarShow)
                }}
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block'
                  }
                }}>
                <MenuIcon sx={{
                  fontSize: '30px',
                  color: 'black',

                }} />
              </IconButton>
              <Link className='youtube-link' to={'/'} onClick={() => setFeeds('video')} >
                <Stack justifyContent='center' direction='row' alignItems={'center'}>



                  <YouTubeIcon
                    sx={{
                      color: 'red',
                      fontSize: '40px',
                      // textAlign: 'left',
                    }} />
                  <h3>You</h3> <h3 >Tube</h3>

                </Stack>
              </Link>
            </Stack>
            <Stack sx={{
              display: {
                xs: 'none',
                md: 'block'
              }
            }} >
              <form action="" onSubmit={(e) => {
                e.preventDefault()
                setSearchButtonClicked(prev => !prev)
                navigate(`/search/${search}`)
              }}>
                <input onChange={(e) => {
                  if (!e.target.value) setIsEmpty(true)
                  else setIsEmpty(false)
                  setSearch(e.target.value)
                }} className='mdInput' placeholder='search ...' type="text" />
                {
                  <IconButton disabled={isEmpty?true:false} type='submit'
                    style={styleRight2} >
                    <SearchIcon />
                  </IconButton>
                }
              </form>

            </Stack>
            <Stack
              direction='row' spacing={2}> <IconButton
                sx={{
                  display: {
                    md: 'none'
                  }
                }}
                onClick={() => setIsSearch(true)}>
                <SearchIcon

                  sx={{
                    color: 'black',
                    fontSize: '35px',
                    cursor: 'pointer',
                    display: {
                      md: 'none'
                    }
                  }} />
              </IconButton>

              <IconButton sx={{
                marginRight: {
                  md: '200px'
                }
              }}>
                <AccountCircleIcon sx={{
                  color: 'black',
                  fontSize: '35px',
                  cursor: 'pointer',

                }} />
              </IconButton>

            </Stack>

          </Stack> :
          <Stack sx={{
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }} >
            <IconButton onClick={() => setIsSearch(false)} style={styleLeft}>
              <ArrowBackIcon />
            </IconButton>
            <form action="" onSubmit={(e) => {
              e.preventDefault()
              setSearchButtonClicked(prev => !prev)
              setIsSearch(false)
              navigate(`/search/${search}`)
            }}>
              <input onChange={(e) => {
                if (!e.target.value) setIsEmpty(true)
                else setIsEmpty(false)
                setSearch(e.target.value)
              }} className='smInput' placeholder='search ...' type="text" />
              {
                <IconButton disabled={isEmpty?true:false} type='submit' style={styleRight}>
                  <SearchIcon />
                </IconButton>
              }
            </form>
          </Stack>
      }
    </Stack>
  )
}

export default AppBar
