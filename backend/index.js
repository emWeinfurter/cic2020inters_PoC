const express = require("express");
const app = express();
const pool = require("./database");

const candidate = require("../Artifacts/sample_candidate_info.json");
const breakout_room = require("../Artifacts/sample_collection_breakout_room_info.json");

app.use(express.json());


//---ROUTES for CRUD operations---//
//Create ************Errors Here**************
app.post("/assignments", res => {
        pool.query('INSERT INTO candidate_interviews_assignments (candidate_info, breakout_room_info) VALUES(${1}, ${2})', candidate, breakout_room, (error, result) => {
            console.log("inside the query");
            if (error) {
                res.statusCode(404).json({ message: 'error' });
                throw error;
            }
            res.statusCode(200).send(result.rows);
        });
});
//*****************Errors Here ***********/

//Read
app.get("/assignments", async(req, res) => {
    try {
        const allInfo = await pool.query("SELECT * FROM candidate_interviews_assignments");

        res.json(allInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Update

//Delete
app.delete("/assignments/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM candidate_interviews_assignments WHERE id = $1", [id]);
    } catch (err) {
        console.error(err.message);
    }
});

//---Localhost:8000---//
app.listen(8000, () => {
    console.log("Server is listening at Port: 8000");
});
