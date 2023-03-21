import { useContext, useState } from 'react';
import ServerContext from '../../utils/ServerContext';
import './LogIn.css';

function LogIn() {
  const { login } = useContext(ServerContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    login(username, password)
      .then(() => {})
      .catch(() => { setError('Could not log in'); });
  };

  const inlineError = (error
    ? <div className="inline-error">{error}</div>
    : null
  );
  return (
    <div className="login-outer">
      <div className="login-inner">
        <h1>
          Log In
        </h1>
        {inlineError}
        <label for="username_input">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="password_input">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default LogIn;
