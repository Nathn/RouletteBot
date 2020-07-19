const Discord = require("discord.js");
const {
    Client,
    Util
} = require("discord.js");
const client = new Discord.Client();
const {
    TOKEN,
    PREFIX
} = require("./config");
const ms = require("ms");


client.on("message", async message => {


    if (message.author.bot) return;
    var now = new Date();
    if (message.content.indexOf(PREFIX) !== 0) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();



    if (command === "kick") {
        var kickable = 'True'
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            message.channel.send("I do not have enough permissions to kick you, but you still can play !");
            kickable = 'False'
        }
        if (kickable == 'True') {
            if (!message.member.kickable) {
                message.channel.send("I do not have enough permissions to kick you, but you still can play !");
                kickable = 'False'
            }
        }
        var proba = Number(args[0]);
        if (!proba) proba = 6;
        if (typeof proba != "number") return message.channel.send("The given probability is not valid");
        if (proba < 2) return message.channel.send("The given probability is too low");
        message.channel.send("** **");
        setTimeout(function () {
            if (Math.floor(Math.random() * proba) == 0) {
                if (kickable == 'True') {
                    message.channel.send("**You lost ! You will be kicked out of the server in 10 seconds...**")
                    console.log(proba + " kick lose")
                    setTimeout(function () {
                        member.kick("You lost !")
                    }, 10000)
                } else {
                    message.channel.send("**You lost ! Luckily for you, I'm too weak to kick you !**")
                    console.log(proba + " kick lose (no perms)")
                }
            } else {
                message.channel.send("**You survived ! Good job !**")
                console.log(proba + " kick win")
            };
        }, 1500)
    } else if (command === "ban") {
        var bannable = 'True'
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            message.channel.send("I do not have enough permissions to ban you, but you still can play !");
            bannable = 'False'
        }
        if (bannable == 'True') {
            if (!message.member.bannable) {
                message.channel.send("I do not have enough permissions to ban you, but you still can play !");
                bannable = 'False'
            }
        }
        var proba = Number(args[0]);
        if (!proba) proba = 6;
        if (typeof proba != "number") return message.channel.send("The given probability is not valid");
        if (proba < 2) return message.channel.send("The given probability is too low");
        message.channel.send("** **");
        setTimeout(function () {
            if (Math.floor(Math.random() * proba) == 0) {
                if (bannable == 'True') {
                    message.channel.send("**You lost ! You will be banned of the server in 10 seconds...**")
                    console.log(proba + " ban lose")
                    setTimeout(function () {
                        member.ban("You lost !")
                    }, 10000)
                } else {
                    message.channel.send("**You lost ! Luckily for you, I'm too weak to ban you !**")
                    console.log(proba + " ban lose (no perms)")
                }
            } else {
                message.channel.send("**You survived ! Good job !**")
                console.log(proba + " ban win")
            };
        }, 1500)
    }


});



client.on("ready", () => {
    client.user.setPresence({
        game: {
            name: 'Russian Roulette',
            type: 'PLAYING'
        },
    })
});


client.login(TOKEN)
