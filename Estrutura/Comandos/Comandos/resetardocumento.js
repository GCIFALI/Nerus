const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embederro3 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Resetar Documento")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro3)
            return;
        }

        const embed1 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Resetar Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Mencione ou envie o ID do usuário que você deseja resetar o documento.`)
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
                .setAuthor("Nerus -  Resetar Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Você não informou um ID ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
        })
        if (msg[0] === "parar" || msg[0] === "cancelar") {
          mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus -  Resetar Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
          )
          return;
        }
        
        const iddocumentouser = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
        const verificaid = Number(`${iddocumentouser}`)
        if (!verificaid){
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus -  Resetar Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription(`Negado, informe um ID de um usuário válido <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
            );
            return;
        } 
        let buscardocumento = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${iddocumentouser}`)
        buscardocumento.once('value', (snapshot) => {
            let data = snapshot.val()
            if (data == null) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus -  Resetar Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, este usuário não possui um documento ativo em meu banco de dados <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            } else{ 
                buscardocumento.remove()
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus -  Resetar Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Sucesso, documento do usuário resetado <a:CheckVerde:817107349881618442>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
            }
        })

    
    }
}