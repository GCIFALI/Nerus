const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    const Embed = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Hug","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Mencione ou envie o ID da pessoa que você deseja abraçar ")
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para mencionar ou enviar o ID da pessoa que você deseja abraçar`)
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
                .setAuthor("Nerus - Sistema de Hug","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
            );
            return;
        }

        let gifs= [
            'https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif',
            'https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif',
            'https://25.media.tumblr.com/tumblr_ma7l17EWnk1rq65rlo1_500.gif',
            'https://media3.giphy.com/media/wnsgren9NtITS/giphy.gif',
            'https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif',
            'https://cdn.lowgif.com/medium/6b0a88162a4b836c-.gif',
            'https://media.tenor.com/images/825050620d8052ad0cf274f9f8a11416/tenor.gif'
        ];
        let escolha = gifs[Math.floor(Math.random()* gifs.length)];
        const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
        const verificaid = Number(`${idusuario}`)
        const verificaid2 = message.guild.members.cache.get(idusuario)
        if (verificaid2 && verificaid) {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setTitle(`Nerus - Sistema de Hug`)
                .setDescription(`${verificaid2} você recebeu um abraço do(a) ${message.author} 💗`)
                .setImage(escolha)
                .setColor("#ff0008")
            );

        } else {
          mainMsg.edit(
            new Discord.MessageEmbed()
              .setAuthor("Nerus - Sistema de Hug","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
              .setColor(`#750dbb`)
              .setDescription("Mencione um usuário válido, operação cancelada <a:CheckVermelho:817107349306474547>")
              .setFooter("Atenciosamente, Nerus")
          );
        }  
      })
      .catch((err) => {
        error = true;
        mainMsg.edit(
          new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Hug","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não mencionou ou enviou o ID de quem você quer abraçar a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (error) return;
  }
}