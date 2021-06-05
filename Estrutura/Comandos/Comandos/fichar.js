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
                    .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    
                    .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefixo}setuproleplay\``)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(embederrosemcargo)
                    return
                }
                if (message.member.roles.cache.has(cargopolicia)) {
                    const embed1 = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Mencione ou envie o ID do usuário que você deseja fichar.`)
                    
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
                            .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription("Você não informou ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                    })
                    if (error) return;
                    if (msg[0] === "parar" || msg[0] === "cancelar") {
                        mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        
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
                            .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
        
                            .setDescription(`Negado, informe um ID ou mencione um usuário válido <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    } 
                    if (!verificaid2) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription(`Negado, você não pode fichar uma pessoa que não está no servidor <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    }
            
                    ///////////////////////////////////////////
            
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Envie a ocorrência ou crime que você deseja adicionar na ficha do usuário. `)
                        
                        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **2 minutos** para enviar a ocorrência ou crime.`)
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
                        msg2 = collected.first().content;
                        collected.first().delete();
                    })
                    .catch((err) => {
                        error = true;
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            
                            .setColor(`#750dbb`)
                            .setDescription("Você não enviou as informações a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                        return;
                    });
                    if (error) return;
                    if (msg2 === "parar" || msg2 === "cancelar") {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            
                            .setColor(`#750dbb`)
                            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                        return;
                    }
                    if (msg2.length > 150) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            
                            .setColor(`#750dbb`)
                            .setDescription("As informações inseridas são grandes demais, resuma o acontecido e tente novamente <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                        return;
                    }
                    if (msg2) {
                        let localizarquantia2 = database.ref(`servidores/${message.guild.id}/roleplayconsole/fichas/${idusuario}/quantidade`);
                        localizarquantia2.once('value', (snapshot) => {
                            let data2 = snapshot.val()
                            if (data2 == null){
                                localizarquantia2.update({
                                    fichas: 0
                                });  
                            }
                            let quantidadecerta = database.ref(`servidores/${message.guild.id}/roleplayconsole/fichas/${idusuario}/quantidade/fichas`);
                            quantidadecerta.once('value', (snapshot) => {
                                let quantiadefichas = snapshot.val()
                                let setarquantidade = database.ref(`servidores/${message.guild.id}/roleplayconsole/fichas/${idusuario}/quantidade`);
                                if (quantiadefichas >= 12){
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        
                                        .setColor(`#750dbb`)
                                        .setDescription("Negado, somente servidores verificados podem adicionar mais de 12 ocorrências/crimes na ficha de um usuário <a:CheckVermelho:817107349306474547>")
                                        .setFooter("Atenciosamente, Nerus.")
                                    )
                                } else {
                                    setarquantidade.update({
                                        fichas: quantiadefichas+1
                                    });
                                    let fichar = database.ref(`servidores/${message.guild.id}/roleplayconsole/fichas/${idusuario}/dados`);
                                    fichar.update({
                                        [quantiadefichas+1]: msg2
                                    });   
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setColor(`#750dbb`)
                                        .setImage("https://i.makeagif.com/media/7-30-2018/1x7nzS.gif")
                                        .setDescription(`Sucesso, \`${msg2}\` foi adicionado a ficha criminal do(a) <@!${idusuario}> `)
                                        .setFooter("Atenciosamente, Nerus.")
                                    )
                                }
                            })
                            
                        })
                    } else {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Fichagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            
                            .setColor(`#750dbb`)
                            .setDescription("Erro, informe um crime/ocorrência válidos <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                    }
                } else {
                    const embedsempermissao = new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    
                    .setDescription(`Negado, somente pessoas com o cargo <@&${cargopolicia}> podem utilizar este comando <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(embedsempermissao)
                }
            })
        })
       
    }            
}