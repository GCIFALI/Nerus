const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args) => {
        let localizarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money`);
        localizarmoney.once('value', async (snapshot) => {
            let money = snapshot.val()
            if (money == null) {
                let errosemconta = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Desculpe, você não possui uma conta em nosso banco <a:bitcoin:822474150966591549> \n <a:setinha:817162990721302561>  Para criar uma conta realize um trabalho ou solicite que a equipe adicione um valor em sua conta.`)
                .setThumbnail("https://i.pinimg.com/originals/0b/f4/2e/0bf42e527bd585e6ebace4fefbb0c14d.gif")
                .setFooter("Atenciosamente, Nerus.")
                message.channel.send(errosemconta)
                return
            }

            if (money <= 0){
                let errosemmoney = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Desculpe, você não possui saldo suficiente em sua conta. \n <a:bitcoin:822474150966591549> **Seu saldo em conta:** R$ ${money}`)
                .setThumbnail("https://i.pinimg.com/originals/0b/f4/2e/0bf42e527bd585e6ebace4fefbb0c14d.gif")
                .setFooter("Atenciosamente, Nerus.")
                message.channel.send(errosemmoney)
                return;
            }

            const embed1 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Envie o ID ou mencione o usuário que você deseja fazer a transferência.`)
            .addField(`<a:bitcoin:822474150966591549> Seu saldo em conta:`, `R$ ${money}`)
            .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
            .setThumbnail("https://i.pinimg.com/originals/0b/f4/2e/0bf42e527bd585e6ebace4fefbb0c14d.gif")
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
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Você não informou ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
            })
            if (error) return;
            if (msg[0] === "parar" || msg[0] === "cancelar") {
                mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, informe um ID ou mencione um usuário válido <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            } 
            if (!verificaid2) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, você não pode realizar uma transferência para um usuário que não esta no servidor <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }
            if (idusuario == message.author.id) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, você não pode realizar uma transferência para si mesmo <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }

            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Quanto você gostaria de transferir para o <@!${idusuario}> ? Envie o valor no chat.`) 
                .addField(`<a:bitcoin:822474150966591549> Seu saldo em conta:`, `R$ ${money}`)       
                .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                .setThumbnail("https://i.pinimg.com/originals/0b/f4/2e/0bf42e527bd585e6ebace4fefbb0c14d.gif")
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
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                )
                return;
            }

            let verificavalor = Number(`${msg2[0]}`)
            if (verificavalor) {
                let stringparanumero = parseInt(msg2[0]);
                if (stringparanumero >= 1) { 
                    let atualizarvalorautor = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}`);
                    let valorautor = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money`);
                    valorautor.once('value', (snapshot) => {
                        let moneyautorstring = snapshot.val()
                        let moneyautor = parseInt(moneyautorstring);
                        let calculo = moneyautor-stringparanumero
                        if (calculo < 0) {
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Negado, você não possui esta quantia em sua conta <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus.")
                            )
                            return;
                        }
                        atualizarvalorautor.update({
                            money: calculo
                        })
                        let valoralvo = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${idusuario}/money`);
                        valoralvo.once('value', (snapshot) => {
                            let moneyalvo = snapshot.val()
                            let stringparanumero2 = parseInt(moneyalvo);
                            let atualizarvaloralvo = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${idusuario}`);
                            if (moneyalvo <= 0) {
                                atualizarvaloralvo.update({
                                    money: stringparanumero
                                })
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Sucesso, você transferiu ${msg2[0]} para conta bancário do(a) <@!${idusuario}> <a:bitcoin:822474150966591549>\n<a:bitcoin:822474150966591549> Seu saldo em conta atual: **R$ ${calculo}**`)       
                                    .setThumbnail("https://i.pinimg.com/originals/0b/f4/2e/0bf42e527bd585e6ebace4fefbb0c14d.gif")
                                );
                                return;
                            } 
                            if (moneyalvo >=1) {
                                let calculoalvo = stringparanumero2+stringparanumero
                                atualizarvaloralvo.update({
                                    money: calculoalvo
                                })
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Sucesso, você transferiu **R$ ${msg2[0]}** para conta bancário do(a) <@!${idusuario}> <a:bitcoin:822474150966591549>\n<a:bitcoin:822474150966591549> Seu saldo em conta atual: **R$ ${calculo}**`)      
                                    .setThumbnail("https://i.pinimg.com/originals/0b/f4/2e/0bf42e527bd585e6ebace4fefbb0c14d.gif")
                                );
                                return;
                            }
                        })
                    })
                } else {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription("Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus.")
                    )
                }
            } else {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Transferência","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                )
            }

            
            







        })
    }
}