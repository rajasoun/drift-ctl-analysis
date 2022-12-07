import { exportToSummaryCSV, } from './csv'
import { analyseUnmanagedResources } from './drift';


describe('CSV', () => {
    it('should export to CSV', () => {
        // call exportToSummaryCSV
        const data = analyseUnmanagedResources('test');
        exportToSummaryCSV(data);
    });
});
