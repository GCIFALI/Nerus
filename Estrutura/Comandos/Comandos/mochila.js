const database = require('../../../Database.js');
const Discord = require('discord.js');
module.exports = {
    run: async (client, message, args) => {
        let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/`);
        localizaritens.once('value', (snapshot) => {
            let data = snapshot.val()
            let data2 = require('util').inspect(data)
            let data3 = data2.split('{').join('').split('}').join('').split("'").join('').split(":").join('  **ˣ**').split(",").join('\n')
            if (data == null) {
                let embed = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setDescription(`<:bolsa:820733064590000198>   **SUA MOCHILA** <:bolsa:820733064590000198>\n\n<a:CheckVermelho:817107349306474547> **Você não possui nenhum item em sua mochila.**`)
                .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
                message.channel.send(embed)
                return;
            }
            let embed = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setDescription(`<:bolsa:820733064590000198>   **SUA MOCHILA** <:bolsa:820733064590000198> \n\n${data3}`)
            .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
            message.channel.send(`${message.author}`)
            message.channel.send(embed)
        })
    }            
}