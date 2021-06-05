const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args) => {
        message.delete()
        if (message.author.id != '348319220288716810') {  
            let embed = new Discord.MessageEmbed()
            .setTitle("Nerus - Comando Secetro")
            .setColor(`#750dbb`)
            .setDescription("Whoops! Não conte para ninguém mas este comando é secreto e só pode ser utilizado pelo meu criador <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
            message.channel.send(embed)
            return
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Add Blacklist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Olá papai, envie por favor o ID da pessoa que você quer adicionar na blacklist de usuários <a:Loading:817110188002770976>")
        let mainMsg = await message.channel.send(Embed);
        let error = false;
        let msg;
        await message.channel 
        .awaitMessages((m) => m.author.id === message.author.id, {
            max: 1,
            time: 10000,
            errors: ["time"],
          })
          .then((collected) => {
            msg = collected.first().content.trim().split(/ +/g);;
            collected.first().delete();
            if (msg[0] === "parar" || msg[0] === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setTitle("Nerus - Add Blacklist")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo papai <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }
            let setarbl = database.ref(`blacklist/users/${msg[0]}`);
            setarbl.update({
                barrado: "true"
            })
            mainMsg.delete()
          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setTitle("Nerus - Add Blacklist")
                .setColor(`#750dbb`)
                .setDescription("Você não informou um ID a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        });
        if (error) return;
    }
}