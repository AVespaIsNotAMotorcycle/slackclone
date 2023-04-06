import { useContext, useState } from 'react';
import ServerContext from '../../utils/ServerContext';
import './SignUp.css';

function LogIn() {
  const { signup } = useContext(ServerContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    signup(username, password)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        const { status } = error.response;
        if (status >= 400 && status < 500) {
          setError('That username is already taken!');
        } else {
          setError('Something went wrong.');
        }
      });
  };

  const inlineError = (error
    ? <div className="inline-error">{error}</div>
    : null
  );
  return (
    <div className="login-outer">
      <div className="login-inner">
        <h1>
          Sign Up
        </h1>
        {inlineError}
        <div>
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
    </div>
  );
}

export default LogIn;
