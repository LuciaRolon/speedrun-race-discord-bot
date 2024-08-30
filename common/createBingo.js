const https = require('https');
const querystring = require('querystring');
const config = require('../config.json');

module.exports = (client, bingoLockout, bingoPassword) => {
    /* The entire process is as follows:
    To create a bingo room, you need a CSRF Token attached to a session. In order to get this token, we first need to do a GET request to the mainpage.
    This request will return the CSRF token in a hidden input with the session data we need in order to create the room.
    We use a regex to extract the CSRF token from said hidden input so we can then do a POST request.
    This post request returns a 302 Redirect, and amongst its headers, the Location header has the path to the bingo room.
    */
    // Step 1: Define the headers
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8",
        "Accept-Language": "es-AR,es;q=0.8,en-US;q=0.5,en;q=0.3",
        "Referer": "https://bingosync.com/",
        "Origin": "https://bingosync.com",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1"
    };

    // Step 2: Load the homepage to get the CSRF token
    const homepageUrl = "https://bingosync.com/";
    var bingoRoomUrl = "";
    var bingoRoomPassword = "";
    var bingoError = null;
    https.get(homepageUrl, { headers }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            // Extract the CSRF token using a regex
            const csrfToken = data.match(/<input type="hidden" name="csrfmiddlewaretoken" value="(.*?)">/)[1];

            // Step 3: Prepare the form data
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();
            let password = randomPassword
            if(bingoPassword !== undefined && bingoPassword !== null){
                password = bingoPassword;
            }
            let lockoutMode = "1";  // Non-lockout
            if(bingoLockout === true){
                lockoutMode = "2";
            }
            const formData = querystring.stringify({
                "csrfmiddlewaretoken": csrfToken,
                "room_name": `SotNRace-${randomNumber}`,
                "passphrase": password,
                "nickname": "TinManBot",
                "game_type": "18",  // Custom
                "custom_json": JSON.stringify(config.bingoObjectives), 
                "lockout_mode": lockoutMode,  
                "variant_type": "172",  // Randomized Variant
                "seed": "",
                "hide_card": "on"
            });

            // Step 4: Send the POST request to create the room
            const options = {
                hostname: 'bingosync.com',
                path: '/',
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': formData.length,
                    'Cookie': res.headers['set-cookie'].join('; ')  // Send the cookies received in the GET request
                }
            };

            const postReq = https.request(options, (postRes) => {
                let postData = '';

                postRes.on('data', (chunk) => {
                    postData += chunk;
                });

                postRes.on('end', () => {
                    if (postRes.statusCode === 302) {                        
                        bingoRoomUrl = `https://bingosync.com${postRes.headers.location}`;
                        bingoRoomPassword = `${password}`;
                        let bingoInfo = `\nBingo Room: ${bingoRoomUrl}`;
                        if(bingoPassword === undefined || bingoPassword === null){  // If the user set the password, we don't want to share it.
                            bingoInfo += `\nPassword: ${bingoRoomPassword}`
                        }
                        let raceChannel = client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId);
                        raceChannel.then(channel => {
                            channel.send(bingoInfo).then(msg => {
                                console.log("Bingo Room created and shared.")
                            })
                        }).catch(console.error);   
                    } else {
                        bingoError = `Failed to create room. Status code: ${postRes.statusCode}`;
                    }
                });
            });

            postReq.on('error', (e) => {
                bingoError = `Problem with request: ${e.message}`;
            });

            postReq.write(formData);
            postReq.end();
        });
    }).on('error', (e) => {
        bingoError = `Got error: ${e.message}`;
    });           
};
