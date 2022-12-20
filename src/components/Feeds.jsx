import React,{useEffect} from 'react'
import { useGlobalContext } from './Context'
import VideoInfo from './VideoInfo'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const Feeds = () => {
  const {apiKey}=useGlobalContext()
  const {feeds}=useParams()
  const fetchItems = async () => {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${feeds}&maxResults=50&key=${apiKey}`);
    return res.json();
} 
const {
    data,
    error,
    isFetching,
    status,
    refetch
} = useQuery({
    queryKey: ['youtube'],
    queryFn: fetchItems,
})
useEffect(()=>{
  refetch()
},[feeds])
  return (
    <VideoInfo info={{data,error,isFetching,status}} />

  )
}
export default Feeds
