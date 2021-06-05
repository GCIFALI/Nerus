const Discord = require('discord.js')
const Comandos = require("../Comandos/Comandos.js");
const delaycomando = new Set();
const delayinfo = new Set();
const delayverificadb = new Set();
const database = require("../../Database.js")
const delaystatus = new Set();

module.exports = async (client, message, guild) => {
    if(message.channel.type == "dm") return; //Ignora mensagens diretas
    if (message.author.bot) return; //Ignora mensagens enviadas por bots
    if (message.guild.id == '825423554639560756') return;
    let localizardatabase = database.ref(`servidores/${message.guild.id}/`);
    localizardatabase.once('value', (snapshot) => {
        if (delayverificadb.has(message.guild.id)) {
            return;
        } else {
            delayverificadb.add(message.guild.id);
            setTimeout(() => {
                delayverificadb.delete(message.guild.id); 
            }, 86400000);
            let data = snapshot.val()
            if (data == null) {
                database.ref(`servidores/${message.guild.id}/sistemas`).set({
                    setuproleplay: "true",
                    trocarprefix: "true",
                    additem: "true",
                    addmoney: "true",
                    adv: "true",
                    ajuda: "true",
                    avatar: "true",
                    ban: "true",
                    banco: "true",
                    criaritem: "true",
                    drop: "true",
                    dropar: "true",
                    enviar: "true",
                    excluiritem: "true",
                    fechar: "true",
                    ficha: "true",
                    fichar: "true",
                    hug: "true",
                    limparficha: "true",
                    mochila: "true",
                    ping: "true",
                    qrcode: "true",
                    radv: "true",
                    removemoney: "true",
                    resetarbans: "true",
                    rpoff: "true",
                    rpon: "true",
                    say: "true",
                    say2: "true",
                    serverinfo: "true",
                    setupticket: "true",
                    setupwhitelist: "true",
                    ship: "true",
                    sistemas: "true",
                    transferir: "true",
                    unban: "true",
                    userinfo: "true",
                    whitelist: "true",
                    limpar: "true",
                    limpardinheiro: "true",
                    revistar: "true",
                    documento: "true",
                    lavardinheiro: "true",
                    roubarcaixa: "true",
                    anonimo: "true",
                    removeitem: "true",
                    roubarjoalheria: "true",
                    resetardocumento: "true",
                    ///////
                    instagram: "true",
                    roubarbanco: "true",
                    fazendeiro: "true",
                    multar: "true",
                    limparmultas: "true",
                    pagarmultas: "true",
                    minerar: "true",
                    ifood: "true",
                    uber: "true",
                    roubarammunation: "true"
        
                });
                database.ref(`servidores/${message.guild.id}/configs`).set({
                    prefix: "!"
                }); 
            } else return;
        }
        
    })
    if (message.author.id == '348319220288716810') {
        if (message.content.startsWith("sair")){
            let conteudo = message.content.trim().split(/ +/g)
            let idservidor = conteudo[1]
            console.log(idservidor)
            client.guilds.cache.get(idservidor).leave().catch(err => {message.channel.send(`Deu ruim para sair da guild, erro: \n ${err.message}`);})
            message.reply("Ok")
            return
        }
    }
    if (message.author.id == '348319220288716810') {
        if (message.content === 'nerusservers'){
            let serverlist = ''
            client.guilds.cache.forEach((guild) => {
                serverlist = serverlist.concat(" - " + guild.name + ": ID: " + guild.id + "\n"+ ": ID DONO: "+ guild.owner.id + "\n"+ ": ID TAG: "+ guild.owner.user.tag + "\n")
            })
            attachment = new Discord.MessageAttachment(Buffer.from(serverlist, 'utf-8'), 'myfile.txt');
            message.channel.send('SERVIDORES NERUS', attachment);
            console.log(serverlist)
            return
        }
    }
    setTimeout(function(){ 
        if (message.content === `<@!${client.user.id}>`) {
            if (delayinfo.has(message.author.id)) {
                const embeddelay = new Discord.MessageEmbed()
                .setAuthor(`Erro, por segurança aguarde 15 segundos para utilizar este recurso novamente `,"https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                .setDescription(`<:Alerta:817107348065615933> Cansado de esperar? Se torne um servidor verificado e ganhe benefícios`)
                .setColor("#750dbb")
                
                .setFooter("Atenciosamente, Nerus.")
                message.channel.send(embeddelay).then(m => m.delete({timeout: 6000}));
            } else {
                let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
                localizarprefixo.once('value', (snapshot) => {
    
                    const prefix = snapshot.val();
                    return message.channel.send(
                    new Discord.MessageEmbed()
                        .setAuthor("Nerus - Painel de Informações","https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                        .setDescription(`Olá, eu sou o Nerus, o seu amiguinho, confira abaixo minhas configurações para este servidor:\n<a:setinha:817162990721302561> Meu Prefixo: \`${prefix}\`\n<a:Musica:817110174833049650>  Id do servidor: \`${message.guild.id}\`\n<:Alerta:817107348065615933>  Digite \`${prefix}ajuda\` para mais informações`)
                        
                        .setColor(`#750dbb`)
                        .setFooter("Atenciosamente, Nerus.")
                    );
    
                })
                delayinfo.add(message.author.id); // Adioiona o id do usuário no delay
                setTimeout(() => {
                    delayinfo.delete(message.author.id); // Apos 2 segundos remove o usuário do delay
                }, 15000);
                
            }
        }
        let localizarprefixo = database.ref(`servidores/${message.guild.id}/configs/prefix`);
        localizarprefixo.once('value', (snapshot) => {
            const prefix = snapshot.val();
            let verifica= message.content.slice(prefix.length).trim().split(/ +/g);//verifica o conteudo da mensagem
            if (!message.content.startsWith(prefix) || (verifica[0] == 0)) { //Se o conteudo não começar com prefix ou se o args 0 for vazio, retorna
                return;
            }
            if (message.content.startsWith(prefix)){ //Verifica se o conteúdo da mensagem começa com o prefixo
                if (delaycomando.has(message.author.id)) { //Verificação e aplicação do delay de 3 segundos
                    const embeddelay = new Discord.MessageEmbed()
                    .setAuthor(`Erro, por segurança aguarde 3 segundos para utilizar um comando novamente `,"https://media.discordapp.net/attachments/807079371768070144/826834705537826867/96x96.png")
                    .setDescription(`<:Alerta:817107348065615933> Cansado de esperar? Se torne um servidor verificado e ganhe benefícios`)
                    .setColor("#750dbb")
                    
                    .setFooter("Atenciosamente, Nerus.")
                    message.channel.send(embeddelay).then(m => m.delete({timeout: 4000}));
                } else {
                    var blacklist = database.ref(`blacklist/users/${message.author.id}/barrado`);
                    blacklist.once('value', (snapshot) => {
                        const blacklist = snapshot.val();
                        if (blacklist == "true"){
                            message.channel.send(`<a:CheckVermelho:817107349306474547> **Comando ignorado! Você está na black list de usuários** <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933> Acha que isso foi um erro? Contate o meu criador: **PR#0001**`).then(m => m.delete({timeout: 5000}));
                        } else {
                            Comandos.run(client, message, database); 
                        }
                    })
                    delaycomando.add(message.author.id); // Adioiona o id do usuário no delay
                    setTimeout(() => {
                    delaycomando.delete(message.author.id); // Apos 2 segundos remove o usuário do delay
                    }, 3000);
                }
            }
        });
    }, 1000)
}
