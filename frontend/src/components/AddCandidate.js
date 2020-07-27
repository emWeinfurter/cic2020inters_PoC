import React, { Fragment } from "react";

//---Enter sample JSON files---//
const candidate_info = JSON.stringify(require("../SampleArtifacts/sample_candidate_info.json"));
const breakout_room_info = JSON.stringify(require("../SampleArtifacts/sample_collection_breakout_room_info.json"));

const displayCandidate = JSON.parse(candidate_info);
const displayBreakout_room = JSON.parse(breakout_room_info);

const AddCandidate = () => {
    const create_w3id = "FName.Lname@ibm.com";
    const interview_status_code = "P";

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { create_w3id, interview_status_code, candidate_info, breakout_room_info };
            await fetch("http://localhost:8000/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className="container">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Breakout Room
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {displayBreakout_room.map(e => (
                            <button className="dropdown-item" type="button">{e.name}</button>
                        ))}
                </div>
            </div>
            <form className="d-flex mt-3" onSubmit={onSubmitForm}>
                <button type="button mt-5" className="btn btn-primary">Add</button>
            </form>
            <p>{displayCandidate.name}, {displayCandidate.jrss}</p>
            </div>
        </Fragment>
    );
};

export default AddCandidate;