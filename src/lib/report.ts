import { summary, managedSummary, unmanagedSummary } from './drift';

import { logger } from './logger';

// print report 
export function printReport(env : string) : void {
    const summaryMap : Map<string,number> = summary('dev');
    const unmanagedMap : Map<string,number> = unmanagedSummary('dev');
    const managedMap : Map<string,number> = managedSummary('dev');

    logger.info('Summary of drift report');
    logger.info('Total unmanaged resources: ' + summaryMap.get('total_unmanaged'));
    logger.info('Total managed resources: ' + summaryMap.get('total_managed'));
    logger.info('Total resources: ' + summaryMap.get('total_resources'));

    logger.info('Unmanaged resources');
    unmanagedMap.forEach((value : number, key : string) => {
        logger.info(key + ' : ' + value);
    });

    logger.info('Managed resources');
    managedMap.forEach((value : number, key : string) => {
        logger.info(key + ' : ' + value);
    });
}