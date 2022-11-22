import { ArmorItem } from '@dataTypes/storage-data.module';
import { stats_enum } from '@Bhashes/characters';

//Main Algorithm
export function statDivergence_v1(filteredDataSet: ArmorItem[], weight: Array<number>): ArmorItem[] {
    var scoredDataSet = filteredDataSet;
    var total_weight = 0;
    for (let i = 0; i < weight.length; i++) {
        total_weight += weight[i];
    }

    for (let i = 0; i < scoredDataSet.length; i++) {
        // Total value based on weight of stats
        var weighted_total = 0;
        for (let j = 0; j < 6; j++) {
            weighted_total += (scoredDataSet[i].stats as any)[stats_enum[j]] * (1 + (weight[j] / total_weight)); 
        } 

        
        // Distance from a multiple of 5 and tier for total armor
        const armor_tier = Math.round(scoredDataSet[i].stats.tot / 5);
        const dist_from_m5 = Math.abs((armor_tier)*5 - scoredDataSet[i].stats.tot);
        const armor_value = armor_tier - dist_from_m5 -9;

        // how well are the stats distributed?
        // Larger the difference between stats means better score
        var stat_comulative_score = 0;
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < 6; k++) {
                if (k == j) {continue;}
                
                stat_comulative_score += Math.abs((scoredDataSet[i].stats as any)[stats_enum[j]] - (scoredDataSet[i].stats as any)[stats_enum[k]]);
            }
        }
        
        // Mapping comulative score to the range [0,464] as 464 is the theoretical max score for a 
        // 2,2,31,2,2,31 pice with a total of 70 base stats
        stat_comulative_score = stat_comulative_score / 464;

        var final_score = stat_comulative_score * armor_value * weighted_total;

        scoredDataSet[i].score = final_score;
    }

    return scoredDataSet;
}