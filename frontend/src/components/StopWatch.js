import React,{useEffect} from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch(props) {
  const {
    seconds,
    minutes,
    hours,
    pause,
    reset
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if(props.stop===0){
        pause();
    }
},[props.stop])

useEffect(()=>{
  console.log(props.fileID)
  if(props.fileID.length){
    reset();
  }else
    pause()

},[props.fileID])


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '50px', marginTop: 20}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default function App(props) {
    
  return (
    <div>
      <MyStopwatch stop={props.stop} fileID={props.fileID}/>
    </div>
  );
}