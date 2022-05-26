const { Client } = require('pg');

let connection_options = {
    connectionString: process.env.DB_URL,
}
const client = new Client(connection_options);

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
