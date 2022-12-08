import { Command } from 'commander';

import { buildReport } from '../lib/report'
const program = new Command();

program
  .name('drift-ctl')
  .description('Analyze drift between the current state of infrastructure and the state defined in your Terraform configuration.')
  .version('0.0.1')

program.command('report')
  .description('Generate drift-ctl report')
  .option('-e, --env <string>', 'Environment name < dev | qa | stage | prod | test >')
  .action((options) => {
    const report = buildReport(options.env);
    console.log(report)
  });

program.parse();
