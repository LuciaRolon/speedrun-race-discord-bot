module.exports = {
    name: 'ready',
    async execute(interaction, client, race) {
        interaction.deferUpdate().catch(console.error)
        race.readyPlayer(interaction.user);
    }
};