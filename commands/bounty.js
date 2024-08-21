const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bounty')
        .setDescription(`Used to help folks with finding out how to generate Bounty Hunter style presets.`),
    async execute(interaction, client) {
        let output = ''

        output += 'I\'ve been summoned for information!';
        output += '\n ';
        output += '\nIf If you were trying to generate Bounty Hunter or a similar preset, there is a new tool you will need for generation. You can generate bounty Hunter and similar prests by applying the preset on https://sotnrando.net and then use the tool from MottZilla\'s releases: the new tool here: https://github.com/MottZilla/BountyHunterTool/releases';
        output += '\n ';
        output += '\nA much simpler way to generate these is by using SacredLucy\'s Randomizer Launcher which can be found here: https://github.com/LuciaRolon/SotNRandomizerLauncher/releases';
        output += '\n ';
        output += '\nHope this helps, call me if you need me!';

        await interaction.reply({ content: output, ephemeral: true });
    },
};