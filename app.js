
// Imports
const envs = require('dotenv');
const discord = require('discord.js');
const fs = require('fs');
const request = require('request');
envs.load();
// setups
const client = new discord.Client();
var commands = {};
client.on('ready', (msg) => {
    console.log(`Logged on as ${client.user.tag}`);
});

client.on('message', msg => {
    // console.log(msg.content.startsWith('%'));
    if (!msg.content.startsWith('%')) {
        return;
    }
    // Get command string
    var command = getCommand(msg.content);

    // Try and find command
    var calledFunction = commands[command];
    if(calledFunction == null) {
        msg.channel.send("Invalid command");
        return;
    }
    // run command if found
    // co%nsole.log(getArgs(msg));
    calledFunction.run(msg, getArgs(msg));
});

function getCommand(msg) {
    if(typeof msg  === 'string')
        return msg.split(' ')[0].substr(1);
    else {
        try {
            var t = msg.content;
            return t.split(' ')[0].substr(1);
        } catch (error) {
            return "";
        }
    }
}

function getArgs(msg) {
    if(typeof msg  === 'string')
        return msg.split(' ').splice(0, 1);
    else {
        try {
            var t = msg.content.split(' ');
            t.shift();
            return t;
        } catch (error) {
            return error;
        }
    }
}

function addCommands() {
    const functions = require("./functions");
    for(i in functions) {
        commands[i] = new functions[i]();
    }
}

addCommands();
// console.log(process.env.TEST_BOT_TOKEN);
client.login(process.env.TEST_BOT_TOKEN);
