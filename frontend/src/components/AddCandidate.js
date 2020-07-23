import React, { Fragment } from "react";

//---Enter sample JSON files---//
const candidate_info = JSON.stringify(require("../SampleArtifacts/sample_candidate_info.json"));
const breakout_room_info = JSON.stringify(require("../SampleArtifacts/sample_collection_breakout_room_info.json"));

const AddCandidate = () => {
    const create_w3id = "Jordan.Myles@ibm.com"

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { create_w3id, candidate_info, breakout_room_info };
            const response = await fetch("http://localhost:8000/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center">Add Candidate</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <button type="button mt-5" className="btn btn-primary">Add</button>
            </form>
        </Fragment>
    );
};

export default AddCandidate;