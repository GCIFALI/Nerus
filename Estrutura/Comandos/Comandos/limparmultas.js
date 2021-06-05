const database = require('../../../Database.js');
const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
        localizarprefixo.once('value', (snapshot) => {
            const prefixo = snapshot.val()
            let verificarcargopolicia = database.ref(`servidores/${message.guild.id}/configs/cargopolicia`);
            verificarcargopolicia.once('value', async (snapshot) => {
                const cargopolicia = snapshot.val()
                let verificarcargoadvogado = database.ref(`servidores/${message.guild.id}/configs/cargoadvogado`);
                verificarcargoadvogado.once('value', async (snapshot) => {
                    const cargoadvogado = snapshot.val()
                    if (cargopolicia == null || cargoadvogado == null) {
                        const embederrosemcargo = new Discord.MessageEmbed()
                        .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefixo}setuproleplay\``)
                        .setFooter("Atenciosamente, Nerus")
                        message.channel.send(embederrosemcargo)
                        return
                    }
                    if (message.member.roles.cache.has(cargopolicia || cargoadvogado)) {
                        if (message.member.roles.cache.has(cargopolicia)) {
                            const embed1 = new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Sistema de Limpeza de Multas", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Mencione ou envie o ID do usuário que você deseja limpar as multas.`)
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
                                    .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    .setDescription("Você não informou ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                                    .setFooter("Atenciosamente, Nerus")
                                );
                            })
                            if (error) return;
                            if (msg[0] === "parar" || msg[0] === "cancelar") {
                                mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus.")
                                )
                                return;
                            }
                    
                            const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
                            const verificaid = Number(`${idusuario}`)
                            if (!verificaid){
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    .setDescription(`Negado, informe um ID ou mencione um usuário válido <a:CheckVermelho:817107349306474547>`)
                                    .setFooter("Atenciosamente, Nerus.")
                                );
                                return;
                            } 
                            let localizarficha = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${idusuario}/multas`);
                            localizarficha.once('value', (snapshot) => {
                                let data = snapshot.val()
                                if (data == null) {
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setColor(`#750dbb`)
                                        .setDescription(`Negado, não existe nenhuma multa deste usuário em meu banco de dados <a:CheckVermelho:817107349306474547>`)
                                        .setFooter("Atenciosamente, Nerus.")
                                    );
                                } else {
                                    let limparficha = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${idusuario}`);
                                    limparficha.remove()
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setColor(`#750dbb`)
                                        .setDescription(`Multas limpas com sucesso <a:CheckVerde:817107349881618442>\n\n<a:sireneazul:820334680003575809> **Solicitador:** ${message.author}\n📁 **Usuário que teve suas multas limpas:** <@!${idusuario}>`)
                                        .setFooter("Atenciosamente, Nerus.")
                                    );
                                }
                            })
                        }
                      
    
                    } else {
                        const embedsempermissao = new Discord.MessageEmbed()
                        .setAuthor("Nerus - Limpeza de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription(`Negado, somente pessoas com o cargo <@&${cargopolicia}> ou <@&${cargoadvogado}> podem utilizar este comando <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus")
                        message.channel.send(embedsempermissao)
                    }
                    
                })
            })
        })
       
    }            
}