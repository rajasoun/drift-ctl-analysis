import { Command } from 'commander';

export interface AppConfig {
  name: string;
  description: string;
  version: string;
}

export interface CommandConfig {
  name: string;
  description: string;
  cmdFlags : string;
  handler : Function
}

export function NewApp(appConfig : AppConfig) : Command {
    const program = new Command();
    program
      .name(appConfig.name)
      .description(appConfig.description)
      .version(appConfig.version);
    return program;
  }
  
  
export function AddCommand(app : Command, cmdConfig : CommandConfig) {
    app.command(cmdConfig.name)
      .description(cmdConfig.description)
      .option(cmdConfig.cmdFlags)
      .action((options) => {
        cmdConfig.handler(options);
      });
  }