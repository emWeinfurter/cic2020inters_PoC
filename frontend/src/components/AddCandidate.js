import React, { Fragment, useState } from "react";

const AddCandidate = () => {
    const [create_w3id, set_w3id] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { create_w3id };
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
                <input type="text" className="form-control" value={create_w3id} onChange={e => set_w3id(e.target.value)}/>
                <button type="button mt-5" className="btn btn-primary">Add</button>
            </form>
        </Fragment>
    );
};

export default AddCandidate;