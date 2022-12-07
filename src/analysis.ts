import { analyseUnmanagedResources} from './lib/drift';
import { logger } from './lib/logger';

const unmanagedSummaryMap : Map<string, number> = analyseUnmanagedResources('dev');
logger.info(unmanagedSummaryMap)