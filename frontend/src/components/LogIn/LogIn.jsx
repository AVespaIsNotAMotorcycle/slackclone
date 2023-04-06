import { useContext, useState } from 'react';
import ServerContext from '../../utils/ServerContext';
import SignUp from '../SignUp';
import './LogIn.css';

function LogIn() {
  const { login } = useContext(ServerContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState(false);

  const handleSubmit = () => {
    login(username, password)
      .then(() => {})
      .catch(() => { setError('Could not log in'); });
  };

  const inlineError = (error
    ? <div className="inline-error">{error}</div>
    : null
  );
  if (newUser) return <SignUp />;
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
      <button type="button" onClick={() => { setNewUser(true); }}>
        Sign Up
      </button>
    </div>
  );
}

export default LogIn;
