const { SlashCommandBuilder } = require('@discordjs/builders');
const wheelPreset = require('../common/randPreset.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spin')
        .setDescription(`Tells TinMan to provide a random preset.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Random Preset Chosen: ';
        output += wheelPreset()

        await interaction.reply({ content: output, ephemeral: false });
    },
};