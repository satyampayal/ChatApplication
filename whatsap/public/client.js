const socket =io();
 let name;
 let textarea=document.querySelector('#send');
 let messageCOntainer=document.querySelector('.message_container');
 do{
  name=  prompt('enter your name')
 }while(!name)

 function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message');
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup
    messageCOntainer.appendChild(mainDiv)
}

 function sendMessage(mg){
    let msg={
        user:name,
        message:mg.trim()
    }

    // Append 

    appendMessage(msg,'incoming');
    // send to server 

    socket.emit('mg',msg)

 }



 textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        // if(e.target.value !='')
        sendMessage(e.target.value);
    }
})

// receive all messages
socket.on('message',(msg)=>{
  console.log(msg);
  appendMessage(msg,'outgoing');
})
