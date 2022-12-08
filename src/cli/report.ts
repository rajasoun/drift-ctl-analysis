import { Command } from 'commander';

import { logger } from '../lib/logger'
import { buildReport } from '../lib/report'
import { AppConfig,NewApp, CommandConfig } from './cmd'

enum Environment {
  dev = 'dev',
  qa = 'qa',
  stage = 'stage',
  prod = 'prod',
  test = 'test'
}

// function to create report cli app 
export function NewReportApp() : Command {
  const appConfig : AppConfig = {
    name: 'driftctl',
    description: 'Analyze drift between current infras and the terraform state file',
    version: '0.0.1'
  }
  const app = NewApp(appConfig)
  return app
}

// function to create report command
export function NewReportCommand(): CommandConfig {
  return {
    name: 'report',
    description: 'Generate report for drift-ctl json',
    cmdFlags: '-e, --env <string>',
    handler: reportCmdHandler
  };
}

// handler function for the command
export function reportCmdHandler(options: any) {
  // check if env is valid using Environment enum
  if (!isValidEnv(options.env)) {
    logger.error('Invalid environment : ' + options.env);
    return;
  }
  const report = buildReport(options.env);
  console.log(report);
}

// function check if the env falg is valid 
export function isValidEnv(env: any) {
  return Object.values(Environment).includes(env);
}


