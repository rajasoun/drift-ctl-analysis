import { assert  } from 'chai';
import { describe, it, } from 'mocha';

import { logger } from './logger';
import { printReport } from './report';

// check logger is working
describe('print report', () => {
    it('should print report to console.....', () => {
        // check logger is working with stdout 
        printReport('test');
    });
});