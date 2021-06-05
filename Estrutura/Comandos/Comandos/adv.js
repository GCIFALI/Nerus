const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
        let embederro1 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Erro, você não tem permissão para utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`BAN_MEMBERS\``)
        .setFooter("Atenciosamente, Nerus.")
        message.channel.send(embederro1)
        return;
    }
    if(!message.guild.me.hasPermission("BAN_MEMBERS")){
        let embederro2 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Erro, verfique as minhas permissões e tente novamente <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`BAN_MEMBERS\``)
        .setFooter("Atenciosamente, Nerus.")
        message.channel.send(embederro2)
        return;
    }
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Mencione ou envie o ID do usuário que você deseja aplicar a advertência.`)
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
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription("Você não informou um ID ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })
    if (msg[0] === "parar" || msg[0]  === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    
    const idadvertencia = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
    const verificaid = Number(`${idadvertencia}`)
    const verificaid2 = message.guild.members.cache.get(idadvertencia)
    if (!verificaid){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription(`Negado, informe um ID de um usuário válido <a:CheckVermelho:817107349306474547>`)
            .setFooter("Atenciosamente, Nerus.")
        );
        return;
    } else {
        if (!verificaid2){
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                
                .setDescription(`Negado, você não pode advertir um usuário que não está no seu servidor <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
            );
            return;
        }
    }

//////////////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Qual o motivo da advertência? Envie o motivo no chat.`)
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar o motivo da advertência`)
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
        msg2 = collected.first().content
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou o motivo da advertência a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg2.length > 1024) {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Negado, o motivo informado é muito grande, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    } else {
        if (msg2 === "parar" || msg2 === "cancelar") {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                
                .setColor(`#750dbb`)
                .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
            )
            return;
        }
    }
    if (msg2 == '' || msg2 == null){
        let setarblacklist2 = database.ref(`blacklist/users/${message.author.id}`);
        setarblacklist2.update({
            barrado: "true"
        })
        let embedantibug = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Segurança", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Negado, sem tentar bugar amigão! A partir de hoje você esta em minha blacklist, achou ruim? Reclama com o Milton <a:CheckVermelho:817107349306474547>`)
        .setImage("https://media.discordapp.net/attachments/807079371768070144/823656541626171432/CX_gMCFWMAETGOo.jpg")
        .setFooter("Atenciosamente, Nerus.")     
        canalcriadowhitelist.delete()
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
            { name: `Local:`, value: `- ADV`}       
        )
        .setFooter("Atenciosamente, Nerus.")  
        client.channels.cache.get("821549752911003709").send(embedpr)
        return;
    }
    const motivoadv = msg2
////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Em qual canal eu devo enviar a advertência? Envie o ID do canal ou mencione ele utilizando \`#nomedocanal\`")
        
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para informar um canal.`)
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
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não informou um canal a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg3[0] === "parar" || msg3[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
    const canalinformado = msg3[0].replace("<#", '').replace(">", '');
    const verificacanal = Number(`${canalinformado}`)
    const verificacanal2 = message.guild.channels.cache.get(canalinformado)

    if (!verificacanal || !verificacanal2) {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Negado, informe um canal válido <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }


    //////////////////////////////////
    if (verificaid && verificaid2) {
        const checaadv = database.ref(`servidores/${message.guild.id}/advertencias`);
        checaadv.once('value', (snapshot) => {
            let data = snapshot.val()
            if (data == null) {
                checaadv.set({
                    [idadvertencia]: 0
                });
            }
            let checaquantidade = database.ref(`servidores/${message.guild.id}/advertencias/${idadvertencia}`);
            checaquantidade.once('value', (snapshot) => {
                const quantidadedeadv = snapshot.val()
                checaadv.once('value', (snapshot) => {
                    let data = snapshot.val()
                    if (data !== null) {
                        checaadv.update({
                            [idadvertencia]: quantidadedeadv+1
                        });    
                    }
                    let quantidadedeadvfix = quantidadedeadv+1
                    if (quantidadedeadvfix >= 3) {
                        let alvo = message.guild.members.cache.get(idadvertencia)
                        if (alvo) {
                            if (!alvo.bannable) {
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    
                                    .setDescription("Erro, não posso banir uma pessoa que **não esteja no servidor** ou que esteja em um **cargo mais alto que o meu** <a:CheckVermelho:817107349306474547>")
                                    .setFooter("Atenciosamente, Nerus.")
                                );
                            } else {
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    
                                    .setDescription(`Sucesso, o usuário foi banido automaticamente por atingir a **terceira** advertência <a:CheckVerde:817107349881618442>\n<:Microfone:817107348266942494> **Removi as advertências do usuário** do meu banco de dados, caso o mesmo seja desbanido ele **não** possuirá mais advertências`)
                                    .setFooter("Atenciosamente, Nerus.")
                                );
                                alvo.ban({reason: "Nerus - Terceira advertência!"})
                                let excluiradv = database.ref(`servidores/${message.guild.id}/advertencias/${idadvertencia}`);
                                excluiradv.remove()
                            }
                        }
                    } else {
                        const embedadv = new Discord.MessageEmbed()
                        .setTitle("Nova Punição Registrada!")
                        .setColor(`#750dbb`)
                        .addFields(
                            {name: "Usuário:", value:`<@!`+idadvertencia+`>`, inline: true},
                            {name: "Punição:", value:`${quantidadedeadv+1}/3`, inline: true},
                            {name: "Punido por:", value:message.author},
                            {name: "Motivo:", value:`- `+motivoadv})
                        client.channels.cache.get(canalinformado).send(embedadv)
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, advertência setada e enviada no canal <#`+canalinformado+`> <a:CheckVerde:817107349881618442>`)
                            .setFooter("Atenciosamente, Nerus.")
                        )
                    }
                })

            })
        })
    }
  },
};