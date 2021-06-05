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
                if (cargopolicia == null) {
                    const embederrosemcargo = new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefixo}setuproleplay\``)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(embederrosemcargo)
                    return
                }
                if (message.member.roles.cache.has(cargopolicia)) {
                    const embed1 = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Mencione ou envie o ID do usuário que você deseja multar.`)
                    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **15 segundos** para mencionar ou enviar o ID`)
                    .setFooter("Atenciosamente, Nerus.")
                    let mainMsg = await message.channel.send(embed1);
                    error = false;
                    let msg;
                    await message.channel
                    .awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 120000,
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
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Você não informou ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                    })
                    if (error) return;
                    if (msg[0] === "parar" || msg[0] === "cancelar") {
                        mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus.")
                        )
                        return;
                    }
            
                    const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
                    const verificaid = Number(`${idusuario}`)
                    const verificaid2 = message.guild.members.cache.get(idusuario)
                    if (!verificaid){
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Negado, informe um ID ou mencione um usuário válido <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    } 
                    if (!verificaid2) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Negado, você não pode multar uma pessoa que não está no servidor <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    }
            
                    ///////////////////////////////////////////
            
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Envie no chat o valor da multa que você deseja aplicar no usuário `)
                        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **2 minutos** para enviar a o valor da multa.`)
                        .setFooter("Atenciosamente, Nerus.")
                    );
                    error = false;
                    let msg2;
                    await message.channel
                    .awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 120000,
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
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Você não enviou as informações a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                        return;
                    });
                    if (error) return;
                    if (msg2[0] === "parar" || msg2[0] === "cancelar") {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                        return;
                    }
                    let verificanumero = Number(`${msg2[0]}`)
                    if (!verificanumero || msg2[0] < 1) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Negado, informe um valor válido <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                        return;
                    }

                    if (verificanumero && msg2[0] >= 1) {
                        let buscarmultas = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${idusuario}/multas`)
                        buscarmultas.once('value', (snapshot) => {
                            let data = snapshot.val()
                            let salvarmulta = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${idusuario}`)
                            let stringparanumero = parseInt(data)
                            let stringparanumero2 = parseInt(msg2[0])
                            if (data == null){
                                salvarmulta.update({
                                    multas: stringparanumero2
                                })
                            } else {
                                let calculo = stringparanumero+stringparanumero2
                                salvarmulta.update({
                                    multas: calculo
                                })
                            }
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription(`Sucesso, você multou o usuário em **R$ ${msg2[0]},00** <a:CheckVerde:817107349881618442>`)
                                .setFooter("Atenciosamente, Nerus.")
                            )
                            return
                        })
                      
                    } else {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Erro, informe um crime/ocorrência válidos <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                    }
                } else {
                    const embedsempermissao = new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Multa","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    
                    .setDescription(`Negado, somente pessoas com o cargo <@&${cargopolicia}> podem utilizar este comando <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(embedsempermissao)
                }
            })
        })
       
    }            
}