const Redis = require("ioredis");

async function startFunc(client, events){
    events.forEach(function (value, i) {
        let time = value.time;
        let seconds = value.seconds;
        let func = value.function;
        let params = value.parameters;

        time = time.split(":");
        let today = new Date();
        let minutes = (parseInt(time[1]) - today.getMinutes()) * 60;
        let hours = (parseInt(time[0]) - today.getHours()) * 3600;
        seconds = seconds - today.getSeconds();
        let ms = (hours + minutes + seconds) * 1000;
        if (ms < 0) {
            console.log("Это время прошло");
            return
        }
        setTimeout(() => {
            client.set(`func${i}`, JSON.stringify({func: func, params: params}));
            // client.set('params', JSON.stringify(params));
        }, ms)
    });
}

async function getRedis() {
    const client = new Redis({port: process.env.REDIS_PORT, host: process.env.REDIS_IP});
    let events = [
        {time: "17:50", seconds: 10, function: 'hello', parameters: {hello: "hello World!"}},
        {time: "17:50", seconds: 5, function: 'test', parameters: {a: 1, b: 2}},
        {time: "17:50", seconds: 5, function: 'justTest'}
    ]
    await startFunc(client, events);
}

getRedis();
