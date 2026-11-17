import {useEffect,useState} from 'react';
import {AppState} from 'react-native';
export function useCurrentTime(){
 const [now,setNow]=useState(()=>Date.now());
 useEffect(()=>{const refresh=()=>setNow(Date.now());const timer=setInterval(refresh,30000);const subscription=AppState.addEventListener('change',state=>{if(state==='active')refresh()});if(typeof document!=='undefined')document.addEventListener('visibilitychange',refresh);return()=>{clearInterval(timer);subscription.remove();if(typeof document!=='undefined')document.removeEventListener('visibilitychange',refresh)}},[]);
 return now;
}
