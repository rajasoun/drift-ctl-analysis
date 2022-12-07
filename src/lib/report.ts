import { summary, managedSummary, unmanagedSummary } from './drift';

class Drift {
    driftReport : string = '';
    addSeperator() {
        this.driftReport = this.driftReport.concat('\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
    }

    addLine(line : string) {
        this.driftReport = this.driftReport.concat(line);
    }

    report() : string {
        return this.driftReport;
    }
}

// print report 
export function buildReport(env : string) : string {
    const summaryMap : Map<string,number> = summary('dev');
    const unmanagedMap : Map<string,number> = unmanagedSummary('dev');
    const managedMap : Map<string,number> = managedSummary('dev');

    let drift =  new Drift();
    drift.addSeperator();
    drift.addLine('Summary of drift report:\n')
    drift.addLine('Total unmanaged resources: ' + summaryMap.get('total_unmanaged') + '\n');
    drift.addLine('Total managed resources: ' + summaryMap.get('total_managed') + '\n');
    drift.addLine('Total resources: ' + summaryMap.get('total_resources') + '\n');
    drift.addSeperator();

    drift.addLine('Managed resources:\n');
    managedMap.forEach((value : number, key : string) => {
        drift.addLine(key + ' : ' + value + '\n');
    });
    drift.addSeperator();

    drift.addLine('Unmanaged resources:\n');
    unmanagedMap.forEach((value : number, key : string) => {
        drift.addLine(key + ' : ' + value  + '\n');
    });
    drift.addSeperator();

    return drift.report();
}