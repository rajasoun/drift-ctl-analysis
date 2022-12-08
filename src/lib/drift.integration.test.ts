import { assert  } from 'chai';
import { describe, it, before } from 'mocha';

import { Drift } from './model';
import { 
    getDriftFilePathBy, 
    loadReportFromFS, 
    unmanagedSummary,
    managedSummary,
    summarise,
    summary,
    calculateDriftPercentage
} from './drift';


// check if json is loaded correctly from file system 
describe('unmanged resource analysis', () => {
    let driftFilePath : string
    let drift : Drift

    before(() => {
        driftFilePath = getDriftFilePathBy('test');
        drift = loadReportFromFS(driftFilePath);
    });

    // check if json is loaded correctly from file system
    it('should load json from file system', () => {
        assert.equal(drift.unmanaged.length, drift.summary.total_unmanaged);
    });

    // list unmanagedSummary
    it('should summarize unmanaged resources with count', () => {
       const unmanagedSummaryMap : Map<string, number> = summarise(drift.unmanaged);
        assert.equal(unmanagedSummaryMap.size, 2);
        assert.equal(unmanagedSummaryMap.get('aws_api_gateway_account'), 1);
        assert.equal(unmanagedSummaryMap.get('aws_ami'), 2);
        assert.equal(unmanagedSummaryMap.get('dummy'), undefined);
    });

    // unamnaged resource analysis
    it('should provide summary of all unmanaged resources with count', () => {
        // call analyseUnmanagedResources
        const unmanagedSummaryMap : Map<string, number> = unmanagedSummary('test');
        assert.equal(unmanagedSummaryMap.size, 2);
        assert.equal(unmanagedSummaryMap.get('aws_api_gateway_account'), 1);
        assert.equal(unmanagedSummaryMap.get('aws_ami'), 2);
        assert.equal(unmanagedSummaryMap.get('dummy'), undefined);
        });
    // unamnaged resource analysis
    it('should provide summary of all nmanaged resources with count', () => {
        // call analyseUnmanagedResources
        const managedSummaryMap : Map<string, number> = managedSummary('test');
        assert.equal(managedSummaryMap.size, 1);
        assert.equal(managedSummaryMap.get('aws_iam_policy'), 2);
        assert.equal(managedSummaryMap.get('dummy'), undefined);
        });

    // summary of drift report
    it('should provide summary of drift report', () => {
        // call Summary
        const summaryMap : Map<string, number> = summary('test');
        assert.equal(summaryMap.size, 3);
        assert.equal(summaryMap.get('total_unmanaged'), drift.summary.total_unmanaged);
        assert.equal(summaryMap.get('total_managed'), drift.summary.total_managed);
        assert.equal(summaryMap.get('total_resources'), drift.summary.total_resources);
    });

    // calculate drift percentage
    it('should calculate drift percentage', () => {
        const testTable = [
            {total_unmanaged: 0, total_resources: 0, expected: 0},
            {total_unmanaged: 0, total_resources: 1, expected: 0},
            {total_unmanaged: 1, total_resources: 0, expected: 0},
            {total_unmanaged: 1, total_resources: 1, expected: 100},
            {total_unmanaged: 1, total_resources: 2, expected: 50},
            {total_unmanaged: 2, total_resources: 1, expected: 200},
            {total_unmanaged: undefined, total_resources: 0, expected: 0},
            {total_unmanaged: undefined, total_resources: undefined, expected: 0},
            {total_unmanaged: 0, total_resources: undefined, expected: 0},
        ]
        testTable.forEach((test) => {
            const driftPercentage : number = calculateDriftPercentage(test.total_unmanaged, test.total_resources);
            assert.equal(driftPercentage, test.expected);
        });
    });
});
