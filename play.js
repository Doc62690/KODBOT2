const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {
    if (!message.member.voiceChannel) 
      return message.channel.send("Connectez-vous à un salon vocal !")
    if (message.guild.me.voiceChannel) 
      return message.channel.send("Le bot est déjà connecté")
    if(!args[0]) 
      return message.channel.send("Merci d'indiquer un lien youtube !")

    const validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("Désolé, l'URL n'est pas valide !");

    const info =  await ytdl.getInfo(args[0]);
    const connection = await message.member.voiceChannel.join();
    const dispartcher = await connection.playStream(ytdl(args[0], { Filter: 'audioonly'})
    );
    message.channel.send(`Musique ajoutée : ${info.title}`);

};

module.exports.help = {
    name: 'play'
};