const dataSet = require('./qery-result.json');
const algorithm = require('../backend/logic/armor-valuation-algorithm');

function main () {
    var data_set = algorithm.profileDataFilter(dataSet, "hunter");
    data_set = algorithm.valuationAlgorithm_v1(data_set, [1,1,1,1,1,1]);
    console.log(data_set);
}

main();