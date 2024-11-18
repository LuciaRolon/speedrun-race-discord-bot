const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('../data/data.js');
const {EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replays')
        .setDescription(`Get all replays for a given race ID.`)
        .addStringOption(option =>
            option.setName('race')
                .setDescription('ID of the Race to retrieve replays from')
                .setRequired(true)
        ),
    async execute(interaction, client, race) {
        let replays = data.getReplays(interaction.options.getString('raceId'));
        let output = "";
        Object.keys(replays).forEach(key => {
            output += `${key}: [Replay](${replays[key]})\n`;
        });
        const result = new EmbedBuilder()
            .setColor(0x1f0733)
            .setTitle(`Replays for Race ${interaction.options.getString('raceId')}`)
            .setDescription(output)
        await interaction.reply({ embeds: [result], ephemeral: true });
    },
};