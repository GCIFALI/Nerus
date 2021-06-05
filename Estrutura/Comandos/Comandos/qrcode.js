const Discord = require('discord.js')

module.exports = {
    run: async (client, message, args) => {
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de QRCode","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie o link que você deseja transformar em QRCode ")
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar o link`)
        .setFooter("Atenciosamente, Nerus.")
        
        let mainMsg = await message.channel.send(Embed);
        let error = false;
        let msg;
        await message.channel 
        .awaitMessages((m) => m.author.id === message.author.id, {
            max: 1,
            time: 40000,
            errors: ["time"],
          })
          .then((collected) => {
            msg = collected.first().content.trim().split(/ +/g);;
            collected.first().delete();
            let qrcode = msg[0]
            let link = `http://api.qrserver.com/v1/create-qr-code/?data=${qrcode}&size=200x200`
            if (require('is-url')(qrcode)) {
                mainMsg.edit(
                new Discord.MessageEmbed()
                .setTitle(`Nerus - Sistema de QRCode`)
                .setDescription(`${message.author} aqui está o seu QRCode:`)
                .setColor(`#750dbb`)
                .setImage(link)
                .setFooter("Atenciosamente, Nerus.")
                )

            } else {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setTitle("Nerus - Sistema de QRCode")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, informe um link válido <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
                return
            }
          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setTitle("Nerus - Sistema de QRCode")
                .setColor(`#750dbb`)
                .setDescription("Você não enviou um link a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        });
        if (error) return;
    }
}