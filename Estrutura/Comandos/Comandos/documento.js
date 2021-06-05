const Discord = require('discord.js')
const database = require('../../../Database.js')

module.exports = {
    run: async (client, message, args) => {
        let buscardocumentoativo = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${message.author.id}`);
        buscardocumentoativo.once('value', async (snapshot) => {
            let documentoativo = snapshot.val()
            if (documentoativo == null){ 
                let embedinicial = new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Olá ${message.author}, não encontrei seu documento em meu banco de dados, mas sem problemas! Vamos criar um ? Por favor, **envie no chat** \`iniciar\` se deseja criar o seu documento.`)
                .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
                .setFooter("Atenciosamente, Nerus.")
                let mainMsg = await message.channel.send(embedinicial);
                error = false;
                let msg;
                await message.channel
                .awaitMessages((m) => m.author.id === message.author.id, {
                    max: 1,
                    time: 40000,
                    errors: ["time"],
                })
                .then((collected) => {
                    msg = collected.first().content.trim().split(/ +/g);
                    collected.first().delete();
                })
                .catch((err) => {
                    error = true;
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription("Você não enviou a confirmação a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus")
                    );
                })
                if (msg[0] === "parar" || msg[0] === "cancelar") {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        .setDescription("Operação cancelada pelo usuário <a:CheckVermelho:817107349306474547>")
                        .setFooter("Atenciosamente, Nerus.")
                    )
                    return;
                }
                if (msg[0] == "iniciar") {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Envie no chat seu **nome e sobrenome**, exemplo: "Paulo Ricardo"`)
                        .setFooter("Atenciosamente, Nerus.")
                    )
                    let msg2;
                    await message.channel
                    .awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 40000,
                        errors: ["time"],
                    })
                    .then((collected) => {
                        msg2 = collected.first().content.trim().split(/ +/g);
                        collected.first().delete();
                    })
                    .catch((err) => {
                        error = true;
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Você não enviou um nome e sobrenome a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                    })


                    function filtramsg2(){
                        if (msg2[0] != ''|| msg2[1] == '') {
                            if (msg2[0] != null && msg2[1] != null) {
                                msg2[0].split('.').join('').split('#').join('').split('$').join('').split('/').join('').split('[').join('').split(']').join('').split(/\s/g).join('').split(`,`).join('').split(`"`).join('').split(`''`).join('').split("``").join('')
                                msg2[1].split('.').join('').split('#').join('').split('$').join('').split('/').join('').split('[').join('').split(']').join('').split(/\s/g).join('').split(`,`).join('').split(`"`).join('').split(`''`).join('').split("``").join('')
                                let nomesobrenomeparafiltro = `${msg2[0]} ${msg2[1]}`
                                const re = /%CC%/g
                                const verificazalgo = txt => re.test(encodeURIComponent(txt));  
                                if (verificazalgo(`${nomesobrenomeparafiltro}`)) {
                                    return false
                                } else {
                                    return nomesobrenomeparafiltro
                                }
                            } else return false
                        } else return false;
                    }

                    if (filtramsg2() == false){
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Negado, informe um nome válido <a:CheckVermelho:817107349306474547>\nLembre-se de que letras modificadas(zalgo) não são permitidas e informar seu sobrenome (ex: Paulo Ricardo).")
                            .setFooter("Atenciosamente, Nerus")
                        );
                        return
                    }
                    const nomesobrenomeuser = filtramsg2()
///////////////////////////////////////////////////////////
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Envie no chat sua idade, exemplo: "22"`)
                        .setFooter("Atenciosamente, Nerus.")
                    )
                    let msg3;
                    await message.channel
                    .awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 40000,
                        errors: ["time"],
                    })
                    .then((collected) => {
                        msg3 = collected.first().content.trim().split(/ +/g);
                        collected.first().delete();
                    })
                    .catch((err) => {
                        error = true;
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Você não enviou sua idade a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                    })
                    let verifica = Number(`${msg3[0]}`)
                    function verificaidade(){
                        if (!verifica) {
                            return false
                        } else {
                            let idade = parseInt(msg3[0])
                            if (idade >= 18) {
                                if (idade < 99) {
                                    return `${idade}`
                                } else return false
                            } else return false
                        }
                    }

                    if (verificaidade() == false){
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Negado, informe uma idade válida <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                        return
                    }
                    const idadeuser = verificaidade()
///////////////////////////////////////////
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setColor(`#750dbb`)
                        .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Envie no chat o seu **sexo**.\n Opções disponíveis: **Feminino** | **Masculino**`)
                        .setFooter("Atenciosamente, Nerus.")
                    )
                    let msg4;
                    await message.channel
                    .awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 40000,
                        errors: ["time"],
                    })
                    .then((collected) => {
                        msg4 = collected.first().content.toLowerCase().trim().split(/ +/g);
                        collected.first().delete();
                    })
                    .catch((err) => {
                        error = true;
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Você não enviou seu sexo a tempo, operação cancelada <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                    })
                    function verificasexo(){
                        if (msg4[0] == 'feminino') {
                            return 1
                        } else if (msg4[0] == 'masculino') {
                            return 2
                        } else return false

                    }

                    if (verificasexo() == false) {
                        if (verificaidade() == false){
                            mainMsg.edit(
                                new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setColor(`#750dbb`)
                                .setDescription("Negado, escolha uma das duas opções para o seu sexo <a:CheckVermelho:817107349306474547>")
                                .setFooter("Atenciosamente, Nerus")
                            );
                            return
                        }
                    }

                    function destinasexo() {
                        if (verificasexo() == 1) {
                            return 'feminino'
                        } else if (verificasexo() == 2){
                            return 'masculino'
                        } else return 'erro, contate o meu criador.'
                    }
                    mainMsg.delete()

                    const sexouser = destinasexo()

                    const cpfuser = (Math.floor(Math.random() * 6543210000000 - 1543210000) + 1543210000000)

                    let salvardados = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${message.author.id}`)
                    salvardados.update({
                        nomeuser: nomesobrenomeuser,
                        idadeuser: idadeuser,
                        sexouser: sexouser,
                        cpfuser: cpfuser
                    })

                    let embeddocumento = new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setThumbnail(message.author.avatarURL())
                    .setColor(`#750dbb`)
                    .setDescription(`<:Doc:825182244192124978> **DOCUMENTAÇÃO** <:Doc:825182244192124978>\n\n**• NOME COMPLETO:**\n${nomesobrenomeuser}\n• **IDADE:**\n${idadeuser} anos\n• **SEXO:**\n${sexouser}\n• **CPF:**\n${cpfuser}`)
                    .setFooter("Atenciosamente, Nerus")
                    message.channel.send(embeddocumento)
                } else mainMsg.delete()


            } else {
                let buscarnomeuser = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${message.author.id}/nomeuser`)
                buscarnomeuser.once('value', (snapshot) => {
                    let nomeusuario = snapshot.val()

                    let buscaridadeuser = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${message.author.id}/idadeuser`)
                    buscaridadeuser.once('value', (snapshot) => {
                        let idadeusuario = snapshot.val()

                        let buscarsexouser = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${message.author.id}/sexouser`)
                        buscarsexouser.once('value', (snapshot) => {
                            let sexousuario = snapshot.val()

                            let buscarcpfuser = database.ref(`servidores/${message.guild.id}/roleplayconsole/documentos/${message.author.id}/cpfuser`)
                            buscarcpfuser.once('value', (snapshot) => {
                                let cpfusuario = snapshot.val()

                                let embeddocumento = new Discord.MessageEmbed()
                                .setAuthor("Nerus - Sistema de Documento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                .setThumbnail(message.author.avatarURL())
                                .setColor(`#750dbb`)
                                .setDescription(`<:Doc:825182244192124978> **DOCUMENTAÇÃO** <:Doc:825182244192124978>\n\n**• NOME COMPLETO:**\n${nomeusuario}\n• **IDADE:**\n${idadeusuario} anos\n• **SEXO:**\n${sexousuario}\n• **CPF:**\n${cpfusuario}`)
                                .setFooter("Atenciosamente, Nerus")
                                message.channel.send(embeddocumento)
                                
                            })
                        })
                    })
                })
            }
        })

        
    }
}