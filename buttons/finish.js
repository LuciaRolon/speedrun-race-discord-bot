module.exports = {
    name: 'finish',
    async execute(interaction, client, race) {
        await interaction.deferReply({ephemeral: true});
        race.finishPlayer(interaction.user);
        if (race.isRanked) {
            await interaction.editReply({ content: 'Please submit a replay using /replay', ephemeral: true });
        } else {
            await interaction.editReply({ content: 'Thanks for participating!', ephemeral: true });
        }
    }
};