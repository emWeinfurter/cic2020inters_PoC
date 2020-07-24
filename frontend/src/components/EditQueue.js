import React, { Fragment, useEffect, useState } from "react";
import CandidateStatus from "./CandidateStatus";

const EditQueue = () => {
    const [ queue, setQueue ] = useState([]);

    //Delete Candidate
    const deleteCandidate = async (id) => {
        try {
            await fetch(`http://localhost:8000/assignments/${id}`, {
                method: "DELETE"
            });

            setQueue(queue.filter(e => e.id !== id));
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
            <div className="container mt-5" />
            <h3>Breakout Room 1</h3>
            <h5>Number of Candidates: {queue.length}</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scopr="col">JRSS</th>
                        <th scope="col">Resume</th>
                        <th scope="col">Status</th>
                        <th scopr="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.map(e => (
                        <tr key={e.id}>
                            <th>{e.id}</th>
                            <td>{e.candidate_info.name}</td>
                            <td>{e.candidate_info.jrss}</td>
                            <td>{e.candidate_info.links.map(link => (
                                <a href={link.url} className="btn btn-primary form-control mt-1" role="button">{link.name}</a>
                            ))}</td>
                            <td><CandidateStatus e={e}/></td>
                            <td><button className="btn btn-danger btn-block" onClick={() => deleteCandidate(e.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default EditQueue;