const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./database");

//---app express/cors---//
app.use(cors());
app.use(express.json());

//---Connection to DB---//
client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
});

//Generates a new Date for put requests
//var date = new Date();

//---Test CRUD op in backend---//
//const candidate = JSON.stringify(require("../Artifacts/sample_candidate_info.json"));
//const breakout_room = JSON.stringify(require("../Artifacts/sample_collection_breakout_room_info.json"));

//---ROUTES for CRUD operations---//
//***Create
app.post("/assignments", async(req, res) => {
    const { create_w3id, interview_status_code, candidate_info, breakout_room_info } = req.body;

    const queryString = 'INSERT INTO candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id, interview_status_code) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [candidate_info, breakout_room_info, create_w3id, interview_status_code];

    try {
        const addValues = await client.query(queryString, values);
        res.json(addValues.rows[0]);
      } catch (err) {
        console.log(err.stack);
      }
});

//***Read
app.get("/assignments", async(req, res) => {
    try {
        const allInfo = await client.query("SELECT * FROM candidate_interviews_assignments");

        res.json(allInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get candidate info only
app.get("/candidates", async(req, res) => {
    try {
        const candidate = await client.query("SELECT candidate_info FROM candidate_interviews_assignments");

        res.json(candidate.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get breakout room info only
app.get("/breakout-room", async(req, res) => {
    try {
        const breakout_room = await client.query("SELECT breakout_room_info FROM candidate_interviews_assignments");

        res.json(breakout_room.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//***Update
//to modify w3id
app.put("/assignments/w3id/:id", async(req, res) => {
    var date = new Date();
    const { id } = req.params;
    const { modify_w3id } = req.body;

    const queryString = 'UPDATE candidate_interviews_assignments SET modify_w3id = $1, modified_dt = $2 WHERE id = $3';
    const values = [modify_w3id, date, id];
    try {
        await client.query(queryString, values);
        res.json("Modfied w3id added");
    } catch (err) {
        console.error(err.message);
    }
})

//to change candidate status
app.put("/assignments/status/:id", async(req, res) => {
    var date = new Date();
    const { id } = req.params;
    const { interview_status_code } = req.body;

    const queryString = 'UPDATE candidate_interviews_assignments SET interview_status_code = $1, modified_dt = $2 WHERE id = $3';
    const values = [interview_status_code, date, id];
    try {
        await client.query(queryString, values);
        res.json("Changed status");
    } catch (err) {
        console.error(err.message);
    }
})

//***Delete
app.delete("/assignments/:id", async(req, res) => {
    const { id } = req.params;
    try {
        await client.query("DELETE FROM candidate_interviews_assignments WHERE id = $1", [id]);
        res.json("Row deleted");
    } catch (err) {
        console.error(err.message);
    }
});

//---Localhost:8000---//
app.listen(8000, () => {
    console.log("Server is listening at Port: 8000");
});
