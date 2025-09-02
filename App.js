import React, { useState } from 'react';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [response, setResponse] = useState('');

  const handleGetRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get_message?param=${encodeURIComponent(input1)}`);
      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('请求失败: ' + error.message);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/post_message?param=${encodeURIComponent(input3)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bodyParam: input2
        })
      });
      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('请求失败: ' + error.message);
    }
  };

  return (
    <div className="app">
      <h1>React + Flask 前后端联调示例</h1>
      
      <div className="input-group">
        <label>GET参数输入框:</label>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="输入GET参数"
        />
        <button onClick={handleGetRequest}>发送GET请求</button>
      </div>

      <div className="input-group">
        <label>POST Body参数:</label>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="输入POST Body参数"
        />
      </div>

      <div className="input-group">
        <label>POST URL参数:</label>
        <input
          type="text"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          placeholder="输入POST URL参数"
        />
        <button onClick={handlePostRequest}>发送POST请求</button>
      </div>

      <div className="response">
        <h3>后端响应:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
