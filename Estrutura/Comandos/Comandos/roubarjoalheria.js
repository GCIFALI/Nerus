const Discord = require('discord.js');
const database = require(`../../../Database.js`)
const delaycaixinha = new Set();
module.exports = {
  run: async (client, message, args) => {
    let verificarcargopolicia = database.ref(`servidores/${message.guild.id}/configs/cargopolicia`);
    verificarcargopolicia.once('value', async (snapshot) => {
        const cargopolicia = snapshot.val()
        let localizarnomedinheirosujo = database.ref(`servidores/${message.guild.id}/configs/nomedinheirosujo`);
        localizarnomedinheirosujo.once('value',async (snapshot) => {
            let data = snapshot.val()
            if (data == null) {
                let checaritem = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens/${data}`);
                checaritem.once('value',async (snapshot) => {
                    let data2 = snapshot.val()
                    if (data2 == null || cargopolicia == null){
                        let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                        localizarprefixo.once('value', async (snapshot) => {
                            const prefix = snapshot.val();
                            let embederrosemsetup = new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefix}setuproleplay\``)
                            .setFooter("Atenciosamente, Nerus")
                            message.channel.send(embederrosemsetup)
                            return
                        })
                    } else {
                        let embederrosemsetup = new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription(`Erro crítico! Contate o meu criador imediatamente <a:CheckVermelho:817107349306474547>\nMeu criador: \`PR#0001\``)
                        .setFooter("Atenciosamente, Nerus")
                        message.channel.send(embederrosemsetup)
                        return;
                    }
                })
            } else {
                if (delaycaixinha.has(message.guild.id)){
                    let emebeddelay = new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, a joalheria ainda não se recuperou do ultimo roubo. Aguarde 50 minutos e tente novamente <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(emebeddelay)
                    return;

                } 
                let checaritem2 = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens/${data}`);
                checaritem2.once('value',async (snapshot) => {
                    let verificaitem = snapshot.val()
                    if (verificaitem !== null && cargopolicia !== null){
                        if (!message.member.roles.cache.has(cargopolicia)) {
                            delaycaixinha.add(message.guild.id);
                            setTimeout(() => {
                                delaycaixinha.delete(message.guild.id); 
                            }, 3000000);
                            let embed1 = new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Aguarde, estou iniciando o hackeamento do sistema <a:Loading:817110188002770976>`)
                            
                            .setFooter("Atenciosamente, Nerus.")
                            let mainMsg = await message.channel.send(embed1);
    
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█░░░░░░░░░░░░ 10%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 3000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **███░░░░░░░░░░░░ 20%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 5000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **████░░░░░░░░░░ 30%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 7000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **██████░░░░░░░░░ 40%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 9000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **███████░░░░░░░ 50%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 11000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████░░░░░░ 60%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 13000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████░░░░ 70%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 15000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **████████████░░░ 80%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 17000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████████░░ 90%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 19000);
                            setTimeout(function(){ 
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Aguarde, hackeamento em progresso <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **██████████ 100%**`)
                                    
                                    .setFooter("Atenciosamente, Nerus.")
                                )
                            }, 21000);
    
    
                            const valorparafail = Math.random() < 0.5
                            const valoraletorio = Math.floor(Math.random() * 15000) + 15000;
                            if (valorparafail) {
                                setTimeout(function(){ 
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setColor(`#750dbb`)
                                        .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setDescription(`Sucesso, por pouco que não consigo quebrar o firewall da joalheria <a:checkverde:817107349881618442>\n**Este Roubo Rendeu:** R$ ${valoraletorio},00 em dinheiro sujo `)
                                        .setImage("https://media.discordapp.net/attachments/807079371768070144/825201935773728788/giphy_1.gif")
                                        .setFooter("Atenciosamente, Nerus.")
                                    )
                                    let invautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/${data}`);
                                    invautorbusca.once('value', (snapshot) => {
                                        let mochila = snapshot.val()
                                        let attmochilauser = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}`);
                                        if (mochila == null) {
                                            attmochilauser.update({
                                                [data]: valoraletorio
                                            })
                                            return
                                        }
                                        let moneyautoratual = parseInt(mochila);
                                        let calculo = moneyautoratual + valoraletorio
                                        if (mochila){
                                            attmochilauser.update({
                                                [data]: calculo
                                            })
                                            return
                                        }
                                    })
                                }, 22000);
                            } else {
                                 setTimeout(async function(){ 
                                    mainMsg.delete()
                                    let hash1 = (Math.floor(Math.random() * 6543210 - 1543210) + 1543210)
                                    let hash2 = (Math.floor(Math.random() * 6543210 - 1543210) + 1543210)
                                    let hash3 = (Math.floor(Math.random() * 6543210 - 1543210) + 1543210)
                                    let hash4 = (Math.floor(Math.random() * 6543210 - 1543210) + 1543210)
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setColor(`#750dbb`)
                                        .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setDescription(`Erro, não consegui quebrar todos os hashs necessários, confira a lista abaixo e envie no chat o correto:\n\n<a:CheckVermelho:817107349306474547> | **${hash1}**\n<a:CheckVermelho:817107349306474547> | **${hash2}**\n<a:CheckVerde:817107349881618442> | **${hash3}**\n<a:CheckVermelho:817107349306474547> | **${hash4}**\n`)
                                        .setImage("https://media.discordapp.net/attachments/807079371768070144/825201935773728788/giphy_1.gif")
                                        .setFooter("Atenciosamente, Nerus.")
                                    )
                                    const embed1 = new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Erro, não consegui quebrar todos os hashs necessários, confira a lista abaixo e envie no chat o correto:\n\n<a:CheckVermelho:817107349306474547> | **${hash1}**\n<a:CheckVermelho:817107349306474547> | **${hash2}**\n<a:CheckVerde:817107349881618442> | **${hash3}**\n<a:CheckVermelho:817107349306474547> | **${hash4}**\n`)
                                    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar o hash correto antes que o firewall te derrube`)
                                    .setFooter("Atenciosamente, Nerus.")
                                    let mainMsg2 = await message.channel.send(embed1);
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
                                        mainMsg2.edit(
                                            new Discord.MessageEmbed()
                                            .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                            .setColor(`#750dbb`)
                                            .setDescription("Você não enviou um hash a tempo e foi descoberto pelo firewall <a:CheckVermelho:817107349306474547>")
                                            .setFooter("Atenciosamente, Nerus")
                                        );
                                    })
                                    const verificanumero = Number(`${msg[0]}`)
                                    if (verificanumero && msg[0] == hash3) {
                                        mainMsg2.edit(
                                            new Discord.MessageEmbed()
                                            .setColor(`#750dbb`)
                                            .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                            .setDescription(`Sucesso, por pouco que não consigo quebrar o firewall da joalheria <a:checkverde:817107349881618442>\n**Este Roubo Rendeu:** R$ ${valoraletorio},00 em dinheiro sujo `)
                                            .setImage("https://media.discordapp.net/attachments/807079371768070144/825201935773728788/giphy_1.gif")
                                            .setFooter("Atenciosamente, Nerus.")
                                        )
                                        let invautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/${data}`);
                                        invautorbusca.once('value', (snapshot) => {
                                            let mochila = snapshot.val()
                                            let attmochilauser = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}`);
                                            if (mochila == null) {
                                                attmochilauser.update({
                                                    [data]: valoraletorio
                                                })
                                                return
                                            }
                                            let moneyautoratual = parseInt(mochila);
                                            let calculo = moneyautoratual + valoraletorio
                                            if (mochila){
                                                attmochilauser.update({
                                                    [data]: calculo
                                                })
                                                return
                                            }
                                        })
    
    
                                    } else {
                                        mainMsg2.edit(
                                            new Discord.MessageEmbed()
                                            .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                            .setColor(`#750dbb`)
                                            .setDescription("Você não informou o hash correto e o firewall te expulsou <a:CheckVermelho:817107349306474547>")
                                            .setFooter("Atenciosamente, Nerus")
                                        );
                                        return;
                                    }
                                }, 22000);
    
                            }
                        } else {
                            const embedsempermissao = new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Roubo a Joalheria","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Qual foi seu policial, vai roubar mesmo? Mete o pé! <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus")
                            message.channel.send(embedsempermissao) 
                        }
                
                    } else {
                        message.reply("Algo deu errado, por favor refaça o **setuproleplay** novamente.")
                    }
                })
            }
        })
    })
  }
}