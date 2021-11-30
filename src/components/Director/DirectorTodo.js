import React from 'react';

function DirectorTodo(props) {

    let name = props.directorTodo.name;
    let surname = props.directorTodo.surname;
    let nationality = props.directorTodo.nationality;
    let dobRaw = props.directorTodo.dob;
    let dob = dobRaw.substring(0, dobRaw.indexOf('T'));

    return (
        <div className="directorTodo">
            <div className="directorName">
                {name} {surname}
            </div>
            {/* <div className="directorSurname">
                {surname}
            </div> */}
            <div className="directorNationality">
                {nationality}
            </div>
            <div className="directorDOB">
                {dob}
            </div>
            <hr></hr>
        </div>
    );
}

export default DirectorTodo;