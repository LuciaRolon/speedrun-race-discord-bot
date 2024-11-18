module.exports = {
    name: 'join',
    async execute(interaction, client, race) {
        interaction.deferUpdate().catch(console.error)
        race.joinPlayer(interaction.user);
        race.generateMultistream();
        race.updateSeed();
    }
};