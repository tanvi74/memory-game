import React, {useEffect,useState} from 'react';
import axios from 'axios';

export default function Stack1(props) {
    const fileId = props.fileID;
    const level = props.level
    const [cards, setcards] = useState([]);  
    const [active, setActive] = useState(0);
    const[key,setKey] = useState()

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
        if(active===0){
            const url = `${window.apiHost}/api/play/stack-1/${fileId}/${key}`;
            const resp = await axios.get(url);

            let c = cards;
            c[key] = resp.data.number;

            setKey(key)
            setcards(c);
            setActive(1);
            props.callback(1);
        }
    }


    // Function to handle after stack 2 cards is open up
    useEffect(() => {
        setActive(0);

        let c = cards;

        // Condition if cards gets matched up
        if(props.stack2Status===1){
            c[key]='x';
            setcards(c)
        }else if(props.stack2Status===0){
            c[key]='s';
            setcards(c)
        }
        props.callback(0)
    },[props.renderStack1])

    return(
        <div>
            <h1 style={{textAlign:"center"}}>Stack 1</h1>
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
                                            backgroundColor: "green"
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