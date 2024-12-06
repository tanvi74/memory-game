import React,{useState, useEffect} from 'react';
import Stack1 from '../components/Stack1';                   // Importing stack 1
import Stack2 from '../components/Stack2';                   // Importing stack 2
import Stopwatch from '../components/StopWatch';             // Importing stopwatch
import {useHistory} from 'react-router-dom';
import axios from 'axios';  

export default function Home(props) {
    const history = useHistory()
    const level = props.match.params.level;                   // To see the level of diffculty choosen by user

    const [stack1Status, setstack1Status] = useState(0);      // State To have an eye on stack 1 status
    const [stack2Status, setstack2Status] = useState(-1);     // State To have an eye on stack 2 status
    const [renderStack1, setRenderStack1] = useState(0);      // State to check that the card from stack 2 has been choosen
    const [score, setScore] = useState(0);                    // State to store the error Score 
    const [cardNo, setCardNo] = useState();                   // State to know the No. of cards on the deck
    const [fileID, setfileID] = useState("");                 // State to save unique fileId

     // Function to receive unique file id
     useEffect(() => {
        const url = `${window.apiHost}/api/start-game/${level}`;
            axios.get(url, {headers: {
                "Access-Control-Allow-Origin": "*"
            }}).then(function(res){
                setfileID(res.data.uniqueId)
            }).catch(function(err){
                 console.log(err)
            })
    }, [level])


    // Function to execute once to set the no. of cards initially
    useEffect(() => {
        if(level==="easy"){
            setCardNo(5)
        }else if(level==="medium"){
            setCardNo(10)
        }else if(level==="difficult"){
            setCardNo(25)
        }else{
            history.push('/')                        // to redirect to landing page
        }
    }, [])

    // Callback function for stack 1 to update its status
    const callback1 = (value) => {
        setstack1Status(value);
    }

    // Callback function for stack 2 to update its status, No. of cards on deck, score  
    const callback2 = (value,s) => {
        
        if(value){
            setCardNo(cardNo-1);  
        }

        setstack2Status(value);
        setScore(s)

        if(renderStack1){
            setRenderStack1(0);
        }else
            setRenderStack1(1);
    }

    
    return (
        <div>
            <div className="row">
                    <div className="col l6 m6 s12">
                    
                        {/* Stopwatch Div */}
                        <div className="row">
                            <div className="col l3 m2"></div>
                            <div className="col l6 m8 s12">
                                <h4 style={{color: "white", border: "1px solid white", padding: 30, textAlign: "center"}}>Elapsed Time 
                                    <br/>
                                    <Stopwatch stop={cardNo} fileID={fileID}/>
                                </h4>
                            </div>
                            <div className="col l3 m2"></div>
                        </div>
                    </div>
                    
                    
                    
                    <div className="col l6 m6 s12">

                        {/* Error Score Div */}
                        <div className="row">
                            <div className="col l3 m2"></div>
                            <div className="col l6 m8 s12">
                                <h4 style={{color: "white", border: "1px solid white", padding: 30, textAlign: "center"}}>Error Score 
                                    <br/>
                                <div style={{fontSize: '50px', marginTop: 20}}>{score}</div>
                                
                                </h4>
                            </div>
                            <div className="col l3 m2"></div>
                        </div>
                    </div>
                </div>
            {/* Condition to check if no. of cards in deck is 0 , then to show the congratualtions div else show the stacks */}
            {
                cardNo ? 
                <>
                {
                    fileID.length ? 
                    <div className="row">
                        <div className="col s6" style={{borderRight: "1px solid white"}}>
                            <Stack1 fileID={fileID} callback = {callback1} stack2Status={stack2Status} renderStack1={renderStack1} level={level}/>
                        </div>
                        <div className="col s6">
                            <Stack2  fileID={fileID} callback = {callback2} stack1Status={stack1Status} level={level}/>
                        </div>
                    </div>
                    :
                    <h1 style={{textAlign: "center"}}>Loading...</h1>
                }
                
                </>
                :
                <h1 style={{textAlign: "center"}}>Game Over !!</h1>
            }
        </div>
    )
}
