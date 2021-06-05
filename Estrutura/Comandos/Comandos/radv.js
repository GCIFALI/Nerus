const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
        let embederro1 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Erro, você não tem permissão para utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`BAN_MEMBERS\``)
        .setFooter("Atenciosamente, Nerus.")
        message.channel.send(embederro1)
        return;
    }
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Mencione ou envie o ID do usuário que você deseja remover a advertência`)
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
            .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription("Você não informou um ID a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })
    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    
    const idadvertencia = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
    const verificaid = Number(`${idadvertencia}`)
    if (!verificaid){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription(`Negado, informe um ID de um usuário válido <a:CheckVermelho:817107349306474547>`)
            .setFooter("Atenciosamente, Nerus.")
        );
        return;
    } 

//////////////////////////////////
    mainMsg.edit(
        new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Você tem certeza que deseja remover uma advertência do usuário ? Se deseja continuar envie \`confirmar\` `)
        
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
        msg2 = collected.first().content.trim().split(/ +/g);;
        collected.first().delete();
    })
    .catch((err) => {
        error = true;
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Você não enviou a confirmação a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
        return;
    });
    if (msg2[0] === "parar" || msg2[0] === "cancelar") {
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
        )
        return;
    } else if (msg2[0] == "confirmar") {
        const localizaradvertencia = database.ref(`servidores/${message.guild.id}/advertencias/${idadvertencia}`);
        localizaradvertencia.once('value', (snapshot) => {
            const data = snapshot.val()
            if (data == null) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    
                    .setColor(`#750dbb`)
                    .setDescription("Negado, este usuário não possui nenhuma advertência <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                )

            } else {
                if (data <= 0) {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        
                        .setColor(`#750dbb`)
                        .setDescription("Negado, este usuário não possui nenhuma advertência <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus.")
                    )
                    localizaradvertencia.remove()
                } else {
                    let setarquantia = database.ref(`servidores/${message.guild.id}/advertencias`);
                    setarquantia.once('value', (snapshot) => {
                        setarquantia.update({
                            [idadvertencia]: data-1
                        }); 
                    })
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus -  Remoção de Advertência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        
                        .setColor(`#750dbb`)
                        .setDescription(`Sucesso, removi 1 advertência e agora o usuário possui \`${data-1}\` advertências`)
                        .setFooter("Atenciosamente, Nerus.")
                    )
                }
            }
        })

    }
  },
};