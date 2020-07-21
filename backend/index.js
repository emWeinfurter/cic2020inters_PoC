const express = require("express");
const app = express();
const client = require("./database");

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
});

const candidate = JSON.stringify(require("../Artifacts/sample_candidate_info.json"));
const breakout_room = JSON.stringify(require("../Artifacts/sample_collection_breakout_room_info.json"));

app.use(express.json());

//---ROUTES for CRUD operations---//
//Create
app.post("/assignments", async(req, res) => {
    const { create_w3id } = req.body;

    const queryString = 'INSERT INTO candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) VALUES($1, $2, $3) RETURNING *';
    const values = [candidate, breakout_room, create_w3id];

    try {
        const addValues = await client.query(queryString, values)
        res.json(addValues.rows[0])
      } catch (err) {
        console.log(err.stack)
      }
});


//Read
app.get("/assignments", async(req, res) => {
    try {
        const allInfo = await client.query("SELECT * FROM candidate_interviews_assignments");

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
        const deleteTodo = await client.query("DELETE FROM candidate_interviews_assignments WHERE id = $1", [id]);
    } catch (err) {
        console.error(err.message);
    }
});

//---Localhost:8000---//
app.listen(8000, () => {
    console.log("Server is listening at Port: 8000");
});
