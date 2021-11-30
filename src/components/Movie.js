import React, { useState } from 'react';

import ActorComponent from './Actor/ActorComponent';
import FilmComponent from './Film/FilmComponent';
import DirectorComponent from './Director/DirectorComponent';

function Movie(props) {

    const [actorState, setActorState] = useState(false);
    const [filmState, setFilmState] = useState(false);
    const [directorState, setDirectorState] = useState(false);

    //const url = "http://ec2-54-91-153-186.compute-1.amazonaws.com:8080/";
    const url = "http://localhost:8080/";
    // docker
    //const url = "http://localhost:8000/";

    const initContentComponent = (index) => {
        if (index === 0) {
            setFilmState(false);
            setDirectorState(false);
            setActorState(true);
        }
        else if (index === 1) {
            setFilmState(true);
            setDirectorState(false);
            setActorState(false);
        }
        else if (index === 2) {
            setFilmState(false);
            setDirectorState(true);
            setActorState(false);
        }
    }

    return (
        <div>
            <div className="MovieButtons">

                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Filmnet</a>
                    <button
                        className="movieButton"
                        onClick={() => initContentComponent(1)}>
                        Films
                    </button>
                    <button
                        className="movieButton"
                        onClick={() => initContentComponent(0)}>
                        Actors
                    </button>
                    <button
                        className="movieButton"
                        onClick={() => initContentComponent(2)}>
                        Directors
                    </button>
                </nav>

                <div className="contentComponent">
                    {actorState && <ActorComponent
                        url={url}
                    />}
                    {filmState && <FilmComponent
                        url={url}
                    />}
                    {directorState && <DirectorComponent
                        url={url}
                    />}
                </div>
            </div>
        </div>
        
    );
}

export default Movie;