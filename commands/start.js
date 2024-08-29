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
                        name: 'og',
                        value: 'og',
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
                        name: 'aperture',
                        value: 'aperture',
                    },
                    {
                        name: 'big-toss',
                        value: 'big-toss',
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
                    {
                        name: 'bingo',
                        value: 'bingo',
                    },
                    {
                        name: 'Custom',
                        value: 'Custom',
                    },
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
        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can close tournament races!', ephemeral: true });
            return;
        }
        if (!race.allReplaysSubmitted() && race.replays.lenght > 1) {
            zipReplays(interaction.channel, race);
        }
        let raceChannel = client.guilds.cache.first(1)[0].channels;

        race.initiate(interaction.options.getString('category'), interaction.options.getBoolean('unranked'), interaction.options.getBoolean('tournament'), interaction, raceChannel, interaction.options.getBoolean('lockout'), interaction.options.getString('password'));
        await interaction.deferReply({ ephemeral: true });
    },
};