/*
Project Author: Wladyslaw Figura
Company: The Software Institute
Date: October 2021
*/

import React, { useEffect, useState } from 'react';
import '../../Styles/Film/FilmFeedback.css';

function FilmFeedback(props) {

    const { id, feedback, idUser } = props.filmFeedback;

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
                <h5>"{feedback}"</h5>

            </div>
            <div>
                <p class="lead">
                    User: {user.userName} &nbsp; Email: {user.email}
                </p>
            </div>
            <div>
                {/* <br></br> */}
                <button
                    className="filmFeedDeleteButton btn btn-outline-danger"
                    onClick={() => props.handleCloseFeedback(id)}
                >
                    Delete
                </button>
                <button className="btn btn-outline-warning"
                    onClick={() => props.handleUpdateFeedback(id, feedback)}
                >
                    Update Feedback
                </button>
            </div>
        </div>
    );
}

export default FilmFeedback;