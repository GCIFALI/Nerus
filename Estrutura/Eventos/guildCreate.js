const database = require(`../../Database.js`);
const Discord = require('discord.js')

module.exports = async (client, guild) => {
    let logentrada = new Discord.MessageEmbed()
    .setTitle("NOVO SERVIDOR")
    .setDescription("Fui adicionado em um novo servidor, ebaa!?")
    .addField('Servidor:', `${guild.name}`, true)
    .addField('ID do servidor:', `${guild.id}`, true)
    .addField('Dono do servidor:', `${guild.owner}`, true)
    .addField('Membros totais do servidor:', `${guild.memberCount}`, true)
    .setColor("#750dbb")
    client.channels.cache.get('818193880696356894').send(logentrada);
    guild.fetchInvites()
    .then(invites => client.channels.cache.get('818193880696356894').send(`**Servidor:** ${guild.name}   |  **Convites:**\n` + invites.map(invite => invite.code).join('\n')))
    .catch(console.error);
    setTimeout(function(){ 
      client.channels.cache.get('818193880696356894').send(`--------------------------------------------------------------------------`)
    }, 2000); 

    let blacklist = database.ref(`blacklist/servers/${guild.id}/barrado`);
    blacklist.once('value', (snapshot) => {
        let blacklistguild = snapshot.val();
        if (blacklistguild == "true" ) {
            guild.owner.send(`<a:CheckVermelho:817107349306474547> **Negado! O seu servidor está na blacklist** <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933> Acha que isso foi um erro? Contate o meu criador: **PR#0001**`)
            guild.leave()
            let deletardbposblacklist = database.ref(`servidores/${guild.id}`);
            deletardbposblacklist.remove()
            return;
        } 

        let blacklist2 = database.ref(`blacklist/users/${guild.owner.id}/barrado`);
        blacklist2.once('value', (snapshot) => {
            let blacklistdonoguild = snapshot.val()
            if (blacklistdonoguild == "true"){
                guild.owner.send(`<a:CheckVermelho:817107349306474547> **Negado! Você está na minha blacklist, logo não pode me adicionar em um servidor em que você é dono** <a:CheckVermelho:817107349306474547>\n<:Alerta:817107348065615933> Acha que isso foi um erro? Contate o meu criador: **PR#0001**`)
                guild.leave()
                let deletardbposblacklist2 = database.ref(`servidores/${guild.id}`);
                deletardbposblacklist2.remove()
                return;
            }
        })
        database.ref(`servidores/${guild.id}/sistemas`).set({
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
        database.ref(`servidores/${guild.id}/configs`).set({
            prefix: "!"
        }); 
        

    })
}