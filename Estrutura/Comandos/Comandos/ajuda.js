const Discord = require("discord.js");
const database = require('../../../Database.js')

module.exports = {
 run: async (client, message, args) => {
    var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
    localizarprefixo.once('value', (snapshot) => {
    const prefix = snapshot.val();

    const erros = new Discord.MessageEmbed()
    .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`${message.author}, algo deu errado, verifique as permissões do bot!`)
    .setTimestamp()
    
    .setFooter("Atenciosamente, Nerus.")
    .setColor("#750dbb")
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
    .setDescription(`Olá eu sou o Nerus, sou um bot criado para moderação, diversão e tudo o que você desejar!\n\n<:Link:817107347905970208> [Me Convide](https://discord.com/oauth2/authorize?client_id=817069166560804884&permissions=8&scope=bot)\n<:Link:817107347905970208> [Meu servidor de suporte](https://discord.gg/shPzeYtCnZ)\n<:Link:817107347905970208> Não conseguiu acessar o link? Aqui está o invite: discord.gg/shPzeYtCnZ\n\n <a:setinha:817162990721302561> **Confira abaixo o significado de cada reação em nosso menu de ajuda:**\n  <:1_:818611201260650551> Sistemas para administração\n <:2_:818611201244266496> Sistemas para usuário\n <:3_:818611201151074356> Sistemas para Roleplay Console \n <:4_:818611200983826473> Sistemas para Roleplay Console Página 2\n<a:4655_gearSpinning:818621187240230973>  Retorna ao menu inicial`)
    
    .setFooter("Atenciosamente, Nerus.")
    .setColor("#750dbb")
    message.channel.send(embed).catch(err => message.channel.send(erros)).then(async msg => {
      await msg.react('<:1_:818611201260650551>')
      await msg.react('<:2_:818611201244266496>')
      await msg.react('<:3_:818611201151074356>') 
      await msg.react('<:4_:818611200983826473> ') 
      await msg.react("<a:4655_gearSpinning:818621187240230973> ")


      const informacao = (reaction, user) => reaction.emoji.id === '818611201260650551' && user.id === message.author.id;
      const usuario = (reaction, user) => reaction.emoji.id === '818611201244266496' && user.id === message.author.id;
      const diversao = (reaction, user) => reaction.emoji.id === '818611201151074356' && user.id === message.author.id;  
      const diversao2 = (reaction, user) => reaction.emoji.id === '818611200983826473' && user.id === message.author.id;  

      const back = (reaction, user) => reaction.emoji.id === "818621187240230973" && user.id === message.author.id;

      const informacaoL = msg.createReactionCollector(informacao)
      const usuarioL = msg.createReactionCollector(usuario)
      const diversaoL = msg.createReactionCollector(diversao) 
      const diversaoL2 = msg.createReactionCollector(diversao2) 

      const backL = msg.createReactionCollector(back)

      backL.on('collect', r => {
          
        r.users.remove(message.author.id) 
          const embedd = new Discord.MessageEmbed()
          .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
          .setDescription(`Olá eu sou o Nerus, sou um bot criado para moderação, diversão e tudo o que você desejar!\n\n<:Link:817107347905970208> [Me Convide](https://discord.com/oauth2/authorize?client_id=817069166560804884&permissions=8&scope=bot)\n<:Link:817107347905970208> [Meu servidor de suporte](https://discord.gg/shPzeYtCnZ)\n<:Link:817107347905970208> Não conseguiu acessar o link? Aqui está o invite: discord.gg/shPzeYtCnZ\n\n <a:setinha:817162990721302561> **Confira abaixo o significado de cada reação em nosso menu de ajuda:**\n  <:1_:818611201260650551> Sistemas para administração\n <:2_:818611201244266496> Sistemas para usuário\n <:3_:818611201151074356> Sistemas para Roleplay Console \n <:4_:818611200983826473> Sistemas para Roleplay Console Página 2\n<a:4655_gearSpinning:818621187240230973>  Retorna ao menu inicial`)
          .setFooter("Atenciosamente, Nerus.")
          .setColor("#750dbb")
          msg.edit(embedd)
      })

      informacaoL.on('collect', r => {
          
		  r.users.remove(message.author.id) 
          const embedinformacao = new Discord.MessageEmbed()
              .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
              .setDescription(`<:Microfone:817107348266942494> **Administração** <:Microfone:817107348266942494>\n\`${prefix}setupticket\` - Configuração do sistema de ticket.\n\`${prefix}ativar\` - Ativa um sistema anteriormente desativado.\n\`${prefix}limpar\` - Limpa a quantidade de mensagens desejada.\n\`${prefix}desativar\` - Desativa um sistema anteriormente ativado.\n\`${prefix}trocarprefix\` - Altera o meu prefixo para o enviado.\n\`${prefix}ban\` - Bane o usuário mencionado ou adiciona o ID no banco de dados.\n\`${prefix}resetarbans\` - Reseta todos os ID banidos armazenados no banco de dados\n\`${prefix}unban\` - Remove o banimento do ID desejado do banco de dados.\n\`${prefix}adv\` - Adverte o usuário mencionado e salva no banco de dados.\n\`${prefix}radv\` - Remove uma advertência do usuário mencionado.\n\`${prefix}say\` - Sistema de say avançado que faz o bot falar por você em um embed.\n\`${prefix}say2\` - Sistema de say comum.\n\`${prefix}drop\` - Cria um drop que quando a primeira pessoa reagir na mensagem ganha o prêmio estipulado.`)
              .setColor("#750dbb")
              .setFooter("Atencisoamente, Nerus.")
              .setTimestamp()
          msg.edit(embedinformacao)
      })

      usuarioL.on('collect', r => {
          
		  r.users.remove(message.author.id) 
          const embedusuario = new Discord.MessageEmbed()
              .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
              .setDescription(`<:Microfone:817107348266942494>  **Usuário**  <:Microfone:817107348266942494>\n\`${prefix}invite\` - Envia o link para me adicionar no privado.\n\`${prefix}ajuda\` - Abre o painel de ajuda e informações.\n\`${prefix}userinfo\` - Exibe informações do usuário mencionado.\n\`${prefix}serverinfo\` - Exibe informações sobre o servidor.\n\`${prefix}ship\` - Shippa um usuário com o outro mencionado.\n\`${prefix}hug\` - Dá um abraço no usuário mencionado.\n\`${prefix}avatar\` - Envia o avatar do usuário mencionado.\n\`${prefix}fechar\` - Fecha o ticket aberto.\n\`${prefix}ping\` - Exibe a latência do Nerus.\n\`${prefix}qrcode\` - Gera um QRCode do link enviado.`)
              .setColor("#750dbb")
              .setFooter("Atencisoamente, Nerus.")
              .setTimestamp()
          msg.edit(embedusuario)
      })

      diversaoL.on('collect', (r, user) => {
            r.users.remove(message.author.id) 
            const embeddiversao = new Discord.MessageEmbed()
            .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`<:Microfone:817107348266942494> **Roleplay Console** <:Microfone:817107348266942494>\n\`${prefix}setuproleplay\` - Configuração geral para utilizar os sistemas para roleplay (Administração).\n\`${prefix}setupwhitelist\` - Configuração do sistema de whitelist (Administração).\n\`${prefix}criaritem\` - Cria o item desejado para o sistema de inventário (Administração).\n\`${prefix}excluiritem\` - Exclui o item desejado do sistema de inventário (Administração).\n\`${prefix}additem\` - Adiciona um item para o usuário desejado (Administração).\n\`${prefix}rpon\` - Anuncia no chat que o roleplay na cidade foi iniciado (Administração).\n\`${prefix}rpoff\` - Anuncia no chat que o roleplay na cidade foi finalizado (Administração).\n\`${prefix}addmoney\` - Adiciona a quantia desejada na conta do usuário (Administração).\n\`${prefix}removemoney\` - Remove a quantia desejada da conta do usuário (Administração).\n\`${prefix}removeitem\` - Remove o item desejado da mochila do usuário mencionado (Administração).\n\`${prefix}resetardocumento\` - Reseta o documento do usuário mencionado (Administração).\n\`${prefix}ficha\` - Consulta a ficha de um usuário (Polícia).\n\`${prefix}fichar\` - Ficha o usuário e adiciona o crime dele na ficha (Polícia).\n\`${prefix}limparficha\` - Limpa a ficha do usuário (Polícia).`)
            .setColor("#750dbb")
            .setFooter("Atencisoamente, Nerus.")
            .setTimestamp()
            msg.edit(embeddiversao)
        }) 
        diversaoL2.on('collect', (r, user) => {
            r.users.remove(message.author.id) 
            const pagina2 = new Discord.MessageEmbed()
            .setAuthor(`Nerus - Sistema de Ajuda`, "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`<:Microfone:817107348266942494> **Roleplay Console Página 2** <:Microfone:817107348266942494> \n\`${prefix}transferir\` - Transfere o valor desejado de sua conta para a conta do usuário mencionado.\n\`${prefix}lavardinheiro\` - Limpa o dinheiro sujo da sua mochila e deposita o valor limpo em seu banco.
            \`${prefix}revistar\` - Revista a mochila do usuário desejado.\n\`${prefix}documento\` - Exibe o documento do usuário, se não tiver cria um.\n\`${prefix}roubarcaixa\` - Inicia o roubo ao caixa eletrônico.\n\`${prefix}roubarjoalheria\` - Inicia o roubo a joalheria.\n\`${prefix}anonimo\` - Envia uma mensagem via deep web.\n\`${prefix}whitelist\` - Inicia a whitelist..\n\`${prefix}mochila\` - Abre a sua mochila e informa os itens que você possui.\n\`${prefix}revistar\` - Revista o usuário mencionado.\n\`${prefix}enviar\` - Envia um item de sua mochila para o usuário desejado.\n\`${prefix}dropar\` - Descarta um item da sua escolha de sua mochinal no chão.\n\`${prefix}banco\` - Exibe sua conta bancária.\n\`${prefix}minerar\` - Inicia a mineração.\n\`${prefix}ifood\` - Inicia o emprego de entregador.\n\`${prefix}uber\` - Inicia o emprego de taxista.\n\`${prefix}roubarammunation\` - Inicia o roubo a AmmuNation.\n\`${prefix}multar\` - Multa o usuário desejado (Polícia)\n\`${prefix}limparmultas\` - Limpa as multas do usuário desejado (Polícia/Advogados)\n\`${prefix}pagarmultas\` - Paga suas multas pendentes.`)
            .setColor("#750dbb")
            .setFooter("Atencisoamente, Nerus.")
            msg.edit(pagina2)
        })
   })

    })
}
}