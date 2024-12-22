module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, race) {
        try{
            if (interaction.isChatInputCommand()) {
                if (!client.commands.has(interaction.commandName)) return;
                try {
                    await client.commands.get(interaction.commandName).execute(interaction, client, race);
                } catch (error) {
                    console.error(error);
                    if(interaction.replied || interaction.deferred){
                        await interaction.editReply({ content: 'There was an error while executing this command!'});
                    }else{
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    }
                }
            }

            if (interaction.isButton()) {
                if (!client.buttons.has(interaction.customId)) return;
                try {
                    await client.buttons.get(interaction.customId).execute(interaction, client, race);
                } catch (error) {
                    console.error(error);
                }
            }
        }catch(error){
            console.error(error);
        }
    }
};