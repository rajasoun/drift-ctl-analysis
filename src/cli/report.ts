import { command, run, string, option } from 'cmd-ts';

import { buildReport } from '../lib/report'

// Refernce: https://cmd-ts.vercel.app/getting_started.html
const reportCommandFlags = option(
  {
    type: string,
    long: 'env',
    short: 'e',
    description: "Provide Env :  (dev | qa | stage | prod)\n \t\tExample: npm run report -e dev"
  },
);

export const reportApp = command(
  {
    name: 'report',
    args: { env: reportCommandFlags,},
    handler: ({ env,}) => {
          const report = buildReport(env)
          console.log(report)
    },
  },
);

run(reportApp, process.argv.slice(2));