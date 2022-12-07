import { assert  } from 'chai';
import { describe, it, } from 'mocha';

import { buildReport } from './report';

// check logger is working
describe('print report', () => {
    it('should build drift report ', () => {
        // check logger is working with stdout 
        const report = buildReport('test');
        assert.equal(report, 'Drift report for test environment\n');
    });
});