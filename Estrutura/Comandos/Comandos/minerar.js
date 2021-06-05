const database = require('../../../Database.js');
const Discord = require('discord.js')
const delayposminerar = new Set();
module.exports = {
    run: async (client, message, args) => {
        if (delayposminerar.has(message.author.id)){
            let embed = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Negado, as baterias da mineradora estão sem carga, tente novamente em 6 minutos <a:Loading:817110188002770976>`)
            .setFooter("Atenciosamente, Nerus.")
            message.channel.send(embed)
            return
        }
        delayposminerar.add(message.author.id); 

        let embed1 = new Discord.MessageEmbed()
        .setColor(`#750dbb`)
        .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
        .setDescription(`Aguarde, estou ligando a mineradora <a:Loading:817110188002770976>`)
        .setFooter("Atenciosamente, Nerus.")
        let mainMsg = await message.channel.send(embed1);

        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█░░░░░░░░░░░░ 10%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 3000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **███░░░░░░░░░░░░ 20%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 5000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **████░░░░░░░░░░ 30%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 7000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **██████░░░░░░░░░ 40%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 9000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **███████░░░░░░░ 50%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 11000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████░░░░░░ 60%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 13000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████░░░░ 70%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 15000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **████████████░░░ 80%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 17000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████████░░ 90%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 19000);
        setTimeout(function(){ 
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, iniciando o sistema de mineração <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **██████████ 100%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
        }, 21000);

        setTimeout(async function(){ 
            mainMsg.delete()
            let embed2 = new Discord.MessageEmbed()
            .setColor(`#750dbb`)
            .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
            .setDescription(`Qual localidade você deseja minerar ? Escolha uma opção abaixo e envie o número no chat.\n\n<:mapa:825446600256127026> **LOCALIDADES DISPONÍVEIS** <:mapa:825446600256127026>\n1 - Vale do Cobre (20% de chance de quebra mecânica)\n2 - Vale do Metal (40% de chance de quebra mecânica)\n3 - Vale do Ouro (60% de chance de quebra mecância)\n4 - Vale do Diamante (80% de chance de quebra mecância)`)
            .setImage("https://thumbs.gfycat.com/AdmiredWelcomeAuklet-small.gif")
            .setFooter("Atenciosamente, Nerus.")
            let mainMsg2 = await message.channel.send(embed2);
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
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Você não selecionou uma localidade a tempo e a mineradora desligou <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
                delayposminerar.delete(message.author.id); 
            })
            const verificanumero = Number(`${msg[0]}`)
            if (!verificanumero) {
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, selecione uma localidade válida <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
                delayposminerar.delete(message.author.id); 
                return;
            }

            function verificaopcao(){
                if (msg[0] == '1'){
                    return true
                } else if (msg[0] == '2'){
                    return true
                } else if (msg[0] == '3'){
                    return true
                } else if (msg[0] == '4'){
                    return true
                } else return false

            }
            if (verificaopcao() == false) {
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setColor(`#750dbb`)
                    .setDescription("Negado, selecione uma localidade válida <a:CheckVermelho:817107349306474547>")
                    .setFooter("Atenciosamente, Nerus")
                );
                delayposminerar.delete(message.author.id); 
                return
            }
            mainMsg2.edit(
                new Discord.MessageEmbed()
                .setImage('https://i.gifer.com/GiaJ.gif')
                .setColor(`#750dbb`)
                .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█░░░░░░░░░░░░ 10%**`)
                .setFooter("Atenciosamente, Nerus.")
            )
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **███░░░░░░░░░░░░ 20%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 82000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **████░░░░░░░░░░ 30%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 112000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **██████░░░░░░░░░ 40%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 142000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **███████░░░░░░░ 50%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 172000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████░░░░░░ 60%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 202000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████░░░░ 70%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 232000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **████████████░░░ 80%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 262000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **█████████████░░ 90%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 292000);
            setTimeout(function(){ 
                mainMsg2.edit(
                    new Discord.MessageEmbed()
                    .setImage('https://i.gifer.com/GiaJ.gif')
                    .setColor(`#750dbb`)
                    .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`Aguarde, mineração em andamento <a:Loading:817110188002770976>\n\n<a:4655_gearSpinning:818621187240230973> **██████████ 100%**`)
                    .setFooter("Atenciosamente, Nerus.")
                )
            }, 322000);

            setTimeout(function(){ 
                setTimeout(() => {
                    delayposminerar.delete(message.author.id); 
                }, 360000);
                const porcentagemfail = Math.random();
                const porcentagemminerios = Math.floor(Math.random() * 15) + 10;
                if (msg[0] == 1){
                    if (porcentagemfail < 0.21) {
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Erro, a mineradora falhou e não foi possível minerar no vale do cobre <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                        return;
                    }
                    let valorunidade = 200
                    let dinheiro = porcentagemminerios * valorunidade
                    let moneyautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money/`);
                    moneyautorbusca.once('value', (snapshot) => {
                        let moneyautor = snapshot.val()
                        let moneyautoratual = parseInt(moneyautor);
                        let moneyautoratt = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/`);
        
                        if (moneyautor == null){
                            moneyautoratt.update({
                                money: dinheiro
                            })
                        } else {
                            let calcular = moneyautoratual+dinheiro
                            moneyautoratt.update({
                                money: calcular
                            })
                        }
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, mineração concluída <a:CheckVerde:817107349881618442>\n**RESULTADOS DA MINERAÇÃO**\n<a:d8fphih5dc0d6475737499da86c36df3:821127104031621141> **Minérios Coletados:** ${porcentagemminerios}\n<a:bitcoin:822474150966591549> **Valor Por Cada Unidade:** ${valorunidade}\n<a:money:824717310832410704> **Dinheiro Total Ganho:** R$${dinheiro},00`)
                            .setFooter("Atenciosamente, Nerus")
                        )
                    })
                    return;
                }
                if (msg[0] == '2'){
                    if (porcentagemfail < 0.41) {
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Erro, a mineradora falhou e não foi possível minerar no vale do metal <a:CheckVermelho:817107349306474547>")
                            .setFooter("Atenciosamente, Nerus")
                        );
                        return;
                    }
                    let valorunidade = 400
                    let dinheiro = porcentagemminerios * valorunidade
                    let moneyautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money/`);
                    moneyautorbusca.once('value', (snapshot) => {
                        let moneyautor = snapshot.val()
                        let moneyautoratual = parseInt(moneyautor);
                        let moneyautoratt = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/`);
        
                        if (moneyautor == null){
                            moneyautoratt.update({
                                money: dinheiro
                            })
                        } else {
                            let calcular = moneyautoratual+dinheiro
                            moneyautoratt.update({
                                money: calcular
                            })
                        }
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, mineração concluída <a:CheckVerde:817107349881618442>\n**RESULTADOS DA MINERAÇÃO**\n<a:d8fphih5dc0d6475737499da86c36df3:821127104031621141> **Minérios Coletados:** ${porcentagemminerios}\n<a:bitcoin:822474150966591549> **Valor Por Cada Unidade:** ${valorunidade}\n<a:money:824717310832410704> **Dinheiro Total Ganho:** R$${dinheiro},00`)
                            .setFooter(`Mineração realizada por ${message.author.username}`)
                        )
                    })
                    return;
                }
                if (msg[0] == '3'){
                    if (porcentagemfail < 0.61) {
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Erro, a mineradora falhou e não foi possível minerar no vale do ouro <a:CheckVermelho:817107349306474547>")
                            .setFooter(`Mineração realizada por ${message.author.username}`)
                        );
                        return;
                    }
                    let valorunidade = 600
                    let dinheiro = porcentagemminerios * valorunidade
                    let moneyautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money/`);
                    moneyautorbusca.once('value', (snapshot) => {
                        let moneyautor = snapshot.val()
                        let moneyautoratual = parseInt(moneyautor);
                        let moneyautoratt = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/`);
        
                        if (moneyautor == null){
                            moneyautoratt.update({
                                money: dinheiro
                            })
                        } else {
                            let calcular = moneyautoratual+dinheiro
                            moneyautoratt.update({
                                money: calcular
                            })
                        }
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, mineração concluída <a:CheckVerde:817107349881618442>\n**RESULTADOS DA MINERAÇÃO**\n<a:d8fphih5dc0d6475737499da86c36df3:821127104031621141> **Minérios Coletados:** ${porcentagemminerios}\n<a:bitcoin:822474150966591549> **Valor Por Cada Unidade:** ${valorunidade}\n<a:money:824717310832410704> **Dinheiro Total Ganho:** R$${dinheiro},00`)
                            .setFooter(`Mineração realizada por ${message.author.username}`)
                        )
                    })
                    return;
                }
                if (msg[0] == '4'){
                    if (porcentagemfail < 0.81) {
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Mineração","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription("Erro, a mineradora falhou e não foi possível minerar no vale do diamante <a:CheckVermelho:817107349306474547>")
                            .setFooter(`Mineração realizada por ${message.author.username}`)
                        );
                        return;
                    }
                    let valorunidade = 800
                    let dinheiro = porcentagemminerios * valorunidade
                    let moneyautorbusca = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/money/`);
                    moneyautorbusca.once('value', (snapshot) => {
                        let moneyautor = snapshot.val()
                        let moneyautoratual = parseInt(moneyautor);
                        let moneyautoratt = database.ref(`servidores/${message.guild.id}/roleplayconsole/economia/${message.author.id}/`);
        
                        if (moneyautor == null){
                            moneyautoratt.update({
                                money: dinheiro
                            })
                        } else {
                            let calcular = moneyautoratual+dinheiro
                            moneyautoratt.update({
                                money: calcular
                            })
                        }
                        mainMsg2.edit(
                            new Discord.MessageEmbed()
                            .setAuthor("Nerus - Sistema de Lavagem","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                            .setColor(`#750dbb`)
                            .setDescription(`Sucesso, mineração concluída <a:CheckVerde:817107349881618442>\n**RESULTADOS DA MINERAÇÃO**\n<a:d8fphih5dc0d6475737499da86c36df3:821127104031621141> **Minérios Coletados:** ${porcentagemminerios}\n<a:bitcoin:822474150966591549> **Valor Por Cada Unidade:** ${valorunidade}\n<a:money:824717310832410704> **Dinheiro Total Ganho:** R$${dinheiro},00`)
                            .setFooter(`Mineração realizada por ${message.author.username}`)
                        )
                    })
                    return;
                }
            },324000 )
    
        }, 22000)
    }
}