const { log } = require('console');
const express = require('express')
const http = require("http")
const socket = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socket(server)
const dns = require('node:dns');
let idname = new Map();
let idtime = new Map();


app.use('/', express.static(__dirname + '/public'))


dns.lookup('example.org', (err, address, family) => {
    console.log('address: %j family: IPv%s', address, family);
});

function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    console.log('Now : ', time);
    return time;
}

io.on('connect', (socket) => {
    console.log('Added : ', socket.id);
    // console.log(socket);
    console.log("name : ",socket.username);
    idtime.set(socket.id, getTime());

    io.emit('getback');

    socket.on("register", (data) => {
        let username = data.username;
        console.log('new user :', data.username);
        socket.join(username);
        idname.set(socket.id, username)
        let room = io.sockets.adapter.rooms

        console.log('room : ', room);
        //acknowledge will be send to client that we registerd


    })

    socket.on('msg_send', (data) => {
        console.log('msg_send socket call');
        let message = data.msg;
        let from = data.from;
        let to = data.to;

        console.log('message : ', message);
        console.log('from : ', from);
        console.log('to : ', to);

        //lets send the message to corresponding sender.

        if (to != "") {
            io.to(to).emit('msg_rcd', {
                message: message,
                from: from,
                to: to
            })
        } else {
            socket.broadcast.emit("msg_rcd", {
                message: message,
                from: from
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('Disconnected : ', socket.id);

        idname.delete(socket.id)
        // diff(getTime(), idtime.get(socket.id))

        // console.log('discoonection time : ');

    })

    socket.on("send", (data) => {
        io.send('msg_rcd', {
            msg: data.msg
        })
    })

    socket.on('online', (data) => {
        let user = data.user;
        let pass = data.pass;
        io.emit('online_user', {
            rcd: 'true'
        })
    })

    socket.on('socket', () => {
        console.log(socket.id);
    })

    //    socket.once('once',()=>{
    //     console.log('once : ',socket.id);
    //    })

    let listener = () => {
        console.log('off propertry');
    }

    socket.on('off', listener)

    socket.on('setoff', () => {
        console.log('set off is called');
        socket.off("off", listener)
    })

    socket.on("details", () => {
        console.log('empty');
    })

    socket.on("details", (data) => {
        console.log('with data');
    })

    // let listener1=('onAny',data)=>{

    // }

    // socket.onAny(listener1);

    // console.log('socket rooms : ',socket.rooms);

});

// 80','192.1xx.x.x59'
server.listen('8989', () => {
    console.log('server is listing');
})

function diff(x, y) {

    console.log(typeof x,'len : ',x.length);
    console.log(typeof y);

    let timtaken = "";
    let t1;
    let t2;
    
    



    // if (x.charAt(1) == ':') {
    //     t1 += parseInt(x.substring(0, 1)) * 60 * 60

    //     t1 += parseInt(x.substring(2, 4)) * 60 + parseInt(x.substring(5, x.length))
    // }
    // else {
    //     t1 += parseInt(x.substring(0, 2)) * 60 * 60

    //     t1 += parseInt(x.substring(3, 5)) * 60 + NuparseIntmber(x.substring(6, x.length))
    // }


    // if (y.charAt(1) == ':') {
    //     t2 += parseInt(y.substring(0, 1)) * 60 * 60

    //     t2 += parseInt(y.substring(2, 4)) * 60 + parseInt(y.substring(5, y.length))
    // }
    // else {
    //     t2 += parseInt(y.substring(0, 2)) * 60 * 60

    //     t2 += parseInt(y.substring(3, 5)) * 60 + parseInt(y.substring(6, y.length))
    // }



    // console.log(t1);
    // console.log(t2);

    return timtaken;
}


