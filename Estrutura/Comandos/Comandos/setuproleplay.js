const Discord = require("discord.js");
const database = require('../../../Database.js')


module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
        
        .setFooter("Atenciosamente, Nerus.")
      );
    }

    const embedcanal = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Setup Roleplay ","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription("Envie no chat o ID ou mencione o cargo dos **policiais**.")
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
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não mencionou ou enviou um ID a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })

    if (msg[0] === "parar" || msg[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
    msg[0] = msg[0].replace("<@&", "").replace(">", "");
    let verificacargo = message.guild.roles.cache.find(x => x.id === msg[0]);
    let verificanumerocargo = Number(`${msg[0]}`)
    if (!verificacargo || !verificanumerocargo){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, mencione ou envie o ID de um cargo válido <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return
    }

    //////////////////////

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie no chat o ID ou mencione o cargo dos **advogados**.")
        
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar a mensagem.`)
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
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não informou um cargo a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (error) return;
    msg2[0] = msg2[0].replace("<@&", "").replace(">", "");
    let verificacargo2 = message.guild.roles.cache.find(x => x.id === msg2[0]);
    let verificanumerocargo2 = Number(`${msg2[0]}`)
    if (!verificacargo2 || !verificanumerocargo2){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, mencione ou envie o ID de um cargo válido <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return
    }

/////////////////////////////////

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Alguns sistemas precisam que você crie um item para ser o dinheiro sujo, por favor envie no chat **o nome do seu item para dinheiro sujo** (exemplo: Dinheiro-Sujo).")
        .addField(`<:6773_Alert1:817107347356254320>  Atenção:`, `Espaços em branco e carácteres como: \`".", "#", "$", "/", "[", ou "]"\` não são aceitos e serão removidos automáticamente`)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar a mensagem.`)
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
        msg3 = collected.first().content.toUpperCase().trim().split(/ +/g)
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não informou um nome a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (error) return;
    if (msg3[0] == '' || msg3[0] == null){
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
        message.author.send(embedantibug) && mainMsg.edit(embedantibug)
        let embedpr = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Log Seguranças", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .addFields(
            { name: `Nome do servidor:`, value: `- ${message.guild.name}`},
            { name: 'ID do servidor:', value: `- ${message.guild.id}`},
            { name: 'ID dono do servidor:', value: `- ${message.guild.owner.id}`},
            { name: `Nome autor:`, value: `- ${message.author.username}`},
            { name: `ID autor:`, value: `- ${message.author.id}`},
            { name: `Local:`, value: `- Setup Roleplay`}       
        )
        .setFooter("Atenciosamente, Nerus.")  
        client.channels.cache.get("821549752911003709").send(embedpr)
        return;
    }

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Você precisa definir um valor para que novas pessoas recebam assim que entrarem em sua cidade. Envie o valor no chat.")
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar a mensagem.`)
        .setFooter("Atenciosamente, Nerus.")
    );
    error = false;
    let msg4;
    await message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 40000,
        errors: ["time"],
    })
    .then((collected) => {
        msg4 = collected.first().content.toUpperCase().trim().split(/ +/g)
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não informou um valor a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (error) return;

    //////////////////
    let salvaridcargopolicia = database.ref(`servidores/${message.guild.id}/configs`);
    salvaridcargopolicia.update({
        cargopolicia: msg[0]
    });
    let salvaridcargoadvogado = database.ref(`servidores/${message.guild.id}/configs`);
    salvaridcargoadvogado.update({
        cargoadvogado: msg2[0]
    });
    const filtro = msg3[0].split('.').join('').split('#').join('').split('$').join('').split('/').join('').split('[').join('').split(']').join('').split(/\s/g).join('').split(`,`).join('').split(`"`).join('').split(`''`).join('').split("``").join('')
    let localizarnomedinheirosujo = database.ref(`servidores/${message.guild.id}/configs/nomedinheirosujo`);
    localizarnomedinheirosujo.once('value', (snapshot) => {
        let data = snapshot.val()
        if (data !== null) {
            let deletaritemantigo = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens`);
            deletaritemantigo.update({
                [data]: null
            })
        }
        let criaritem = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens`);
        criaritem.update({
            [filtro]: 519345
        }); 
        let criaritemconfig = database.ref(`servidores/${message.guild.id}/configs`);
        criaritemconfig.update({
            nomedinheirosujo: filtro
        })
    })
    let verificanumero = Number(`${msg4[0]}`)
    let stringnumero = parseInt(msg4[0])
    if (verificanumero) {
        if (stringnumero >= 1){
            if (stringnumero <= 9000000) {
                let salvarmoneyinicial = database.ref(`servidores/${message.guild.id}/configs`);
                salvarmoneyinicial.update({
                    moneyinicial: stringnumero
                })
            } else {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, o valor inicial não pode ser maior que **9000000** <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
                return;
            }
        } else {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Negado, informe um número válido <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        }
    } else {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Setup Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, informe um número válido <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    }
    ///////////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setTitle("<a:CheckVerde:817107349881618442> Nerus - Setup Roleplay  <a:CheckVerde:817107349881618442>")
        .setColor(`#750dbb`)
        .setDescription(`Sucesso, setup finalizado! Confira abaixo as configurações definidas no setup:\n<a:setinha:817162990721302561> **Cargo Polícial:** <@&${msg[0]}>\n<a:setinha:817162990721302561> **Cargo Advogado:** <@&${msg2[0]}>\n<a:setinha:817162990721302561> **Item Dinheiro Sujo:** ${filtro}\n<a:setinha:817162990721302561> **Dinheiro Inicial:** ${msg4[0]}`)
        .setFooter("Atenciosamente, Nerus.")
    )
  },
};
