/*
Project Author: Wladyslaw Figura
Company: The Software Institute
Date: October 2021
*/

import React, { useEffect, useState } from 'react';
import darkKnight from '../../img/darkKnight.JPG';
import godfather from '../../img/godfather.JPG';
import pulpFiction from '../../img/pulpFiction.JPG';
import shawshank from '../../img/shawshank.JPG';
import shining from '../../img/shining.JPG';

import FilmTodo from './FilmTodo';

function FilmComponent(props) {

    const pict = [godfather, shawshank, darkKnight, pulpFiction, shining]
    let pictIndex = 0;
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
                        picture={pict[pictIndex++]}
                    />
                ))}
            </div>
        </div>
    );
}

export default FilmComponent;