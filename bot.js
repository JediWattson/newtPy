const fs = require('fs')
const spawn = require("child_process").spawn;
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const file = 'code.py'

client.on('message', async msg => {
  if (msg.content.includes('<python>')) {
    let data = msg.content.replace(/<python>/g, '')
    await fs.writeFile(file, data, (err) => { if (err) throw err; })
    const process = spawn('python',[file])
    process.stdout.on('data', async data => {
      const output = data.toString()
      await msg.reply(output);
      await fs.unlinkSync(file)
    });
  }
});

client.login(process.env.DISCORD_BOT);
