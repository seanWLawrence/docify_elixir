#!/usr/bin/env node

let { spawn } = require('child_process');

let logMsg = prefix => msg => console.log(`${prefix}: ${msg}`)

let client = spawn('cd client && npm i && npm start', { shell: true })
let logClientMsg = logMsg('Client')

client.stdout.on('data', logClientMsg);
client.stderr.on('data', logClientMsg)
client.on('close', logClientMsg)

let server = spawn('cd server && iex -S mix phx.server', { shell: true })
let logServerMsg = logMsg('Server')

server.stdout.on('data', logServerMsg)
server.stderr.on('data', logServerMsg)
server.on('close', logServerMsg)
