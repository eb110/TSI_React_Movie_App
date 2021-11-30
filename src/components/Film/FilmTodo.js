import React from 'react';
function FilmTodo(props) {

    let filmTitle = props.filmTodo.title;

    return (
        <div className="filmTodo">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="card border-primary w-100">
                                <div className="actorName">
                                    <h5>
                                        Title: {filmTitle}
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

export default FilmTodo;