const Discord = require('discord.js')
const { readdirSync } = require('fs')
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const eventos = readdirSync('./Eventos/')
const Config = require('../Config.json')
const database = require('../Database.js')
console.log(`Carregando o total de ${eventos.length} eventos`)
eventos.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./Eventos/${f}`)
  client.on(eventName, event.bind(null, client))
})

client.on('guildMemberAdd', member => {
  let verificarban = database.ref(`servidores/${member.guild.id}/banimentos/${member.id}/ban`);
  verificarban.once('value', (snapshot) => {
      let verificar = snapshot.val()
      if (verificar == "true") {
        let embedban = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Banimento por Database", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Olá ${member}, você acaba de ser banido do servidor \`${member.guild.name}\`, o seu banimento foi predefinido por um administrador deste servidor em minha database \n<:Alerta:817107348065615933>  Acha que isso é um erro ou não deveria ter acontecido ? Contate a equipe do(a) \`${member.guild.name}\`\n<a:setinha:817162990721302561>   Removi o seu banimento da database, se isso for um erro contate a equipe deste servidor e avise que é so te desbanir normalmente`)
        .setFooter("Atenciosamente, Nerus.")
        member.send(embedban)
        setTimeout(function(){ 
          member.ban({reason: "Banimento automático por database! "})
          let removerdbban = database.ref(`servidores/${member.guild.id}/banimentos/${member.id}`);
          removerdbban.remove()
          let localizarbanimentos = database.ref(`servidores/${member.guild.id}/configs/quantidade/${member.guild.id}/quantidadeban`);
          localizarbanimentos.once('value', (snapshot) => {
              let quantidadedebans = snapshot.val()
              if (quantidadedebans == "0") {
                return;
              } else {
                let setarquantia = database.ref(`servidores/${member.guild.id}/configs/quantidade/${member.guild.id}`);
                setarquantia.once('value', (snapshot) => {
                    setarquantia.update({
                        quantidadeban: quantidadedebans-1
                    }); 
                })
              }
          })
        }, 1000); 
        return;
      } else {
        let buscarbanco = database.ref(`servidores/${member.guild.id}/roleplayconsole/economia/${member.id}/money`);
        buscarbanco.once('value', (snapshot) => {
          let data = snapshot.val()
          if (data == null){
            let buscarvalor = database.ref(`servidores/${member.guild.id}/configs/moneyinicial`);
            buscarvalor.once('value', (snapshot) => {
              let moneyinicial = snapshot.val()
              if (moneyinicial == null) return;
              let addvalor = database.ref(`servidores/${member.guild.id}/roleplayconsole/economia/${member.id}`);
              addvalor.update({
                money: [moneyinicial]
              })
            })

          }
        })
      }
  })
})


client.on('messageReactionAdd', async (reaction, user) => {
  if(user.bot) return;
  if (reaction.message.guild.id == '825423554639560756') return;
  let localizarcanalticket = database.ref(`servidores/${reaction.message.guild.id}/configs/canalticket`);
  localizarcanalticket.once('value', (snapshot) => {
      const canalticketid = snapshot.val()
      if (canalticketid == null){
        return;
      } else {
        if(reaction.message.channel.id == canalticketid && reaction.emoji.name == '🎫') {
            if (reaction.message.guild.channels.cache.find(channel => channel.name === `ticket-` + user.id)) {
                reaction.users.remove(user);
                const embedticketaberto = new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                .setDescription(`${user}, você já possui um ticket aberto <a:CheckVermelho:817107349306474547>`)
                .setFooter("Atenciosamente, Nerus.")
                reaction.message.channel.send(embedticketaberto).then(m => m.delete({timeout: 5000}));
                return;
            }
            reaction.users.remove(user);
            reaction.message.guild.channels.create(`ticket-${user.id}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                type: 'text'
            }).then(async channel => {
              let localizarprefixo = database.ref(`servidores/${reaction.message.guild.id}/configs/prefix`);
              localizarprefixo.once('value', (snapshot) => {
                const prefix = snapshot.val();
                const embedticket = new Discord.MessageEmbed()
                .setColor("#750dbb")
                .setAuthor("Nerus - Sistema de Ticket","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Olá ${user}, obrigado por abrir um ticket, em breve alguém irá te atender! `)
                .setThumbnail(user.displayAvatarURL())
                .addField('Não precisa mais deste ticket?', `Use: ${prefix}fechar`, true)
                .setFooter("Atenciosamente, Nerus.");
                channel.send(`${user}`)
                channel.send(embedticket)
              })
            })
        }
      }
  })
})

client.login(Config.token)
