import { useContext, useState } from 'react';
import ServerContext from '../../utils/ServerContext';
import {
  Button,
  ContentBox,
  TextField,
} from '../Common';
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
      <ContentBox>
        <h1>
          Sign Up
        </h1>
        {inlineError}
        <form>
          <TextField
            label="Username:"
            id="signup_username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password:"
            id="signup_password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="filled" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </ContentBox>
    </div>
  );
}

export default LogIn;
