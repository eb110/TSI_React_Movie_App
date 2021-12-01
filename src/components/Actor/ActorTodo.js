import React, { useEffect, useState } from 'react';

import ActorFeedback from './ActorFeedback';
import '../../Styles/Actor/ActorTodo.css';

function ActorTodo(props) {

    const actorTodo = props.actorTodo;
    const { id, name, surname, nationality, dob, actorFeedbackList } = actorTodo;
    let dobTemp = dob.substring(0, dob.indexOf('T'));
    let actorFeedbackIndex = 0;
    let putId = 0;

    const [actorFeedbackListTemp, setActorFeedbackListTemp] = useState(actorFeedbackList.slice());
    const [showActorFeedbacks, setShowActorFeedbacks] = useState(false);
    const [newFeedbackState, setNewFeedbackState] = useState(false);
    const [inputFeedbackState, setInputFeedbackState] = useState({ inputFeedback: '', error: null, idFedb: 0 });
    const [updateFeedback, setUpdateFeedback] = useState(false);

    const initActorFeedback = () => {
        setShowActorFeedbacks(!showActorFeedbacks);
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
        await fetch(`${props.url}/actorFeedback/deleteById/${idDelete}`, { method: 'DELETE' });
        updateFeedbacks();
    }

    //button Update
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

    const updateFeedbacks = async () => {
        let tempfedb = await fetch(`${props.url}/actorFeedback/getAll`)
            .then((res) => res.json()).then((data) => data.filter((actor) => actor.idActor === id));
        console.log(tempfedb);
        setActorFeedbackListTemp(tempfedb);
    }

    //update confirm button from actor todo
    const handleUpdateFdb = async (idUpdate, feedback) => {
        putId = idUpdate;
        console.log(putId)
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
        <div className="actorTodo">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="card border-primary w-100">
                                <div className="actorName">
                                    <h5>
                                        Name: {name} {surname}
                                    </h5>
                                </div>
                                <div className="actorNationality">
                                    <h5>
                                        Nationality: {nationality}
                                    </h5>
                                </div>
                                <div className="actorDOB">
                                    <h5>
                                        DOB: {dobTemp}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
                <div className="col-lg-4">
                    
                </div>
            </div>

            <div>
                {error && <p>{error}</p>}
                <button
                    className="actorFeedbackButtonShow btn btn-outline-info"
                    onClick={() => initActorFeedback()}
                >
                    Show Feedback
                </button>
                <button
                    className="actorFeedbackAddFeedbackButton btn btn-outline-secondary"
                    onClick={() => newFeedbackStateUpdate()}
                >
                    Add Feedback
                </button>
            </div>

            {newFeedbackState &&
                <div>
                    <input
                        className="inputActorFeedback btn btn-outline-info "
                        placeholder="Type the feedback..."
                        value={inputFeedbackState.inputFeedback}
                        onChange={handleInputChange}
                    />
                    <button
                        className="actorFeedbackAddButton btn btn-outline-info"
                        onClick={handleNewInput}
                    >
                        Add
                    </button>
                </div>}

            {updateFeedback &&
                <div>
                    <input
                        className="updateActorFeedback btn btn-outline-info "
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

            {showActorFeedbacks &&
                <div>
                    {actorFeedbackListTemp.map((actorFeedback) => (
                        <ActorFeedback
                            url={props.url}
                            key={'af' + actorFeedbackIndex++}
                            actorFeedback={actorFeedback}
                            handleCloseFeedback={handleDeleteFeedback}
                            handleUpdateFeedback={handleUpdateFdb}
                        />
                    ))}
                </div>}

            <hr></hr>
        </div>
    );
}

export default ActorTodo;