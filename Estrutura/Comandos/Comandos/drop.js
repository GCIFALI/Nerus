const Discord = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            
            .setFooter("Atenciosamente, Nerus.")
        );
    }

    const Embed = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Mencione o canal que você deseja iniciar o drop, use: \`#NomeDoCanal\`")
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para mencionar o canal que você deseja`)
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
        msg = collected.first().content;
        collected.first().delete();
      })
      .catch((err) => {
        error = true;
        mainMsg.edit(
          new Discord.MessageEmbed()
          .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
          
          .setColor(`#750dbb`)
          .setDescription("Você não mencionou o canal que você deseja iniciar o drop a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
          .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (error) return;
    msg = msg.replace("<", "").replace("#", "").replace(">", "");
    if (msg === "parar" || msg === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    let salon = message.guild.channels.cache.find((c) => c.id === msg);
    if (!salon) {
      return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Não consegui encontrar este canal, verifique as minhas permissões e tente novamente <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      );
    }

    const MEmbed = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Qual será o prêmio do drop? Envie no chat.")
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar o prêmio do drop`)
    .setFooter("Atenciosamente, Nerus.")
    mainMsg.edit(MEmbed);

    error = false;
    let msg2;
    await message.channel
      .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
        errors: ["time"],
      })
      .then((collected) => {
        msg2 = collected.first().content;
        collected.first().delete();
      })
      .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não informou o prêmio para o drop a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        );
        return;
      });
    if (error) return;
    if (msg2 === "parar" || msg2 === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Sucesso, o drop vai começar em **5 segundos** no canal <#"+salon.id+">")
        .setFooter("Atenciosamente, Nerus.")
    )

    setTimeout(async () => {
      const DropEmbed = new Discord.MessageEmbed()
      .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
      
      .setColor(`#750dbb`)
      .setDescription(`A primeira pessoa que cliclar no  🎉  ganhará: \`${msg2}\` 
      
      <a:Loading:817110188002770976> **Tempo Limite:** 30 minutos
      <:Microfone:817107348266942494> **Host do Drop:** ${message.author}`)
      .setFooter("Atenciosamente, Nerus.")
      let m = await salon.send(DropEmbed);
      m.react("🎉");
      const filtre = (reaction, user) => {
        return ["🎉"].includes(reaction.emoji.name) && !user.bot;
      };
      m.awaitReactions(filtre, {
        max: 1,
        time: 1800000,
        errors: ["time"],
      })
        .then((collected) => {
          const reaction = collected.first();
          if (reaction.emoji.name === "🎉") {
            const WinEmbed = new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Drop","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription(`Parabéns <@${reaction.users.cache.last().id}> por ser a primeiroa pessoa a reagir, contate alguém da equipe deste servidor para receber o seu prêmio.`)
            .setFooter("Atenciosamente, Nerus.")
            m.edit(`<@${reaction.users.cache.last().id}>`, WinEmbed);
          }
        })
    }, 5000);
  },
};