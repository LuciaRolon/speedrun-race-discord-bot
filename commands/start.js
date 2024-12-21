const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const zipReplays = require('../common/zipReplays');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription(`Starts a new race with the selected options.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of the race')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Safe',
                        value: 'safe',
                    },
                    {
                        name: 'Casual',
                        value: 'casual',
                    },
                    {
                        name: 'Lycanthrope',
                        value: 'lycanthrope',
                    },
                    {
                        name: 'Nimble',
                        value: 'nimble',
                    },
                    {
                        name: 'Warlock',
                        value: 'warlock',
                    },
                    {
                        name: 'Crash Course',
                        value: 'crash-course',
                    },
                    {
                        name: 'Warlock',
                        value: 'warlock',
                    },
                    {
                        name: 'Bounty Hunter',
                        value: 'bountyhunter',
                    },
                    {
                        name: 'Aperture',
                        value: 'aperture',
                    },
                    {
                        name: 'Magic Mirror',
                        value: 'magic-mirror',
                    },
                    {
                        name: 'Safe - Season 2',
                        value: 'stwosafe',
                    },
                    {
                        name: 'Bingo',
                        value: 'bingo',
                    },
                    {
                        name: 'Leg Day',
                        value: 'leg-day',
                    },
                    {
                        name: 'First Castle',
                        value: 'first-castle',
                    },
                    {
                        name: 'Big Toss',
                        value: 'big-toss',
                    },
                    {
                        name: 'Lucky Sevens',
                        value: 'luckysevens',
                    },
                    {
                        name: 'Grand Tour',
                        value: 'grand-tour',
                    },
                    {
                        name: 'Skinwalker',
                        value: 'skinwalker',
                    },
                    {
                        name: 'Bounty Hunter - Hitman',
                        value: 'hitman',
                    },
                    {
                        name: 'Bounty Hunter - Target Confirmed',
                        value: 'bountyhuntertc',
                    },
                    {
                        name: 'Custom',
                        value: 'Custom',
                    }
                ))
        .addBooleanOption(option =>
            option.setName('tournament')
                .setDescription('Tournament races have more restrictions for non-referees.')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('unranked')
                .setDescription('Unranked races don\'t get tracked on the leaderboards.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('vanilla-music')
                .setDescription('Determines whether resulting seed will have randomized OST.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('lockout')
                .setDescription('If running Bingo, determines if the bingo room will use the lockout setting.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('password')
                .setDescription('Password for the Bingo Room. If not given, a random password will be generated and shared.')
                .setRequired(false)),
    async execute(interaction, client, race) {
        await interaction.deferReply({ ephemeral: true });
        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can close tournament races!', ephemeral: true });
            return;
        }
        let raceChannel = client.guilds.cache.first(1)[0].channels;

        race.initiate(interaction.options.getString('category'), interaction.options.getBoolean('unranked'), interaction.options.getBoolean('tournament'), interaction, raceChannel, interaction.options.getBoolean('lockout'), interaction.options.getString('password'));

    },
};