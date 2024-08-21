const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('binissue')
        .setDescription(`Tells TinMan to help folks with BIN overwrites.`),
    async execute(interaction, client) {
        let output = ''

        output += 'I\'ve been summoned with information!';
        output += '\n ';
        output += '\nThere are two tools to help prevent issues with BIN files.';
        output += '\n ';
        output += '\nFirst and foremost we recommend SacredLucy\'s SotNRandomizerLauncher for its full-suite Capabilities. This tool features an internal copy of the Randomizer, automatic install and updates for BizHawk and Talic\'s Randomizer Tools, and easy core switching for flipping from Nymashock Core to NymaFast Core. It\'s the full package.';
        output += '\nYou can snag it from [SacredLucy\'s GitHub](https://github.com/LuciaRolon/SotNRandomizerLauncher/releases)';
        output += '\n ';
        output += '\nIf the Launcher is too much for you with all of its extra features, the more lightweight PPF Injector by AutoVincent will make your life easier by literally applying the PPF from the same folder. More setup is required but it works like a charm.';
        output += '\nThere is a tutorial for setting up the injector on [eldri7ch\'s YouTube Channel](https://youtu.be/8pjQ38PoeMQ?si=JXvvaCjTpNlRnNgA).';
        output += '\nThe injector, itself, can be found on [AutoVincent\'s GitHub](https://github.com/AutoVincent/ppfinjector/releases)';
        output += '\n ';
        output += '\nIf you ever need this message, please call me with `/binissue`.';
        output += '\n ';
        output += '\nHope this helps, call me if you need me!';

        await interaction.reply({ content: output, ephemeral: false });
    },
};