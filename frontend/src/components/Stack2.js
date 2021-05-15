import React, {useEffect,useState} from 'react';
import axios from 'axios';

export default function Stack1(props) {
    const level = props.level
    const [cards, setcards] = useState([]);                //State to store the cards 
    const [active, setActive] = useState(0);               //State to know number of active cards
    const [info,setInfo] = useState([]);                   //State to know which card is active

    // Function to receive all the cards via api and update it in setcards
    useEffect(() => {
        const url = `${window.apiHost}/api/start-game/${level}`;
            axios.get(url).then(function(res){
                setcards(res.data.cards)
                for(let i=0;i<res.data.cards.length;i++)
                     info[i] = res.data.cards[i].id
            }).catch(function(err){
                 console.log(err)
            })
    }, [])

    //function to handle click on cards 
    const handleClick = async(item,key) => {
        // it will execute if active is 0 and stack 1 status is true( it will confirm that the card from stack 1 is opened)
        if(active===0 && props.stack1Status===1){
            setActive(1)  
            
            // Storing the current active card 
            info[key] = item.no;
            setInfo(info);

            // URL for backend to analyze the result
            const url = `${window.apiHost}/api/play/stack-2/${item.id}`;
            try{
                const resp = await axios.get(url);

                // function to execute after 3 seconds
                setTimeout(()=>{
                    if(resp.data.status==="pass"){
                        
                        //if both cards from the stack are same, then removing the current card from cards state as well as in info state 

                        info.splice(key,1);
                        setInfo(info);
                        cards.splice(key,1);
                        setcards(cards);
                        setActive(0);

                        // Callback to inform about score and status of stack 2
                        props.callback(1, resp.data.score);
                      }else if(resp.data.status==="fail"){

                          //if both cards from the stack are different, then removing the number from info state
                           
                          info[key] = item.id;
                           setInfo(info);
                           setActive(0);

                           // Callback to inform about score and status of stack 2
                           props.callback(0, resp.data.score);      
                      }
                },3000)
            }catch(err){
                console.log(err)
            } 
        }
    }


    return (
        <div>
            <h1 style={{textAlign:"center   "}}>Stack 2</h1>
            {/* Condition to check if no. of cards in deck is 0 , then to show the Loading div else show the cards */}
            {
                cards.length===0 ? <h5 style={{textAlign:"center   "}}>Loading...</h5> 
                : 
                <div>
                    <div className="row">
                    {
                        cards.map((item,key)=>{
                            return(
                                <div className="col s12 l6 m12" key={key} style={{marginTop: 50, textAlign: "center"}}>
                                <div style={{
                                    backgroundColor: "darkblue",
                                    height: 200,
                                    width: 200,
                                    margin: "auto"
                                }}
                                onClick={()=>handleClick(item,key)}
                                >
                                    {
                                        // if number of active cards is 1 and type of info state is string then show the number
                                        active===1 && typeof(info[key])!=='string' ? <div className="info">{info[key]}</div> : null
                                    }
                                </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            }
        </div>
    )
}
