/*
Project Author: Wladyslaw Figura
Company: The Software Institute
Date: October 2021
*/

import React, { useState } from "react";

import ActorComponent from "./Actor/ActorComponent";
import FilmComponent from "./Film/FilmComponent";
import DirectorComponent from "./Director/DirectorComponent";

//Startin point of the application

function Movie(props) {
  const [actorState, setActorState] = useState(false);
  const [filmState, setFilmState] = useState(false);
  const [directorState, setDirectorState] = useState(false);

  const url = "http://ec2-18-232-112-89.compute-1.amazonaws.com:8080/";
  // const url = "http://localhost:8080/";
  // docker
  //const url = "http://localhost:8000/";


  //Descission making functionality according to user actions
  const initContentComponent = (index) => {
    if (index === 0) {
      setFilmState(false);
      setDirectorState(false);
      setActorState(true);
    } else if (index === 1) {
      setFilmState(true);
      setDirectorState(false);
      setActorState(false);
    } else if (index === 2) {
      setFilmState(false);
      setDirectorState(true);
      setActorState(false);
    } else if (index === 3) {
      setFilmState(false);
      setDirectorState(false);
      setActorState(false);
    }
  };

  //UI main buttons: Films, Actors, Directors

  return (
    <div>
      <div className="MovieButtons bg-light">
        <nav className="navbar fixed-top  navbar-dark bg-primary">
          <a className="navbar-brand text-large" href="#">
            <h2 className="text-light">&emsp;&emsp;Filmnet.</h2>
          </a>
          <a>
            <h5 className="text-warning"> The internet's <em> favourite </em> movie database</h5>
          </a>
          <button
            className="movieButton btn-primary btn-sm"
            onClick={() => initContentComponent(1)}
          >
            Films
          </button>
          <button
            className="movieButton btn-primary btn-sm"
            onClick={() => initContentComponent(0)}
          >
            Actors
          </button>

          <button
            className="movieButton btn-primary btn-sm"
            onClick={() => initContentComponent(2)}
          >
            Directors
          </button>
          <button
            className="movieButton btn-primary btn-sm"
            onClick={() => initContentComponent(3)}
          >
            Register
          </button>
          <button
            className="movieButton btn-primary btn-sm"
            onClick={() => initContentComponent(3)}
          >
            Log-in
          </button>
          <button
            className="movieButton btn-primary btn-sm"
            onClick={() => initContentComponent(3)}
          >
            Log-out
          </button>
        </nav>
        <div className="card bg-secondary">
          <div>&emsp;</div>
          <div>&emsp;</div>
          <div>&emsp;</div>
          <div>&emsp;</div>

        </div>
        <div className="contentComponent">
          {actorState && <ActorComponent url={url} />}
          {filmState && <FilmComponent url={url} />}
          {directorState && <DirectorComponent url={url} />}
        </div>

      </div>
    </div>
  );
}

export default Movie;
