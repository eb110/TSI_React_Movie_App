/*
Project Author: Wladyslaw Figura
Company: The Software Institute
Date: October 2021
*/

import React, { useEffect, useState } from 'react';
import coppola from '../../img/coppola.JPG';
import kubrik from '../../img/kubrik.JPG';
import darabont from '../../img/darabont.JPG';
import nolan from '../../img/nolan.JPG';
import tarantino from '../../img/tarantino.JPG';

import DirectorTodo from './DirectorTodo';

function DirectorComponent(props) {

    const pict = [coppola, darabont, nolan, tarantino, kubrik]
    let pictIndex = 0;
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

    if (isLoading)
        return <p> Loading...</p>

    return (
        <div>
            <div>
                <br></br>
            </div>
            <div className="director">
                {directors.map((director) => (
                    <DirectorTodo
                        url={props.url}
                        key={'d' + directorIndex++}
                        directorTodo={director}
                        picture={pict[pictIndex++]}
                    />
                ))}
            </div>
        </div>
    );
}

export default DirectorComponent;