const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Nerus - Sistema de Invite`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Olá eu sou o Nerus, sou um bot criado para moderação, diversão e tudo o que você desejar!\n<:Link:817107347905970208> [Me Convide](https://discord.com/oauth2/authorize?client_id=817069166560804884&permissions=8&scope=bot)\n<:Link:817107347905970208> [Meu servidor de suporte](https://discord.gg/shPzeYtCnZ)\n<:Link:817107347905970208> Não conseguiu acessar o link? Aqui está o invite: discord.gg/shPzeYtCnZ`)
    .setFooter("Atenciosamente, Nerus.")
    .setColor("#750dbb")
    message.author.send(embed)
  }
}