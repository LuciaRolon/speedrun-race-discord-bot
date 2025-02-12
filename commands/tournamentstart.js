const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tournamentstart')
        .setDescription(`Starts a new race with the current or upcoming tournament settings.`),
    async execute(interaction, client, race) {
        await interaction.deferReply({ ephemeral: true });
        const category = "spellbound";
        const tournament = true;
        const ranked = true;

        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.editReply({ content: 'Only referees can close tournament races!'});
            return;
        }
        let raceChannel = client.guilds.cache.first(1)[0].channels;
        race.initiate(category, ranked, tournament, interaction, raceChannel, interaction.options.getBoolean('lockout'), interaction.options.getString('password'));

    },
};