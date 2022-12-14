import { 
    summary, 
    managedSummary, 
    unmanagedSummary,
    calculateDriftPercentage,
} from './drift';

class Drift {
    driftReport : string = '';
    addSeperator() {
        this.driftReport = this.driftReport.concat('\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
    }

    addLine(line : string) {
        this.driftReport = this.driftReport.concat(line);
    }

    addLines(lines : Map<string, number>){
        lines.forEach((value : number, key : string) => {
            this.driftReport = this.driftReport.concat(key + ' : ' + value + '\n');
        });
    }

    report() : string {
        return this.driftReport;
    }
}

// print report 
export function buildReport(env : string) : string {
    const summaryMap : Map<string,number> = summary(env);
    const unmanagedMap : Map<string,number> = unmanagedSummary(env);
    const managedMap : Map<string,number> = managedSummary(env);
    const driftPercentage = calculateDriftPercentage(summaryMap.get('total_unmanaged'), summaryMap.get('total_resources'));

    let drift =  new Drift();
    drift.addSeperator();
    drift.addLine('Summary of drift report:\n')
    drift.addLine('Total unmanaged resources: ' + summaryMap.get('total_unmanaged') + '\n');
    drift.addLine('Total managed resources: ' + summaryMap.get('total_managed') + '\n');
    drift.addLine('Total resources: ' + summaryMap.get('total_resources') + '\n');
    drift.addLine('Drift percentage: ' + driftPercentage.toFixed(2) + '%\n');
    drift.addSeperator();

    drift.addLine('Managed Resources:\n');
    drift.addLines(managedMap);
    drift.addSeperator();

    drift.addLine('Unmanaged Resources:\n');
    drift.addLines(unmanagedMap);
    drift.addSeperator();

    return drift.report();
}

