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
date1 = new Date();


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
	} else if (command === 'ping') {
		message.channel.send(`Pong ! ${Math.round(client.ping)}ms`);
		console.log("Ping command requested - " + Math.round(client.ping))
	} else if (command === 'help') {
		date2 = new Date();
		diff = dateDiff(date1, date2);
		const helpEmbed = {
			color: 0x3333ff,
			title: 'Available commands',
			author: {
				name: 'RouletteBot',
				icon_url: 'https://i.imgur.com/sN3erxO.png',
				url: 'https://github.com/Nathn/RouletteBot',
			},
			fields: [{
					name: 'rr!kick {value}',
					value: '1 chance out of {value} to get kicked out of the server. Default value : 6',
					inline: false,
				},
				{
					name: 'rr!ban {value}',
					value: '1 chance out of {value} to get banned of the server. Default value : 6',
					inline: false,
				},
				{
					name: 'rr!ping',
					value: 'Returns the bot latency',
					inline: false,
				}
			],
			footer: {
				text: "Last update " + diff.day + " days, " + diff.hour + " hours and " + diff.min + " minutes ago.",
				icon_url: 'https://i.imgur.com/fsQhDnG.png',
			}
		};
		message.channel.send({
			embed: helpEmbed
		});
		console.log("Help command requested")
	}
	/* else if (command === "groupkick") {
        if (!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send("You do not have enough permissions to start a group roulette !")
        var killed = 0;
        var survived = 0;
        var proba = 6;
        const mentions = message.mentions.members.first(10);
        if (!mentions) return message.channel.send("You have to mention people to start a groupkick roulette !");
        var proba = Number(args[0]);
        if (typeof proba != "number") {
            message.channel.send("The probability is not valid and has been set to default (6).");
            proba = Number(6);
        }
        if (proba < 2) {
            message.channel.send("The given probability is too low and has been set to default (6).");
            proba = Number(6);
        }
        message.mentions.members.forEach(member => {
            message.channel.send(`**It is now <@${member.id}>'s turn.**`);
            var kickable = 'True'
            if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
                message.channel.send("** **");
                message.channel.send(`I do not have enough permissions to kick <@${member.id}>, but he still can play !`);
                kickable = 'False'
            }
            if (kickable == 'True') {
                if (!member.kickable) {
                    message.channel.send("** **");
                    message.channel.send(`I do not have enough permissions to kick <@${member.id}>, but he still can play !`);
                    kickable = 'False'
                }
            }
            message.channel.send("**...**");

            if (Math.floor(Math.random() * proba) == 0) {
                if (kickable == 'True') {
                    message.channel.send(`**<@${member.id}> lost ! He will be kicked out of the server in 10 seconds...**`)
                    killed = killed + 1
                    console.log(proba + " kick lose ID : " + member.id)
                    setTimeout(function () {
                        member.kick("You lost !")
                    }, 10000)
                } else {
                    message.channel.send(`**<@${member.id}> lost ! Luckily for him, I'm too weak to kick him !**`)
                    console.log(proba + " kick lose (no perms) ID : " + member.id)
                    killed = killed + 1
                }
            } else {
                message.channel.send(`**<@${member.id}> survived ! Good job !**`)
                console.log(proba + " kick win ID : " + member.id);
                survived = survived + 1
            };

        });
        message.channel.send(`**The groupkick roulette started by ${message.member} is finally over. ${killed} people have (or should have) been kicked, and ${survived} people have survived.**`)
	}
	*/

});

function dateDiff(date1, date2) {
	var diff = {} // Initialize the return
	var tmp = date2 - date1;

	tmp = Math.floor(tmp / 1000); // Number of seconds between the 2 dates
	diff.sec = tmp % 60;

	tmp = Math.floor((tmp - diff.sec) / 60); // Number of minutes
	diff.min = tmp % 60;

	tmp = Math.floor((tmp - diff.min) / 60); // Number of hours
	diff.hour = tmp % 24;

	tmp = Math.floor((tmp - diff.hour) / 24); // Number of days left
	diff.day = tmp;

	return diff;
}

function sleep(seconds) {
	var waitUntil = new Date().getTime() + seconds * 1000;
	while (new Date().getTime() < waitUntil) true;
}

client.on("ready", () => {
	client.user.setPresence({
		game: {
			name: 'Russian Roulette',
			type: 'PLAYING'
		},
	})
});


client.login(TOKEN)
