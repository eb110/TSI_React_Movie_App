import React, { useEffect, useState } from 'react';

import ActorTodo from './ActorTodo';

function ActorComponent(props) {

    const [actors, setActors] = useState([]);
    const [actorUrl, setActorUrl] = useState(`${props.url}/actor/getAll`)
    const [isLoading, setIsLoading] = useState(true);
    let actorIndex = 0;

    useEffect(() => {
        const myFetch = async () => {
            setIsLoading(true);
            const response = await fetch(`${actorUrl}`);
            const responseParsed = await response.json();
            setIsLoading(false);
            setActors(responseParsed);
        }
        myFetch();
    }, [actorUrl])

    if (isLoading)
        return <p> Loading...</p>

    return (
        <div>
            <div>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <div className="actor">
                {actors.map((actor) => (
                    <ActorTodo
                        url={props.url}
                        key={'a' + actorIndex++}
                        actorTodo={actor}
                    />
                ))}
            </div>      
        </div>
    );
}

export default ActorComponent;