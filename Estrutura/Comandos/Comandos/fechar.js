const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    const embedresposta = new Discord.MessageEmbed()
    .setAuthor("Nerus - Fechamento de Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setColor(`#750dbb`)
    .setDescription("Negado, este comando só pode ser usado dentro de um ticket <a:CheckVermelho:817107349306474547>")
    .setFooter("Atenciosamente, Nerus.")
    if(!message.channel.name.includes("ticket-")) return message.channel.send(embedresposta).then(m => m.delete({timeout: 9000}));
    message.channel.delete();
  }
}