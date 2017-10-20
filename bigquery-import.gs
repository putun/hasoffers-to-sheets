
function BQ_analytics_export() {
  var projectId = 'test-181615'; // Google app project 
  var fileId = '1JMFaDsY0qRkxX9NEruYfxh9OyTSts_zAWuy1FOumoVI'; // google sheet id 
  var tableId = 'test1';

  // Define our load job.
  var jobSpec = {
    configuration: {
      load: {
        destinationTable: {
          projectId: projectId,
          datasetId: 'joker_analytics_daily',
          tableId: tableId
        },
        allowJaggedRows: true,
        writeDisposition: 'WRITE_TRUNCATE',
        schema: {
          fields: [
        {name: 'Campaign', type: 'STRING'},
        {name: 'Date', type: 'STRING'},
        {name: 'Sessions', type: 'INTEGER'},
        {name: 'Bounce_rate', type: 'INTEGER'},
        {name: 'Transactions', type: 'INTEGER'},
        {name: 'Transaction_revenue', type: 'INTEGER'},
        
          ]
        }
      }
    }
  };
   
  var spreadsheet = SpreadsheetApp.openById(fileId);
  var filename = spreadsheet.getName();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sayfa2");
  var Row_count = sheet.getLastRow();
  var data = sheet.getDataRange().getValues();

  var csvdata = "";
  for (var row = 1; row < data.length && row < Row_count + 1; row++) {
    for (var col = 0; col < data[row].length; col++) {  
    
      var cell = data[row][col].toString();
      
      if (cell.indexOf(",") != -1) {
        csvdata += "\"" + cell + "\"";
      } else {
        csvdata += cell;
      }

      if (col < data[row].length - 1) {
        csvdata += ",";
      }
    }
    csvdata += "\r\n";
  }
  
  var data = Utilities.newBlob(csvdata, "application/octet-stream");

  // Execute the job.
  BigQuery.Jobs.insert(jobSpec, projectId, data);
  //sheet.clear();
  
}

