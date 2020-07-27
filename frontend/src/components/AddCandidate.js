import React, { Fragment, useState } from "react";

//---Enter sample JSON files---//
const breakout_room_info = JSON.stringify(require("../SampleArtifacts/sample_collection_breakout_room_info.json"));
const candidatePool = JSON.stringify(require("../SampleArtifacts/sampleCandidatePool.json"));
const displayCandidate = JSON.parse(candidatePool);

const AddCandidate = () => {
    //use State for chosen candidate
    const [ candidate, setCandidate ] = useState(displayCandidate[0]);

    //placeholders for w3_ids 
    const create_w3id = "FName.Lname@ibm.com";
    const interview_status_code = "P";

    //on Submit of add button, sends a POST request to backend
    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("in POST");
        try {
            const body = { create_w3id, interview_status_code, candidate, breakout_room_info };
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
                    Candidates
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {displayCandidate.map(candidate => (
                            <button className="dropdown-item" type="button" onClick={() => setCandidate(candidate)}>{candidate.name}</button>
                        ))}
                </div>
            </div>
            <form className="d-flex mt-3" onSubmit={onSubmitForm}>
                <button type="button mt-5" className="btn btn-primary">Add</button>
            </form>
            <p>{candidate.name}, {candidate.jrss}</p>
            </div>
        </Fragment>
    );
};

export default AddCandidate;