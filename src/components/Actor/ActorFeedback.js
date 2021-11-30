import React, { useEffect, useState } from 'react';
import '../../Styles/Actor/ActorFeedback.css';

function ActorFeedback(props) {

    const { id, feedback, idUser } = props.actorFeedback;

    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const myFetch = async () => {
            setIsLoading(true);
            const response = await fetch(`${props.url}/user/getById/${idUser}`)
            const responseParsed = await response.json();
            setIsLoading(false);
            setUser(responseParsed)
        }
        myFetch();
    }, [props.url])

    if (isLoading)
        return <p> Loading...</p>

    return (
        <div>
            <div>
                <br></br>
                <h6>"{feedback}"</h6>

            </div>
            <div>
                User: {user.userName}&nbsp;    Email: {user.email}
            </div>
            <div>
                <button
                    className="actorFeedDeleteButton btn btn-outline-danger"
                    onClick={() => props.handleCloseFeedback(id)}
                >
                    Delete
                </button>
                <button className="btn btn-outline-warning">
                    onClick={() => props.handleUpdateFeedback(id)}
                    Update
                </button>
            </div>
        </div>
    );
}

export default ActorFeedback;