exports.run = (client, message, args) => {
    message.channel.send("Becky, please.").catch(console.error);
}