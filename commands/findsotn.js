const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findsotn')
        .setDescription(`Tells TinMan to help folks with finding SOTN.`),
    async execute(interaction, client) {
        let output = ''

        output += 'I\'ve been summoned with information!';
        output += '\n ';
        output += '\nIt looks like you\'re trying to find a copy of Castlevania: Symphony of the Night!';
        output += '\n ';
        output += '\nIf you\'re looking for download links, we recommend the [X-Box ONE version](https://www.xbox.com/en-US/games/store/castlevania-sotn/BSTM3283756M); the [PS5 Requiem version](https://www.playstation.com/en-us/games/castlevania-requiem-symphony-of-the-night-rondo-of-blood/), or the Mobile version for [Android](https://play.google.com/store/search?q=castlevania+symphony+of+the+night&c=apps) or [iOS](https://apps.apple.com/us/app/castlevania-sotn/id1435456830).';
        output += '\n ';
        output += '\nIf you want to have a CD image, those are attached to CD-ROMs available from [eBay](https://www.ebay.com/sch/i.html?_from=R40&_nkw=Castlevania%3A+Symphony+of+the+Night&_sacat=0) or [Amazon](https://www.amazon.com/Castlevania-Symphony-Night-Pc/dp/B00001OWYW)';
        output += '\n ';
        output += '\nIf you ever need this message, please call me with `/findsotn`.';
        output += '\n ';
        output += '\nHope this helps, call me if you need me!';

        await interaction.reply({ content: output, ephemeral: false });
    },
};