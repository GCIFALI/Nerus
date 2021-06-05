const Discord = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    function boost(){
        let booosts = message.guild.verificationLevel
        if (booosts == "NONE") {
            return "0"
        } else {
            return booosts
        }
    }
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Informações do Servidor","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .addField(`🧬 Nome`, message.guild.name)
    .addField(`👑 Dono`, message.guild.owner, true)
    .addField(`💻 Região do servidor`, message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1), true)
    .addField(`👾 Nível de boost`, boost(), true)
    .addField(`💬 Total de salas`, message.guild.channels.cache.size, true)
    .addField(`👥‍ Membros`, message.guild.members.cache.size, true) 
    .addField('📅 Servidor criado em', message.guild.createdAt.toLocaleDateString("pt-br"),true)
    .setImage("https://i.pinimg.com/originals/6b/6e/6a/6b6e6ad625caf5cfe546a67a2f545231.gif")
    .setFooter("Atenciosamente, Nerus")
    message.channel.send(embed1);

  },
};