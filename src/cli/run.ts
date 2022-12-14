import {
    CommandConfig,
    AddCommand
  } from './cmd';
  
import { 
    NewReportApp, 
    NewReportCommand 
} from './report';
  
// function to run command
function Run() {
    const reportApp = NewReportApp();
    const reportCmd: CommandConfig = NewReportCommand();
    AddCommand(reportApp, reportCmd);
    reportApp.parse();
}

Run();
