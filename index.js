const Redis = require("ioredis");

async function startFunc(client, time, seconds, func, params){
    time = time.split(":");
    let today = new Date();
    let minutes = (parseInt(time[1]) - today.getMinutes())*60;
    let hours = (parseInt(time[0]) - today.getHours())*3600;
    seconds = seconds - today.getSeconds();
    let ms = (hours + minutes + seconds) * 1000;
    setTimeout(() => {
        client.set('getFunc', func);
        client.set('params', JSON.stringify(params));
    }, ms)
}

async function getRedis() {
    const client = new Redis({port: process.env.REDIS_PORT, host: process.env.REDIS_IP});
    await startFunc(client,"2:54", 5, 'hello', {hello: "hello World!"});
    await startFunc(client,"2:54", 10, 'test', {a: 1, b: 2});
    await startFunc(client,"2:54", 15, 'justTest');
}

getRedis();
