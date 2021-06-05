const Discord = require('discord.js')
const database = require(`../../../Database.js`)

module.exports = {
  run: async (client, message, args) => {
    let verificarcargopolicia = database.ref(`servidores/${message.guild.id}/configs/cargopolicia`);
    verificarcargopolicia.once('value', async (snapshot) => {
        const cargopolicia = snapshot.val()
        if (cargopolicia == null){
            let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
            localizarprefixo.once('value', (snapshot) => {
                const prefix = snapshot.val();
                let embederrosemsetup = new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de /Anônimo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefix}setuproleplay\``)
                .setFooter("Atenciosamente, Nerus")
                message.channel.send(embederrosemsetup)
                return
            })
        }
        message.delete()
        if (!message.member.roles.cache.has(cargopolicia)) {
            let embedinicial = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de /Anônimo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Envie no chat o que você deseja falar na Deep Web, seja cauteloso os hackers podem te rastrear!`)
            .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
            .setFooter("Atenciosamente, Nerus.")
            let mainMsg = await message.channel.send(embedinicial);
            error = false;
            let msg;
            await message.channel
            .awaitMessages((m) => m.author.id === message.author.id, {
                max: 1,
                time: 40000,
                errors: ["time"],
            })
            .then((collected) => {
                msg = collected.first().content
                collected.first().delete();
            })
            .catch((err) => {
                error = true;
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de /Anônimo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Você não enviou uma mensagem a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
            })
            if (msg === "parar" || msg === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de /Anônimo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                )
                return;
            }
            if (msg == '' || msg == null) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de /Anônimo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Envie uma mensagem válida <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                )
                return;
            }
            mainMsg.delete()

            let embedanonimo = new Discord.MessageEmbed()
            .setAuthor("DEEP WEB CHAT","https://i.pinimg.com/originals/99/52/13/995213b60e8acb7951e819baa595e5af.gif")
            .setDescription(`${msg}`)
            .setFooter(`Mensagem enviada de forma anônima por ${message.author.username}.`)
            message.channel.send(embedanonimo)
        } else {
            let embederropolicia = new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de /Anônimo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription(`Negado, policiais não tem permissão para enviar mensagens na deepweb <a:CheckVermelho:817107349306474547>`)
            .setFooter("Atenciosamente, Nerus")
            message.channel.send(embederropolicia)
        }

    })
  }
}
