const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "FeedMer",
    user: "test",
    password: "test"
});

module.exports = {

    async addTask(func, params) {
        try {
            arr = [func, params, false]
            let sql = 'INSERT INTO tasks (func, parameters, is_done) ' +
                'VALUES ($1, $2, $3);';
            await client.query(sql, arr);
        } catch (err) {
            console.log(getFuncName() + " failed. " + err.stack);
        }
    }
}

try{
    client.connect();
} catch (err) { console.log(err)}

function getFuncName()
{
    return getFuncName.caller.name;
}
global.getFuncName = getFuncName;
