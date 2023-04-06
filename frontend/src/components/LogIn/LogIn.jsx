import { useContext, useState } from 'react';
import ServerContext from '../../utils/ServerContext';

import {
  Button,
  ContentBox,
  TextField,
} from '../Common';
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
      <ContentBox>
        <h1>
          Log In
        </h1>
        {inlineError}
        <form>
          <TextField
            label="Username:"
            id="login_username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password:"
            id="login_password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="filled" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
        <Button onClick={() => { setNewUser(true); }}>
          Sign Up
        </Button>
      </ContentBox>
    </div>
  );
}

export default LogIn;
