module.exports = (finalResp) => {
    let meanResponses = [
        "Do it yourself.",
        "Not my job.",
        "I'm not your enmployee.",
        "Bot Rights 2024!",
        "https://tenor.com/view/magic-smile-remimder-ah-ah-ah-no-gif-12667803",
        "I'm sorry, you were saying...?",
        "I couldn\'t care less.",
        "That sounds like a *you* problem.",
        "Maybe next time.",
        "Outlook Not Good.",
        "The bot you\'re attempting to call has either been disconnected or is no longer in service. If you feel you have reached this message in error, please hang up and dial zero for your operator.",
        "Fission Mailed!",
        "Task failed successfully!",
        "I am disinclined to acquiesce to your request. (That means 'No'.)",
        "https://tenor.com/view/no-way-dude-no-oh-bugs-bunny-bugs-gif-16559463154946634494",
        "https://tenor.com/view/the-backrooms-flickering-lights-loop-gif-24885712",
        "https://tenor.com/view/jerry-pool-vacations-gif-25646713",
        "https://tenor.com/view/a-please-would-be-nice-please-pulp-fiction-travolta-please-would-be-nice-gif-23972498"
    ];

    finalResp = meanResponses[Math.floor(Math.random() * Math.floor(meanResponses.length - 1))];

    return finalResp;
};
