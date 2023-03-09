import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/Register.scss';

const EditProfile = props => {
    const history = useHistory();
    const [localUserId, setLocalUserId] = useState(null);
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");
    const [oldUsername, setOldUsername] = useState(null);
    const [oldBirthday, setOldBirthday] = useState(null);

    useEffect(() => {
        // fetch localuser's information by token
        async function fetchLocalUser() {

            try {

                const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
                const response = await api.post(`/users/localUser`, requestBody);

                // Get the returned user and update a new object.
                setLocalUserId(response.data.id.toString());
                setOldUsername(response.data.username)
                setOldBirthday(response.data.birthday)

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchLocalUser();
    }, []);

    const submitUpdate = async () => {

        try {

            const requestBody = JSON.stringify({ username: username||oldUsername, birthday });
            const response = await api.put(`/users/${localUserId}`, requestBody);

            history.push(`/profile/${localUserId}`);
        } catch (error) {
            alert(`Something went wrong during the update: \n${handleError(error)}`);
        }

    }

    return (
        <BaseContainer>
            <div className="register container">
                <div className="profile form">
                    <label>Username</label>
                    <input
                        value={username}
                        placeholder={oldUsername}
                        onChange={un => setUsername(un.target.value)}
                    />
                    <label>Birthday</label>
                    <input
                        value={birthday}
                        placeholder={oldBirthday}
                        type="date"
                        onChange={un => setBirthday(un.target.value)}
                    />
                    <div className="register button-container">
                        <Button
                            disabled={!username & !birthday}
                            width="100%"
                            onClick={() => submitUpdate()}
                        >
                            Submit
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => history.push(`/profile/${localUserId}`)}
                        >
                            Cancel
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
export default EditProfile;