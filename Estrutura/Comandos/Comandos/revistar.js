const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Revista","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Mencione ou envie o ID do usuário que você deseja revistar.`)
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para mencionar ou enviar o ID`)
    .setFooter("Atenciosamente, Nerus.")
    let mainMsg = await message.channel.send(embed1);
    error = false;
    let msg;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
        errors: ["time"],
    })
    .then((collected) => {
        msg = collected.first().content.trim().split(/ +/g);;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Revista","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não informou um ID ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })
    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Revista","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    
    const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
    const verificaid = Number(`${idusuario}`)
    const verificaid2 = message.guild.members.cache.get(idusuario)
    if (!verificaid){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Revista","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription(`Negado, mencione um usuário válido ou envie um ID válido <a:CheckVermelho:817107349306474547>`)
            .setFooter("Atenciosamente, Nerus.")
        );
        return;
    } else {
        if (!verificaid2){
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Revista","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription(`Negado, você não pode revistar uma pesoa que não esteja no servidor <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
            );
            return;
        }
    }
    
    if (verificaid2 && verificaid) {
        let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${idusuario}/`);
        localizaritens.once('value', (snapshot) => {
            let data = snapshot.val()
            let data2 = require('util').inspect(data)
            let data3 = data2.split('{').join('').split('}').join('').split("'").join('').split(":").join('  **ˣ**').split(",").join('\n')
            if (data == null) {
                let embed = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setDescription(`<:bolsa:820733064590000198>   **MOCHILA DO USUÁRIO** <:bolsa:820733064590000198>\n\n<a:CheckVermelho:817107349306474547> **Negado, este usuário não possuí nenhum item em sua mochila.**`)
                .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
                message.channel.send(embed)
                return;
            }
            let embed = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setDescription(`<:bolsa:820733064590000198>   **MOCHILA DO USUÁRIO** <:bolsa:820733064590000198>\n\n${data3}`)
            .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
            message.channel.send(`${message.author}`)
            message.channel.send(embed)
        })
    }
  },
};