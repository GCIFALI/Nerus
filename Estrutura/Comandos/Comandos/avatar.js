const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Avatar","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Mencione ou envie o ID do usuário que você deseja ver o avatar`)
    
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
            .setAuthor("Nerus - Sistema de Avatar","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription("Você não informou um ID ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })
    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Avatar","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
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
            .setAuthor("Nerus - Sistema de Avatar","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription(`Negado, mencione um usuário válido ou envie um ID válido <a:CheckVermelho:817107349306474547>`)
            .setFooter("Atenciosamente, Nerus.")
        );
        return;
    } else {
        if (!verificaid2){
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Avatar","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                
                .setDescription(`Negado, eu não posso exibir o avatar de uma pesoa que não esteja no servidor <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
            );
            return;
        }
    }
    
    if (verificaid2 && verificaid) {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Avatar","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription(`<a:camera:819590871757619230> ${verificaid2} <a:camera:819590871757619230>\n\nTipos de imagem:\n<:Link:817107347905970208>  [PNG](${verificaid2.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})\n<:Link:817107347905970208>  [JPG](${verificaid2.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})\n<:Link:817107347905970208>  [WEBP](${verificaid2.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })})`)
            .setImage(verificaid2.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter("Atenciosamente, Nerus")
        )
    }
  },
};