  function pullJSON() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("API - AN yayıncı");
  var url="http://app.digitouch.com.tr/reporting/go-aff.php"; // Tek satır key value şeklinde json object
  var response = UrlFetchApp.fetch(url); // get feed
  var dataAll = JSON.parse(response.getContentText()); //
  var dataSet = dataAll;
  
  var rows = [],
      data;

  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([
               data.date, 
               data.company,
               data.affiliate_id,
               data.offer,
               data.offer_id,
               data.clicks,
               data.ctr,
               data.impressions,
               data.payout,
               data.revenue,
              ]); //JSON objeler
  }
/*DATAYI YAZDIR*/
  dataRange = sheet.getRange(2, 1, rows.length, 10); // 10 kaç tane field varı, 2 offset'i temsil eder
  dataRange.setValues(rows);

}

function onOpen(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Yenile",
    functionName: "pullJSON"
  }];
  spreadsheet.addMenu('Data Çek', entries)

}