const Discord = require("discord.js");
const database = require('../../../Database.js');
const delaywhitelist = new Set();
module.exports = {
    run: async (client, message, args) => {
        let localizarcanalwl = database.ref(`servidores/${message.guild.id}/configs/canalwhitelist`);
        localizarcanalwl.once('value', async (snapshot) => {
            const canalwhitelist = snapshot.val()
            if (canalwhitelist == null) return;
            if (canalwhitelist != message.channel.id) {
                let embederrowl = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Negado, você só pode iniciar sua whitelist no canal <#${canalwhitelist}> <a:CheckVermelho:817107349306474547>`)
                message.author.send(embederrowl)
                return;
            }
            if (canalwhitelist == message.channel.id){
                message.delete()
                
                if (message.guild.channels.cache.find(channel => channel.name === `whitelist-` + message.author.username.toLowerCase())) {
                    let idcanalwl = message.guild.channels.cache.find(channel => channel.name === `whitelist-${message.author.username.toLowerCase()}`)
                    let embedwlcriada = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Erro, você já possui uma whitelist aberta no canal ${idcanalwl} <a:CheckVermelho:817107349306474547>`)
                    message.channel.send(embedwlcriada).then(m => m.delete({timeout: 6000}));
                    return;
                }
                if (delaywhitelist.has(message.author.id)) {
                    let embeddelay = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, aguarde 10 minutos antes de realizar a whitelist novamente <a:CheckVermelho:817107349306474547>`)
                    message.channel.send(embeddelay).then(m => m.delete({timeout: 6000}));
                    return;
                }

                let guild = message.guild;
                const canalcriadowhitelist = await guild.channels.create(`whitelist-${message.author.username.toLowerCase()}`,{type: 'text',permissionOverwrites:[{allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],id: message.author.id},{deny: 'VIEW_CHANNEL',id: guild.id}]}); 
                delaywhitelist.add(message.author.id);
                setTimeout(() => {
                    delaywhitelist.delete(message.author.id); 
                }, 600000);
                canalcriadowhitelist.setRateLimitPerUser(5)


                let embedprimeirapergunta = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Olá ${message.author}, seja bem-vindo(a) a sua whitelist\n<a:setinha:817162990721302561> Para iniciar sua whitelist digite: \`iniciar\``)
                .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                await canalcriadowhitelist.send(`${message.author}`)
                let mainMsg = await canalcriadowhitelist.send(embedprimeirapergunta);
                let error = false;
                let msg;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg = collected.first().content.toLowerCase().trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não iniciou a whitelist a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (error) return;
                if (msg[0] === "parar" || msg[0] === "cancelar") {
                    canalcriadowhitelist.delete()
                    return;
                }
                console.log(msg[0])
                if (msg[0] != "iniciar") {
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, você não iniciou a sua whitelist, aguarde alguns minutos e tente novamente <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                }

                //// PRIMEIRA PERGUNTA /////

                var pontos = 0
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo roleplay ? Escolha uma opção abaixo:** \n\n 1  - Simular a fantasia;\n\n 2  - Simular a vida real;\n\n 3  - Um modo de vida;\n\n 4 - Seguir as regras dentro da cidade.\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg2;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg2 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo e sua whitelist foi cancelada, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (error) return;
                if (msg2[0] === "2") {
                    pontos += 1
                }


                /// SEGUNDA PERGUNTA ///
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo RDM ? Escolha uma opção abaixo:** \n \n1  - Abuso de bugs;\n\n 2  - Usar um veículo como arma;\n\n 3  - Sacar uma arma e ameaçar alguém em uma safezone;\n\n 4 - Matar alguém sem motivo.\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg3;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg3 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg3[0] == "4") {
                    pontos += 1
                }

                /// TERCEIRA PERGUNTA ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo Anti-RP ? Escolha uma opção abaixo:** \n \n1  - Realizar alguma ação que você não faria na vida real;\n\n 2  - Sair do seu personagem;\n\n 3  - Abusar da mecânica do jogo;\n\n 4 - Ser ofensivo/racista.\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg4;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg4 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg4[0] == "2") {
                    pontos += 1
                }

                /// QUARTA PERGUNTA ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo Amor a Vida ? Escolha uma opção abaixo:** \n \n1  - Valorizar a vida dos outros jogadores como ela fosse única;\n\n 2  - Matar algum player sem motivo aparente;\n\n 3  - Valorizar a sua vida como ela fosse única;\n\n 4 - Não se importar com suas ações dentro da cidade.\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg5;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg5 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg5[0] == "3") {
                    pontos += 1
                }

                /// QUINTA PERGUNTA ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo PowerGaming ? Escolha uma opção abaixo:** \n \n1  - Ter poderes não humanos;\n\n 2  - Obter informações por fora da cidade como em lives ou internet;\n\n 3  - Forçar para que uma ação ocorra;\n\n 4 - Abusar da mecância do jogo.\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg6;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg6 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg6[0] == "4") {
                    pontos += 1
                }

                /// SEXTA PERGUNTA ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo MetaGaming ? Escolha uma opção abaixo:** \n \n1  - Obter informações por fora da cidade como em lives ou internet;\n\n 2  - Matar algum usuário em uma zona considerada safe; \n\n 3  - Vender drogas a um policial;\n\n 4 - Forçar um usuário a cometer ações que vão conta as regras da cidade.\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg7;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg7 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg7[0] == "1") {
                    pontos += 1
                }

                /// SETIMA PERGUNTA ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo CombatLogger ? Escolha uma opção abaixo:** \n \n1  - Chamar reforços por aplicativos externos para um pvp;\n\n 2 - Deslogar da cidade durante uma ação;\n\n 3  - Utilzar armas da polícia em ações;\n\n 4 - Utilizar veículos como arma;\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg8;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg8 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg8[0] == "2") {
                    pontos += 1
                }

                /// OITAVA PERGUNTA ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`**O que siginifica o termo VDM ? Escolha uma opção abaixo:** \n\n 1  - Matar um usuário mesmo após ele ter se rendido;\n\n 2 - Assaltar um usuário após as 22:00; \n\n 3  - Utilizar o seu veículo para atropelar ou matar um usuário;\n\n 4 - Roubar viaturas da polícia;\n\n`)
                    .setFooter("Leia e responda atentamente a questão, sua aprovação depende de sua pontuação.")
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg9;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg9 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });
                if (msg9[0] == "3") {
                    pontos += 1
                }

                /// NOME E SOBRENOME ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Envie o seu nome e sobrenome abaixo. \n\n <a:setinha:817162990721302561> Exemplo: \`Paulo Ricardo\``)
                    .setFooter("Atenciosamente, Nerus.")   
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg10;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg10 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });

                if (!msg10|| msg10[0] == '') {
                    let embedantibug = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Segurança", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, envie uma resposta válida, imagens ou figurinhas são proibidas <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedantibug)
                    return;
                }
                if (!msg10[1]) {
                    let embedantibug = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, informe um sobrenome e tente novamente mais tarde <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedantibug)
                    return;
                }

                let nomesobrenome = `${msg10[0]} ${msg10[1]}`

                /// SOCIAL CLUB ///

                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Envie sua Social Club. \n\n <a:setinha:817162990721302561> Exemplo: \`Paulo_Ricardo\``)
                    .setFooter("Atenciosamente, Nerus.")   
                    .setThumbnail("https://cdn.dribbble.com/users/856306/screenshots/6143326/signform_loop-output_800x600.gif")
                );
                let msg11;
                await canalcriadowhitelist
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg11 = collected.first().content.trim().split(/ +/g)
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    let embedtempouser = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Você não respondeu a pergunta a tempo, tente novamente em alguns minutos <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")     
                    canalcriadowhitelist.delete()
                    message.author.send(embedtempouser)
                    return;
                });

                if (!msg11 || msg11[0] == '') {
                    let embedantibug = new Discord.MessageEmbed()
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Segurança", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Negado, envie uma resposta válida, imagens ou figurinhas são proibidas <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")      
                    canalcriadowhitelist.delete()
                    message.author.send(embedantibug)
                    return;
                }

                let socialclub = msg11[0]

                ////// rescultado e finalização /////

                canalcriadowhitelist.delete()
                let quantidaacerto = database.ref(`servidores/${message.guild.id}/configs/margemacertoswhitelist`);
                quantidaacerto.once('value', (snapshot) => {
                    let quantia = snapshot.val()
                    if (quantia == null){
                        let embederro1 = new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Ops, algo deu errado. Solicte que a equipe do servidor realize novamente o **setupwhitelist**, contate o meu criador se isso não resolver. <a:CheckVermelho:817107349306474547>
                        
                        **Meu criador:** PR#0001`)
                        .setFooter("Atenciosamente, Nerus.")     
                        message.author.send(embederro1)
                        return;
                    }
                    let localizarcanalwl = database.ref(`servidores/${message.guild.id}/configs/canalresultadowl`);
                    localizarcanalwl.once('value', (snapshot) => {
                        let canalresultado = snapshot.val()
                        if (canalresultado == null) {
                            let embederro2 = new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Ops, algo deu errado. Solicte que a equipe do servidor realize novamente o **setupwhitelist**, contate o meu criador se isso não resolver. <a:CheckVermelho:817107349306474547>
                            
                            **Meu criador:** PR#0001`)
                            .setFooter("Atenciosamente, Nerus.")     
                            message.author.send(embederro2)
                            return;
                        }

                        let quantianumero = parseInt(quantia);
                        if (pontos < quantianumero){
                            let embedreprovado = new Discord.MessageEmbed()
                            .setColor(`#FF0000`)
                            .setTitle(`<a:CheckVermelho:817107349306474547> **WHITELIST REPROVADA** <a:CheckVermelho:817107349306474547> `)
                            .setDescription(`Olá ${message.author}, infelizmente você não atingiu a pontuação necessária para ser aceito na whitelist, não fique triste, tente novamente mais tarde.
                            
                            <a:engrena:823635255641505852> **SUAS INFORMAÇÕES** <a:engrena:823635255641505852> `)
                            .addField("Nome e Sobrenome:", `${nomesobrenome}`)
                            .addField("Social Club:", `${socialclub}`)
                            .addField("Quantidade de acertos:", `${pontos}/${quantia}`)
                            .setFooter("Atenciosamente, Nerus.")  
                            client.channels.cache.get(`${canalresultado}`).send(embedreprovado)
                            return;
                        }
                        if (pontos >= quantianumero){
                            let localizarcargoposwl = database.ref(`servidores/${message.guild.id}/configs/cargoposwhitelist`);
                            localizarcargoposwl.once('value', (snapshot) => {
                                let cargo = snapshot.val()
                                let localizarrole = message.member.guild.roles.cache.find(role => role.id === cargo);
                                if (cargo == null){
                                    let embederro3 = new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Ops, algo deu errado. Solicte que a equipe do servidor realize novamente o **setupwhitelist**, contate o meu criador se isso não resolver. <a:CheckVermelho:817107349306474547>
                                    
                                    **Meu criador:** PR#0001`)
                                    .setFooter("Atenciosamente, Nerus.")     
                                    message.author.send(embederro3)
                                    return;
                                }
                                if (!localizarrole){
                                    let embederro3 = new Discord.MessageEmbed()
                                    .setColor(`#750dbb`)
                                    .setAuthor("Nerus - Sistema de Whitelist", "https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setDescription(`Ops, algo deu errado. Solicte que a equipe do servidor realize novamente o **setupwhitelist**, contate o meu criador se isso não resolver. <a:CheckVermelho:817107349306474547>\n\n**Meu criador:** PR#0001`)
                                    .setFooter("Atenciosamente, Nerus.")     
                                    message.author.send(embederro3)
                                    return;
                                }
                                let autor = message.author
                                let member = message.guild.members.cache.get(autor.id)
                                member.setNickname(`${nomesobrenome} | ${socialclub}`)
                                message.member.roles.add(`${cargo}`)
                                let embedaprovado = new Discord.MessageEmbed()
                                .setColor(`#00FF0A`)
                                .setTitle(`<a:CheckVerde:817107349881618442>  **WHITELIST APROVADA** <a:CheckVerde:817107349881618442>`)
                                .setDescription(`Olá ${message.author}, você acaba de ser aceito na whitelist, parabéns!\n\n<a:engrena:823635255641505852> **SUAS INFORMAÇÕES** <a:engrena:823635255641505852> `)
                                .addField("Nome e Sobrenome:", `${nomesobrenome}`)
                                .addField("Social Club:", `${socialclub}`)
                                .addField("Quantidade de acertos:", `${pontos}/8`)
                                .setFooter("Atenciosamente, Nerus.")  
                                client.channels.cache.get(`${canalresultado}`).send(embedaprovado)
                                return;
                            })
                        }
                    })
                })
            }
        })
    }
}
