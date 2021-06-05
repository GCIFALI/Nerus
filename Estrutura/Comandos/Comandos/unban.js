const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embederro1 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Unban Banco de Dados","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro1)
            return;
        }
        const embederro2 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Unban Banco de Dados","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie o ID do usuário que você deseja desbanir")
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para enviar um ID.`)
        .setFooter("Atenciosamente, Nerus.")
        
        const mainMsg = await message.channel.send(embederro2);
        let error = false;
        let msg;
        await message.channel 
        .awaitMessages((m) => m.author.id === message.author.id, {
            max: 1,
            time: 40000,
            errors: ["time"],
          })
          .then((collected) => {
            msg = collected.first().content;
            let filtro = collected.first().content.trim().split(/ +/g);;
            let idbanido = filtro[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
            collected.first().delete();
            if (msg === "parar" || msg === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Unban Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }
            let verificauser = Number(`${idbanido}`)
            if (!verificauser){
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Unban Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    
                    .setDescription(`Negado, informe um ID de um usuário válido <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            } else {
                let localizarban = database.ref(`servidores/${message.guild.id}/banimentos/${idbanido}`);
                localizarban.once('value', (snapshot) => {
                    const data = snapshot.val();
                    if (data == null) {
                        var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                        localizarprefixo.once('value', (snapshot) => {
                        const prefix = snapshot.val();
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Unban Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription(`Não encontrei em meu banco de dados nenhum usuário com este ID <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933> Não se lembra do ID do usuário? Utilize o comando a seguir para **resetar** todos os banimentos do meu banco de dados: \`${prefix}resetarbans\``)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        })
                        return;
                    } else {
                        var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/quantidade/${message.guild.id}/quantidadeban`);
                        localizarprefixo.once('value', (snapshot) => {
                        const quantidadedebansant = snapshot.val();
                        let removerban = database.ref(`servidores/${message.guild.id}/banimentos/${idbanido}`);
                        removerban.remove();

                        let setarquantia = database.ref(`servidores/${message.guild.id}/configs/quantidade/${message.guild.id}`);
                        setarquantia.once('value', (snapshot) => {
                            setarquantia.update({
                                quantidadeban: quantidadedebansant-1
                            }); 
                        })
                        let logunban = new Discord.MessageEmbed()
                        .setTitle("Nerus - Log de Unban Database")
                        .setColor(`#750dbb`)
                        
                        .addFields(
                            { name: `Nome do servidor::`, value: `- ${message.guild.name}`},
                            { name: 'ID do servidor:', value: `- ${message.guild.id}`},
                            { name: 'ID dono do servidor:', value: `- ${message.guild.owner.id}`},
                            { name: `Nome autor Unban:`, value: `- ${message.author.username}`},
                            { name: `ID autor Unban:`, value: `- ${message.author.id}`},
                            { name: `ID Unban:`, value: `- ${idbanido}`}       
                        )
                        .setTimestamp()
                        .setFooter("Atenciosamente, Nerus.")
                        client.channels.cache.get("818182399426035802").send(logunban)
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Unban Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription(`Sucesso, ID do usuário removido do meu banco de dados <a:CheckVerde:817107349881618442>\n\n<:Alerta:817107348065615933> ID Removido: \`${idbanido}\``)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;

                        })
                    }
                })
                
            }

          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setAuthor("Nerus - Unban Database","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Você não informou um ID ou mencionou um usuário a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        });
        if (error) return;


        
    }
} 