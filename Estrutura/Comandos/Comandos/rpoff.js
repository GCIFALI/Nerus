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
        .setTitle("<a:sirenevermelha:820334439161659492> ROLEPLAY FINALIZADO <a:sireneazul:820334680003575809> ")
        .setDescription(`Atenção queridos players, o roleplay na cidade \`${message.guild.name}\` foi encerrado.

        <:pride:818953148482715739> **OBRIGADO POR PARTICIPAR** <:pride:818953148482715739>`)
        .setImage("https://media.discordapp.net/attachments/807079371768070144/822085951190597692/ac449dd46b921b7906e94711c3329b0d.gif")
        message.channel.send(embedrpoff)
    }
}