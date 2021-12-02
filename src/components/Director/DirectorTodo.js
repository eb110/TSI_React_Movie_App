import React, { useState } from 'react';

import DirectorFeedback from './DirectorFeedback';

function DirectorTodo(props) {

    const directorTodo = props.directorTodo;
    const { id, name, surname, nationality, dob, directorFeedbackList } = directorTodo;

    let dobR = dob.substring(0, dob.indexOf('T'));
    let directorFeedbackIndex = 0;
    let putId = 0;

    const [directorFeedbackListTemp, setDirectorFeedbackListTemp] = useState(directorFeedbackList.slice());
    const [showDirectorFeedbacks, setShowDirectorFeedbacks] = useState(false);
    const [newFeedbackState, setNewFeedbackState] = useState(false);
    const [inputFeedbackState, setInputFeedbackState] = useState({ inputFeedback: '', error: null, idFedb: 0 });
    const [updateFeedback, setUpdateFeedback] = useState(false);

    const initDirectorFeedback = () => {
        setShowDirectorFeedbacks(!showDirectorFeedbacks);
        setUpdateFeedback(false);
        setNewFeedbackState(false);
    }

    const newFeedbackStateUpdate = () => {
        setInputFeedbackState({
            ...inputFeedbackState,
            error: null
        });
        if (updateFeedback) {
            return;
        }
        setNewFeedbackState(!newFeedbackState);
    }

    const updateFeedbackInit = () => {
        setUpdateFeedback(!updateFeedback);
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputFeedbackState({
            ...inputFeedbackState,
            inputFeedback: value
        });
    }

    const handleDeleteFeedback = async (idDelete) => {
        setInputFeedbackState({
            ...inputFeedbackState,
            error: null
        });
        setUpdateFeedback(false);
        setNewFeedbackState(false);
        await fetch(`${props.url}/directorFeedback/deleteById/${idDelete}`, { method: 'DELETE' });
        updateFeedbacks();
    }

    //button Update
    const handleUpdateInit = async () => {
        if (!inputFeedbackState.inputFeedback) {
            setInputFeedbackState({
                error: "empty feedback value"
            });
            return;
        }
        let newFedb = {
            feedback: inputFeedbackState.inputFeedback,
            idDirector: id,
            idUser: 1
        }
        putId = inputFeedbackState.idFedb

        await fetch(`${props.url}/directorFeedback/add/${putId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFedb)
        });
        updateFeedbacks();
    }

    const handleNewInput = async () => {
        if (!inputFeedbackState.inputFeedback) {
            setInputFeedbackState({
                error: "empty feedback value"
            });
            return;
        }
        let newFedb = {
            feedback: inputFeedbackState.inputFeedback,
            idDirector: id,
            idUser: 1
        }
        await fetch(`${props.url}/directorFeedback/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFedb)
        });
        updateFeedbacks();
    }

    const updateFeedbacks = async () => {
        let tempfedb = await fetch(`${props.url}/directorFeedback/getAll`)
            .then((res) => res.json()).then((data) => data.filter((director) => director.idDirector === id));
        setDirectorFeedbackListTemp(tempfedb);
    }

    //update confirm button from Director todo
    const handleUpdateFdb = async (idUpdate, feedback) => {
        putId = idUpdate;
        setInputFeedbackState({
            ...inputFeedbackState,
            inputFeedback: feedback,
            error: null,
            idFedb: idUpdate
        });
        setNewFeedbackState(false);
        updateFeedbackInit();
    }

    const { error } = inputFeedbackState;

    return (
        <div className="directorTodo">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="card border-primary w-100">
                                <div>
                                    <img src={props.picture} alt="fireSpot" />
                                </div>
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
                                        DOB: {dobR}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>

            <div>
                {error && <p>{error}</p>}
                <button
                    className="directorFeedbackButtonShow btn btn-outline-info"
                    onClick={() => initDirectorFeedback()}
                >
                    Show Feedback
                </button>
                <button
                    className="directorFeedbackAddFeedbackButton btn btn-outline-secondary"
                    onClick={() => newFeedbackStateUpdate()}
                >
                    Add Feedback
                </button>
            </div>

            {newFeedbackState &&
                <div>
                    <input
                        className="inputDirectorFeedback btn btn-outline-info "
                        placeholder="Type the feedback..."
                        value={inputFeedbackState.inputFeedback}
                        onChange={handleInputChange}
                    />
                    <button
                        className="directorFeedbackAddButton btn btn-outline-info"
                        onClick={handleNewInput}
                    >
                        Add
                    </button>
                </div>}

            {updateFeedback &&
                <div>
                    <input
                        className="updateDirectorFeedback btn btn-outline-info "
                        placeholder={inputFeedbackState.inputFeedback}
                        value={inputFeedbackState.inputFeedback}
                        onChange={handleInputChange}
                    />
                    <button
                        className="updateFeedbackAddButton btn btn-outline-info"
                        onClick={handleUpdateInit}
                    >
                        Update
                    </button>
                </div>}

            {showDirectorFeedbacks &&
                <div>
                    {directorFeedbackListTemp.map((directorFeedback) => (
                        <DirectorFeedback
                            url={props.url}
                            key={'ff' + directorFeedbackIndex++}
                            directorFeedback={directorFeedback}
                            handleCloseFeedback={handleDeleteFeedback}
                            handleUpdateFeedback={handleUpdateFdb}
                        />
                    ))}
                </div>}

            <hr></hr>
        </div>

    );
}

export default DirectorTodo;