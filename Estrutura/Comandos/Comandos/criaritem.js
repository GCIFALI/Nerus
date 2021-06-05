const database = require('../../../Database.js');
const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embederro3 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro3)
            return;
        }
        const embed1 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Criação de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Envie no chat o item que você deseja criar **(máximo de 25 carácteres)**.`)
        .addField(`<:6773_Alert1:817107347356254320>  Atenção:`, `Espaços em branco e carácteres como: \`".", "#", "$", "/", "[", ou "]"\` não são aceitos e serão removidos automáticamente`)
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
                .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                
                .setDescription("Você não informou um item a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
        })
        if (error) return;
        if (!msg) {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Negado, informe um item válido <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
                )
            return;
        }
        if (msg === "parar" || msg === "cancelar") {
            mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus.")
            )
            return;
        }

        if (msg.length > 25) {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Negado, o seu item não pode ultrapassar 25 carácteres <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus.")
            )
            return;
        }
        let quantidadedeitens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/quantidadedeitens`);
        quantidadedeitens.once('value', (snapshot) => {
            let data = snapshot.val()
            if (data == null) {
                quantidadedeitens.update({
                    quantidade: 0
                })
            }
            let verificadados = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/quantidadedeitens/quantidade`);
            verificadados.once('value', (snapshot) => {
                let quantidade = snapshot.val()
                if (quantidade >= 60) {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription("Negado, você não pode criar mais de 60 itens <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus.")
                    )
                    return;
                }
                let criaritem = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens`);
                let filtro = msg.split('.').join('').split('#').join('').split('$').join('').split('/').join('').split('[').join('').split(']').join('').split(/\s/g).join('').split(`,`).join('').split(`"`).join('').split(`''`).join('').split("``").join('')
                criaritem.update({
                    [filtro]: 519345
                }); 
                quantidadedeitens.update({
                    quantidade: quantidade+1
                })
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Criação de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription(`**Sucesso, item criado** <a:CheckVerde:817107349881618442>\n<a:4655_gearSpinning:818621187240230973>  **Item Criado:** \`${filtro}\``)
                    .setFooter("Atenciosamente, Nerus.")
                )
                
            })
        })
    }            
}