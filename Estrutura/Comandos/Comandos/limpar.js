const Discord = require("discord.js");
const delaybl = new Set();
const database = require('../../../Database.js');

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
          .setColor(`#750dbb`)
          .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n\n<:Alerta:817107348065615933>  Permissões necessárias: \`MANAGE_MESSAGES\``)
          .setFooter("Atenciosamente, Nerus.")
      );
    }
    const embedcanal = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Quantas mensagens você deseja apagar ? Envie um número de 1 a 99.")
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .setFooter("Atenciosamente, Nerus.")
    let mainMsg = await message.channel.send(embedcanal);
    let error = false;
    let msg;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
        errors: ["time"],
    })
    .then((collected) => {
        msg = collected.first().content.trim().split(/ +/g);
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não enviou uma quantia a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })

    if (msg[0] === "parar" || msg[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
    if (msg[0] == '' || !msg[0]) {
        if (delaybl.has(message.author.id)) {
            let setarblacklist1 = database.ref(`blacklist/users/${message.author.id}`);
            setarblacklist1.update({
                barrado: "true"
            })
            let embedantibug = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Segurança", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Negado, sem tentar bugar amigão! A partir de hoje você esta em minha blacklist, achou ruim? Reclama com o Milton <a:CheckVermelho:817107349306474547>`)
            .setImage("https://media.discordapp.net/attachments/807079371768070144/823656541626171432/CX_gMCFWMAETGOo.jpg")
            .setFooter("Atenciosamente, Nerus.")     
            mainMsg.delete()
            message.author.send(embedantibug)
            let embedpr = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Log Seguranças", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .addFields(
                { name: `Nome do servidor:`, value: `- ${message.guild.name}`},
                { name: 'ID do servidor:', value: `- ${message.guild.id}`},
                { name: 'ID dono do servidor:', value: `- ${message.guild.owner.id}`},
                { name: `Nome autor:`, value: `- ${message.author.username}`},
                { name: `ID autor:`, value: `- ${message.author.id}`},
                { name: `Local:`, value: `- Limpar`}       
            )
            .setFooter("Atenciosamente, Nerus.")  
            client.channels.cache.get("821549752911003709").send(embedpr)
            return;
        } else {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Buga a mãe para ver se quica, na próxima você vai para a blacklist <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
            )
            delaybl.add(message.author.id); 
            setTimeout(() => {
                delaybl.delete(message.author.id); 
            }, 3600000);
            return;
        }
    }

    const verifica = Number(`${msg[0]}`) 
    if (verifica) {
        let stringtonumero = parseInt(msg[0]);
        if (stringtonumero >= 1) {
            if (stringtonumero <= 99) {
                message.channel.bulkDelete(stringtonumero, true);
            } else {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, informe uma quantia entre 1 a 99 <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                )
            }
        } else {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Negado, informe uma quantia entre 1 a 99 <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
            )
        }
    } else {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Clear","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
    }
  }
}
