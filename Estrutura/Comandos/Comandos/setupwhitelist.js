const Discord = require("discord.js");
const database = require('../../../Database.js')


module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
        
        .setFooter("Atenciosamente, Nerus.")
      );
    }

    const embedcanal = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Para iniciar a configuração envie o ID ou mencione o **CANAL** que será usado para novos usuários iniciarem a whitelist.")
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar enviar os dados solicitados acima.`)
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
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não mencionou um canal a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })

    msg[0] = msg[0].split('<').join('').split('#').join('').split('>').join('')

    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Não consegui encontrar este canal, verifique as minhas permissões e tente novamente <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus")
      );

    } 
//////////////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Qual será o **NÚMERO DE ACERTOS** que o usuário deve atingir para ser aprovado na whitelist \`1\` a \`8\`? Envie no chat.")
        
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar enviar os dados solicitados acima.`)
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
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou o número de acertos a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg2[0] === "parar" || msg2[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
    let verificanumero = Number(`${msg2[0]}`)
    function verificaquantia() {
        if (msg2[0] >= 1){
            if (msg2[0] <= 8) {
                return true
            } else return false
        } else return false
    }
    if (!verificanumero || !verificaquantia()) {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, informe um número de **1 a 8** para margem de acertos que o usuário deve alcançar para ser aprovado na whitelist <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }


////////////////////////

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Envie o ID ou mencione o **cargo(role)** que o usuário deverá receber **após ser aprovado** na whitelist.`)
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar as informações solicitadas acima.`)
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
        msg3 = collected.first().content.trim().split(/ +/g);;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou um cargo a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg3[0] === "parar" || msg3[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }

    msg3[0] = msg3[0].replace("<@&", "").replace(">", "");
    let verificacargo = message.guild.roles.cache.find(x => x.id === msg3[0]);
    let verificanumerocargo = Number(`${msg3[0]}`)

    
    /////////////////

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Mencione o canal em que os **RESULTADOS** das whitelists devem ser enviados.`)
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar as informações solicitadas acima.`)
        .setFooter("Atenciosamente, Nerus.")
    );
    let msg4;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
        errors: ["time"],
    })
    .then((collected) => {
        msg4 = collected.first().content.trim().split(/ +/g);;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não mencionou um canal a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })

    msg4[0] = msg4[0].replace("<", "").replace("#", "").replace(">", "");

    if (msg4[0] === "parar" || msg4[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    let canal2 = message.guild.channels.cache.find((c) => c.id === msg4[0]);
    if (!canal2) {
      return mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Não consegui encontrar este canal, verifique as minhas permissões e tente novamente <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus")
      );

    } 
////////////////////////////

    if (canal) {
        let salvarcanalwl = database.ref(`servidores/${message.guild.id}/configs`);
        salvarcanalwl.once('value', (snapshot) => {
            salvarcanalwl.update({
                canalwhitelist: msg[0]
            });
        })
    }
    if (verificanumero && verificaquantia()) {
        let salvarmargem = database.ref(`servidores/${message.guild.id}/configs`);
        salvarmargem.once('value', (snapshot) => {
            salvarmargem.update({
                margemacertoswhitelist: msg2[0]
            });
        })

    }
    if (verificacargo && verificanumerocargo) {
        let salvarcargoposwhitelist = database.ref(`servidores/${message.guild.id}/configs`);
        salvarcargoposwhitelist.once('value', (snapshot) => {
            salvarcargoposwhitelist.update({
                cargoposwhitelist: msg3[0]
            });
        })
    } else {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Não consegui encontrar este cargo, verifique o ID informado ou mencione o cargo novamente <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
    if (canal2) {
        let salvarcanalresultado = database.ref(`servidores/${message.guild.id}/configs`);
        salvarcanalresultado.once('value', (snapshot) => {
            salvarcanalresultado.update({
                canalresultadowl: msg4[0]
            });
        })
    }

    let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
    localizarprefixo.once('value', (snapshot) => {
        const prefix = snapshot.val();
        let embedwhitelist = new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription(`Olá querido mochileiro, seja bem-vindo a esta maravilhosa cidade!\n<:Microfone:817107348266942494> Deseja iniciar sua whitelist ? Utilize: \`${prefix}whitelist\``)
        .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
        .setFooter("Atenciosamente, Nerus.")
        client.channels.cache.get(msg[0]).send(embedwhitelist)
    })

    ///////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setTitle("<a:CheckVerde:817107349881618442> Nerus - Setup Whitelist <a:CheckVerde:817107349881618442>")
        .setColor(`#750dbb`)
        .setDescription(`Sucesso, setup finalizado! Confira abaixo as configurações definidas no setup:
        <a:setinha:817162990721302561> **Canal de Whitelist:** <#${msg[0]}>
        <a:setinha:817162990721302561> **Canal para Resultados da Whitelist:** <#${msg4[0]}>
        <a:setinha:817162990721302561> **Margem de Acertos:** \`${msg2[0]}\`
        <a:setinha:817162990721302561> **Cargo Após Ser Aceito na Whitelist:** <@&${msg3[0]}>
        <:Alerta:817107348065615933> Lembre-se, caso você informe dados incorretos o sistema de whitelist não funcionará.`)
        .setFooter("Atenciosamente, Nerus.")
    )

  },
};
