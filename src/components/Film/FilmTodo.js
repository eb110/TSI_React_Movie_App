import React from 'react';
function FilmTodo(props) {

    let filmTitle = props.filmTodo.title;

    return (
        <div className="filmTodo">
            <div className="filmTitle">
                {filmTitle}
            </div>
            <hr></hr>
        </div>
    );
}

export default FilmTodo;