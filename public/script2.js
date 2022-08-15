let username = document.getElementById("username")

let socket = new io.connect('http://localhost:8989', {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5,
    'username': 'hemant'
});

let socket1 = io({

});

socket.on("connect", () => {
    console.log('connected');
})

// socket.on('connect', () => console.log('connected'))
// socket.on('reconnect', () => {
//     socket.emit('register',{
//         username:uname
//     })
//     console.log('reconnect')
// })

function connect() {
    console.log('connecting... ');
    socket.emit('register', {
        username: uname
    })
}

socket.on('connecting', () => {
    console.log('connecting1')
    connect()
})
socket.on('reconnecting', () => {
    console.log('reconnecting')
    connect()
})

socket.on('connect_failed', () => {

    console.log('connect_failed')
    connect()
})
socket.on('reconnect_failed', () => {
    console.log('reconnect_failed')
    connect()
})
socket.on('close', () => {
    console.log('close')
    connect()
})
socket.on('disconnect', () => {
    console.log('disconnect')
    connect()
})


let uname = '';
let loginbtn = document.getElementById("loginbtn")
let chatbox = document.getElementById("chatbox")
let loginbox = document.getElementById('loginbox')
let sendbtn = document.getElementById("sendbtn");
let dochat = false;
let username1 = document.getElementById('name')
let chat = document.getElementById('chat')

loginbtn.onclick = function () {
    chatbox.style.display = 'block'
    loginbox.style.display = 'none'
    dochat = true;
    uname = username.value
    console.log('username : ', username.value);
    //emit socket to server to make a room
    username1.innerText = username.value;
    socket.emit("register", {
        username: username.value
    })
}

sendbtn.onclick = function () {
    if (dochat) {
        console.log('sending the message ');

        let message = document.getElementById('msg');
        let to = document.getElementById('sendto');

        //emit socket to server to sendmsg
        socket.emit('msg_send', {
            from: username.value,
            msg: message.value,
            to: to.value
        })

    } else {
        //user not registered do something





    }
}

socket.on("msg_rcd", (data) => {

    console.log('rcd', data.message);

    let message = document.createElement('span');
    let to = document.createElement('span')
    let time = document.createElement('span')

    let div = document.createElement('div')

    message.innerText = data.message;
    to.innerText = data.from;
    time.innerText = getTime();


    div.appendChild(message);
    div.appendChild(to);
    div.appendChild(time)

    chat.appendChild(div)

})

getTime();

function getDate() {
    let today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log('Now : ', today);

    return today
}

function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // console.log('Now : ', time);
    return time;
}

socket.on("getback", (data) => {
    // console.log('back', getTime());
})