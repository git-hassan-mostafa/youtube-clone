import { createContext, useContext, useState } from "react";
const appContext = createContext()
export const AppProvider = ({ children }) => {
    const apiKey1 = 'AIzaSyDKjg-bBFBGzSyR9D-A79zC9RXVmVQpKmI'
    const apiKey2 = 'AIzaSyB-mwD-OrgQnrIH5zq5gDIxfE45ublcaZ8'
    const apiKey3= 'AIzaSyAuwsEyjMA1XKbKSznnac_WYD_FQGEHImY'
    const apiKey=apiKey2
         const usefetchData = async (a) => {
        const res = await fetch(a);
        return res.json();
    }
    const [search,setSearch]=useState('')
    const sideBarFeeds = ['new','reactjs', 'javascript', 'programming', 'nutrition', 'football', 'vlogs', 'music', 'gaming', 'messi', 'ronaldo', 'worldcup']
    const [feeds, setFeeds] = useState('new')
    const [isOpen, setIsOpen] = useState(false)
    const [sideBarShow, setSideBarShow] = useState(true)
    const [searchButtonClicked,setSearchButtonClicked]=useState(true)
    const [videoId,setVideoId]=useState('')
    const [channelId,setChannelId] =useState('')
    return (
        <appContext.Provider value={{
            sideBarFeeds,
            feeds,
            setFeeds,
            isOpen,
            setIsOpen,
            sideBarShow,
            setSideBarShow,
            search,
            setSearch,
            apiKey,
            searchButtonClicked,
            setSearchButtonClicked,
            videoId,
            setVideoId,
            usefetchData,
            channelId,
            setChannelId,
        }}>
            {children}
        </appContext.Provider>
    )
}
export const useGlobalContext = () => (
    useContext(appContext)
)