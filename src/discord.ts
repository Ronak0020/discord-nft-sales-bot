import { format } from "date-fns";
import Discord, { Intents, TextChannel } from "discord.js";

export const discordSetup = (
  discordBotToken: string,
  discordChannelId: string
): Promise<TextChannel> => {
  const discordBot = new Discord.Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES],
  });
  return new Promise<TextChannel>((resolve, reject) => {
    discordBot.login(discordBotToken);
    discordBot.on("ready", async () => {
      const channel = await discordBot.channels.fetch(discordChannelId);
      resolve(channel as TextChannel);
    });
  });
};

export const createMessage = (
  metadata: { name: string; image: string },
  value: string,
  buyer: string,
  seller: string,
  timestamp: string | number,
  contractAddress: string,
  tokenId: string
) =>
  new Discord.MessageEmbed()
    .setColor("#66ff82")
    .setTitle(`${metadata.name} sold!`)
    .setAuthor(
      "Pleb MAYC Watcher",
      "https://drive.google.com/file/d/12l8yVFWtsKwoErqwZvEV4HuWkAN3Ea6t/view?usp=sharing",
      "https://plebs.io"
    )
    .addFields(
      { name: "Name", value: metadata.name },
      { name: "Amount", value: `${value} Ξ` },
      { name: "Buyer", value: buyer },
      { name: "Seller", value: seller },
      {
        name: "Block Time",
        value: format(
          new Date(parseInt(timestamp as string) * 1000),
          "MMM do y h:mm a"
        ),
      }
    )
    .setURL(`https://opensea.io/assets/${contractAddress}/${tokenId}?ref=0x9A84915DFf8F8801b26D0b35b199E5C16E29f899`)
    .setImage(metadata.image);
