const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embederro3 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Desativação de Sistemas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, somente administradores podem utilizar este comando <a:CheckVermelho:817107349306474547>

            <:Alerta:817107348065615933>  Permissões necessárias: \`ADMINISTRATOR\``)
            
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro3)
            return;
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Desativação de Sistemas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Envie o nome do sistema que você deseja desativar")
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **10 segundos** para enviar o nome de um sistema`)
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
            if (msg[0] === "parar" || msg[0] === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Desativação de Sistemas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus.")
                );
                return;
            }
            let verificasistemas = database.ref(`servidores/${message.guild.id}/sistemas/${msg[0]}`);
            verificasistemas.once('value', (snapshot) => {
                const data = snapshot.val();
                if (data == null){
                    let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                    localizarprefixo.once('value', (snapshot) => {
                        let prefixo = snapshot.val()
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Desativação de Sistemas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Erro, sistema inválido ou inexistente <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Para acessar a lista de sistemas utilize: \`${prefixo}ajuda\``)
                            
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    })
                }
                if (data) {
                    let desativasistema = database.ref(`servidores/${message.guild.id}/sistemas`);
                    desativasistema.update({
                        [msg[0]]: "false"
                    });
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Desativação de Sistemas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Sucesso, sistema desativado com suceso <a:CheckVerde:817107349881618442>\n<:Alerta:817107348065615933>  Sistema Desativado: \`${msg[0]}\``)
                        
                        .setFooter("Atenciosamente, Nerus.")
                    );
                    return;
                }
            });
            return;
          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setAuthor("Nerus - Desativação de Sistemas","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription("Você não informou um sistema a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            return;
        });
        if (error) return;
    }
}