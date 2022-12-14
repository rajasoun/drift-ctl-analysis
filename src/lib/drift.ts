import { Drift, } from './model';
import {logger} from './logger';

// function check if file exists
function fileExists(filePath: string) : boolean {
    try {
      require.resolve(filePath);
      return true
    } catch (err) {
      return false;
    }
  }

export function getDriftFilePathBy(env : string) : string {
    const filePath : string = '../../data/'+env+'/driftctl_full.json';
    if (!fileExists(filePath)) {
        logger.error('drift-ctl File ' + filePath + ' not found for env : ' + env + '. Exiting...');
        throw new Error('drift-ctl File not found : ' + filePath);
    }
    return filePath;
}

// function to load json from file system
export function loadReportFromFS(path : string): Drift {
    const driftReport : Drift = require(path);
    return driftReport;
}

// function convert typescript array to map
export function summarise(resource : any[]) : Map<string, number> {
    const map : Map<string, number> = new Map();
    resource.forEach((item : any) => {
        // increment value
        const value : number = map.get(item.type) as number;
        // typescript does not allow to set value to undefined using trinary operator
        map.get(item.type) === undefined ? map.set(item.type, 1) : map.set(item.type, value + 1);

    });
    return map;
}

// function to return summary of unmanaged resources
export function unmanagedSummary(env : string) : Map<string, number> {
    const drift : Drift = loadReportFromFS(getDriftFilePathBy(env));
    const unmanagedMap : Map<string, number> = summarise(drift.unmanaged);;
    return unmanagedMap;
}

// function to return summary of managed resources
export function managedSummary(env : string) : Map<string, number> {
    const drift : Drift = loadReportFromFS(getDriftFilePathBy(env));
    const managedMap : Map<string, number> = summarise(drift.managed);
    return managedMap;
}

// function to return summary of drift report
export function summary(env : string) : Map<string, number> {
    const drift : Drift = loadReportFromFS(getDriftFilePathBy(env));
    const summaryMap : Map<string, number> = new Map();
    summaryMap.set('total_unmanaged', drift.summary.total_unmanaged);
    summaryMap.set('total_managed', drift.summary.total_managed);
    summaryMap.set('total_resources', drift.summary.total_resources);
    return summaryMap;
}

// function to calculate drift percentage
export function calculateDriftPercentage(unmanaged: number | undefined, total: number | undefined) : number {
    const driftPercentage = (unmanaged && total) ? (unmanaged / total) * 100 : 0;
    return driftPercentage;
}
