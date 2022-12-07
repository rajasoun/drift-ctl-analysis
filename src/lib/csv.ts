
import { ExportToCsv } from 'export-to-csv';




  
export function exportToSummaryCSV(data : Map<string, number>) : void {
    let csvData = [];
    for (let [key, value] of data) {
        csvData.push({Resource: key, Count: value});
    }
}

