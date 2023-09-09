const { log } = require('console');
const express=require('express');
const app=express();
const http=require('http').createServer(app);
const PORT=3000;
http.listen(PORT,()=>console.log(`server is live at ${PORT}`));
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{

   res.sendFile(__dirname +'/index.html')
})

// socket 

const io=require('socket.io')(http)

io.on('connection',(socket)=>{
   console.log('socket is connected..')

   socket.on('mg',(msg)=>{
     // console.log(msg) again send to browser 
     socket.broadcast.emit('message',msg)

   })
})