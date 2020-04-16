import React from 'react';

import './Input.css';

const Input = ({ setMessage, SEND_MESSAGE, message }) => (
  <form className="inputform">
    <input
      className="inputField"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? SEND_MESSAGE(event) : null}
    />
    <button className="sendButton" onClick={e => SEND_MESSAGE(e)}>Send</button>
  </form>
)

export default Input;