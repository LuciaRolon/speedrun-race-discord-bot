module.exports = {
    name: 'forfeit',
    async execute(interaction, client, race) {
        await interaction.deferReply({ephemeral: true});
        race.forfeitPlayer(interaction.user);
        await interaction.editReply({ content: 'Thanks for participating!', ephemeral: true });
    }
};