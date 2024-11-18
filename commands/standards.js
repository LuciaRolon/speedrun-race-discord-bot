const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('standards')
        .setDescription(`Publishes Racing Standards.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Inquiry: Racing Standards!';
        output += '\n ';
        output += '\nRacing standards sometimes change and so this command will be updated as things evolve. Currently there are two sets of raciong standards: The standards used in asynchronous races and tournaments, and then everything else. First we will cover the "official" stuff so that this is a lot easier.';
        output += '\n ';
        output += '\n## Official Standards';
        output += '\n ';
        output += '\n• Fast Core';
        output += '\n• Glitchless Rule Set (Based on Glitchless Speedrun) for all presets except Forge and Glitch';
        output += '\n• Tournament Mode is the default';
        output += '\n• *Color Rando and Music Rando may be toggled without a lot of discussion*';
        output += '\n ';
        output += '\n## Unofficial Standards';
        output += '\n• Glitchless Rule Set (Based on Glitchless Speedrun) for all presets except Forge and Glitch';
        output += '\n• Fast Core is the default, though slow core is available on request';
        output += '\n• All options should be agreed upon by all entrants before the race starts if they deviate from the Official Standard.';
        output += '\n ';
        output += '\n## Additional Notes';
        output += '\nWhen joining races, we encourage everyone to maintain composure in the face of winning or losing. Poor sportsmanship isn\'t a reason for too much disciplinary action, but it makes others less likely to race with you later.';
        output += '\nYou do not need to be in the discord call when participating unless the official tournament rules state as such. There is a countdown timer that is displayed in #race-channel as the race begins.';
        output += '\nPosts in #race-channel should be restricted to the bot and commands to the bot. Anything else should be discussed in #randomizer. Exceptions may include folks stating that they are ready or that they are done.';
        output += '\n ';
        output += '\nI hope this helps and makes a lot of our rules more clear to you! If you have any questions about the rules, please raise a discussion in #randomizer and we\'ll try to help as we can!';

        await interaction.reply({ content: output, ephemeral: false });
    },
};
