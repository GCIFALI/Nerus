const Discord = require(`discord.js`)
const database = require('../../../Database')
module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embederro3 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Troca de prefixo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro3)
            return;
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Troca de prefixo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie no chat o novo prefixo")
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **10 segundos** para enviar um novo prefixo.`)
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
            if (msg === "parar" || msg === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Troca de Prefixo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }
            let novoprefixo = database.ref(`servidores/${message.guild.id}/configs`);
            novoprefixo.update({
                prefix: msg[0]
            });
            let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
            localizarprefixo.once('value', (snapshot) => {
                let prefix = snapshot.val();
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Troca de prefixo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Sucesso, novo prefixo setado <a:CheckVerde:817107349881618442>

                    <a:setinha:817162990721302561> **Novo Prefixo:** \`${prefix}\``)
                    
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            })
          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setAuthor("Nerus - Troca de Prefixo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Você não informou um prefixo a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        });
        if (error) return;

        
    }
}