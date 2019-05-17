const fs = require('fs');
const json = require('./noRenuncioGood.json');

const d3Object = {
    nodes: [],
    links: []
}

created = {}
aux = 1

for (const key in json) {
    if (json.hasOwnProperty(key)) {
        const element = json[key];
        if (!created[key]) {
            d3Object.nodes.push({
                id: key,
                group: element.rt_count > 0 ? aux++ : 14,
                weigth: element.rt_count + 1 
            })
            created[key] = true
        }
        for (let index = 0; index < element.rt_count; index++) {
            d3Object.links.push({
                source: key,
                target: element.rt_users[index],
                value: 2
            })
        }
    }
}


fs.writeFile('d3Graph.json', JSON.stringify(d3Object));

