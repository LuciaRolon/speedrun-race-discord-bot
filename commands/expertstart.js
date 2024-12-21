const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('expertstart')
        .setDescription(`[EXPERT] Starts a new race for the selected preset code.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of the race')
                .setRequired(true))
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