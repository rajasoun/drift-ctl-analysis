import { assert  } from 'chai';
import { describe, it,  } from 'mocha';
import { AddCommand } from './cmd';

import { 
    NewReportApp,
    NewReportCommand,
    reportCmdHandler,
    isValidEnv,
} from './report';

// check if app is created
describe('report app is created', () => {
    it('should create report app', () => {
        const app = NewReportApp();
        assert.equal(app.name(), 'driftctl');
        assert.equal(app.description(), 'Analyze drift between current infras and the terraform state file');
    });
});

// check if command is added
describe('report command is added', () => {
    it('should add report command', () => {
        const app = NewReportApp();
        const cmdConfig = NewReportCommand();
        AddCommand(app, cmdConfig);
        assert.equal(app.commands.length, 1);
    });
});

// check if reportCmdHandler  - report command handler is called
describe('report command handler is called', () => {
    it('should call report command handler', () => {
        const result = reportCmdHandler({env: 'dummy'});
        assert.equal(result, undefined);
    });
    it('should call report command handler with valid env', () => {
        const result = reportCmdHandler({env: 'test'});
        assert.equal(result, undefined);
    });
});

// check if isValidEnv 
describe('isValidEnv', () => {
    it('should return true for valid env', () => {
        const result = isValidEnv('test');
        assert.equal(result, true);
    });
    it('should return false for invalid env', () => {
        const result = isValidEnv('dummy');
        assert.equal(result, false);
    });
});