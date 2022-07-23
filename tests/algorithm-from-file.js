const dataSet = require('./qery-result.json');
const algorithm = require('../backend/logic/armor-valuation-algorithm');

function main () {

    var data_set = algorithm.profileDataFilter(dataSet, "hunter");
    data_set = algorithm.valuationAlgorithm_v1(data_set, [6,2,6,4,4,4]);
    console.log("A total of " + data_set.data.length + " armor pices before filtering");

    console.log("------------------------- UNSORTED -------------------------");
    console.log(data_set.data);

    console.log("------------------------- SORTED -------------------------");
    data_set.data.sort(algorithm.compareByScore);
    console.log(data_set.data);

    data_set = algorithm.filterByScore(data_set, 360);
    console.log("A total of " + data_set.data.length + " armor pices after filtering");

    console.log("-------------------------");
    console.log("not:inloadout and (" + algorithm.createIdString(data_set.data) + ")");

}

main();