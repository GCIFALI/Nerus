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
                            .setAuthor("Nerus - Sistema de Roubo a AmmuNation","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefix}setuproleplay\``)
                            .setFooter("Atenciosamente, Nerus")
                            message.channel.send(embederrosemsetup)
                            return
                        })
                    } else {
                        let embederrosemsetup = new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Roubo a AmmuNation","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                    .setAuthor("Nerus - Sistema de Roubo a AmmuNation","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, a Ammu Nation não se recuperou ainda do ultimo roubo. Aguarde 10 minutos e tente novamente <a:CheckVermelho:817107349306474547>`)
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
                            }, 400000);
                            let localizarnomedinheirosujo = database.ref(`servidores/${message.guild.id}/configs/nomedinheirosujo`);
                            localizarnomedinheirosujo.once('value',async (snapshot) => {
                                let valoraletorio = Math.floor(Math.random() * 3500) + 2500;
                                let data = snapshot.val()
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
                                message.channel.send(`${message.author}`)
                                let embed1 = new Discord.MessageEmbed()
                                .setColor(`#750dbb`)
                                .setAuthor("Nerus - Sistema de Hackeamento de Caixa Eletrônico","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setDescription(`Sucesso, você rendeu o vendedor e roubou o caixa eletrônico da Ammu Nation <a:checkverde:817107349881618442>\n**Este Roubo Rendeu:** R$ ${valoraletorio},00 em dinheiro sujo `)
                                .setImage("https://thumbs.gfycat.com/BlaringSlipperyGermanspitz-small.gif")
                                .setFooter("Atenciosamente, Nerus.")
                                message.channel.send(embed1);
                            })
    
                        } else {
                            const embedsempermissao = new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Roubo a AmmuNation","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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