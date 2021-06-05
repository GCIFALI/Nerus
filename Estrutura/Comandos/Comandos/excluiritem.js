const database = require('../../../Database.js');
const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            let embedsempermissao = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Exclusão de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embedsempermissao)
            return;
        }
        let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens`);
        localizaritens.once('value', async (snapshot) => {
            let data = snapshot.val()
            let data2 = require('util').inspect(data)
            let data3 = data2.split('{').join('').split('}').join('').split("'").join('').split(":").join('').split(",").join('\n').split("519345").join('')
            if (data == null) {
                let embed0 = new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Exclusão de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Não existe nenhum item na database deste servidor para ser excluido <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
                message.channel.send(embed0);
                return;
            }
            let embed1 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Exclusão de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Envie no chat o item que você deseja excluir.`)
            .addField(`<a:4655_gearSpinning:818621187240230973> Itens deste servidor:`, `${data3}`)
            .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
            .setFooter("Atenciosamente, Nerus.")
            let mainMsg = await message.channel.send(embed1);
            error = false;
            let msg;
            await message.channel
            .awaitMessages((m) => m.author.id === message.author.id, {
                max: 1,
                time: 40000,
                errors: ["time"],
            })
            .then((collected) => {
                msg = collected.first().content.toUpperCase()
                collected.first().delete();
            })
            .catch((err) => {
                error = true;
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Exclusão de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Você não informou um item a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
            })
            if (error) return;
            if (!msg) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Exclusão de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, informe um item válido <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                    )
                return;
            }
            if (msg === "parar" || msg === "cancelar") {
                mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Exclusão de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
                )
                return;
            }

            let itens = data
            const checar = itens[`${msg}`]

            if (checar == 519345) {
                let excluiritem = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens`);
                excluiritem.update({
                    [msg]: null
                })
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Exclusão de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Sucesso, você excluiu \`${msg}\` de meu banco de dados <a:CheckVerde:817107349881618442>`)
                    .addField('<a:sirenevermelha:820334439161659492> Quem excluiu:', `${message.author}`)
                    .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
                );
            } else {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Exclusão de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, não existe nenhum item com este nome em minha database, tente novamente <a:CheckVermelho:817107349306474547>")
                    .addField(`<a:4655_gearSpinning:818621187240230973> Itens deste servidor:`, `${data3}`)
                    .setFooter("Atenciosamente, Nerus.")
                    )
                return;
            }


        })
    }            
}