const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tournamentstart')
        .setDescription(`Starts a new race with the current or upcoming tournament settings.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of the race')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Rampage 2025 Tournament Edition',
                        value: 'rampage-te',
                    },
                    {
                        name: 'Chimera',
                        value: 'chimera',
                    },
                    {
                        name: 'Recycler',
                        value: 'recycler',
                    },
                    {
                        name: 'Nimble Lite',
                        value: 'nimble-lite',
                    },
                    {
                        name: 'Cornivus',
                        value: 'cornivus',
                    }
                )),
    async execute(interaction, client, race) {
        let optionsMap
        
        if (["rampage-te"].includes(interaction.options.getString('category'))) {
            optionsMap = {
                "-l": true,         // Color Rando
                "-E": false,        // Enemy Stat Rando
                "-x": true,         // Magic Vessels
                "-z": true,         // Anti-Freeze
                "-y": true,         // That's My Purse!
                "-b": false,        // Infinite Wing Smash
                "-9": true,         // Fast Warps
                "-U": false,        // Unlocked Mode
                "-S": false,        // Surprise Mode
                "--ori2": true,     // Second Castle Random Start
                "--sh": false,      // Shop Price Rando
                "--gd": false,      // Guaranteed Drops
                "--rl": false,      // Reverse Library Cards
                "--gss": false,     // Godspeed Shoes
                "--ls": true,       // Library Shortcut
            };
        } else {
            optionsMap = {
                "-l": true,         // Color Rando
                "-E": false,        // Enemy Stat Rando
                "-x": true,         // Magic Vessels
                "-z": true,         // Anti-Freeze
                "-y": true,         // That's My Purse!
                "-b": false,        // Infinite Wing Smash
                "-9": true,         // Fast Warps
                "-U": false,        // Unlocked Mode
                "-S": false,        // Surprise Mode
                "--ori2": true,     // Second Castle Random Start
                "--sh": false,      // Shop Price Rando
                "--gd": true,       // Guaranteed Drops
                "--rl": false,      // Reverse Library Cards
                "--gss": false,     // Godspeed Shoes
                "--ls": true,       // Library Shortcut
            };
        }
        await interaction.deferReply({ ephemeral: true });
        const tournament = true;
        const unranked = false;

        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.editReply({ content: 'Only referees can close tournament races!'});
            return;
        }
        let raceChannel = client.guilds.cache.first(1)[0].channels;

        race.initiate(interaction.options.getString('category'), unranked, tournament, interaction, raceChannel, interaction.options.getBoolean('lockout'), interaction.options.getString('password'), optionsMap);

    },
};

// #########- for use when there is no active tournament: -#########
// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('tournamentstart')
//         .setDescription(`Starts a new race with the current or upcoming tournament settings.`),
//     async execute(interaction, client) {
//         let output = ''

//         output += 'Hello, there!';
//         output += '\n ';
//         output += '\nThere is no active tournament at this time, please try again later!';
//         output += '\n ';
//         output += '\nApologies, call me if you need me for anything else!';

//         await interaction.reply({ content: output, ephemeral: true });
//     },
// };