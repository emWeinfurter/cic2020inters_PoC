import React, { Fragment } from 'react';
import './App.css';

//import components
import AddCandidate from "./components/AddCandidate";

function App() {
  return (
    <Fragment>
      <div className="container">
      <h1 className="text-center mt-5">Queue Manager</h1>
      <form className="center">
        <button type="button mt-5" className="btn btn-primary">
          Add Candidate
        </button>
      </form>
      </div>
      <AddCandidate />
    </Fragment>
  );
}

export default App;
