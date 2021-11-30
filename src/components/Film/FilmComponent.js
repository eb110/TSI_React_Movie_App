import React, { useEffect, useState } from 'react';

import FilmTodo from './FilmTodo';

function FilmComponent(props) {

    const [films, setFilms] = useState([]);
    const [filmUrl, setFilmUrl] = useState(`${props.url}/film/getAll`)
    const [isLoading, setIsLoading] = useState(true);
    let filmIndex = 0;

    useEffect(() => {
        const myFetch = async () => {
            setIsLoading(true);
            const response = await fetch(`${filmUrl}`);
            const responseParsed = await response.json();
            setIsLoading(false);
            setFilms(responseParsed);
        }
        myFetch();
    }, [filmUrl])

    console.log(films);

    if (isLoading)
        return <p> Loading...</p>

    return (
        <div>
            <div>
                <br></br>
            </div>
            <div className="film">
                {films.map((film) => (
                    <FilmTodo
                        url={props.url}
                        key={'f' + filmIndex++}
                        filmTodo={film}
                    />
                ))}
            </div>
        </div>
    );
}

export default FilmComponent;