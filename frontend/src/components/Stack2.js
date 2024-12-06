import React, {useEffect,useState} from 'react';
import axios from 'axios';

export default function Stack2(props) {
    const fileId = props.fileID;
    const level = props.level
    const [cards, setcards] = useState([]);  
    const [active, setActive] = useState(0);

    // Function to decide number of cards based on level
    useEffect(()=>{
        let cardNo=5;
        if(level==="medium"){
            cardNo = 10;
        }else if(level==="difficult"){
            cardNo = 25;
        }

        let c = []
        for(let a= 0 ;a<cardNo;a++)
            c.push('s');

        setcards(c)
    },[])

    
    // function to handle click on cards
    const handleClick = async(key) => {
        
        if(active===0 && props.stack1Status===1){
        
            const url = `${window.apiHost}/api/play/stack-2/${fileId}/${key}`;
            const resp = await axios.get(url, {headers: {
                "Access-Control-Allow-Origin": "*"
            }});

           
            let c = cards;
            c[key] = resp.data.number;

            setcards(c);
            setActive(1);

            // Condition if cards gets matched up
            if(resp.data.status === 'pass'){
                setTimeout(()=>{
                    c[key] = 'x';
                    setcards(c);
                    setActive(0);
                    props.callback(1, resp.data.score);
                },3000)
            }else{
                setTimeout(()=>{
                    c[key] = 's';
                    setcards(c);
                    setActive(0);
                    props.callback(0, resp.data.score);
                },3000)
            }
        }
    }


    return(
        <div>
            <h1 style={{textAlign:"center"}}>Stack 2</h1>
            {
                cards.length ? 
                <div className="row">
                    {
                        cards.map((item,key)=>{
                            return(
                                <div className="col s12 l6 m12" key={key} style={{marginTop: 50}}>
                                 
                                    {
                                        item!=='x' ? 
                                        <div style={{
                                            backgroundColor: "darkblue"
                                        }}
                                        className="boxes"
                                        onClick={()=>handleClick(key)}
                                        >
                                            {
                                                // if number of active card is 1 and type of info state is string then show the number
                                                active===1 && typeof(item)==='number' ? <div className="info">{item}</div> : null
                                            }
                                        </div>
                                        :
                                        <div style={{
                                            backgroundColor: "black"
                                        }}
                                        className="boxes"
                                        >
                                            
                                        </div>
                                    }
                                
                                </div>
                            )
                        })
                    }
                </div>
                :
                null
            }
        </div>
    )
}