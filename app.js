'use strict';
const Readline = require('readline');
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
const mather = require('./matcher');
const weather = require('./weather');

rl.setPrompt('> ');
rl.prompt();

rl.on('line', reply => {
    mather(reply, data => {
        switch(data.intent) {
            case 'Hello': {
                console.log(`${data.entities.greeting} to you too!`);
                rl.prompt();
                break;
            }
            case 'Exit': {
                console.log("Have a great day!");
                process.exit(0);
                break;
            }
            case 'CurrentWeather': {
                console.log(`Checking weather for ${data.entities.city}...`);
                weather(data.entities.city)
                .then(response => console.log(response))
                .catch(error => {
                    console.log(error);
                })
                rl.prompt();
                break;
            }
            default: {
                console.log("I don't know what you mean :(");
                rl.prompt();
            }
        }
    })
});