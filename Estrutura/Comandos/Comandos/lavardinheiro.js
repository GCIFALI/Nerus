const Discord = require('discord.js')
const database = require(`../../../Database.js`)

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
                        localizarprefixo.once('value', (snapshot) => {
                            const prefix = snapshot.val();
                            let embederrosemsetup = new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefix}setuproleplay\``)
                            .setFooter("Atenciosamente, Nerus")
                            message.channel.send(embederrosemsetup)
                            return
                        })
                    } else {
                        let embederrosemsetup = new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription(`Erro crítico! Contate o meu criador imediatamente <a:CheckVermelho:817107349306474547>\nMeu criador: \`PR#0001\``)
                        .setFooter("Atenciosamente, Nerus")
                        message.channel.send(embederrosemsetup)
                        return;
                    }
                })
            } else {
                let checaritem = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens/${data}`);
                if (checaritem !== null && cargopolicia !== null){
                    if (!message.member.roles.cache.has(cargopolicia)) {
                        let embed1 = new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`<a:money:824717310832410704> Envie no chat a **quantidade** de dinheiro sujo que você deseja lavar, note que o dinheiro deve estar em sua mochila.`)
                        .setImage("https://aberturasimples.com.br/wp-content/uploads/2018/06/giphy.gif")
                        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
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
                            msg = collected.first().content.trim().split(/ +/g);
                            collected.first().delete();
                        })
                        .catch((err) => {
                            error = true;
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Você não informou uma quantidade a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus")
                            );
                        })
                        if (msg[0] === "parar" || msg[0] === "cancelar") {
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus.")
                            )
                            return;
                        }
                        const verificanumero = Number(`${msg[0]}`)
                        if (verificanumero) {
                            
                            let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/`);
                            localizaritens.once('value', async (snapshot) => {
                                let data = snapshot.val()
                                let localizarnomedinheirosujo = database.ref(`servidores/${message.guild.id}/configs/nomedinheirosujo`);
                                localizarnomedinheirosujo.once('value', (snapshot) => {
                                    let nomedinheirosujo = snapshot.val()
                                    if (data == null){
                                        mainMsg.edit(
                                            new Discord.MessageEmbed()
                                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                            .setColor(`#750dbb`)
                                            .setDescription(`Negado, você não possui nenhum dinheiro sujo em sua mochila <a:CheckVermelho:817107349306474547>\n<a:money:824717310832410704> **Item Necessário:** \`${nomedinheirosujo}\` `)
                                            .setFooter("Atenciosamente, Nerus")
                                        )
                                        return
                                    }
                                    let itens = data
                                    const checar = itens[`${nomedinheirosujo}`]
                                    if (checar) {
                                        let localizarnomedinheirosujo = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/${nomedinheirosujo}`);
                                        localizarnomedinheirosujo.once('value', (snapshot) => {
                                            let quantiadinheirosujo = snapshot.val()
                                            if (quantiadinheirosujo == null) {
                                                mainMsg.edit(
                                                    new Discord.MessageEmbed()
                                                    .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                                    .setColor(`#750dbb`)
                                                    .setDescription(`Erro crítico! Contate o meu criador imediatamente <a:CheckVermelho:817107349306474547>\nMeu criador: \`PR#0001\``)
                                                    .setFooter("Atenciosamente, Nerus")
                                                )
                                                return;
                                            }
                                            let stringparanumero = parseInt(msg[0])
                                            if (stringparanumero <= 0) {
                                                mainMsg.edit(
                                                    new Discord.MessageEmbed()
                                                    .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                                    .setColor(`#750dbb`)
                                                    .setDescription(`Negado, informe um valor válido <a:CheckVermelho:817107349306474547>`)
                                                    .setFooter("Atenciosamente, Nerus")
                                                )
                                                return;
                                            } 
                                            if (stringparanumero > quantiadinheirosujo){
                                                mainMsg.edit(
                                                    new Discord.MessageEmbed()
                                                    .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                                    .setColor(`#750dbb`)
                                                    .setDescription(`Negado, você não possui essa quantia de dinheiro sujo <a:CheckVermelho:817107349306474547>`)
                                                    .setFooter("Atenciosamente, Nerus")
                                                )
                                                return;
                                            }
                                            

                                            if (stringparanumero >= 1) {
                                                if (stringparanumero <= quantiadinheirosujo) {
                                                    let aleatorio = Math.floor(Math.random() * 35 - 3) + 3

                                                    let moneyautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money/`);
                                                    moneyautorbusca.once('value', (snapshot) => {
                                                        let moneyautor = snapshot.val()
                                                        let moneyautoratual = parseInt(moneyautor);
                                                        const calculatePercent = (percent, total) => total * (percent / 100);
                                                        let calculoporcentagem =calculatePercent(aleatorio, stringparanumero)
                                                        let calculo2 = stringparanumero-calculoporcentagem
                                                        let calculo3 = moneyautoratual+calculo2

                                                        let calculo = quantiadinheirosujo - stringparanumero
                                                        let moneyautoratt = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/`);
                                                        if (calculo <= 0) {
                                                            localizaritens.update({
                                                                [nomedinheirosujo]: null
                                                            }) 
                                                        } else {
                                                            localizaritens.update({
                                                                [nomedinheirosujo]: calculo
                                                            })
                                                        }
                                                        if (moneyautor == null){
                                                            moneyautoratt.update({
                                                                money: [calculo2]
                                                            })
                                                        } else {
                                                            moneyautoratt.update({
                                                                money: [calculo3]
                                                            })
                                                        }
                                                        mainMsg.edit(
                                                            new Discord.MessageEmbed()
                                                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                                            .setImage("https://iafrikan.com/content/images/2020/07/giphy.gif")
                                                            .setColor(`#750dbb`)
                                                            .setDescription(`Sucesso, você lavou **R$${msg[0]}** em notas falsas e recebeu **R$${calculo2}** em dinheiro limpo, o dinheiro já se econtra em seu banco <a:CheckVerde:817107349881618442>  \n\n <a:money:824717310832410704> **A lavanderia levou ${aleatorio}% de comissão** `)
                                                            .setFooter("Atenciosamente, Nerus")
                                                        )
                                                        
                                                    })
                                                }

                                            }
                                        })
                                        

    
                                    }
                                })
                            })
                        } else {
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription(`Negado, informe um valor válido <a:CheckVermelho:817107349306474547>`)
                                .setFooter("Atenciosamente, Nerus")
                            )
                            return;
                        }
                    } else {
                        const embedsempermissao = new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription(`Qual foi seu policial, vai lavar dinheiro mesmo? Mete o pé! <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus")
                        message.channel.send(embedsempermissao) 
                    }
            
                }
            }
        })
    })
  }
}