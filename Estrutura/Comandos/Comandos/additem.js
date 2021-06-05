const database = require('../../../Database.js');
const Discord = require('discord.js');
module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            let embedsempermissao = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Adição de Itens","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embedsempermissao)
            return;
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`**Mencione o usuário ou envie o ID** que você deseja adicionar o item.`)
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
              .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
              .setDescription(`Você não mencionou um usuário ou enviou um ID a tempo, operação cancelada <a:CheckVermelho:817107349306474547>`)
              .setFooter("Atenciosamente, Nerus.")     
            );
            return;
        });
        if (error) return;

        if (msg[0] === "parar" || msg[0] === "cancelar") {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
            );
            return;
        }

        //const idusuario = msg[0].replace("<@!", '').replace(">", '')
        const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
        const verificaid = Number(`${idusuario}`)
        const verificaid2 = message.guild.members.cache.get(idusuario)
        if (!verificaid || !verificaid2) {
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Erro, você não pode adicionar um item para um usuário que não esta no servidor <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
            );
        } 

/////////////////////////////////////////////

        let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/itens`);
        localizaritens.once('value', async (snapshot) => {
            const data = snapshot.val()
            let data2 = require('util').inspect(data)
            let data3 = data2.split('{').join('').split('}').join('').split("'").join('').split(":").join('').split(",").join('\n').split("519345").join('')
            if (data == null){
                mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Negado, não existe nenhum item criado para este servidor, acesse o painel de ajuda e execute o comando de criação de itens <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")     
                )
                return;
            }
            mainMsg.edit(
                new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**Qual item** você deseja adicionar para este usuário?`)
                    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                    .addField(`<a:4655_gearSpinning:818621187240230973> Itens deste servidor:`, `${data3}`)
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
                      .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                        .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus.")     
                    );
                    return;
                }
                let itens = data
                const checar = itens[`${msg2}`]
                if (!checar) {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Erro, nenhum item com este nome foi criado para este servidor, verifique a lista de itens e tente novamente <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus.")     
                    );
                    return;
                }
                /////////////////////////

                mainMsg.edit(
                    new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`**Qual quantidade do item** você deseja adicionar para este usuário?`)
                        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
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
                        msg3 = collected.first().content.trim().split(/ +/g);;
                        collected.first().delete();
                    })
                    .catch((err) => {
                        error = true;
                        mainMsg.edit(
                          new Discord.MessageEmbed()
                          .setColor(`#750dbb`)
                          .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                            .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                            .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")     
                        );
                        return;
                    } 

                    if (msg3[0] >= 1){
                        let atualizarvaloralvo = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${idusuario}`);
                        atualizarvaloralvo.once('value', (snapshot) => {
                            let buscarvalor = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${idusuario}/${msg2}`);
                            buscarvalor.once('value', (snapshot) => {
                                let itens3 = snapshot.val()
                                let stringparanumero = parseInt(msg3[0]);

                                if (itens3 == null){
                                    atualizarvaloralvo.update({
                                        [msg2]: stringparanumero
                                    });
                                } else {
                                    let calcular = itens3+stringparanumero
                                    atualizarvaloralvo.update({
                                        [msg2]: calcular
                                    });
                                }

                                let localizaritens = database.ref(`servidores/${message.guild.id}/roleplayconsole/inventario/mochila/${message.author.id}/`);
                                localizaritens.once('value', async (snapshot) => {
                                    let xyz = snapshot.val()
                                    let xyz2 = require('util').inspect(xyz)
                                    let xyz3 = xyz2.split('{').join('').split('}').join('').split("'").join('').split(":").join('  **ˣ**').split(",").join('\n')
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setColor(`#750dbb`)
                                        .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setDescription(`Sucesso, você adicionou \`${msg2} X${msg3[0]}\` na mochila do(a) <@!${idusuario}> <a:CheckVerde:817107349881618442>`)
                                        .addField('<a:sirenevermelha:820334439161659492> Quem adicionou:', `${message.author}`)
                                        .setThumbnail("https://media.discordapp.net/attachments/807079371768070144/821730141360881674/NERUS_BOT.gif")
                                    );
                                })
                            })
                        })
                    } else {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Sistema de Adição de Itens", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Negado, informe uma quantia válida <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")     
                        );
                    }

        })
    }            
}