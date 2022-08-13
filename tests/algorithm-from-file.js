//import profile_query from './profile-qery-result.json' assert {type: "json"};
import character_query from './character-data-query.json' assert {type: "json"};
import { characterDataFilter } from '../src/bungie-api-interaction/armor-item-management.js';
//import { statDivergence_v1 } from '../src/scoring-algorithms/stat-divergence';

/*
function main () {

    var data_set = itemInterface.profileDataFilter(profileDataSet, "hunter");
    data_set = statDivergence_v1(data_set, [6,2,6,4,4,4]);
    console.log("A total of " + data_set.data.length + " armor pices before filtering");

    data_set.data.sort(itemInterface.compareByScore);

    //data_set = itemInterface.filterByScore(data_set, 360);
    data_set = itemInterface.filterByQuantity(data_set, 0.3);
    console.log("A total of " + data_set.data.length + " armor pices after filtering");

    console.log(data_set.data);

    console.log("-------------------------");
    console.log("not:inloadout and (" + itemInterface.createIdString(data_set.data) + ")");

}*/

function gettingCharInfo() {
    let data_set = characterDataFilter(character_query);
}

//main();
gettingCharInfo();