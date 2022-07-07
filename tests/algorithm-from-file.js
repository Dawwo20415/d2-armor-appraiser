const dataSet = require('./qery-result.json');
const algorithm = require('../backend/logic/armor-valuation-algorithm');

function main () {
    var data_set = algorithm.profileDataFilter(dataSet, "hunter");
    data_set = algorithm.valuationAlgorithm_v1(data_set, [3,3,3,2,4,1]);
    console.log("A total of " + data_set.data.length + " armor pices before filtering");

    var scores = "";
    for (let i = 0; i < data_set.data.length; i++) {
        scores += data_set.data[i].score;
        if (i != data_set.data.length - 1) {
            scores += ",";
        }
    }
    console.log(scores);

    data_set = algorithm.filterByScore(data_set, 400);
    console.log("A total of " + data_set.data.length + " armor pices after filtering");

    scores = "";
    for (let i = 0; i < data_set.data.length; i++) {
        scores += data_set.data[i].score;
        if (i != data_set.data.length - 1) {
            scores += ",";
        }
    }
    console.log(scores);
}

main();