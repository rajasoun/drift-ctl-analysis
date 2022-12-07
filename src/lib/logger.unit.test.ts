import { assert  } from 'chai';
import { describe, it, } from 'mocha';

import { logger } from './logger';

// check logger is working
describe('logger', () => {
    it('should log to console', () => {
        // check logger is working with stdiout 
        var logOutput = logger.info('test');
        assert.equal(logOutput['message'], 'test');
        assert.equal(logOutput['file'], 'logger.unit.test.ts');
        assert.equal(logOutput['line'], '10');
	    assert.equal(logOutput['level'], 3);
    });
});
