const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args) => {
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Ship","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Mencione duas pessoas que você deseja shipar, exemplo: \`@yuri @alex\` ")
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **10 segundos** para mencionar os pombinhos`)
        .setFooter("Atenciosamente, Nerus.")
        
        let mainMsg = await message.channel.send(Embed);
        let error = false;
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
            if (msg[0] === "parar" || msg[0] === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Ship","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }
            function verificar(){
                if (!msg[1]) {
                    return 'Não informado'
                } else return msg[1]
            }
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - SIstema de Ship","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`🔻 | ${msg[0]} \n🔺 | ${verificar()}`)
                .setColor(`#750dbb`)
                .addField('Calculadora do amor:', (`${Math.floor(Math.random() * 100)}%! 💘`))
                .setImage("https://media3.giphy.com/media/2WGYAuTdL8QVrieThE/giphy.gif")
                .setFooter('Atenciosamente, Nerus.')
            )
            
          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Ship","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Você não mencionou os dois pombinhos a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        });
        if (error) return;
    }
}