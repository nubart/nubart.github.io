function MakeABBlack() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A17:B36').activate();
  spreadsheet.getActiveRangeList().setFontColor('#000000');
  spreadsheet.getRange('A37:B44').activate();
  spreadsheet.getActiveRangeList().setFontColor('#000000');
}

function doForAllTabs() {
  var spreadsheet = SpreadsheetApp.getActive();
  var allSheets = spreadsheet.getSheets();

allSheets.forEach(function(sheet){
  if(sheet.getSheetName() !== "MAPPING"){
    sheet.activate();
    MakeABBlack();
    }
  })
}