import React, { Fragment, useState } from 'react';

const CandidateStatus = ({ e }) => {
    const [ status, set_status ] = useState(e.interview_status_code);

    const modStatus = async(el, str) => {
        console.log(str);
        var date = new Date();
        try {
            const body = { str, date };
            await fetch(`http://localhost:8000/assignments/status/${e.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/"; 
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <div className="dropdown" id={`id${e.id}`}>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={status}>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id={`id${e.id}`}>
                    <button className="dropdown-item" type="button" onClick={el => modStatus(el, "P")}>Pending</button>
                    <button className="dropdown-item" type="button" onClick={el => modStatus(el, "IP")}>Incomplete</button>
                    <button className="dropdown-item" type="button" onClick={el => modStatus(el, "C")}>Complete</button>
                    <button className="dropdown-item" type="button" onClick={el => modStatus(el, "D")}>Deferred</button>
                    <button className="dropdown-item" type="button" onClick={el => modStatus(el, "R")}>Reassigned</button>
                </div>
            </div>
        </Fragment>
    );
};

export default CandidateStatus;