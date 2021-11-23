import React, { useEffect, useState } from 'react';

import DirectorTodo from './DirectorTodo';

function DirectorComponent(props) {

    const [directors, setDirectors] = useState([]);
    const [directorUrl, setDirectorUrl] = useState(`${props.url}/director/getAll`)
    const [isLoading, setIsLoading] = useState(true);
    let directorIndex = 0;

    useEffect(() => {
        const myFetch = async () => {
            setIsLoading(true);
            const response = await fetch(`${directorUrl}`);
            const responseParsed = await response.json();
            setIsLoading(false);
            setDirectors(responseParsed);
        }
        myFetch();
    }, [directorUrl])

    console.log(directors);

    if (isLoading)
        return <p> Loading...</p>

    return (
        <div className="director">
            {directors.map((director) => (
                <DirectorTodo
                    url={props.url}
                    key={'d' + directorIndex++}
                    directorTodo={director}
                />
            ))}
        </div>
    );
}

export default DirectorComponent;