const express = require("express");
const app = express();

const pool = require("../Artifacts/candidate_interviews_assignments_postresql_create_table.ddl");

app.listen(8000, () => {
    console.log("Server is listening at Port: 8000");
});
