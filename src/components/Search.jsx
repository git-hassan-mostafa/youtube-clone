import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useGlobalContext } from './Context'
import VideoInfo from './VideoInfo'
import { useParams } from 'react-router-dom'
function Search() {
    const {setSearch,apiKey,searchButtonClicked}=useGlobalContext()
    const {search}=useParams()
    const fetchItems = async () => {
        
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&new&maxResults=50&key=${apiKey}`);
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
    },[searchButtonClicked])
  return (
    <VideoInfo info={{data,error,isFetching,status,refetch}} />
  )
}

export default Search
