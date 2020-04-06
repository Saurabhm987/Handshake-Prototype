import React, { useEffect, useState, useReducer } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string';
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages'
import Sidebar from '../sidebar/Sidebar'
import './Chat.css'

let socket;
let room = 'handshake'

const Chat = ({ location }) => {
    const ENDPOINT = 'localhost:3001'
    const[name, setName] = useState('');
    const[message, setMessage] = useState(' ')
    const [messages, setMessages] = useState( [] )
    const[recieverName, setReciverName] = useState('')

    useEffect( ()=>{
        const {name} = queryString.parse(location.search);
        setName(name);
        socket = io(ENDPOINT)
        socket.emit('USER_CONNECT', { name , room}, (error) => {
            if(error){
                console.log("error: ", error);
            }
        } )

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect ( ()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

const handleClick = (e) =>{
    e.preventDefault()
    setReciverName(e.currentTarget.dataset.div_id)
}

const SEND_MESSAGE = (event) => {
    event.preventDefault()
    if(message) {
        const reciever = recieverName
        const sender = name
        socket.emit('SEND_MESSAGE',{ message, reciever, sender}, ()=> setMessage(''))
    }
}

console.log("message: ", message)
console.log("messages: ", messages)
console.log(`reciever_name: ${recieverName} `);

const sidebar = (
    <div className='col-md-7'>
            <InfoBar name={name} />
            <Messages messages={messages} name={name} />
            <Input message= {message} setMessage={setMessage}  SEND_MESSAGE={SEND_MESSAGE}/>
    </div>
)

const chatPlaceholder = (
    <div class="ui card" style={{width:"90%"}}>
            <div class="content">
                <div class="ui placeholder">
                    <div class="header">
                    <div class="line"></div>
                    </div>
                </div>
            </div>
            <div class="image">
                <div class="ui placeholder">
                    <div class="square image"></div>
                </div>
            </div>
            <div class="extra content">
                <div class="ui disabled input">
                    <input style={{width:"100%"}} type="Type Something...." placeholder="Search..."/>
                    <div class="ui disabled primary button">Send</div>
                </div>
            </div>
    </div>
)


if(recieverName.length !== 0 ){
    console.log("reciever available")
    console.log("size: ", recieverName.length)
    return (
            <div className='row'>
                <div className='col-md-4'>
                    <Sidebar handleClick ={handleClick}/>
                </div>
                {sidebar}
            </div>
    )
}else{
    console.log("reciever is not ava")
    return(
        <div className="row">
            <div className='col-md-4'>
                <Sidebar handleClick={handleClick}/>
            </div>
            <div className='col-md-8'>
                {chatPlaceholder}
            </div>
        </div>
    )
}
}

export default Chat;