import React,{useEffect} from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch(props) {
  const {
    seconds,
    minutes,
    hours,
    pause
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if(props.stop===0){
        pause();
    }
},[props.stop])


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
      <MyStopwatch stop={props.stop}/>
    </div>
  );
}