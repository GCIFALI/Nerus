const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    .setColor(`#750dbb`)
    .setAuthor("Nerus - Informações do Usuário","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Mencione ou envie o ID do usuário que você deseja ler as informações`)
    
    .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
    .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para mencionar ou enviar o ID`)
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
            .setAuthor("Nerus - SIstema de Userinfo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription("Você não mencionou ou informou um ID a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
            .setFooter("Atenciosamente, Nerus")
        );
    })
    if (msg[0] === "parar" || msg[0] === "cancelar") {
      mainMsg.edit(
        new Discord.MessageEmbed()
        .setAuthor("Nerus - SIstema de Userinfo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        
        .setColor(`#750dbb`)
        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
        .setFooter("Atenciosamente, Nerus.")
      )
      return;
    }
    
    const idusuario = msg[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')
    const verificaid = Number(`${idusuario}`)
    const verificaid2 = message.guild.members.cache.get(idusuario)
    if (!verificaid || !verificaid2){
        mainMsg.edit(
            new Discord.MessageEmbed()
            .setAuthor("Nerus - SIstema de Userinfo","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setColor(`#750dbb`)
            
            .setDescription(`Negado, informe um ID de um usuário válido <a:CheckVermelho:817107349306474547>`)
            .setFooter("Atenciosamente, Nerus.")
        );
        return;
    } 
    if (verificaid2 && verificaid) {
        const localizaradvertencia = database.ref(`servidores/${message.guild.id}/advertencias/${idusuario}`);
        localizaradvertencia.once('value', (snapshot) => {
            const data = snapshot.val()
            function numeroadv(){
                if (data <= 0) {
                    return 0
                } else {
                    if (data >= 0) {
                        return data
                    } else {
                        if (data == null) {
                            return 0
                        }
                    }
                }
            }
            function status() {
                let statususer = verificaid2.presence.status
                if (statususer == "dnd") {
                    return "🔴 Não Pertube"
                } else {
                    if (statususer == "online") {
                        return "🟢 Online"
                    } else {
                        if (statususer == "idle") {
                            return "🟡 Ausente"
                        } else {
                            if (statususer == "offline") {
                                return "⚪️ Offline"
                            }
                        }
                    }
                }
            }
            function verificacargo() {
                let busca = verificaid2.roles.cache.map(role => role.toString()).join(" ,")
                if (busca.length >= 1000) return "Muitos cargos, impossível de exibir."
                if (busca == "@everyone") {
                    return "Nenhum"
                } else {
                    return busca.split(',@everyone').join('')
                }
            }
            
            let buscarmultas = database.ref(`servidores/${message.guild.id}/roleplayconsole/multas/${idusuario}/multas`)
            buscarmultas.once('value', (snapshot) => {
                let multas = snapshot.val()
                function verificamultas (){
                    if (multas == null) {
                        return "00"
                    } else if (multas.length > 10) {
                        return "****"
                    } else return `${multas}`
                    
                }
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor(`Nerus - Informações do usuário`,"https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .addFields(
                        {
                            name: "🧬 Nome",
                            value: verificaid2.user,
                            inline: true
                        },
                        {
                            name: "🔖 Tag ",
                            value: `#${verificaid2.user.discriminator}`,
                            inline: true
                        },
                        {
                            name: "💻 ID do Discord ",
                            value: verificaid2.user.id,
                            inline: true
                        },
                        {
                            name: '📸 Avatar ',
                            value: `[Clique Aqui](${verificaid2.user.displayAvatarURL()})`,
                            inline: true
                        },
                        {
                            name: '📅 Criação da conta ',
                            value: verificaid2.user.createdAt.toLocaleDateString("pt-br"),
                            inline: true
                        },
                        {
                            name: '🌟 Entrou no servidor ',
                            value: verificaid2.joinedAt.toLocaleDateString("pt-br"),
                            inline: true
                        },
                        {
                            name: '🚫 Advertências ',
                            value: `${numeroadv()}/3`,
                            inline: true
                        },
                        {
                            name: '💥 Multas ',
                            value: `R$ ${verificamultas()},00`,
                            inline: true
                        },
                        {
                            name: '👮🏼 Cargos',
                            value: verificacargo(),
                            inline: true
                        },
                        {
                            name: '🔔 Status',
                            value: status(),
                            inline: true
                        }
                    )
                    .setImage(`https://i.pinimg.com/originals/6b/6e/6a/6b6e6ad625caf5cfe546a67a2f545231.gif`)
                    .setColor(`#750dbb`)
                    .setFooter("Atenciosamente, Nerus.")
                );

            })
            
            
            
            
        })
    }

  },
};