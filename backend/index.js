const express = require("express");
const app = express();
const cors = require("cors");
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

app.use(cors());
app.use(express.json());

//---ROUTES for CRUD operations---//
//Create
app.post("/assignments", async(req, res) => {
    const { create_w3id } = req.body;

    const queryString = 'INSERT INTO candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) VALUES($1, $2, $3) RETURNING *';
    const values = [candidate, breakout_room, create_w3id];

    try {
        const addValues = await client.query(queryString, values);
        res.json(addValues.rows[0]);
      } catch (err) {
        console.log(err.stack);
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
app.put("/assignments/:id", async(req, res) => {
    const { id } = req.params;
    const { modify_w3id } = req.body;

    const queryString = 'UPDATE candidate_interviews_assignments SET modify_w3id = $1 WHERE id = $2';
    const values = [modify_w3id, id];
    try {
        await client.query(queryString, values);
        res.json("Changes added");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete
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
