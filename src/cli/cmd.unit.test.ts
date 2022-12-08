import { assert  } from 'chai';
import { describe, it,  } from 'mocha';
import { logger } from '../lib/logger';

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
describe('command is added', () => {
    it('should add command', () => {
        const app = NewApp({
            name: 'driftctl',
            description: 'driftctl',
            version: '1.0.0'
        });
        const cmdConfig = {
            name: 'dummy',
            description: 'dummy command',
            cmdFlags: '-e, --env <string>',
            handler: () => {}
        };
        AddCommand(app, cmdConfig);
        assert.equal(app.commands.length, 1);
    });
});
