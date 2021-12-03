Project Author: Wladyslaw Figura
Company: The Software Institute
Date: October 2021

Movie FrontEnd application

# Index

Index is the core html file, it consist Bootstrap script and access to the main Movie.js component

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <title>React App</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

Movie.js
This is the core of the application layout. Content is dynamically updated according to users actions. It consist navbar and access placeholder for user actions.

# Movie.js template

```
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

  //UI main buttons

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
```

# Actor structure

Actor, Director and Film consist similar functionality. Because of that only Actor component will be described.

# ActorComponent

Recreation of actors takes a place there.
Actors are createad according to the data base recreated list of actors.

DB fetch process:

```
 const myFetch = async () => {
            setIsLoading(true);
            const response = await fetch(`${actorUrl}`);
            const responseParsed = await response.json();
            setIsLoading(false);
            setActors(responseParsed);
        }
```

Actors list distribution process

```
    <div className="actor">
                {actors.map((actor) => (
                    <ActorTodo
                        url={props.url}
                        key={'a' + actorIndex++}
                        actorTodo={actor}
                        picture={pict[pictIndex++]}
                    />
                ))}
            </div>
```

# Actor Todo

Actor Todo is a single presentation of the actor. Total number of ActorTodo instances depends on the total number of database actor records.

GET

```
   const updateFeedbacks = async () => {
        let tempfedb = await fetch(`${props.url}/actorFeedback/getAll`)
            .then((res) => res.json()).then((data) => data.filter((actor) => actor.idActor === id));
        console.log(tempfedb);
        setActorFeedbackListTemp(tempfedb);
    }
```

POST

```
    const handleNewInput = async () => {
        if (!inputFeedbackState.inputFeedback) {
            setInputFeedbackState({
                error: "empty feedback value"
            });
            return;
        }
        let newFedb = {
            feedback: inputFeedbackState.inputFeedback,
            idActor: id,
            idUser: 1
        }
        await fetch(`${props.url}/actorFeedback/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFedb)
        });
        updateFeedbacks();
    }
```

PUT

```
    const handleUpdateInit = async () => {
        if (!inputFeedbackState.inputFeedback) {
            console.log("empty" + inputFeedbackState.inputFeedback);
            setInputFeedbackState({
                error: "empty feedback value"
            });
            return;
        }
        let newFedb = {
            feedback: inputFeedbackState.inputFeedback,
            idActor: id,
            idUser: 1
        }
        putId = inputFeedbackState.idFedb
        console.log(newFedb)
        console.log(putId)
        console.log(props)

        await fetch(`${props.url}/actorFeedback/add/${putId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFedb)
        });
        updateFeedbacks();
    }
```

DELETE

```
    //delete functionality
    const handleDeleteFeedback = async (idDelete) => {
        setInputFeedbackState({
            ...inputFeedbackState,
            error: null
        });
        setUpdateFeedback(false);
        setNewFeedbackState(false);
        await fetch(`${props.url}/actorFeedback/deleteById/${idDelete}`, { method: 'DELETE' });
        updateFeedbacks();
    }
```

# ActorFeedback

ActorFeedback provides the UI for individual feedback operations

Recreation of a single feedback based on its id

```
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
```

# Yarn workaround operations

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
