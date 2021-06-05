const Discord = require('discord.js')
const database = require('../../../Database.js');
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
                    .setAuthor("Nerus - Sistema de Banco", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefixo}setuproleplay\``)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(embederrosemcargo)
                    return
                }

                if (message.member.roles.cache.has(cargopolicia)) {
                    let embed1 = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Banco", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Olá senhor(a) polícial, seja bem-vindo(a) ao meu banco, eu sou o Nerus, como posso te ajudar? \n\n **Selecione uma opção abaixo para prosseguir:** \n <a:setinha:817162990721302561> **1** - Verificar o **seu** saldo em conta. \n <a:setinha:817162990721302561> **2** - Verificar o saldo em conta de um **usuário**. `)
                    .setFooter("Atenciosamente, Nerus.")
                    let mainMsg = await message.channel.send(embed1);
                    error = false;
                    let msg;
                    await message.channel
                    .awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 25000,
                        errors: ["time"],
                    })
                    .then((collected) => {
                        msg = collected.first().content
                        collected.first().delete();
                    })
                    .catch((err) => {
                        error = true;
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Você não informou uma opção a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                    })
                    if (error) return;
                    if (!msg) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Negado, informe uma opção válida <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                            )
                        return;
                    }
                    if (msg == '1') {
                        mainMsg.delete()
                        let localizarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money`);
                        localizarmoney.once('value', (snapshot) => {
                            let money = snapshot.val()
                            if (money != null) {
                                let embed = new Discord.MessageEmbed()
                                .setColor(`#750dbb`)
                                .setDescription(`<a:bitcoin:822474150966591549>    **CONTA BANCÁRIA** <a:bitcoin:822474150966591549> \n\nSaldo em conta: **R$ ${money}**`)
                                .setFooter(`Conta bancária de ${message.author.username}`)
                                .setThumbnail("https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif")
                                
                                message.channel.send(embed)
                
                            } else {
                                let embed2 = new Discord.MessageEmbed()
                                .setColor(`#750dbb`)
                                .setDescription(`<a:bitcoin:822474150966591549>    **CONTA BANCÁRIA** <a:bitcoin:822474150966591549> \n\nDesculpe ${message.author}, você não possui uma conta em nosso banco, caso deseje criar uma basta iniciar um trabalho ou solicitar que a prefeitura adicione um valor em sua conta.`)
                                .setThumbnail("https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif")
                                .setFooter("Atenciosamente, Nerus.")
                                
                                message.channel.send(embed2)
                            }
                        })
                        return
                    } else if (msg == '2'){
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Eita, espero que ele(a) não esteja encrencado(a), hein?! **Envie o ID ou mencione** o usuário que você deseja consultar o saldo.  `)        
                            .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        error = false;
                        let msg2;
                        await message.channel
                        .awaitMessages((m) => m.author.id === message.author.id, {
                            max: 1,
                            time: 20000,
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
                                .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                                .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus.")
                            )
                            return;
                        }
                        const idconsultado = msg2[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
                        const verificaid = Number(`${idconsultado}`)
                        const verificaid2 = message.guild.members.cache.get(idconsultado)

                        if (verificaid && verificaid2) {
                            let localizarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${idconsultado}/money`);
                            localizarmoney.once('value', (snapshot) => {
                                let money = snapshot.val()
                                if (money != null) {
                                    mainMsg.edit ( new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setDescription(`<a:bitcoin:822474150966591549>    **CONTA BANCÁRIA** <a:bitcoin:822474150966591549> \n
                                    Saldo em conta: **R$ ${money}**`)
                                    .setFooter(`Consultada pelo(a) agente ${message.author.username}`)
                                    .setThumbnail("https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif")
                                    );
                    
                                } else {
                                    mainMsg.edit ( new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setDescription(`<a:bitcoin:822474150966591549>    **CONTA BANCÁRIA** <a:bitcoin:822474150966591549> \n\nDesculpe senhor(a) policial, o usuário que você deseja consultar não possuí uma conta em nosso banco, se eu puder te ajudar com mais alguma coisa me deixe saber.`)
                                    .setThumbnail("https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif")
                                    .setFooter("Atenciosamente, Nerus.")
                                    )
                                }
                            })
                        } else {
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Negado, por favor mencione ou envie o ID de um usuário válido <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus.")
                            )
                            return;

                        }
                    } else {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Banco","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Negado, por favor selecione uma opção válida <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        )
                        return;
                    }
                } else {
                    let localizarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money`);
                    localizarmoney.once('value', (snapshot) => {
                        let money = snapshot.val()
                        if (money != null) {
                            let embed = new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setDescription(`<a:bitcoin:822474150966591549>    **CONTA BANCÁRIA** <a:bitcoin:822474150966591549> \n\nSaldo em conta: **R$ ${money}**`)
                            .setFooter(`Conta bancária de ${message.author.username}`)
                            .setThumbnail("https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif")
                            message.channel.send(embed)
            
                        } else {
                            let embed2 = new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setDescription(`<a:bitcoin:822474150966591549>    **CONTA BANCÁRIA** <a:bitcoin:822474150966591549> \n\nDesculpe ${message.author}, você não possui uma conta em nosso banco, caso deseje criar uma basta iniciar um trabalho ou solicitar que a prefeitura adicione um valor em sua conta.`)
                            .setThumbnail("https://i.pinimg.com/originals/81/d2/00/81d200d48f6d13e1c132ecf37b7606b1.gif")
                            .setFooter("Atenciosamente, Nerus.")
                            message.channel.send(embed2)
                        }
                    })
                }
            })
        })
    }
}