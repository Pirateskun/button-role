const Discord = require("discord.js");
const  mwrcus   = require('discord-buttons')
const marcus = require("./cfg.js")
const client = new Discord.Client()
mwrcus(client);


client.on("ready", async () => {
  client.user.setPresence({ activity: { type: marcus.Bot.Ready.Type, url: `https://twitch.tv/${marcus.Bot.Ready.Twitch}/`, name: marcus.Bot.Ready.Name, status: marcus.Bot.Ready.Status }, });
  let botVoiceChannel = client.channels.cache.get(marcus.Bot.BotVoiceChannel);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("bağlanamadim agabey"));
});

client.on("message", (message) => {
    if (message.content !== marcus.Bot.Command) return;
  
    let Çkl = new mwrcus.MessageButton()
      .setStyle(marcus.Button.CklsRenk) 
      .setLabel(marcus.Button.CklsLabel) 
      .setEmoji(marcus.Button.CklsEmoji)
      .setID(marcus.Button.CekilisID); 
  
    let Etk = new mwrcus.MessageButton()
      .setStyle(marcus.Button.EtkRenk) 
      .setLabel(marcus.Button.EtkLabel) 
      .setEmoji(marcus.Button.EtkEmoji)
      .setID(marcus.Button.EtkinlikID); 
    
  
    message.channel.send(`
Selam ${marcus.Bot.ServerName} üyeleri!

Sunucumuzda sizleri rahatsız etmemek amacıyla \`@everyone\` ve \`@here\` atmayacağız bu yüzden siz bizlerin yaptığı etkinlik ve çekilişlerden haberdar olabilesiniz diye 2 rol açtık;

\` • \` Eğer \`@Etkinlik Katılımcısı\`: Rolü alırsanız sunucumuzda düzenli olarak yapılan Gartic iO/Phone, Vampir Köylü, Doğruluk Cesaretlik, Kamp Ateşi gibi bir çok etkinlikten bildirim alabilir ve katılım sağyalayarak discordda harcadğınız zamanı güzelleştirebilirsiniz.

\` • \` Eğer \`@Çekiliş Katılımcısı\`: Rolü alırsanız sunucumuzda düzenli olarak yapılan ${marcus.Emoji.BluTV}, ${marcus.Emoji.Exxen}, ${marcus.Emoji.Netflix}, ${marcus.Emoji.Nitro}, ${marcus.Emoji.Spotify} çekilişlerinden bilirim alabilir ve bir hediye kazanma şansı yakalayabilirsiniz.

**NOT:**\` Sunucumuzda gereksiz yere @everyone veya @here atılmayacağından dolayı rollerinizi kesinlikle almalısınız aksi takdirde yapılan çekilişlerden ve etkinliklerden bildirim alamaz ve katılım sağlayamazsınız ;(
`, { 
      buttons: [Etk, Çkl]
  });
  });
    
  client.on('clickButton', async (button) => {
    
      if (button.id === marcus.Button.CekilisID) {
          if (button.clicker.member.roles.cache.get(marcus.Rol.Çekiliş)) {
              await button.clicker.member.roles.remove(marcus.Rol.Çekiliş)
              await button.reply.think(true);
              await button.reply.edit(`Başarılı <@&${marcus.Rol.Çekiliş}> adlı rol üzerinizden alındı!`)
          } else {
              await button.clicker.member.roles.add(marcus.Rol.Çekiliş)
              await button.reply.think(true);
              await button.reply.edit(`Başarılı <@&${marcus.Rol.Çekiliş}> adlı rol üzerinize verildi artık çekilişlerden bildirim alacaksınız!`)
          }
      }
  
    
      if (button.id === marcus.Button.EtkinlikID) {
          if (button.clicker.member.roles.cache.get(marcus.Rol.Etkinlik)) {
              await button.clicker.member.roles.remove(marcus.Rol.Etkinlik)
              await button.reply.think(true);
              await button.reply.edit(`Başarılı <@&${marcus.Rol.Etkinlik}> adlı rol üzerinizden alındı!`)
          } else {
              await button.clicker.member.roles.add(marcus.Rol.Etkinlik)
              await button.reply.think(true);
              await button.reply.edit(`Başarılı <@&${marcus.Rol.Etkinlik}> adlı rol üzerinize verildi artık çekilişlerden bildirim alacaksınız!`)
          }
  
      }
  
  });

  client.login(marcus.Bot.ClientToken).then(() => console.log("Giriş yapıldı")).catch(() => console.log("Girişi yapılamadı"));