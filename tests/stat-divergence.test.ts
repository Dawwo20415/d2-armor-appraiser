import {describe, expect, test, beforeAll} from '@jest/globals';
import Items from './armor-items-for-testing.json';
import { statDivergence_v1 } from '@algorithms/stat-divergence';
import { ArmorItem } from '@dataTypes/storage-data.module';

let items = Items as ArmorItem[];

describe('Testing Stat-Divergence-v1 algorithm', () => {
    beforeAll(() => {
        items = statDivergence_v1(items, [1,1,1,1,1,1]);
    });

    test('Same Weights, Testing Distribution Homogenous vs Slightly Uneven', () => {
        expect(items[0].score < items[1].score).toBe(true);
    });

    test('Same Weights, Testing Distribution Slightly Uneven vs Uneven', () => {
        expect(items[1].score < items[2].score).toBe(true);
    });

    test('Same Weights, Testing Distribution Uneven vs Highly Uneven', () => {
        expect(items[2].score < items[3].score).toBe(true);
    });

    test('Same Weights, Testing Distribution Highly Uneven vs Optimal', () => {
        expect(items[3].score < items[4].score).toBe(true);
    });
    
});

