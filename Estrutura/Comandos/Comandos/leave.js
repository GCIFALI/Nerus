const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    message.delete()
    if (message.author.id != '348319220288716810') {  
        let embed = new Discord.MessageEmbed()
        .setTitle("Nerus - Comando Secetro")
        .setColor(`#750dbb`)
        .setDescription("Whoops! Não conte para ninguém mas este comando é secreto e só pode ser utilizado pelo meu criador <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus")
        message.channel.send(embed)
    } else {
        message.guild.leave()
    }
  }
}