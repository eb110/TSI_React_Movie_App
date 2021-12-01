import React, { useEffect, useState } from 'react';
import bale from '../../img/bale.JPG';
import brando from '../../img/brando.JPG';
import nicholson from '../../img/nicholson.JPG';
import robbins from '../../img/robbins.JPG';
import travolta from '../../img/travolta.JPG';

import ActorTodo from './ActorTodo';

function ActorComponent(props) {

    const pict = [brando, robbins, bale, travolta, nicholson]
    let pictIndex = 0;
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
            </div>
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
        </div>
    );
}

export default ActorComponent;