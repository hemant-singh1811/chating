let socket=io()
let btn=document.getElementById('btn')
let msg=document.getElementById('msg')
let offbtn=document.getElementById('offbtn')
let btn1=document.getElementById('btn1')
let btn2=document.getElementById('btn2')
let dbtn=document.getElementById('btnd')

btn

btn1.onclick=function(){
    console.log('click the button1');
    socket.emit('details')
}

btnd.onclick=function()
{
    console.log('date btn clicked');
    let date1=document.getElementById("datetime")
    console.log('time : ',date1.value);
}

 

btn2.onclick=function(){
    console.log('click the button2');
    socket.emit('details',{
        data:'sad'
    })
} 
 

console.log('files has been added');

btn.onclick=function(){
    console.log('btn clicked');
    socket.emit('off');
}

offbtn.onclick=function(){
    console.log('request for off btn');
    socket.emit('setoff');
}


// socket.on("disconnect",()=>{
//     console.log('a is disconnected',socket.id);
//     socket.emit('socket',()=>{
//         console.log('call');
//     })
// })
// 
// btn.onclick=function()
// {
//     console.log('you click the button');    
// }

