import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Login from './Login';
import Register from './Register';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='wrapper'>
        <div className="auth-container">
            <ButtonGroup className='auth-btn-group'>
                <Button 
                    onClick={() => setIsLogin(true)} 
                    variant={isLogin ? "light" : "primary"}
                >
                    SIGN IN
                </Button>
                <Button 
                    onClick={() => setIsLogin(false)} 
                    variant={isLogin ? "primary" : "light"}
                >
                    SIGN UP
                </Button>
            </ButtonGroup>
            {isLogin ?
                <Login />
                :
                <Register />
            }
        </div>
    </div>
  )
}

export default Auth