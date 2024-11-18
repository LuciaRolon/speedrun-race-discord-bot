const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('../data/data.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription(`Outputs summarized race stats for the selected category or user.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category')
                .setRequired(false)
                .addChoices(
                    {
                        name: 'guarded-og',
                        value: 'guarded-og',
                    },
                    {
                        name: 'safe',
                        value: 'safe',
                    },
                    {
                        name: 'casual',
                        value: 'casual',
                    },
                    {
                        name: 'nimble',
                        value: 'nimble',
                    },
                    {
                        name: 'lycanthrope',
                        value: 'lycanthrope',
                    },
                    {
                        name: 'expedition',
                        value: 'expedition',
                    },
                    {
                        name: 'warlock',
                        value: 'warlock',
                    },
                    {
                        name: 'adventure',
                        value: 'adventure',
                    },
                    {
                        name: 'og',
                        value: 'og',
                    },
                    {
                        name: 'speedrun',
                        value: 'speedrun',
                    },
                    {
                        name: 'bat-master',
                        value: 'bat-master',
                    },
                    {
                        name: 'boss-rush',
                        value: 'boss-rush',
                    },
                    {
                        name: 'bounty-hunter',
                        value: 'bountyhunter',
                    },
                    {
                        name: 'summoner',
                        value: 'summoner',
                    },
                    {
                        name: 'scavenger',
                        value: 'scavenger',
                    },
                    {
                        name: 'aperture',
                        value: 'aperture',
                    },
                    {
                        name: 'breach',
                        value: 'breach',
                    },
                    {
                        name: 'forge',
                        value: 'forge',
                    },
                    {
                        name: 'big-toss',
                        value: 'big-toss',
                    },
                    {
                        name: 'grand-tour',
                        value: 'grand-tour',
                    },
                    {
                        name: 'crash-course',
                        value: 'crash-course',
                    },
                    {
                        name: 'leg-day',
                        value: 'leg-day',
                    },
                    {
                        name: 'beyond',
                        value: 'beyond',
                    },
                    {
                        name: 'magic-mirror',
                        value: 'magic-mirror',
                    },
                ))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('user')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Select true if you want the reply to be visible to everybody.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('top')
                .setDescription('Select how many users to display. If you want all, type "all".')
                .setRequired(false)),
    async execute(interaction) {
        const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
        let category = interaction.options.getString('category');
        let player = interaction.options.getUser('user');
        let isPlayer = false;
        let oTop = interaction.options.getString('top');
        let hidePost = false

        let stats = null;

        if (category) {
            stats = data.getCategoryStats(category);
        } else if (player) {
            stats = data.getPlayerStats(player.id);
            isPlayer = true;
        } else {
            stats = data.getPlayerStats(interaction.user.id);
            isPlayer = true;
        }

        let output = '';
        if (stats && isPlayer) {
            if(category !== null) {
                output += category + ' stats';
            }else{
                output += 'Player stats';
            }
            if(player.twitch !== undefined){
                output += '\n Stream: <' + player.twitch + '>';
            }
            stats.categories.forEach(category => {
                output += '\n' + ('`Category: ' + category.name).padEnd(35, " ") + '`';
                output += '\n' + ('`  Rank: ' + category.rank).padEnd(35, " ") + '`';
                output += '\n' + ('`  Elo: ' + category.elo).padEnd(35, " ") + '`';
                output += '\n' + ('`  Matches: ' + category.matches).padEnd(35, " ") + '`';
            });
        } else if (stats) {
            output += 'Stats:';
            output += '\n`' + centerPad((category), 24) + '`';
            output += '\n`' + (' Players: ' + stats.categoryPlayers).padEnd(24, " ") + '`';
            if(oTop !== null){
                output += '\n`' + centerPad(('Top ' + oTop), 24) + '`';
            }else{
                output += '\n`' + centerPad(('Top Players'), 24) + '`';
            }

            for (let i = 0; i < stats.top.length; i++) {
                output += '\n`' + ((i + 1) + '.' + stats.top[i].username).padEnd(19, " ") + (stats.top[i].elo + ' ').padEnd(5, " ") + '`';
                if (i == oTop) {
                    break;
                }
            }
        } else {
            output += 'No stats available yet.';
        }

        if (oTop < 6) {
                hidePost = !interaction.options.getBoolean('public')
            } else if (oTop = 'all') {
                hidePost = true
            } else {
                hidePost = true 
            }

        await interaction.reply({ content: output, ephemeral: hidePost });
    },
};