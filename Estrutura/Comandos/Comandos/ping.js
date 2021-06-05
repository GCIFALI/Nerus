const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        const embedping = new Discord.MessageEmbed()
        .setDescription(`\n🏓 ${Date.now() - message.createdTimestamp}ms.\n\n<a:Loading:817110188002770976> ${Math.round(client.ws.ping)}ms`)
        .setColor("#750dbb")
        message.channel.send(embedping)
    }
}