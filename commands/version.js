const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription(`Gives generic information on the correct SOTN version.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Inquiry: Correct SOTN Version / SOTN Rando Tools Won\'t Start';
        output += '\n ';
        output += '\nTo ensure maximum compatibility with the Randomizer and the SOTN Rando Tools, your back-up of SLUS-00067 must meet these exact specifications:';
        output += '\n ';
        output += '\n- The file size of track 1 is 526,031 KB';
        output += '\n- The text in the .cue file says:';
        output += '\n  - `FILE "[Track 1 Name *Exactly*].bin" BINARY`';
        output += '\n  - `TRACK 01 MODE2/2352`';
        output += '\n  - `INDEX 01 00:00:00`';
        output += '\n  - `FILE "[Track 2 Name *Exactly*].bin" BINARY`';
        output += '\n  - `TRACK 02 AUDIO`';
        output += '\n  - `INDEX 00 00:00:00`';
        output += '\n  - `INDEX 01 00:02:00`';
        output += '\n ';
        output += '\n ';
        output += '\nAdditional tips:';
        output += '\n ';
        output += '\n- Always load from the .cue file, not the .BIN';
        output += '\n- Make sure that the SOTN Rando Tools Version matches the version of Bizhawk: ';
        output += '\n  - 2.1.6 if using Bizhawk 2.10';
        output += '\n  - 2.1.2 if using Bizhawk 2.9.1 or prior';
        output += '\n ';
        output += '\nIt should be noted that you can also try to apply a randomized PPF file to your BIN using https://ppf.SOTN.io and use this hash: https://discord.com/channels/407759960588419073/564738749678878720/1005285860251533362';
        output += '\n ';
        output += '\nI hope this helps!';

        await interaction.reply({ content: output, ephemeral: false });
    },
};
