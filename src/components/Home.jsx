import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useGlobalContext } from './Context';
import VideoInfo from './VideoInfo';
function Home() {
  const {apiKey}=useGlobalContext()
    const fetchItems = async () => {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=new&maxResults=50&key=${apiKey}`);
        return res.json();
    }

    const {
        data,
        error,
        isFetching,
        status,
    } = useQuery({
        queryKey: ['youtube'],
        queryFn:fetchItems,
    })
  return (
    <VideoInfo info={{data,error,isFetching,status}} />
  )
}

export default Home
