const Discord = require('discord.js')
const database = require(`../../../Database.js`)

module.exports = {
  run: async (client, message, args) => {
    let embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Entrega","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Sucesso, você está online no ifood, **aguarde um restaurante te chamar** <a:Loading:817110188002770976>`)
    .setFooter("Atenciosamente, Nerus.")
    message.channel.send(`${message.author}`)
    let mainMsg = await message.channel.send(embed1);
    let delayaleatorio = Math.floor(Math.random() * 7000) + 3000;
    let locais= [
        "Eclipse",
        "Detran",
        "Cinema",
        "Tinsel Tower",
        "Maze Bank",
        "Hilcrest Avenue",
        "Casino",
        "Mecânica" ,
        "Casa do Michael",
        "Casa do Trevor",
        "Casa do Franklin"
    ];
    let escolha = locais[Math.floor(Math.random()* locais.length)];
    let salario = Math.floor(Math.random() * 1500) + 1500;
    let gorjeta = Math.floor(Math.random() * 450) + 200;
    setTimeout(function(){ 
        let dinheiro = salario + gorjeta
        let moneyautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money/`);
        moneyautorbusca.once('value', (snapshot) => {
            let moneyautor = snapshot.val()
            let moneyautoratual = parseInt(moneyautor);
            let moneyautoratt = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/`);
            if (moneyautor == null){
                moneyautoratt.update({
                    money: dinheiro
                })
            } else {
                let calcular = moneyautoratual+dinheiro
                moneyautoratt.update({
                    money: calcular
                })
            }
        })
        let gorjetaesalario = salario+gorjeta
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setDescription(`<a:sirenevermelha:820334439161659492> **NOVA ENTREGA SOLICITADA** <a:sirenevermelha:820334439161659492>\n\n<:mapa:825446600256127026> **Local da Entrega:** ${escolha}\n<a:d8fphih5dc0d6475737499da86c36df3:821127104031621141> **Local de Retirada:** Central dos Restaurantes\n<a:bitcoin:822474150966591549> **Gorjeta:** ${gorjeta}\n<a:money:824717310832410704> **Valor Total:** ${gorjetaesalario}\n\nCorra! Antes que a comida do cliente esfrie.`)
            .setImage("https://pedir.foodzap.com.br/site/images/motoboy.gif")
        )
    }, delayaleatorio);
    
  }
}

