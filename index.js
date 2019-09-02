const Discord = require('discord.js');
console.log('Discord.js Iniciado\n')
const client = new Discord.Client();
console.log('Client do bot iniciado\n')
console.log('CARREGANDO CONFIG DO BOT\n')
const config = require("./config.json");
console.log('CONFIG INICIADO\n\n\n\n\nINICIANDO BOT...\n\n\n\n\n')

//AGRADECIMENTO AO DONO DO SERVIDOR POR ADICIONAR O FREE FIRE BOT
client.on("guildCreate", guild => {
 
    const agradecimento = new Discord.RichEmbed()
    .setTitle(`${guild.owner.user.username} muito obrigado por me adicionar!`)
    .setURL('https://discord.gg/hEDC8wm')
    .setDescription('Sou um bot com o intuito de organizar e deixar mais divertido os servidores da comunidade Free Fire 🤩')
    .setColor('#00ff4d')
    .addBlankField()
    .addField(`E agora, o que você pode fazer pra deixar o ${guild.name} mais organizado e mais divertido? `, `Vou dar algumas sugestões!`, true)
    .addBlankField()
    .addField('Permissão', 'Você deve colocar um cargo com permissão de administrador em mim!\n\n', true)
    .addField('Configuração', 'Irei criar uma sala chamada ``📃noticias``, para o servidor ficar ciente de todas as noticias sobre o Free Fire!')
    .addField('Sugestão', 'Existe um comando chamado ``ff!ajuda`` para você ficar sabendo de todos os comandos do bot!')
    .addBlankField()
    .addField('EXISTE UMA SERVIDOR DE SUPORTE SOBRE O BOT:', 'Servidor: https://discord.gg/hEDC8wm')
    .addBlankField()
    .setFooter('FREE FIRE BOT NEWS', 'https://i.pinimg.com/originals/90/a3/18/90a318fb76813f3d59d70c84ede3e9a9.png')
    .setTimestamp()
    guild.owner.send(agradecimento);

});

//STATUS DO BOT
client.on('ready', () => {
    console.log(`${client.user.tag} ficou online! faça um bom uso!!`);
    client.user.setActivity("🎮 Atualmente em 436 servidores...   🏆 Me convide, o que esta esperando? 🔥 Suporte geralmente 24h online :) 👨‍🦲 OLHA O CAPA MOÇO 👨‍🦲", { type: "PLAYING", url: "https://www.twitch.tv/soldado56"} )
    
    });


client.on('message', message => {
    
//COMANDO DE AJUDA
    if(message.content.startsWith('ff!ajuda')){
        
        message.delete();

        var membro = message.member;

        const ajudamessage = new Discord.RichEmbed()
        .setTitle('AJUDA DO BOT :)')
        .setURL('https://discord.gg/hEDC8wm')
        .setDescription('Pelo visto você esta precisando de uma ajudinha né?')
        .setColor('#07ffcb')
        .addBlankField()
        .addField('COMANDOS\n\n', 'Todos os comandos que você ultilizar deve ter **FF!** antes!')
        .addBlankField()
        .addField('ff!alertar', 'Esse comando deve ser ultilizado para você alertar todos os usuarios em uma sala especifica! A sintaxe correta é ``ff!alertar #sala noticia``')
        .addField('ff!info', 'Esse comando é para você ver todas as informações do bot e do server!')
        .addBlankField()
        .addField('EXISTE UMA SERVIDOR DE SUPORTE SOBRE O BOT:', 'Servidor: https://discord.gg/hEDC8wm')
        .addBlankField()
        .setFooter('FREE FIRE BOT NEWS', 'https://i.pinimg.com/originals/90/a3/18/90a318fb76813f3d59d70c84ede3e9a9.png')
        .setTimestamp()
        membro.send(ajudamessage).then (msg => (msg.delete(200000)));

        message.channel.send(`${message.author} te ajudarei em seu privado`).then (msg => (msg.delete(4000)));

    }

//COMANDO DE ALERTAR COM SALA PERSONALIZADO!
    if(message.content.startsWith('ff!alertar')){
        
        const permissão = message.member.hasPermission('ADMINISTRATOR');
        const sala = message.mentions.channels.first();
        const argumentos = message.content.split(' ').splice(2).join(' ')
        
        message.delete();

        if(!permissão) return message.reply('☝🏿 Você não tem permissão para fazer esse comando ').then (msg => msg.delete('3000'))
        if(!sala) return message.reply('☝🏿 Você precisa mencionar alguma sala para fazer seu aviso!').then (msg => msg.delete('3000'))
        if(!argumentos) return message.reply(`☝🏿 Você precisa de alguma mensagem para alertar os membros que consegue ver a sala ${sala}`).then (msg => msg.delete('3000'))
        console.log(`O ${message.author} aplicou o ff!alertar`)
        
        const avisoembed = new Discord.RichEmbed()
        .setTitle('AVISO')
        .setColor('#000000')
        .setDescription('Um administrador quer avisar o servidor!')
        .setThumbnail('https://i.pinimg.com/originals/90/a3/18/90a318fb76813f3d59d70c84ede3e9a9.png')
        .addBlankField()
        .addField(argumentos, `Atenciosamente ${message.author}`, true)
        .addBlankField()
        .setFooter('FREE FIRE BOT NEWS')
        .setTimestamp()
        sala.send(avisoembed);
    }

// INFORMAÇÕES DO SERVIDOR E DO BOT
    if(message.content.startsWith('ff!info')){

        
        let botAvatar = client.user.displayAvatarURL
        let date = client.user.createdAt
        let userName = client.user.username

        const infembed = new Discord.RichEmbed()
        .setDescription('Qual informação você quer saber?')
        .addField('BOT', '🤖',true)
        .addField('SERVIDOR', '👥', true)
        message.channel.send(infembed).then(msg11 => {

            msg11.react('🤖')
            msg11.react('👥');

          client.on('messageReactionAdd', (reaction, user) => {
              if(reaction.emoji.name === "🤖" && user.id !== client.user.id) {
                  reaction.remove(user)
    
                  const botinf = new Discord.RichEmbed()
                  .setDescription('🤖INFORMAÇÕES DO BOT')
                  .setColor('#eb1818')
                  .addBlankField()
                  .setThumbnail(botAvatar)
                  .addField('Nome do bot', userName)
                  .addBlankField()
                  .setFooter('FREE FIRE BOT NEWS')
                  .setTimestamp()
                  message.channel.send(botinf).then (msg => msg.delete('5000'))
              }

              if(reaction.emoji.name === "👥" && user.id !== client.user.id) {
                reaction.remove(user)
  
                const botinf = new Discord.RichEmbed()
                .setDescription('👥INFORMAÇÕES DO SERVIDOR')
                .setColor('#eb0000')
                .addBlankField()
                .addField('INFORMAÇÕES DO SERVIDOR', '👥',true)
                .addField("NOME", message.guild.name, true)
                .addBlankField()
                .addField("ID", message.guild.id, true)
                .addField("CRIADOR", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                .addBlankField()
                .addField("Total | Humanos | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
                .addField("SALAS", message.guild.channels.size, true)
                .addField("CARGOS", message.guild.roles.size, true)
                .addBlankField()
                .setFooter('FREE FIRE BOT NEWS')
                .setTimestamp()
                message.channel.send(botinf).then (msg => msg.delete('10000'))
            }
            })
        })  

    }
})

client.login(config.token);