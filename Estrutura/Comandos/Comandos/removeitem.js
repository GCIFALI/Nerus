const database = require('../../../Database.js');
const Discord = require('discord.js');
module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            let embedsempermissao = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Remoção de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embedsempermissao)
            return;
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`**Mencione o usuário ou envie o ID** que você deseja remover o item.`)
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
        
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
            msg = collected.first().content.trim().split(/ +/g);;
            collected.first().delete();
        })
        .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
              .setColor(`#750dbb`)
              .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
              .setDescription(`Você não mencionou um usuário ou enviou um ID a tempo, operação cancelada <a:CheckVermelho:817107349306474547>`)
              .setFooter("Atenciosamente, Nerus.")     
            );
            return;
        });
        if (error) return;

        if (msg[0] === "parar" || msg[0] === "cancelar") {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
            );
            return;
        }

        const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
        const verificaid = Number(`${idusuario}`)
        const verificaid2 = message.guild.members.cache.get(idusuario)
        if (!verificaid || !verificaid2) {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Erro, você não pode remover um item de um usuário que não esta no servidor <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
            );
        } 

/////////////////////////////////////////////

        let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${idusuario}`);
        localizaritens.once('value', async (snapshot) => {
            const data = snapshot.val()
            let data2 = require('util').inspect(data)
            if (data == null){
                mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Negado, não existe nenhum item na mochila deste usuário <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
                )
                return;
            }
            mainMsg.edit(
                new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**Qual item** você deseja remover deste usuário?`)
                    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                    .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
                );
                let msg2;
                await message.channel 
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 40000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg2 = collected.first().content.toUpperCase()
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    mainMsg.edit(
                      new Discord.MessageEmbed()
                      .setColor(`#750dbb`)
                      .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                      .setDescription(`Você não informou um item a tempo, operação cancelada <a:CheckVermelho:817107349306474547>`)
                      .setFooter("Atenciosamente, Nerus.")     
                    );
                    return;
                });
                if (error) return;
    
                if (msg2 === "parar" || msg2 === "cancelar") {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus.")     
                    );
                    return;
                }
                let itens = data
                const checar = itens[`${msg2}`]
                if (!checar) {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Erro, nenhum item com este nome foi encontrado na mochila do usuário, verifique a mochila do usuáiro e tente novamente <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus.")     
                    );
                    return;
                }

                localizaritens.update({
                    [msg2]: null
                })
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Remoção de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Sucesso, item removido da mochila do usuário <a:CheckVerde:817107349881618442>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );




        })
    }            
}