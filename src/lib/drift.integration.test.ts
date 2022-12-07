import { assert  } from 'chai';
import { describe, it, before } from 'mocha';

import { Drift } from './model';
import { 
    getDriftFilePathBy, 
    loadReportFromFS, 
    unmanagedUnique, 
    unmanagedSummary,
    analyseUnmanagedResources
} from './drift';

import { logger } from './logger';

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

    // list all unmanaged resources
    it('should list all unmanaged resources ', () => {
        const unmanagedSet : Set<string> = unmanagedUnique(drift);
        assert.equal(unmanagedSet.size, 2);
    });

    // list unmanagedSummary
    it('should list all unmanaged resources with count', () => {
       const unmanagedSummaryMap : Map<string, number> = unmanagedSummary(drift.unmanaged);
        assert.equal(unmanagedSummaryMap.size, 2);
        assert.equal(unmanagedSummaryMap.get('aws_api_gateway_account'), 1);
        assert.equal(unmanagedSummaryMap.get('aws_ami'), 2);
        assert.equal(unmanagedSummaryMap.get('dummy'), undefined);
    });

    // unamnaged resource analysis
    it('should provide summary of all unmanaged resources with count', () => {
        // call analyseUnmanagedResources
        const unmanagedSummaryMap : Map<string, number> = analyseUnmanagedResources('test');
        assert.equal(unmanagedSummaryMap.size, 2);
        assert.equal(unmanagedSummaryMap.get('aws_api_gateway_account'), 1);
        assert.equal(unmanagedSummaryMap.get('aws_ami'), 2);
        assert.equal(unmanagedSummaryMap.get('dummy'), undefined);
        });
});

// check logger is working
describe('logger', () => {
    it('should log to console', () => {
        // check logger is working with stdiout 
        var logOutput = logger.info('test');
        assert.equal(logOutput['message'], 'test');
        assert.equal(logOutput['file'], 'drift.integration.test.ts');
        assert.equal(logOutput['line'], '18');
	    assert.equal(logOutput['level'], 3);
    });
});
