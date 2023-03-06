import React, { useState } from 'react';
import { api, handleError } from 'helpers/api';
import User from 'models/User';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import { FormField } from "components/views/Login";

const Register = props => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const doRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const requestBody = JSON.stringify({ username, password });
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            // if (!user.token) {alert("token is null!")}
            localStorage.setItem('token', user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the register: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="register container">
                <div className="register text">
                    <h4>Register here</h4>
                </div>
                <div className="register form">
                    <FormField
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        type="password"
                        onChange={n => setPassword(n)}
                    />
                    <FormField
                        label="Confirm Password"
                        value={confirmPassword}
                        type="password"
                        onChange={n => setConfirmPassword(n)}
                    />
                    <div className="register button-container">
                        <Button
                            disabled={!username || !password || !confirmPassword}
                            width="100%"
                            onClick={() => doRegister()}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;