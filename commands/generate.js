const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription(`Deprecated; Used to be used to generate presets not available on the main site.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Thanks for trying to generate from me, TinMan!';
        output += '\n ';
        output += '\nThe generation capabilities of TinMan have been removed because https://sotnrando.net has become publicly accessible with all of the presets you love with more options!';
        output += '\nIf If you were trying to generate Bounty Hunter, there is a new tool you will need for generation. You can find generate the preset on https://sotnrando.net and then using the tool from MottZilla\'s releases: the new tool here: https://github.com/MottZilla/BountyHunterTool/releases';
        output += '\n ';
        output += '\nWe hope you enjoy all of the fantastic new presets and thanks for your patience while we got the new website up.';
        output += '\n ';
        output += '\nHope this helps, call me if you need me!';

        await interaction.reply({ content: output, ephemeral: true });
    },
};