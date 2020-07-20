const { Client } = require('pg')
const client = new Client({
    user: "awnsfvaj",
    password: "WMfT156PXxTh8Dli9Odm2wwuHlmIdsl3",
    host: "ruby.db.elephantsql.com",
    port: 5432,
    database: "awnsfvaj"
})

client.connect()
.then(() => console.log("Successful Connection"))
.catch(e => console.log)
.finally(() => client.end())
