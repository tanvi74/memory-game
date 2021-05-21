import React, {useEffect,useState} from 'react';
import axios from 'axios';

export default function Stack1(props) {
    const fileId = props.fileID
    const [cards, setcards] = useState([]);             //State to store the cards 
    const [active, setActive] = useState(0);            //State to know number of active cards
    const [info,setInfo] = useState([]);                //State to know which card is active


    // Function to receive all the cards via api and update it in setcards
    useEffect(() => {
        let card = props.stack1cards;
        setcards(card);
        let inf = [];
        for(let i=0;i<card.length;i++)
            inf[i] = card[i].id
        setInfo(inf)
    },[props.stack1cards])

    //Function to handle click on cards 
    const handleClick = async(item,key) => {

        // it will execute if active is 0
        if(active===0){
            setActive(1)
            console.log(item);
            let i = info;
            i[key] = item.no;
            setInfo(i)

             // URL for backend to store the stack 1 file id 
            const url = `${window.apiHost}/api/play/stack-1/${fileId}/${item.id}`;
            await axios.get(url);

            //Callback to update the stack 1 status to 1
            props.callback(1);
        }
    }

    // Function to render only when the stack 2 card gets openend up
    useEffect(() => {
        setActive(0);

        // Callback to update the stack 1 status to 0
        let inf = [];
        for(let i=0;i<cards.length;i++)
            inf[i] = cards[i].id
        setInfo(inf)

        props.callback(0)
    },[props.renderStack1])

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Stack 1</h1>
            {/* Condition to check if no. of cards in deck is 0 , then to show the Loading div else show the cards */}
            {
                cards.length===0 ? <h5 style={{textAlign:"center"}}>Loading...</h5> 
                : 
            
                    <div className="row">
                    {
                        cards.map((item,key)=>{
                            return(
                                <div className="col s12 l6 m12" key={key} style={{marginTop: 50}}>
                                <div style={{
                                    backgroundColor: "green"
                                }}
                                className="boxes"
                                onClick={()=>handleClick(item,key)}
                                >
                                    {
                                        // if number of active card is 1 and type of info state is string then show the number
                                        active===1 && typeof(info[key])!=='string' ? <div className="info">{info[key]}</div> : null
                                    }
                                </div>
                                </div>
                            )
                        })
                    }
                    </div>
             
            }
        </div>
    )
}
