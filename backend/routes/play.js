const express = require('express');
const fs = require('fs');

const router = express.Router();


// Function to read the file asynchronously 
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err,data) => {
            if(err) reject('Not found file !!!')
            resolve(data);
        })
    })
}


// Function to write the file asynchronously 
const writeFilePro = (file, data ) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('Not found !!!')
            resolve("Written");
        })
    })
}


// Route to handle the stack 1 cards
router.get('/stack-1/:file_id/:id', async(req,res,next)=>{
    try{
        const fileId = req.params.file_id
        //Step-1:  To read the unique file_id in the game_data folder 
        let data = await readFilePro(`game_data/${fileId}.json`);
        
        //Step-2: Parsing the data to json
        data = JSON.parse(data)
        
        //Step-3: Pushing the stack 1 file_id to array 
        let number = data.stack1[Number(req.params.id)]
        data.id.push(number);

        console.log(data)
    
        //Step-4: stringifying the data
        let d1 = JSON.stringify(data);
        
        //Step-5: Writing the data to the unique file_id in the game_data folder  
        await writeFilePro(`game_data/${fileId}.json`, d1);

        //Step-6: Sending the success response
        res.status(200).json({
            status: "success",
            number
        })

    }catch(err){
        console.log(err)
    }
   
    
})


// Route to handle the stack 2 cards
router.get('/stack-2/:file_id/:id', async(req,res,next)=>{
    
    try{
        const fileId = req.params.file_id
        // flag to say that cards of both stacks are not equal
        let flag = 0;

        //Step-1:  To read the unique file_id in the game_data folder 
        let data = await readFilePro(`game_data/${fileId}.json`);
        
        //Step-2: Parsing the data to json
        data = JSON.parse(data)
       
        //Step-3: last element of array (file_id of stack 1 card) is equal to the stack 2 file_id card then manipulating the error score and also putting flag=1 if it gets satisfied
        let number = data.stack2[Number(req.params.id)]
        

        if(data.id[data.id.length-1] === number)
            flag = 1
        else
            data.score = data.score + 1;
        
        //Step-4: Pushing the stack 2 file_id to array     
        data.id.push(number);

        console.log(data)
        
        //Step-5: stringifying the data
        let d1 = JSON.stringify(data);
        
        //Step-6: Writing the data to the unique file_id in the game_data folder  
        await writeFilePro(`game_data/${fileId}.json`, d1);


        //Step 7: if flag=1 (cards of both stack are equal) then sending response of pass status else sending fail status
        if(flag)
            res.status(200).json({
                status: "pass",
                score: data.score,
                number
            })
        else
            res.status(200).json({
                status: "fail",
                score: data.score,
                number
            })

    }catch(err){
        console.log(err)
    }
})



module.exports = router;