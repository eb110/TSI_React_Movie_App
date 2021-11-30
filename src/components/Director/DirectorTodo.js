import React from 'react';

function DirectorTodo(props) {

    let name = props.directorTodo.name;
    let surname = props.directorTodo.surname;
    let nationality = props.directorTodo.nationality;
    let dobRaw = props.directorTodo.dob;
    let dob = dobRaw.substring(0, dobRaw.indexOf('T'));

    return (
        <div className="directorTodo">
            {/* <div className="directorName">
                {name} {surname}
            </div>
            <div className="directorNationality">
                {nationality}
            </div>
            <div className="directorDOB">
                {dob}
            </div>
            <hr></hr> */}
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="card border-primary w-100">
                                <div className="directorName">
                                    <h5>
                                        Name: {name} {surname}
                                    </h5>
                                </div>
                                <div className="directorNationality">
                                    <h5>
                                        Nationality: {nationality}
                                    </h5>
                                </div>
                                <div className="directorDOB">
                                    <h5>
                                        DOB: {dob}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <hr></hr>
        </div>
        
    );
}

export default DirectorTodo;