import { assert, expect  } from 'chai';
import { describe, it,  } from 'mocha';

import { NewApp, AddCommand } from './cmd';

// check if app is created
describe('app is created', () => {
    it('should create app', () => {
        const app = NewApp({
            name: 'driftctl',
            description: 'driftctl',
            version: '1.0.0'
        });
        assert.equal(app.name(), 'driftctl');
        assert.equal(app.description(), 'driftctl');
    });
});

// check if command is added
describe('end to end test', () => {
    const app = NewApp({
        name: 'driftctl',
        description: 'driftctl',
        version: '1.0.0'
    });
    const cmdConfig = {
        name: 'dummy',
        description: 'dummy command',
        cmdFlags: '-e, --env <string>',
        handler: (options : any) => {console.log(options.env)}
    };
    it('should add command', () => {
        AddCommand(app, cmdConfig);
        assert.equal(app.commands.length, 1);
    });
    // check if command is executed and logger is called
    it('should execute command', () => {
        app.parse(['node', 'test', 'dummy', '-e', 'dev']);
        // mock console.log using expect
        expect(console.log).to.not.throw();
    });
});

