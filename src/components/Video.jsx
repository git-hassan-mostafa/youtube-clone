import React from 'react'
import { useGlobalContext } from './Context';
import ReactPlayer from 'react-player';
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Video() {
  const { apiKey, usefetchData } = useGlobalContext()
  const [showMore, setShowMore] = useState(false)
  const navigate=useNavigate()
  const { videoId } = useParams()


  const {
    data,
    error,
    isFetching,
    status,
  } = useQuery({
    queryKey: ['youtube'],
    queryFn:() => usefetchData(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`),
  })
  const channelId=data?.items[0]?.snippet?.channelId
  const {
    data:channelData,
  } = useQuery({
    queryKey: ['youtube-channel',channelId],
    queryFn:() => usefetchData(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`),
    enabled:!!channelId,
  })
  const description = () => (
    showMore ?
      data?.items[0]?.snippet?.description :
      data?.items[0]?.snippet?.description?.slice(0, 50)
  )
  const count=(count)=>{
    if(showMore) return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (count >=1000000000) return `${(count/1000000000).toFixed(1)}b`
    else if (count >=1000000) return `${(count/1000000).toFixed(1)}m`
    else if(count >=1000) return `${(count/1000).toFixed(1)}k`
    return count
  }
  const subscriberCount= count(channelData?.items[0]?.statistics?.subscriberCount)
  const viewCount= count(data?.items[0]?.statistics?.viewCount)
  const likeCount= count(data?.items[0]?.statistics?.likeCount)
  return (
    status === 'loading' || isFetching ?
      <Box sx={{
        marginTop:'10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </Box> :
      error?
      <h1> {error?.message} </h1>:
      <main className='page-wrapper'>
        <section className="video-info">
          <div className="player-wrapper">
            <ReactPlayer
              url={`https://youtube.com/watch?v=${videoId}`}
              className="react-player"
              playing
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
          <article onClick={() => setShowMore(prev => !prev)} className='video-data' style={{

          }}>
            <h3 style={{
              margin: '0',
              width: '100%',
              color: 'red'
            }}> {data?.items[0]?.snippet?.title} </h3>
            <div style={{
              display:'flex',
              gap:'20px'
            }}>
              <p style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center'
            }}><VisibilityIcon /> {viewCount} views </p>
            <p style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center'
            }}> <ThumbUpIcon /> {likeCount} likes </p>
            </div>
            
            <p style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}> {description()} <span style={{
              color: 'blue'
            }}>
                {showMore ? 'show less' : 'show more'}
              </span> </p>
          </article>
          <p style={{
            margin: '0',
            backgroundColor: '#D5DBDB',
            padding: '10px',
            boxSizing: 'border-box',
            border: '1px solid #7F8C8D',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',

          }}>
            <p onClick={()=>{
              navigate(`/channel/${channelId}`)
            }} style={{
            margin: '0',
            color: 'blue',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'

          }}>
            <img style={{
              borderRadius: '50%'
            }} width={30} height={30} src={channelData?.items[0]?.snippet?.thumbnails?.default?.url} alt="image" />
            {channelData?.items[0]?.snippet?.title}
            
          </p>
          {
             !channelData?.items[0]?.statistics?.hiddenSubscriberCount &&
             <span style={{
              color:'gray',
              fontSize:'small',
              fontWeight:'0'
            }}> {subscriberCount} subscribers </span>
          }
          </p>
          
        </section>
      </main>
  )
}

export default Video
