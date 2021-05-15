import React from 'react';
import {Link} from 'react-router-dom';
import '../components/style.css';

export default function Landing(props) {

    return (
        <div className="dashboard">
            <h1>Memory Game</h1>
            <h4>Select Level of Difficulty</h4>
            
            <Link to= {`/easy`}><div className="waves-effect waves-light btn-large btn1" >Easy</div><br/></Link>
            <Link to= {`/medium`}><div className="waves-effect waves-light btn-large btn1 mediumBtn" >Medium</div></Link><br/>
            <Link to= {`/difficult`}><div className="waves-effect waves-light btn-large btn1 diffBtn" >Difficult</div></Link>
        </div>
    )
}
