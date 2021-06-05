const Discord = require('discord.js')
const database = require('../../../Database.js')
const delaydatabase = new Set();

module.exports = {
    run: async (client, message, args, guild) => {
        if(!message.guild.me.hasPermission("BAN_MEMBERS")){
            let embederro1 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, eu não tenho a permissão necessária para realizar esta operação <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`BAN_MEMBERS\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro1)
            return;
        }
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            let embederro2 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Erro, você não tem permissão para utilizar este comando <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões necessárias: \`BAN_MEMBERS\``)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embederro2)
            return;
        }
        const Embed = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription("Mencione o usuário ou envie o ID que você deseja banir")
        
        .addField(`<a:CheckVermelho:817107349306474547> Deseja cancelar esta operação ?`, `Digite: \`cancelar\``)
        .addField(`<a:Loading:817110188002770976> Tempo Limite`, `Você possui **40 segundos** para mencionar ou enviar o id do usuário que você deseja banir`)
        .setFooter("Atenciosamente, Nerus.")
        
        const mainMsg = await message.channel.send(Embed);
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
            let filtro = collected.first().content.trim().split(/ +/g);;
            let idbanido = filtro[0].split('<').join('').split('@').join('').split('!').join('').split('>').join('')

            collected.first().delete();
            if (msg[0] === "parar" || msg[0] === "cancelar") {
                mainMsg.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
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
                    .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    
                    .setDescription(`Negado, mencione ou informe um ID de usuário válido <a:CheckVermelho:817107349306474547>`)
                    .setFooter("Atenciosamente, Nerus.")
                );
                
                return;
            }
            if (typeof verificauser == 'number') {
                
                let alvo = message.guild.members.cache.get(idbanido)
                if (alvo) {
                    if (alvo.permissions.has("BAN_MEMBERS")) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setColor(`#750dbb`)
                            .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setDescription(`Erro, você não pode banir um usuário que possui a permissão de banir também <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933>  Permissões do usuário: \`BAN_MEMBERS\``)
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    }
                    if (!alvo.bannable) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription("Erro, não posso banir o dono do servidor ou uma pessoa mais alta que eu na hierarquia de cargos <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    } else alvo.ban({reason: "Responsável pelo banimento: "+message.author.username})
                }
                if (!alvo) {
                    function logembed() {
                        let logbanimentos = new Discord.MessageEmbed()
                        .setTitle("Nerus - Log de Banimentos Database")
                        .setColor(`#750dbb`)
                        
                        .addFields(
                            { name: `Nome do servidor::`, value: `- ${message.guild.name}`},
                            { name: 'ID do servidor:', value: `- ${message.guild.id}`},
                            { name: 'ID dono do servidor:', value: `- ${message.guild.owner.id}`},
                            { name: `Nome autor banimento:`, value: `- ${message.author.username}`},
                            { name: `ID autor banimento:`, value: `- ${message.author.id}`},
                            { name: `ID Banido:`, value: `- ${idbanido}`}       
                        )
                        .setTimestamp()
                        .setFooter("Atenciosamente, Nerus.")
                        client.channels.cache.get("817368106729078815").send(logbanimentos)
                    }
                    if (delaydatabase.has(message.guild.id)) {
                        mainMsg.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            
                            .setDescription("Negado, por questões de segurança aguarde entre 1 a 2 minutos antes de utilizar novamente meu sistema de banimento por banco de dados <a:Loading:817110188002770976> ")
                            .setFooter("Atenciosamente, Nerus.")
                        );
                        return;
                    }
                    delaydatabase.add(message.guild.id);
                    setTimeout(() => {
                    delaydatabase.delete(message.guild.id);
                    }, (Math.floor(Math.random() * 120000 - 60000) + 60000));
                    let verificabanimento = database.ref(`servidores/${message.guild.id}/banimentos/${idbanido}/ban`);
                    verificabanimento.once('value', (snapshot) => { 
                        let verificardado = snapshot.val();
                        if (verificardado == "true") {
                            let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                            localizarprefixo.once('value', (snapshot) => {
                                const prefixo = snapshot.val()
                                mainMsg.edit(
                                    new Discord.MessageEmbed()
                                    .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                    .setColor(`#750dbb`)
                                    
                                    .setDescription(`Esta pessoa já está banida em meu banco de dados <a:CheckVerde:817107349881618442>\nDeseja remover o banimento? Use: \`${prefixo}unban\` `)
                                    .setFooter("Atenciosamente, Nerus.")
                                );
                                return;
                            })
                        }
                    })
                    let banimentosdb = database.ref(`servidores/${message.guild.id}/configs/quantidade/${message.guild.id}`);
                    banimentosdb.once('value', (snapshot) => {
                        let quantidade = snapshot.val()
                        if (quantidade == null) {
                            banimentosdb.set({
                                quantidadeban: 0
                            });
                        } 
                        let localizarbanimentos = database.ref(`servidores/${message.guild.id}/configs/quantidade/${message.guild.id}/quantidadeban`);
                        localizarbanimentos.once('value', (snapshot) => {
                            let quantidadedebans = snapshot.val()
                            if (quantidadedebans >= 10) {
                                let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                                localizarprefixo.once('value', (snapshot) => {
                                    const prefixo = snapshot.val()
                                    mainMsg.edit(
                                        new Discord.MessageEmbed()
                                        .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                        .setColor(`#750dbb`)
                                        
                                        .setDescription(`Desculpe, somente servidores verificados podem banir mais de \`10\` usuários em meu banco de dados <a:CheckVermelho:817107349306474547>\n\n<:Alerta:817107348065615933> Deseja excluir os banimentos atuais ? Use: \`${prefixo}resetarbans\`\n\n<:Interroga:817107349223243778> Quantidade de banimentos por banco de dados permitidos para servidores não verificados: \`10\`\n\n<:Microfone:817107348266942494> Saiba mais sobre [verificação](https://discord.gg/shPzeYtCnZ) de servidores`)
                                        .setFooter("Atenciosamente, Nerus.")
                                    );
                                    delaydatabase.delete(message.guild.id);
                                })
                            } else {
                                let setarquantia = database.ref(`servidores/${message.guild.id}/configs/quantidade/${message.guild.id}`);
                                setarquantia.once('value', (snapshot) => {
                                    setarquantia.update({
                                        quantidadeban: quantidadedebans+1
                                    }); 
                                })
                                let setabanimento = database.ref(`servidores/${message.guild.id}/banimentos/${idbanido}`);
                                setabanimento.once('value', (snapshot) => {
                                    const data = snapshot.val();
                                    if (data == null) {
                                        setabanimento.set({
                                            ban: "true"
                                        });
                                        mainMsg.edit(
                                            new Discord.MessageEmbed()
                                            .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                                            .setColor(`#750dbb`)
                                            
                                            .setDescription(`Este usuário não está no servidor porém adicionei o ID dele em meu banco de dados, caso o mesmo entre no servidor ele receberá o banimento automaticamente <a:CheckVerde:817107349881618442>\n\n<:Alerta:817107348065615933> Atualmente este servidor possúi \`${quantidadedebans+1}\` usuários banidos por banco de dados, o limite atual deste servidor são \`10\` banimentos por banco de dados. Se torne um servidor verificado para aumentar este valor.\n\n<:Alerta:817107348065615933> Atenção, após o usuário entrar no servidor ele será banido automaticamente e seu ID removido de meu banco de dados, para desbanir o usuário basta ir nas configurações do servidor/banimentos e revogar o banimento do mesmo.`)
                                            .setFooter("Atenciosamente, Nerus.")
                                        ); 
                                        logembed()
                                        return;
                                    } 
                                })

                            }
                        })

                        
                    })

                } else {
                    mainMsg.edit(
                        new Discord.MessageEmbed()
                        .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setColor(`#750dbb`)
                        
                        .setDescription("Usuário banido com sucesso <a:CheckVerde:817107349881618442> ")
                        .setFooter("Atenciosamente, Nerus.")
                    );
                    return;
                }
            }

          })
          .catch((err) => {
            error = true;
            mainMsg.edit(
              new Discord.MessageEmbed()
                .setAuthor("Nerus - Sistema de Banimento","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setColor(`#750dbb`)
                
                .setDescription("Erro, ID inválido ou você não respondeu a tempo <a:CheckVermelho:817107349306474547>")
                .setFooter("Atenciosamente, Nerus")
            );
            delaydatabase.delete(message.guild.id);
            
            return;
        });
    }
}