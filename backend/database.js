const { Pool } = require('pg');

const pool = new Pool({
    user: "awnsfvaj",
    password: "WMfT156PXxTh8Dli9Odm2wwuHlmIdsl3",
    host: "ruby.db.elephantsql.com",
    port: 5432,
    database: "awnsfvaj"
});

module.exports = pool;