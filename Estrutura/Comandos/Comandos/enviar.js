const database = require('../../../Database.js');
const Discord = require('discord.js');
module.exports = {
    run: async (client, message, args) => {
        let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/`);
        localizaritens.once('value', async (snapshot) => {
            let data = snapshot.val()
            let data2 = require('util').inspect(data)
            let data3 = data2.split('{').join('').split('}').join('').split("'").join('').split(":").join('  **ˣ**').split(",").join('\n')
            if (data == null){
                let embed = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Negado, você não possui nenhum item em sua mochila <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
                message.channel.send(embed)
                return;
            }
            const Embed = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`**Mencione o usuário** que você deseja enviar o item.`)
            .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
            .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
            
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
            })
            .catch((err) => {
                error = true;
                mainMsg.edit(
                  new Discord.MessageEmbed()
                  .setColor(`#750dbb`)
                  .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                  .setDescription(`Você não mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>`)
                  .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            });
            if (error) return;

            if (msg[0] === "parar" || msg[0] === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            }
            const idusuario = msg[0].replace("<@!", '').replace(">", '').replace("<@", '').replace(">", '');
            const verificaid = Number(`${idusuario}`)
            const verificaid2 = message.guild.members.cache.get(idusuario)
            if (!verificaid || !verificaid2) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Erro, você não pode enviar um item para um usuário que não esta no servidor <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
            } 
            if (idusuario == message.author.id) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Erro, você não pode enviar um item para você mesmo <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            }
            //////////////////////

            mainMsg.edit(

            new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`**Qual item** você deseja enviar?`)
                .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                .addField("<:bolsa:820733064590000198> Sua Mochila:",`${data3}`)
                .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
            );
            
            let msg2;
            await message.channel 
            .awaitMessages((m) => m.author.id === message.author.id, {
                max: 1,
                time: 40000,
                errors: ["time"],
            })
            .then((collected) => {
                msg2 = collected.first().content.toUpperCase()
                collected.first().delete();
            })
            .catch((err) => {
                error = true;
                mainMsg.edit(
                  new Discord.MessageEmbed()
                  .setColor(`#750dbb`)
                  .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                  .setDescription(`Você não informou um item a tempo, operação cancelada <a:CheckVermelho:817107349306474547>`)
                  .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            });
            if (error) return;

            if (msg2 === "parar" || msg2 === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            }
            let itens = data
            const checar = itens[`${msg2}`]

            if (checar == undefined){
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, você não possui este item em sua mochila <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            } 
            ///////////////////////////////

            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Qual é a quantidade que você deseja enviar ?`)
                .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                .addField("<:bolsa:820733064590000198> Sua Mochila:",`${data3}`)
                .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
            );
            let msg3;
            await message.channel 
            .awaitMessages((m) => m.author.id === message.author.id, {
                max: 1,
                time: 40000,
                errors: ["time"],
            })
            .then((collected) => {
                msg3 = collected.first().content.trim().split(/ +/g);
                collected.first().delete();
            })
            .catch((err) => {
                error = true;
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não informou uma quantidade a tempo, operação cancelada <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            });
            if (error) return;

            if (msg3[0] === "parar" || msg3[0] === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`) 
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            }

            let verifica = Number(`${msg3[0]}`)
            if (!verifica || msg3[0] == 0) {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            } 
            let itens2 = data
            let checar2 = itens2[`${msg2}`]
            let autor = message.author
            let autor2 = autor.toString().replace('<@', '').replace('>', '')

            if (msg3[0] <= checar2){
                if (msg3[0] >= 1){
                    let atualizarvalorautor = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${autor2}`);
                    atualizarvalorautor.once('value', (snapshot) => {
                        let calculo = checar2-msg3[0]
                        atualizarvalorautor.update({
                            [msg2]: calculo
                        });
                        if (calculo <= 0){
                            atualizarvalorautor.update({
                                [msg2]: null
                            })
                        }
                        let localizarmochila = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${idusuario}`);
                        localizarmochila.once('value', (snapshot) => {
                            localizarmochila.update({
                                [msg2]: msg3[0]
                            });
                        })
                        var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                        localizarprefixo.once('value', (snapshot) => {
                            const prefix = snapshot.val();
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setColor(`#750dbb`)
                                .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setDescription(`Sucesso, você enviou \`${msg2} X${msg3[0]}\` para <@!${idusuario}> <a:CheckVerde:817107349881618442>\n\n<:bolsa:820733064590000198> **Confira sua mochila utilizando:** \`${prefix}mochila\``)
                                .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
                            );
                        })
                    })
                } else {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Negado, vem bugar com número negativo aqui não espertinho <a:CheckVermelho:817107349306474547>\n\nMeu criador foi avisado sobre isso, não se assuste se você entrar na blacklist (:`)
                        .setFooter("Atenciosamente, Nerus.")     
                    );
                    let logcomandos = new Discord.MessageEmbed()
                    .setTitle("Nerus - Log Sistema de Envio")
                    .setColor(`#750dbb`)
                    
                    .addFields(
                        { name: `Nome do servidor::`, value: `- ${message.guild.name}`},
                        { name: 'ID do servidor:', value: `- ${message.guild.id}`},
                        { name: `Nome autor do Comando:`, value: `- ${message.author.tag}`},
                        { name: `ID autor do Comando:`, value: `- ${message.author.id}`},
                        { name: `Valor tentando bugar:`, value: `- ${msg3[0]}`}       
                    )
                    .setTimestamp()
                    .setFooter("Atenciosamente, Nerus.")
                    client.channels.cache.get("821549752911003709").send(logcomandos)
                    return;
                }

            } else {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Envio de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, você não possui esta quantidade <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                );
                return;
            }
        })

    }            
}