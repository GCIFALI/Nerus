const database = require('../../../Database.js');
const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        let buscarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money`)
        let buscarmultas = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${message.author.id}/multas`)
        buscarmultas.once('value', (snapshot) => {
            valormultas = snapshot.val()
            if (valormultas == null){
                let embed1 = new Discord.MessageEmbed() 
                .setAuthor("Nerus - Pagamento de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription(`Negado, você não possui nenhuma multa para ser pago <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
                message.channel.send(embed1)
                return;
            }
            if (buscarmoney == null) {
                let embed2 = new Discord.MessageEmbed() 
                .setAuthor("Nerus - Pagamento de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription(`Negado, você não possui nenhum dinheiro em conta <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
                message.channel.send(embed2)
                return;
            }
            buscarmoney.once('value', (snapshot) => {
                dinheiroautor = snapshot.val()
                let dinheiro = parseInt(dinheiroautor)
                if (dinheiro < valormultas) {
                    let embed3 = new Discord.MessageEmbed() 
                    .setAuthor("Nerus - Pagamento de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Negado, você não possui dinheiro suficiente em conta para pagar suas multas <a:CheckVermelho:817107349306474547>\n<a:bitcoin:822474150966591549> Valor Necessário: **R$ ${valormultas},00**`)
                    .setFooter("Atenciosamente, Nerus.")
                    message.channel.send(embed3)
                    return
                }
                if (dinheiro >= valormultas){
                    let calculo = dinheiro-valormultas
                    let atualizarmoney = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}`)
                    let atualizarmulta = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${message.author.id}`)
                    atualizarmoney.update({
                        money: calculo
                    })
                    atualizarmulta.update({
                        multas: null
                    })
                    let embed4 = new Discord.MessageEmbed() 
                    .setAuthor("Nerus - Pagamento de Multas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`Sucesso, todas suas multas foram pagas <a:CheckVerde:817107349881618442>\n<a:bitcoin:822474150966591549> Valor Pago: **R$ ${valormultas},00**`)
                    .setFooter("Atenciosamente, Nerus.")
                    message.channel.send(embed4)
                    return
                }
            })


        })
        

        
    }            
}