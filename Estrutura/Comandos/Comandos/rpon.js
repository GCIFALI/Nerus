const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            let embedsempermissao = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema Status Roleplay","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embedsempermissao)
            return;
        }

        let embedrpoff = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setTitle("<a:sireneazul:820334680003575809> ROLEPLAY INICIADO <a:sirenevermelha:820334439161659492> ")
        .setDescription(`Atenção queridos players, o roleplay na cidade \`${message.guild.name}\` foi iniciado.\n\n<:Microfone:817107348266942494> **VENHA FAZER O SEU ROLEPLAY** <:Microfone:817107348266942494>`)
        .setImage("https://bestanimations.com/media/bulbs/140098283animated-light-bulb-gif-30.gif")
        message.channel.send(embedrpoff)
    }
}