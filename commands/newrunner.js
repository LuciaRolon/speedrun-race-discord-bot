const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newrunner')
        .setDescription(`Tells TinMan to help folks with starting the Any% run.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Welcome new speed runner!!';
        output += '\n ';
        output += '\nWe always recommend Any% for speedruns because it\'s super fast (15-25 minutes), resets don\'t feel as bad, and the glitches are fairly easy to get into.';
        output += '\n- Let\'s start with [this movement and mechanics guide](<https://youtu.be/oF8S82YHEKc>) by Dr4gonBlitz. ';
        output += '\n- Next is the [beginners guide](<https://youtu.be/eVtMl1efvpk>), also by Dr4gonBlitz and the [beginner-to-intermediate playlist](<https://www.youtube.com/playlist?list=PLatVBprEnzK_OwWhDz1ViBFiQrFvCP4Lu>) for more detailed information by TurboDog.';
        output += '\n- Now for a [guide on the boss you need to beat: Dracula](<https://youtu.be/2QuV80PYycM>) by Dr4gonBlitz.';
        output += '\n- TalicZealot has a [video on how to perform skips in Any%](<https://youtu.be/qBMGdgzNPUw>). ';
        output += '\n- Another good video for later: [How To Get World Record](<https://youtu.be/8QTjKT6W4q0>) by Dr4gonBlitz.';
        output += '\n- And finally, an [example run to base your starting runs on](<https://www.speedrun.com/sotn/runs/mkp1p0vy>), here, by Sestren.';
        output += '\n- Oh, and don\'t forget to visit [speedrun.com](<https://speedrun.com/sotn/guides>) for guides on all sorts of topics!';
        output += '\n ';
        output += '\nOf course, you can always come back here for any specifics or parts you\'re stuck on!';
        output += '\n ';
        output += '\nHope this helps, call me if you need me!';

        await interaction.reply({ content: output, ephemeral: false });
    },
};