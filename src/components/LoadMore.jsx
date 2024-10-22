"use client"

import {useEffect,useState} from "react"
import { useInView } from "react-intersection-observer";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box, Icon, Stack } from "@mui/material";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import { ReactComponent as MySvg } from '../utils/spinner.svg';


let page=0;
function LoadMore({selectedCategory}){
  const {ref,inView}=useInView();// custom hook which is used to detect whether an element is in viewport or not. Whenever element referenced by the ref comes in the viewport then inView becomes true. And this will re-run useEffect and it will fetch the data again
  const [videos,setVideos]=useState([]);

  useEffect(() => {
    setVideos([]);
  }, [selectedCategory]);

  useEffect(()=>{
    if(inView){
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data)=>setVideos([...videos,...data.items.slice(page*10,page*10+10)]))
      page=(page+1)%5;
    }
},[inView,selectedCategory])
  

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        <Stack direction={'row'} flexWrap='wrap' justifyContent='center' gap={2}>
        {videos.map((item,idx)=>(
          <Box key={idx}>
            {item.id.videoId && <VideoCard video={item}/>}
            {item.id.channelId && <ChannelCard channelDetail={item}/>}
          </Box>
        ))}
      </Stack>

      </section>

      <section className="flex justify-center items-center w-full">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={ref}>
          <MySvg width="60px" height="60px"/>
        </div>
      </section>
    </>
  );
}

export default LoadMore;
