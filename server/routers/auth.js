const express = require('express')
const router = express.Router();
const { spawn } = require('child_process');


  router.post('/getResult', (req, res) => {
      const userInput=req.body;
      if(!userInput){
        res.status(422).json({error:"Please Fill missing fields"});
      }
      console.log(userInput);
      const pythonProcess = spawn('python', ['../MLCode/i21_2083/ml.py', userInput]);
    
      pythonProcess.stdout.on('data', async (data) => {
        const result = data.toString().trim();
        console.log(result);
        res.json({ result });
      });
    
      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({ error: 'Internal server error' });
      });
    
      pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    
  });
  


  



module.exports = router;