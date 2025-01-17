import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import store from '../store';
import receiveMessage, { deleteMessage } from '../reducer/messages';
import { nanoid } from 'nanoid';
// import nanoid from 'nanoid'

//once we start having usernames/nicknames this needs
//to be updated for username: message

export const Chat = (props) => {
  const { messages, enableOutline } = props;
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);

  //  useEffect(() => { //props.messages.length ?
  //   // document.querySelector('li') !== null ?
  //   //   // ? setTimeout(function () {
  //   //       removeMessage()
  //   //       //document.querySelector('li').remove();
  //   //       // setTimeOut(function () {
  //   //       //   removeMessage()
  //   //     // }, 1000)
  //   //   : null
  // });

  const sendMessage = () => {
    socket.emit('add_message', { message: message, id: nanoid() });
    setMessage('');
    document.getElementById('new-message').value = '';
    setTimeout(function () {
      removeMessage(message, store.getState().messages);
    }, 10000);
  };

  const onNameSubmit = () => {
    setIsNameSet(true);
    document.getElementById('new-message').value = '';
  };

  const messageList = store
    .getState()
    .messages.map((message, i) => <li key={i}>{message.message}</li>);

  const removeMessage = (message, id) => {
    socket.emit('remove_message', id);
  };

  return isNameSet ? (
    <div id="chat-box">
      <ul id="message-list">{messageList}</ul>
      <input
        className={enableOutline ? '' : 'no-outline-on-focus'}
        autoComplete="off"
        style={{ background: 'transparent', color: 'whitesmoke' }}
        id="new-message"
        onInput={(e) => {
          setMessage(`${name.toUpperCase()}: ` + e.target.value);
        }}
        onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
        placeholder="start chatting"
      ></input>
    </div>
  ) : (
    <div id="chat-box">
      <ul id="message-list">{messageList}</ul>
      <input
        className={enableOutline ? '' : 'no-outline-on-focus'}
        autoComplete="off"
        style={{ background: 'transparent', color: 'whitesmoke' }}
        id="new-message"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? onNameSubmit() : null)}
        placeholder="enter your nickname "
      ></input>
    </div>
  );
};

const mapStateToProps = (messages) => messages;

export default connect(mapStateToProps, null)(Chat);
