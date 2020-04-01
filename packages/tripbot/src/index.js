'use strict';

const Irc = require('irc-framework');

module.exports = function createTripbot() {
  const client = new Irc.Client();
  client.connect({
    host: process.env.IRC_HOST,
    port: process.env.IRC_PORT,
    nick: process.env.IRC_NICK,
  });

  client.on('debug', console.error);

  client.on('registered', () => {
    client.say('NickServ', `identify ${process.env.IRC_PASSWORD}`);
  });

  client.on('message', (event) => {
    console.log(event.message);
  });

  return client;
};
