const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');


// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('tournamentstart')
//         .setDescription(`Starts a new race with the current or upcoming tournament settings.`),
//     async execute(interaction, client, race) {
//         await interaction.deferReply({ ephemeral: true });
//         const category = "spellbound-qualifiers";
//         const tournament = true;
//         const unranked = false;

//         if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
//             await interaction.editReply({ content: 'Only referees can close tournament races!'});
//             return;
//         }
//         let raceChannel = client.guilds.cache.first(1)[0].channels;
//         race.initiate(category, unranked, tournament, interaction, raceChannel, interaction.options.getBoolean('lockout'), interaction.options.getString('password'));

//     },
// };

// #########- for use when there is no active tournament: -#########
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tournamentstart')
        .setDescription(`Starts a new race with the current or upcoming tournament settings.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Hello, there!';
        output += '\n ';
        output += '\nThere is no active tournament at this time, please try again later!';
        output += '\n ';
        output += '\nApologies, call me if you need me for anything else!';

        await interaction.reply({ content: output, ephemeral: true });
    },
};