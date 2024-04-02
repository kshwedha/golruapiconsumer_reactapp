import React, { useState } from 'react';
import './LRUCacheApp.css';
import styled from "styled-components";


const Button = styled.button`
  background-color: "#e91e63";
  color: black;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: "#ff1e23";
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;


function LRUCacheApp() {
    const [text, setText] = useState('');
    const [getText, setgetText] = useState('');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [expiry, setExpiry] = useState('');

    const [getKey, setgetKey] = useState('');

    const handleSet = () => {
        const payload = {
          key: Number(key),
          value: value,
          expiry: Number(expiry)
        };
        fetch(`http://127.0.0.1:8080/cache/set/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
              setText(JSON.stringify(data, null, 2))
              setTimeout(() => {
                setText("")
              }, 5000);
            });
        setKey('');
        setValue('');
        setExpiry('');
    };

    const handleGet = () => {
        fetch(`http://127.0.0.1:8080/cache/get/${getKey}`)
            .then(response => response.json())
            .then(data => {
              setgetText(JSON.stringify(data, null, 2))
              setTimeout(() => {
                setgetText("")
              }, 5000);
            });
        setgetKey('');
    };

    return (
      <div><h1>LRU Cache App</h1>
        <div className="container">
            <br></br>
            <div className="grid">

              <div className="setcache">
                <h2 className="header">Set Cache</h2>
                <div>
                    <h4 className="header"><label>Key:</label></h4>
                    <input type="text" value={key} onChange={e => setKey(e.target.value)} />
                </div>
                <div>
                    <h4 className="header"><label>Value:</label></h4>
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                </div>
                <div>
                    <h4 className="header"><label>Expiry:</label></h4>
                    <input type="text" value={expiry} onChange={e => setExpiry(e.target.value)} />
                </div>
                <Button onClick={handleSet}>Set</Button>
              </div>

              <div className="setcacheval">
              <textarea name="setcachedata" defaultValue={text} rows={4} cols={20} readOnly={true} isDisabled disableAutosize></textarea>
              </div>

              <div className="getcache">
                <h2 className="header">Get Cache</h2>
                <div>
                    <h4 className="header"><label>Key:</label></h4>
                    <input type="text" value={getKey} onChange={e => setgetKey(e.target.value)} />
                </div>
                <Button onClick={handleGet}>Get</Button>
              </div>

              <div className="getcacheval">
              <textarea name="getcachedata" defaultValue={getText} readOnly={true} isDisabled disableAutosize></textarea>
              </div>

            </div>
            </div>
        </div>
    );
}

export default LRUCacheApp;
