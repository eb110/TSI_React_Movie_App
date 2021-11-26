import React, { useEffect, useState } from 'react';

import ActorFeedback from './ActorFeedback';

import '../../Styles/Actor/ActorTodo.css';

function ActorTodo(props) {

    const actorTodo = props.actorTodo;
    const { id, name, surname, nationality, dob, actorFeedbackList } = actorTodo;
    let dobTemp = dob.substring(0, dob.indexOf('T'));
    let actorFeedbackIndex = 0;

    const [actorFeedbackListTemp, setActorFeedbackListTemp] = useState(actorFeedbackList.slice());
    const [showActorFeedbacks, setShowActorFeedbacks] = useState(false);
    const [newFeedbackState, setNewFeedbackState] = useState(false);
    const [inputFeedbackState, setInputFeedbackState] = useState({ inputFeedback: '', error: null });

    const initActorFeedback = () => {
        setShowActorFeedbacks(!showActorFeedbacks);
    }

    const newFeedbackStateUpdate = () => {
        setNewFeedbackState(!newFeedbackState);
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputFeedbackState({
            ...inputFeedbackState,
            inputFeedback: value
        });
    }

    const handleDeleteFeedback = async (idDelete) => {
        await fetch(`${props.url}/actorFeedback/deleteById/${idDelete}`, { method: 'DELETE' });
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

    return (
        <div className="actorTodo">
            <div className="actorName">
                {name}
            </div>
            <div className="actorSurname">
                {surname}
            </div>
            <div className="actorNationality">
                {nationality}
            </div>
            <div className="actorDOB">
                {dobTemp}
            </div>
            <div>
                <button
                    className="actorFeedbackButtonShow"
                    onClick={() => initActorFeedback()}
                >
                    Show Feedbacks
                </button>
                <button
                    className="actorFeedbackAddFeedbackButton"
                    onClick={() => newFeedbackStateUpdate()}
                >
                    Add Feedback
                </button>
            </div>

            {newFeedbackState &&
                <div>
                    <input
                        className="inputActorFeedback"
                        placeholder="Type the feedback"
                        value={inputFeedbackState.inputFeedback}
                        onChange={handleInputChange}
                    />
                    <button
                        className="actorFeedbackAddButton"
                        onClick={handleNewInput}
                    >
                        Add
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
                        />
                    ))}
                </div>}

            <hr></hr>
        </div>
    );
}

export default ActorTodo;