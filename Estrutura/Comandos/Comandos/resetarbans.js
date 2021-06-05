const Discord = require('discord.js')
const database = require('../../../Database.js')
const delaydatabase = new Set();

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embederro3 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Resetar Banimentos Banco de Dados")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro3)
            return;
        }
        if (delaydatabase.has(message.guild.id)) {
            const embeddelay = new Discord.MessageEmbed()
            .setAuthor(`Erro, por segurança aguarde 15 minutos para utilizar este recurso novamente `)
            .setDescription(`<:Alerta:817107348065615933> Cansado de esperar? Se torne um servidor verificado e ganhe benefícios`)
            .setColor("#750dbb")
            
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embeddelay).then(m => m.delete({timeout: 6000}));
        } else { 
            delaydatabase.add(message.guild.id); 
            setTimeout(() => {
                delaydatabase.delete(message.guild.id); 
            }, (Math.floor(Math.random() * 840000 - 900000) + 840000));
            const Embed = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Resetar Banimentos Banco de Dados")
            .setDescription(`Todos os banimentos salvos no banco de dados serão deletados, este processo é irreversível!`)
            
            .addField(`<a:Loading:817110188002770976> Se você tem certeza e deseja realizar esta operação`, `Digite: \`confirmar\``)
            .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
            .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar a confirmação`)
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
                if (msg[0] === "confirmar") {
                    let removerbans = database.ref(`servidores/${message.guild.id}/banimentos`);
                    removerbans.once('value', (snapshot) => {
                        let data = snapshot.val()
                        if (data == null){
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Resetar Banimentos Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Erro, este servidor não possui nenhum banimento em meu banco de dados <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus.")
                            );
                            return;
                        } else {
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Resetar Banimentos Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Sucesso, todos os banimentos armazenados no banco de dados deste servidor foram resetados <a:CheckVerde:817107349881618442>")
                                .setFooter("Atenciosamente, Nerus.")
                            );
                            removerbans.remove();
                            let setarquantia = database.ref(`servidores/${message.guild.id}/configs/quantidade/${message.guild.id}`);
                            setarquantia.once('value', (snapshot) => {
                                setarquantia.update({
                                    quantidadeban: 0
                                }); 
                            })
                        }
                    })
    
                } else {
                    if (msg[0] !== "confirmar") {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Resetar Banimentos Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        delaydatabase.delete(message.guild.id);
                        return;
                    }
                }
              })
              .catch((err) => {
                error = true;
                mainMsg.edit(
                  new Discord.MessageEmbed()
                    .setAuthor("Nerus - Resetar Banimentos Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Você não enviou a confirmação a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
                delaydatabase.delete(message.guild.id);
                return;
            });
        }
    }
}