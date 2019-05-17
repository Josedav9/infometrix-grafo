const fs = require('fs');
const json = require('./norenuncioJson.json');

let users = {}

for (const tweet of json) {
    const arrayComment = tweet.Contents.split(' ');
    const author = tweet['Author ID'];

    if (arrayComment[0] === 'RT') {
        const influencer = arrayComment[1].substr(1, arrayComment[1].length-2);
        if (users[influencer]) {
            users[influencer].rt_count++
            users[influencer].rt_users.push(author)
        } else {
            users[influencer] = {
                rt_count: 1,
                rt_users: [author]
            }
        }
    }
    if (!users[author]) {
        users[author] = {
            rt_count: 0,
            rt_users: []
        }
    }

}

fs.writeFile('noRenuncioGood.json', JSON.stringify(users));