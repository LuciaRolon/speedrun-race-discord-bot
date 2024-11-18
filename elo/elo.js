/*
The guide I used to implement ELO: https://blog.mackie.io/the-elo-algorithm
K determines how strongly matches impact player ELO scores.
KPlacement is a higher K value that is used during the initial few matches.
N shows the difference in score that describes a 2x skill difference. Results in broader scores.
 */
const data = require('../data/data.js');
const eloConfig = require('../elo/eloConfig.json');
const K = parseInt(eloConfig.K);
const KPlacement = parseInt(eloConfig.KPlacement);
const N = parseInt(eloConfig.N);

function roundToFive(x) {
    if ((Math.abs(x) % 5) < 3 && x > 0) {
        return (Math.floor(x / 5)) * 5;
    } else if ((Math.abs(x) % 5) > 2 && x > 0) {
        return (Math.ceil(x / 5)) * 5;
    } else if ((Math.abs(x) % 5) < 3 && x < 0) {
        return (Math.ceil(x / 5)) * 5;
    } else {
        return (Math.floor(x / 5)) * 5;
    }
}

//result: 1-win, 0-loss, 0.5-draw
function calculatePoints(eloA, eloB, Kvalue, result) {
    let eloDifference = eloA - eloB;
    let exponent = -(eloDifference / N);
    let expectedScrore = 1 / (1 + Math.pow(10, exponent));
    let adjustment = Kvalue * (result - expectedScrore);
    return roundToFive(adjustment);
}

function millisecondsToHMS(milliseconds) {
    if(milliseconds === null){
        return null;
    }
    const totalSeconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate minutes
    const seconds = totalSeconds % 60; // Calculate remaining seconds

    // Format the string to "HH:MM:SS" with leading zeros
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getCurrentDateTimeString() {
    const now = new Date(); // Get the current date and time

    // Format the date components
    const year = now.getUTCFullYear(); // Get the current year (UTC)
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Get the current month (UTC) and pad with zero
    const day = String(now.getUTCDate()).padStart(2, '0'); // Get the current day (UTC) and pad with zero

    // Format the time components
    const hours = String(now.getUTCHours()).padStart(2, '0'); // Get the current hours (UTC) and pad with zero
    const minutes = String(now.getUTCMinutes()).padStart(2, '0'); // Get the current minutes (UTC) and pad with zero
    const seconds = String(now.getUTCSeconds()).padStart(2, '0'); // Get the current seconds (UTC) and pad with zero

    // Construct the final ISO 8601 formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

module.exports = {
    resolveMatch: function(matchPlayers, category, isRanked, raceId) {
        let adjustments = [];
        matchPlayers.sort((a, b) => {
            // Check if 'a.time' or 'b.time' is null
            if (a.time === null && b.time === null) return 0; // Both are null, keep order
            if (a.time === null) return 1; // 'a.time' is null, so 'b' comes before
            if (b.time === null) return -1; // 'b.time' is null, so 'a' comes before

            // Compare non-null times
            return a.time - b.time; // Sort in ascending order
        });
        for (let i = 0; i < matchPlayers.length; i++) {
            let adjustment = 0;
            if (!isRanked){
                // Non-ranked matches should not change a player's elo
                adjustments.push(adjustment);
                continue;
            }
            let playerElo = data.getPlayerElo(matchPlayers[i].id, category);
            let playerK = data.checkPlayerRanked(matchPlayers[i].id, category) ? K : KPlacement;

            for (let j = 0; j < i; j++) {
                if (matchPlayers[i].forfeited && matchPlayers[j].forfeited) {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].id, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 0.5);
                } else {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].id, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 0);
                }
            }
            for (let j = i + 1; j < matchPlayers.length; j++) {
                if (matchPlayers[i].forfeited && matchPlayers[j].forfeited) {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].id, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 0.5);
                } else {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].id, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 1);
                }
            }
            adjustments.push(adjustment);
        }
        let results = []
        let placement = 1;
        const matchDate = getCurrentDateTimeString();
        // Call Upload Match Results
        for (let i = 0; i < matchPlayers.length; i++) {
            results.push({
                "user_id": matchPlayers[i].id,
                "placement": placement,
                "elo_change": adjustments[i],
                "time": millisecondsToHMS(matchPlayers[i].time),
                "forfeited": matchPlayers[i].forfeited,
                "finished_at": matchDate
            })
            placement++;
        }
        data.uploadMatchResults(category, isRanked, results, raceId)
        return adjustments;
    }
};