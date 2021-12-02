import React, { useState } from 'react';

import FilmFeedback from "./FilmFeedback";
import "../../Styles/Film/FilmTodo.css";

function FilmTodo(props) {
    const filmTodo = props.filmTodo;
    const { id, title, description, length, rating, filmFeedbackList } = filmTodo;
    let filmFeedbackIndex = 0;
    let putId = 0;

    const [filmFeedbackListTemp, setFilmFeedbackListTemp] = useState(
        filmFeedbackList.slice()
    );
    const [showFilmFeedbacks, setShowFilmFeedbacks] = useState(false);
    const [newFeedbackState, setNewFeedbackState] = useState(false);
    const [inputFeedbackState, setInputFeedbackState] = useState({
        inputFeedback: "",
        error: null,
        idFedb: 0,
    });
    const [updateFeedback, setUpdateFeedback] = useState(false);

    const initFilmFeedback = () => {
        setShowFilmFeedbacks(!showFilmFeedbacks);
        setUpdateFeedback(false);
        setNewFeedbackState(false);
    };

    const newFeedbackStateUpdate = () => {
        setInputFeedbackState({
            ...inputFeedbackState,
            error: null,
        });
        if (updateFeedback) {
            return;
        }
        setNewFeedbackState(!newFeedbackState);
    };

    const updateFeedbackInit = () => {
        setUpdateFeedback(!updateFeedback);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputFeedbackState({
            ...inputFeedbackState,
            inputFeedback: value,
        });
    };

    const handleDeleteFeedback = async (idDelete) => {
        setInputFeedbackState({
            ...inputFeedbackState,
            error: null,
        });
        setUpdateFeedback(false);
        setNewFeedbackState(false);
        await fetch(`${props.url}/filmFeedback/deleteById/${idDelete}`, {
            method: "DELETE",
        });
        updateFeedbacks();
    };

    //button Update
    const handleUpdateInit = async () => {
        if (!inputFeedbackState.inputFeedback) {
            console.log("empty" + inputFeedbackState.inputFeedback);
            setInputFeedbackState({
                error: "empty feedback value",
            });
            return;
        }
        let newFedb = {
            feedback: inputFeedbackState.inputFeedback,
            idFilm: id,
            idUser: 1,
        };
        putId = inputFeedbackState.idFedb;

        await fetch(`${props.url}/filmFeedback/add/${putId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFedb),
        });
        updateFeedbacks();
    };

    const handleNewInput = async () => {
        if (!inputFeedbackState.inputFeedback) {
            setInputFeedbackState({
                error: "empty feedback value",
            });
            return;
        }
        let newFedb = {
            feedback: inputFeedbackState.inputFeedback,
            idFilm: id,
            idUser: 1,
        };
        await fetch(`${props.url}/filmFeedback/add`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFedb),
        });
        updateFeedbacks();
    };

    const updateFeedbacks = async () => {
        let tempfedb = await fetch(`${props.url}/filmFeedback/getAll`)
            .then((res) => res.json())
            .then((data) => data.filter((film) => film.idFilm === id));
        setFilmFeedbackListTemp(tempfedb);
    };

    //update confirm button from film todo
    const handleUpdateFdb = async (idUpdate, feedback) => {
        putId = idUpdate;
        setInputFeedbackState({
            ...inputFeedbackState,
            inputFeedback: feedback,
            error: null,
            idFedb: idUpdate,
        });
        setNewFeedbackState(false);
        updateFeedbackInit();
    };

    const { error } = inputFeedbackState;

    return (
        <div className="filmTodo">
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
                                <div className="filmName">
                                    <h5>Title: {title}</h5>
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
                    className="filmFeedbackButtonShow btn btn-outline-info"
                    onClick={() => initFilmFeedback()}
                >
                    Show Feedback
                </button>
                <button
                    className="filmFeedbackAddFeedbackButton btn btn-outline-secondary"
                    onClick={() => newFeedbackStateUpdate()}
                >
                    Add Feedback
                </button>
            </div>

            {newFeedbackState && (
                <div>
                    <input
                        className="inputFilmFeedback btn btn-outline-info "
                        placeholder="Type the feedback..."
                        value={inputFeedbackState.inputFeedback}
                        onChange={handleInputChange}
                    />
                    <button
                        className="filmFeedbackAddButton btn btn-outline-info"
                        onClick={handleNewInput}
                    >
                        Add
                    </button>
                </div>
            )}

            {updateFeedback && (
                <div>
                    <input
                        className="updateFilmFeedback btn btn-outline-info "
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
                </div>
            )}

            {showFilmFeedbacks && (
                <div>
                    {filmFeedbackListTemp.map((filmFeedback) => (
                        <FilmFeedback
                            url={props.url}
                            key={"ff" + filmFeedbackIndex++}
                            filmFeedback={filmFeedback}
                            handleCloseFeedback={handleDeleteFeedback}
                            handleUpdateFeedback={handleUpdateFdb}
                        />
                    ))}
                </div>
            )}

            <hr></hr>
        </div>
    );
}

export default FilmTodo;
