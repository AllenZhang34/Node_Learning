const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.end('Hello Express -- Get ');
});

app.post('/', (req, res, next) => {
  res.end('Hello Express - Post');
});

app.post('/login',(req,res,next)=>{
    res.end('Hello Express - Login')
})

app.listen('8800', () => {
  console.log('Create success 8800');
});
