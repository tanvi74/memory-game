const express = require('express');
const fs = require('fs');

const router = express.Router();

// to read easy document having easy cards with their id and no.
const easyFile = JSON.parse(fs.readFileSync(`${__dirname}/data/easy.json`, 'utf-8'));

// to read difficult document having difficult cards with their id and no.
const difficultFile = JSON.parse(fs.readFileSync(`${__dirname}/data/difficult.json`, 'utf-8'));

// to read medium document having medium cards with their id and no.
const mediumFile = JSON.parse(fs.readFileSync(`${__dirname}/data/medium.json`, 'utf-8'));


function shuffle(...cards) {
    console.log("called")
    for (var a = 0; a < cards.length; a++) {
        var x = cards[a];
        var y = Math.floor(Math.random() * (a + 1));
        cards[a] = cards[y];
        cards[y] = x;
    }
  
    return cards;
  }


// router to start the game and to send the cards according to difficulty level and to initalize the file_id.json file
router.get('/start-game/:level', (req,res,next)=>{

    let cards = [];
    if(req.params.level === "easy"){
        cards = easyFile
    }else if(req.params.level === "medium"){
        cards = mediumFile
    }else if(req.params.level === "difficult"){
        cards = difficultFile
    }

    let stack1 = shuffle(...cards);
    let stack2 = shuffle(...cards);
  
    let data = {
        stack1,
        stack2,
        score:0,
        id:[]
    }

    console.log(data)
    data= JSON.stringify(data)
    

    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let fileName = '';
    for ( var i = 0; i < 10; i++ ) {
        fileName += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    console.log(fileName)
    // to initalize the unique file_id in the game_data folder 
    fs.writeFileSync(`game_data/${req.params.level}_${fileName}.json`, data, function(){console.log('done')})


    res.status(200).json({
        status: "success",
        uniqueId: `${req.params.level}_${fileName}`
    })
})



// Route to send the score
router.get('/score/:fileId', (req,res,next)=>{

    // To read the unique file_id in the game_data folder  
    const data = JSON.parse(fs.readFileSync(`game_data/${req.params.fileId}.json`, 'utf-8'));

    // to send the response
    res.status(200).json({
        status: "success",
        score: data.score
    })
})

module.exports = router;