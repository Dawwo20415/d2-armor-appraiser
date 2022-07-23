const dataSet = require('./qery-result.json');
const itemInterface = require('../backend/logic/armor-item-management');
const algorithms = require('../backend/logic/scoring_algorithms/stat-divergence');

function main () {

    var data_set = itemInterface.profileDataFilter(dataSet, "hunter");
    data_set = algorithms.statDivergence_v1(data_set, [6,2,6,4,4,4]);
    console.log("A total of " + data_set.data.length + " armor pices before filtering");

    data_set.data.sort(itemInterface.compareByScore);

    //data_set = itemInterface.filterByScore(data_set, 360);
    data_set = itemInterface.filterByQuantity(data_set, 0.3);
    console.log("A total of " + data_set.data.length + " armor pices after filtering");

    console.log(data_set.data);

    console.log("-------------------------");
    console.log("not:inloadout and (" + itemInterface.createIdString(data_set.data) + ")");

}

main();