import './App.css';
import AppBar from './components/AppBar';
import MainRouters from './components/MainRouters';
import ContentTitle from './components/ContentTitle';
import { useGlobalContext } from './components/Context';
import SideBar from './components/SideBar';
function App() {
  const {sideBarFeeds,isOpen,setIsOpen}= useGlobalContext()
  return (
    <div>
      {
        isOpen && <div onClick={()=>setIsOpen(false)} className='black-screen' ></div>
      }
      
      <AppBar />
      
      <main className='content-body' >
         {
          // sideBarShow &&
           <SideBar  feeds={sideBarFeeds} />
         } 
        <article className='feeds-content' >
          <ContentTitle />
          <MainRouters />
        </article>
        
      </main>

      
    </div>
  );
}

export default App;
