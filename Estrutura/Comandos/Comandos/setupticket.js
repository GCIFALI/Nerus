const Discord = require("discord.js");
const database = require('../../../Database.js')


module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
          .setColor(`#750dbb`)
          .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
          
          .setFooter("Atenciosamente, Nerus.")
      );
    }

    const embedcanal = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Para iniciar a configuração envie o ID ou mencione o canal em que os tickets serão abertos.")
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para mencionar um canal.`)
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
        msg = collected.first().content.trim().split(/ +/g);;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não mencionou um canal a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })

    msg[0] = msg[0].replace("<", "").replace("#", "").replace(">", "");

    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    let canal = message.guild.channels.cache.find((c) => c.id === msg[0]);
    if (!canal) {
      return mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Não consegui encontrar este canal, verifique as minhas permissões e tente novamente <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus")
      );

    } 
    if (canal) {
        let salvarcanalticket = database.ref(`servidores/${message.guild.id}/configs`);
        salvarcanalticket.once('value', (snapshot) => {
            salvarcanalticket.update({
                canalticket: msg[0]
            });
        })
    }
//////////////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie a cor que você deseja no embed de abertura de ticket utilizando a seguinte formatação: \`#1ABC9C\`")
        
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
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar uma cor`)
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .setFooter("Atenciosamente, Nerus.")
    );
    error = false;
    let msg2;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
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
            .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou uma cor a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg2[0] === "parar" || msg2[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
            .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription("Informe uma cor válida utilizando a formatação correta, operação cancelada <a:CheckVermelho:817107349306474547>")
            
            .setFooter("Atenciosamente, Nerus.")
        );
    }

////////////////////////

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`O que deve estar escrito no embed de abertura de tickets? Envie abaixo.`)
        .addField(`<a:setinha:817162990721302561> Exemplo de mensagem para o embed do ticket:`, `Clique na reação abaixo para abrir um ticket!`)
        .addField(`<:Microfone:817107348266942494>  Deseja implementar uma imagem no embed?`, `Envie o **link** da **imagem** junto a mensagem que você deseja enviar, exemplo: "Bla bla bla https://link"`)
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .setFooter("Atenciosamente, Nerus.")
    );
    error = false;
    let msg3;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
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
            .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou a mensagem a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg3 === "parar" || msg3 === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }


    const urlRegex = /(?:https?|ftp):\/\/[\n\S]+/g
    const urlMsg = urlRegex.exec(msg3)
    if(urlMsg){
        msg3 = msg3.replace(urlRegex, '');
        let embedticketcimagem = new Discord.MessageEmbed()
        .setAuthor("Sistema de Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(msg2[0])
        .setImage(urlMsg[0])
        .setDescription(msg3)
        .setFooter("Atenciosamente, Nerus")
        let sent2 = await client.channels.cache.get(msg[0]).send(embedticketcimagem)
        sent2.react('🎫');
        
    } else {
        let embedticketsimagem = new Discord.MessageEmbed()
        .setAuthor("Sistema de Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(msg2[0])
        .setDescription(msg3)
        .setFooter("Atenciosamente, Nerus")
        let sent1 = await client.channels.cache.get(msg[0]).send(embedticketsimagem)
        sent1.react('🎫');
    }

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Sucesso, setup concluído, canal definido para abertura de tickets: <#"+msg[0]+"> <a:CheckVerde:817107349881618442>" )
        .setFooter("Atenciosamente, Nerus.")
    )
  },
};