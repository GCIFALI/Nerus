const Discord = require("discord.js");
const database = require('../../../Database.js');

module.exports = {
  run: async (client, message, args, guild) => {
    var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
    localizarprefixo.once('value', (snapshot) => {
        const prefixo = snapshot.val()
        let verificarcargopolicia = database.ref(`servidores/${message.guild.id}/configs/cargopolicia`);
        verificarcargopolicia.once('value', async (snapshot) => {
            const cargopolicia = snapshot.val()
            if (cargopolicia == null) {
                const embederrosemcargo = new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                
                .setDescription(`Você não pode utilizar este comando até que algum administrador realize o setup completo. <a:CheckVermelho:817107349306474547>\nSe você for um administrador use: \`${prefixo}setuproleplay\``)
                .setFooter("Atenciosamente, Nerus")
                message.channel.send(embederrosemcargo)
                return
            }
            if (message.member.roles.cache.has(cargopolicia)) {
                const embed1 = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Mencione ou envie o ID do usuário que você deseja consultar a ficha.`)
                
                .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **15 segundos** para mencionar ou enviar o ID`)
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
                    msg = collected.first().content.trim().split(/ +/g);;
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        
                        .setDescription("Você não informou ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus")
                    );
                    return;
                })
                if (error) return;
                if (msg[0] === "parar" || msg[0] === "cancelar") {
                  mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                  )
                  return;
            
                } else {
                    const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
                    const verificaid = Number(`${idusuario}`)
                    if (!verificaid){
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription(`Negado, informe um ID de um usuário válido <a:CheckVermelho:817107349306474547>`)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    } 
                
                    if (idusuario && verificaid) {
                        var localizarficha = database.ref(`servidores/${message.guild.id}/roleplayconsole/fichas/${idusuario}/dados`);
                        localizarficha.once('value', (snapshot) => {
                            let data = `${snapshot.val()}`
                            let dados = data.replace(",", '')
                            if (dados == "null") {
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    
                                    .setDescription(`Essa pessoa não possui uma ficha criminal ativa em meu banco de dados <a:CheckVermelho:817107349306474547>\n\nDeseja fichar essa pessoa? Utilize: \`${prefixo}fichar\``)
                                    .setFooter("Atenciosamente, Nerus.")
                                );
                            } else {
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    .setDescription(`<a:sireneazul:820334680003575809> **Solicitador:** ${message.author}\n📁 **Ficha Criminal de:** <@!${idusuario}>\n\n<a:sirenevermelha:820334439161659492>  **Ocorrências/Crimes** <a:sirenevermelha:820334439161659492>\n\``+dados+`\``)
                                    .setImage("https://i.makeagif.com/media/7-30-2018/1x7nzS.gif")
                                    .setFooter("Atenciosamente, Nerus.")
                                );
                            }
                        })
                      
                    }
                }
                
            } else {
                const embedsempermissao = new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Ficha","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                
                .setDescription(`Negado, somente pessoas com o cargo <@&${cargopolicia}> podem utilizar este comando <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus")
                message.channel.send(embedsempermissao)
            }
        })
    })
  },
};