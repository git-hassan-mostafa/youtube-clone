import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from './Context'
import VideoInfo from './VideoInfo'

function Channel() {
  const { usefetchData, apiKey } = useGlobalContext()
  const { channelId } = useParams()
  const navigate = useNavigate()
  const { data, status, error, isFetching } = useQuery({
    queryKey: ['youtube-channel'],
    queryFn: () => usefetchData(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`),
  })
  const playId = data?.items[0]?.contentDetails.relatedPlaylists.uploads
  const { data: playData, status: playStatus, error: playError, isFetching: playFetching } = useQuery({
    queryKey: ['youtube-play-list'],
    queryFn: () => usefetchData(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playId}&key=${apiKey}`),
    enabled: !!playId
  })
  const count = (count) => {
    if (count >= 1000000000) return `${(count / 1000000000).toFixed(1)}b`
    else if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`
    else if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return count
  }
  const subscribe = data?.items[0]?.statistics?.subscriberCount
  const view = data?.items[0]?.statistics?.viewCount
  const videoCount = data?.items[0]?.statistics?.videoCount
  return (
    status === 'loading' || isFetching || playStatus === 'loading' || playFetching ?
      <h1 style={{
        textAlign: 'center'
      }}>loading ...</h1> :
      error?
      <h1 style={{
        textAlign: 'center'
      }}> {error?.message} </h1> :
      <>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px'
        }}>
          <img style={{
            borderRadius: '50%'
          }} width={100} src={data?.items[0]?.snippet?.thumbnails?.high?.url} alt="" />
        </div>
        <div style={{
          textAlign: 'center',

        }}>
          <h1 style={{
            color: 'red'
          }}> {data?.items[0]?.snippet?.title} </h1>
          <div style={{
            fontSize:'14px',
            color:'grey'
          }}>
            <div> {count(subscribe)} subscribers</div>
            <div> {count(view)} views </div>
            <div> {count(videoCount)} videos </div>
          </div>
          <p style={{
            color:'red',
            fontWeight:'bold'
          }}> {data?.items[0]?.snippet?.description} </p>
        </div>
        <article className="videos">
          {
            playData?.items?.map(item => (
              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px'
                }}
                onClick={() => {
                  console.log(item)

                }} key={item?.etag}>
                <img
                  onClick={() => {
                    item ?
                      navigate(`/video/${item?.contentDetails?.videoId}`) :
                      navigate(`/channel/${item?.id?.channelId}`)
                  }}
                  src={item?.snippet?.thumbnails?.high?.url} alt="" />
                <h5>{item?.snippet?.title?.slice(0, 30)}  ... </h5>
                <p onClick={() => navigate(`/channel/${item?.snippet?.channelId}`)}> {item?.snippet?.channelTitle} </p>

              </section>
            ))
          }
        </article>
      </>
  )
}

export default Channel
