import React from 'react'
import {Routes,Route, useParams} from 'react-router-dom'
import Channel from './Channel'
import Feeds from './Feeds'
import Home from './Home'
import Search from './Search'
import Video from './Video'
const MainRouters = () => {
  
  return (
    <div>
        <Routes>
        <Route path='/feeds/:feeds' element={<Feeds />} />
        <Route path='/' element={<Home />} />
        <Route path='/search/:search' element={<Search />} />
        <Route path='/video/:videoId' element={<Video />} />
        <Route path='/channel/:channelId' element={<Channel />} />      </Routes>
        
        
      
    </div>
  )
}

export default MainRouters
