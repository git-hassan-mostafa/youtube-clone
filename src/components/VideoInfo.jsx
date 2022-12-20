import { Skeleton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
function VideoInfo({info}) {
    const {data,status,error,isFetching}=info
    const navigate=useNavigate()
  return (
    <article className='videos'>
      
      {
        status === 'loading' || isFetching ? (
          [1,2,3,4,5,6].map((_,i)=>(
            <div key={i}>
            <Skeleton sx={{
                borderRadius:'4px'
            }} variant='rectangular' height={150} />
            <Skeleton sx={{
                borderRadius:'4px'
            }} variant='text' />
            <Skeleton sx={{
                borderRadius:'4px'
            }} variant='text'  width={100} />
            </div>
          ))
        ) : error ? (
          <h1> {error?.message} </h1>
        ) :
        (
          <>
            {
              
              data?.items?.map(item=>(
                item?.id?.kind!=='youtube#playlist'?
                <section 
                style={!item?.id?.videoId ? {
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                  alignItems:'center',
                  gap:'5px'
                }:null}
                onClick={()=>{
                }} key={item?.etag}>
                      <img
                      style={!item?.id?.videoId?{
                        width:'150px',
                        height:'150px',
                        borderRadius:'50%'
                      }:null}
                      onClick={()=>{
                        item?.id?.videoId?
                        navigate(`/video/${item?.id?.videoId}`):
                        navigate(`/channel/${item?.id?.channelId}`)
                      }}
                      src={item?.snippet?.thumbnails?.high?.url} alt="" />
                      <h5>{item?.snippet?.title?.slice(0,30)}  ... </h5>
                      <p onClick={()=>navigate(`/channel/${item?.snippet?.channelId}`)}> {item?.snippet?.channelTitle} </p>
                      
                    </section>:undefined
              ))
            }
            
          </>
        )
      }

    </article>
  )
}

export default VideoInfo
