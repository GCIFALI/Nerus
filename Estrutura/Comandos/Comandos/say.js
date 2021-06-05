const Discord = require("discord.js");


module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
          .setColor(`#750dbb`)
          .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>

          <:Alerta:817107348065615933>  Permissões necessárias: \`MANAGE_MESSAGES\``)
          
          .setFooter("Atenciosamente, Nerus.")
      );
    }

    const embedcanal = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Mencione o canal que eu devo enviar a mensagem")
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **2 minutos** para mencionar um canal.`)
    .setFooter("Atenciosamente, Nerus.")
    let mainMsg = await message.channel.send(embedcanal);
    let error = false;
    let msg;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 120000,
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
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não mencionou um canal a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })


    let filtro = msg[0].replace("<", "").replace("#", "").replace(">", "");

    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }

    let canal = message.guild.channels.cache.find((c) => c.id === filtro);
    if (!canal) {
      return mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Não consegui encontrar este canal, verifique as minhas permissões e tente novamente <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus")
      );
    }
//////////////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie a cor que você deseja no embed utilizando a seguinte formatação: \`#1ABC9C\`")
        
        .addField(`<:Microfone:817107348266942494> Não sabe onde encontrar a hex da sua cor preferida?`, `[Clique Aqui](https://htmlcolorcodes.com/color-picker/)`)
        .addField(`<:pride:818953148482715739> Paleta de Cores Exemplo`, `
        Vermelho - \`#E74C3C\`
        Amarelo - \`#FFFF00\`
        Aqua - \`#1ABC9C\`
        Verde - \`#2ECC71\`
        Verde escuro - \`#1F8B4C\`
        Azul - \`#3498DB\`
        Azul escuro - \`#206694\`
        Roxo - \`#9B59B6\`
        Laranja - \`#E67E22\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **2 minutos** para enviar uma cor`)
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .setFooter("Atenciosamente, Nerus.")
    );
    error = false;
    let msg2;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 120000,
        errors: ["time"],
    })
    .then((collected) => {
        msg2 = collected.first().content.trim().split(/ +/g);;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou uma cor a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg2[0] === "parar" || msg2[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
    if (!msg2[0].startsWith("#")) {
        return mainMsg.edit(
            new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription("Informe uma cor válida utilizando a formatação correta, operação cancelada <a:CheckVermelho:817107349306474547>")
            
            .setFooter("Atenciosamente, Nerus.")
        );
    }
////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie o conteúdo da mensagem que você deseja que eu envie no canal "+ msg)
        
        .addField(`<:Microfone:817107348266942494>  Deseja implementar uma imagem no embed?`, `Envie o **link** da **imagem** junto a mensagem que você deseja enviar`)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **4 minutos** para enviar a mensagem.`)
        .setFooter("Atenciosamente, Nerus.")
    );
    error = false;
    let msg3;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 240000,
        errors: ["time"],
    })
    .then((collected) => {
        msg3 = collected.first().content;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou a mensagem a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg3 === "parar" || msg3 === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }

    if (msg3 == null || msg3 == ''){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, informe uma mensagem válida <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }


    const urlRegex = /(?:https?|ftp):\/\/[\n\S]+/g
    const urlMsg = urlRegex.exec(msg3)
    if(urlMsg){
        msg3 = msg3.replace(urlRegex, '');
        let emebedsayuser = new Discord.MessageEmbed()
        .setColor(msg2[0])
        .setImage(urlMsg[0])
        .setDescription(msg3)
        .setFooter("Atenciosamente, "+`${message.author.username}`)
        client.channels.cache.get(filtro).send(emebedsayuser)
        
    } else {
        const emebedsayuser = new Discord.MessageEmbed()
        .setColor(msg2[0])
        .setDescription(msg3)
        .setFooter("Atenciosamente, "+`${message.author.username}`)
        client.channels.cache.get(filtro).send(emebedsayuser)
    }

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Say","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Sucesso, mensagem enviada no canal "+msg+" <a:CheckVerde:817107349881618442> " )
        .setFooter("Atenciosamente, Nerus.")
    )
  },
};