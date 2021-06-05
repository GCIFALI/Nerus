module.exports = async (client) => {
    console.log(`Tudo certo por aqui, fui iniciado !`)
    const botStatus = [ 
      "Olá, eu sou o Nerus, seu amiguinho",
      "Estou na versão 1.1",
      "Precisa de ajuda? Entre no meu servidor de suporte",
      "Meu prefixo padrão: !"
    ];
    setInterval(() => {
      const stts = Math.floor(Math.random() * (botStatus.length - 1) + 1); 
      client.user.setActivity(botStatus[stts],{type: "PLAYING"}); 
    }, 10000);
  }