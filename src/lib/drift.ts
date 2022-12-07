import { Drift, Unmanaged } from './model';

// function to load json from file system
export function loadReportFromFS(path : string): Drift {
    const driftReport : Drift = require(path);
    return driftReport;
}

// function to create a  unmanaged resource set 
export function unmanagedUnique(drift : Drift) : Set<string> {
    const unmanagedSet : Set<string> = new Set();
    drift.unmanaged.forEach((unmanaged : Unmanaged) => {
        unmanagedSet.add(unmanaged.type);
    });
    return unmanagedSet;
}

// function convert typescript array to map
export function unmanagedSummary(unmanaged : Unmanaged[]) : Map<string, number> {
    const map : Map<string, number> = new Map();
    unmanaged.forEach((item : Unmanaged) => {
        // increment value
        const value : number = map.get(item.type) as number;
        // typescript does not allow to set value to undefined using trinary operator
        map.get(item.type) === undefined ? map.set(item.type, 1) : map.set(item.type, value + 1);

    });
    return map;
}

export function getDriftFilePathBy(env : string) : string {
    return '../../data/'+env+'/driftctl_full.json';
}

export function analyseUnmanagedResources(env : string) : Map<string, number> {
    const drift : Drift = loadReportFromFS(getDriftFilePathBy(env));
    const unmanagedMap : Map<string, number> = unmanagedSummary(drift.unmanaged);
    return unmanagedMap;
}