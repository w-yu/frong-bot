const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: 'Displays when you joined the server',
	aliases: ['si'],
	args: false,
	execute(message) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription('**Server Info**')
			.setColor('BLACK')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`**Name:** ${message.guild.name}`,
				`**ID:** ${message.guild.id}`,
				`**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**Time Created:** ${message.guild.createdAt.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}`,
				'\u200b',
			])
			.addField('Statistics', [
				`**Role Count:** ${roles.length}`,
				`**Emoji Count:** ${emojis.size}`,
				`**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**Member Count:** ${message.guild.memberCount}`,
				`**Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**Bots:** ${members.filter(member => member.user.bot).size}`,
				`**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				'\u200b',
			])
			.addField('Presence', [
				`**Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
			]);

		message.delete().then(message.channel.send(embed));
	},
};