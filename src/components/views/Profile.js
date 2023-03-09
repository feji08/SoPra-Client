import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import User from 'models/User';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import { Button } from 'components/ui/Button';
import 'styles/views/Profile.scss';
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';


const UserAttribute = props => {
    return (
        <div className="user attribute">
            <label className="attribute label">
                {props.label}:
            </label>
            <span className="attribute value">
                {props.value}
            </span>
        </div>
    );
};

UserAttribute.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
};


const Profile = props => {
    const history = useHistory();
    // userId from router
    const { userId } = useParams();
    const [localUserId, setLocalUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch localuser's information by token
        async function fetchLocalUser() {

            try {

                const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
                const response = await api.post(`/users/localUser`, requestBody);

                // Get the returned user and update a new object.
                setLocalUserId(response.data.id.toString());

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

    const isMyProfile = localUserId === userId ? true : false;

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchUser() {

            try {


                const response = await api.get(`/users/${userId}`);

                // Get the returned user and update a new object.
                const newUser = new User(response.data);
                setUser(newUser);

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

        fetchUser();
    }, []);


    return user && (
        <BaseContainer>
            <div className="profile text">
                <h2>user {user.username}'s profile</h2>
            </div>
            <div className="profile container">
                <div className="user attribute">
                    <UserAttribute
                        label="username"
                        value={user.username}
                    />
                    <UserAttribute
                        label="status"
                        value={user.status}
                    />
                    <UserAttribute
                        label="creation date"
                        value={user.creationDate}
                    />
                    <UserAttribute
                        label="birthday date"
                        value={user.birthday}
                    />
                </div>
                <div className="register button-container">
                    <Button className="view userlist"
                        onClick={() => history.push(`/game`)}
                    >
                        userlist
                    </Button>
                    <Button className="edit profile"
                        style={{ display: isMyProfile ? "block" : "none" }}
                        onClick={() => history.push(`/profile/edit`)}
                    >
                        edit
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Profile;