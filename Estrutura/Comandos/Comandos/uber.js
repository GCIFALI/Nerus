const Discord = require('discord.js')
const database = require(`../../../Database.js`)

module.exports = {
  run: async (client, message, args) => {
    let embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Sistema de Entrega","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Sucesso, você está online na Uber, **aguarde um passageiro te chamar** <a:Loading:817110188002770976>`)
    .setFooter("Atenciosamente, Nerus.")
    message.channel.send(`${message.author}`)
    let mainMsg = await message.channel.send(embed1);
    let delayaleatorio = Math.floor(Math.random() * 7000) + 3000;

    let locais= ["Eclipse","Detran","Cinema","Tinsel Tower","Maze Bank","Hilcrest Avenue","Casino","Mecânica","Casa do Michael","Casa do Trevor","Casa do Franklin","Praça","Barragem","Aeroporto"];
    let escolha = locais[Math.floor(Math.random()* locais.length)];

    let locais2= ["Adriano Gracia","Ad\u00e9rito Gentil","Andr\u00e9 Semedo","Angelina Prudente","Armanda Perdig\u00e3o","Bruna Alc\u00e2ntara","Cora Guar\u00e1","Cristiano Caldera","C\u00e9lia Rios","Danilo Silvestre","Edmundo Pestana","Emanuela Garrido","Epif\u00e2nia Quintana","Eurico Couto","Eus\u00e9bio Paranagu\u00e1","Evandro Bivar","Evandro Garrau","Ezequiel Mariz","Fernando Covinha","Germana Damasceno","Glauco Paz","Godo Nunes","Gueda Candal","Higino Lencastre","Iara Villar","Ivete Alencastre","Jorge Godoi","Judas Felipe","Leonilde Fialho","Let\u00edcia Aguiar","L\u00e9nia Guimaraes","Manuela Villegas","Marisa Junquera","Moacir Madruga","M\u00e1xima Cartaxo","M\u00e1ximo Herrera","Odilia Jatob\u00e1","Salom\u00e3o Vidal","S\u00edlvia Conde","Telmo Canto","Tobias Verguero","T\u00e9rcio Neiva","Ubajara Robalinho","Ubaldo Camillo","Urbano Temes","Valmor Franca","Val\u00e9ria Pinheiro","Zacarias Filgueiras","\u00c1tila Dias","\u00c2ngelo Barcelos"]
    let escolha2 = locais2[Math.floor(Math.random()* locais2.length)];

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
            .setDescription(`<a:sirenevermelha:820334439161659492> **NOVA CORRIDA SOLICITADA** <a:sirenevermelha:820334439161659492>\n\n<:mapa:825446600256127026> **Local de Partida:** Central dos Taxistas\n<:Seta:825431681942290482> **Destino do Passageiro** ${escolha}\n<:Microfone:817107348266942494> **Nome do Passageiro:** ${escolha2}\n<a:bitcoin:822474150966591549> **Gorjeta:** ${gorjeta}\n<a:money:824717310832410704> **Valor Total:** ${gorjetaesalario}`)
            .setImage("https://acegif.com/wp-content/gifs/car-driving-27.gif")
        )
    }, delayaleatorio);
    
  }
}

