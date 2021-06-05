const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        const embederro3 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>

        <:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
        
        .setFooter("Atenciosamente, Nerus.")
        message.channel.send(embederro3)
        return;
    }
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Mencione ou envie o ID do usuário que você deseja adicionar money.`)
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
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
            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não informou um ID ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })
    if (msg[0] === "parar" || msg[0]  === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    
    const idusuariomoney = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
    const verificaid = Number(`${idusuariomoney}`)
    const verificaid2 = message.guild.members.cache.get(idusuariomoney)

    if (!verificaid) {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Erro, informe um usuário válido <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    } else if (!verificaid2){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Erro, você não pode adicionar money para um usuário que não esta no servidor <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;

    }

    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Envie a **quantidade** de money que você deseja adicionar`)
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
            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Você não enviou a quantidade a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });

    if (msg2[0] === "parar" || msg2[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }

    const verificanumero = Number(`${msg2[0]}`)
    if (verificanumero){
        if (msg2[0] >= 1){
            let localizarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${idusuariomoney}/money`);
            localizarmoney.once('value', (snapshot) => {
                let moneyatual = snapshot.val()
                let updatemoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${idusuariomoney}`);
                updatemoney.once('value', (snapshot) => {
                    let stringparanumero = parseInt(msg2[0]);
                    let stringparanumero2 = parseInt(moneyatual);
                    if (moneyatual == null) {
                        updatemoney.update({
                            money: [stringparanumero]
                        })
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, adicionei \`${msg2[0]}\` na conta do(a) <@!${idusuariomoney}> <a:bitcoin:822474150966591549>`)
                            .setFooter("Atenciosamente, Nerus.")
                        )
                    } else {
                        let calculo = stringparanumero2+stringparanumero
                        updatemoney.update({
                            money: [calculo]
                        })
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, adicionei \`${msg2[0]}\` na conta do(a) <@!${idusuariomoney}> <a:bitcoin:822474150966591549>`)
                            .setFooter("Atenciosamente, Nerus.")
                        )
                    }
                })

            })

        } else {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
            )
            return;
        }

    } else {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Adição de Money","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    }
  }
}