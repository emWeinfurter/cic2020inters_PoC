import React, { Fragment, useState } from 'react';

const EditCandidate = ({ e }) => {
    const [ modify_w3id, set_w3id ] = useState(e.create_w3id);

    const putModify = async(el) => {
        el.preventDefault();
        var date = new Date();
        try {
            const body = { modify_w3id, date };
            await fetch(`http://localhost:8000/assignments/w3id/${e.id}`, {
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
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${e.id}`}>
            Edit
            </button>

            <div className="modal fade" id={`id${e.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modify w3id</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <input type="text" className="form-control" value={modify_w3id} onChange={el => set_w3id(el.target.value)} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success" onClick={el => putModify(el)}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    );
};

export default EditCandidate;