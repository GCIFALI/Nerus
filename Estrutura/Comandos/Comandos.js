const database = require("../../Database.js")
const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        var localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
        localizarprefixo.once('value', (snapshot) => {
            const prefix = snapshot.val();
            const comando = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
            if (!comando[0]) return;
            let comandos = ['pagarmultas','limparmultas','multar','roubarammunation','uber','ifood','minerar','resetardocumento','roubarjoalheria','removeitem','anonimo','documento','roubarcaixa','lavardinheiro','revistar','limpar','setuproleplay','whitelist','setupwhitelist','transferir','removemoney','addmoney','banco','rpon','rpoff','excluiritem','additem','dropar','enviar','mochila','criaritem','limparficha','fichar','ficha','say2','fechar','setupticket','trocarprefix', 'ban', 'unban', 'ajuda', 'resetarbans', 'say', 'ship', 'adv', 'radv', 'userinfo', 'serverinfo', 'qrcode', 'avatar', 'ping', 'hug', 'drop'];
            let permanentes = ['desativar', 'ativar','invite', 'leave', 'addblacklist', 'removeblacklist']
            let verifica = comandos.includes(`${comando[0]}`);
            let verifica2 = permanentes.includes(`${comando[0]}`);
            if (verifica || verifica2) {
                if (verifica2) {
                    let comandorun = require(`./Comandos/${comando[0]}.js`)
                    comandorun.run(client, message, args) 
                    return;
                }
                var verificaativo = database.ref(`servidores/${message.guild.id}/sistemas/${comando[0]}`);
                verificaativo.once('value', (snapshot) => {
                    const data = snapshot.val();
                    if (data == null) {
                        let embederro1 = new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Command Handler","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Erro, não foi possível verificar este comando em minha database, contate o meu criador <a:CheckVermelho:817107349306474547>\nMeu criador: PR#0001`)
                        
                        .setFooter("Atenciosamente, Nerus.")
                        message.channel.send(embederro1)
                        return;
                    }
                    if (data == "true") {
                        let comandorun = require(`./Comandos/${comando[0]}.js`)
                        comandorun.run(client, message, args) 
                        let logcomandos = new Discord.MessageEmbed()
                        .setTitle("Nerus - Log de Comandos Globais")
                        .setColor(`#750dbb`)
                        .addFields(
                            { name: `Nome do servidor::`, value: `- ${message.guild.name}`},
                            { name: 'ID do servidor:', value: `- ${message.guild.id}`},
                            { name: `Nome autor do Comando:`, value: `- ${message.author.tag}`},
                            { name: `ID autor do Comando:`, value: `- ${message.author.id}`},
                            { name: `Comando:`, value: `- ${comando[0]}`}       
                        )
                        .setTimestamp()
                        .setFooter("Atenciosamente, Nerus.")
                        client.channels.cache.get("818193008398565417").send(logcomandos)

                    } else {
                        let embederro2 = new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Command Handler","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`A equipe deste servidor achou melhor desativar este comando, caso ache que isso foi um erro contate um membro da equipe <a:CheckVermelho:817107349306474547>`)
                        .setFooter("Atenciosamente, Nerus.")
                        message.channel.send(embederro2)
                        return;
                    }
                });
            } else {
                let embederro3 = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Command Handler","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Erro, este comando não existe <a:CheckVermelho:817107349306474547>\nConfira a lista de comandos utilizando \`${prefix}ajuda\``)
                .setFooter("Atenciosamente, Nerus.")
                message.channel.send(embederro3)
                return;
            }
        })
    }
}