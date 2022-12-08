import { command, run, string, option } from 'cmd-ts';

import { buildReport } from '../lib/report'

// Refernce: https://cmd-ts.vercel.app/getting_started.html
const flags = option({
    type: string,
    long: 'env',
    short: 'e',
    description: "Provide Env :  (dev | qa | stage | prod)\n \t\tExample: npm run report -e dev"
  });

const app = command({
  name: 'drift-ctl-report',
  args: { env: flags,},
  handler: ({ env,}) => {
        const report = buildReport(env)
        console.log(report)
  },
});

run(app, process.argv.slice(2));