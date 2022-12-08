import { buildReport } from './lib/report'

function main() {
    const report = buildReport('dev')
    console.log(report)
}

main()
