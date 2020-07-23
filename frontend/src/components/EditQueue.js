import React, { Fragment, useEffect, useState } from "react";

const EditQueue = () => {
    const [ queue, setQueue ] = useState([]);

    //Delete Candidate
    const deleteCandidate = async (id) => {
        try {
            await fetch(`http://localhost:8000/assignments/${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    //Get Table
    const getQueue = async () => {
        try {
            const response = await fetch("http://localhost:8000/assignments");
            const responseBody = await response.json();

            setQueue(responseBody);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getQueue();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center mt-5">Edit Queue</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scopr="col">w3id</th>
                        <th scope="col">Resume</th>
                        <th scopr="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.map(e => (
                        <tr key={e.id}>
                            <th>{e.id}</th>
                            <td>{e.candidate_info.name}</td>
                            <td>{e.create_w3id}</td>
                            <td><a href={e.candidate_info.links[1].url} className="btn btn-primary btn-block" role="button">Read Here</a></td>
                            <td><button className="btn btn-danger btn-block" onClick={() => deleteCandidate(e.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default EditQueue;