// How to connect your Telegram Bot to a Google Spreadsheet (Google Apps Script)
// https://www.youtube.com/watch?v=mKSXd_od4Lg
//
// This code must be added to the Google Apps Script file attached to the spreadsheet script editor.
// Full steps in the readme

var token = "";     // 1. FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = ""; // 2. FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = "";      // 3. FILL IN THE ID OF YOUR SPREADSHEET
var adminID = "";   // 4. Fill in your own Telegram ID for debugging

var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Content");
var sheet2 = SpreadsheetApp.openById(ssId).getSheetByName("Subs");
var sheet3 = SpreadsheetApp.openById(ssId).getSheetByName("Feedback");

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}

function sendMessage(id, text, keyBoard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard)
    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var data = sheet.getDataRange().getValues();
    var labelMenu1 = data[1][1];
    var labelMenu2 = data[1][2];
    var labelMenu3 = data[1][3];
    var labelMenu4 = data[1][4];
    var labelMenu5 = data[1][5];
    var keyBoard = {
     "inline_keyboard": [
        [{"text": labelMenu1, "callback_data": "/1"}],
        [{"text": labelMenu2, "callback_data": "/2"}],
        [{"text": labelMenu3, "callback_data": "/3"}],
        [{"text": labelMenu4, "callback_data": "/4"},{"text": labelMenu5, "callback_data": "/5"}]
      ]
    };
    if(contents.message) {
      var id = contents.message.chat.id;
      var text = contents.message.text;
      var firstName = contents.message.from.first_name;
      var lastName = contents.message.from.last_name;
      var userName = contents.message.from.username;
      return privateMessage(id, firstName, lastName, userName, text, data, keyBoard);
    } else if(contents.callback_query) {
      var id = contents.callback_query.message.chat.id;
      var text = contents.callback_query.data;
      var firstName = contents.callback_query.from.first_name;
      var lastName = contents.callback_query.from.last_name;
      var userName = contents.callback_query.from.userName;
      return privateMessage(id, firstName, lastName, userName, text, data, keyBoard);
  }
  } catch(e) {
    sendText(adminID, JSON.stringify(e,null,4), keyBoard);
  }
}

function unsubUser(id, keyBoard) {
  try {
    var row = sheet2.createTextFinder(id).findNext().getRowIndex();
    sheet2.deleteRow(row);
    return sendMessage(id, "Sorry about that!\nYou will no longer receive our updates.\n\nType /start to follow again.", keyBoard);
  } catch(e) {
    sendMessage(adminID, JSON.stringify(e,null,4), keyBoard);
  }
}

function subUser(id, userName, firstName, lastName, keyBoard) {
  try {
    var dateNow = new Date();
    sheet2.appendRow([dateNow, id, userName, firstName, lastName]);
    return sendMessage(id, "Thank you so much for following us!\n\nType /off to unfollow.", keyBoard);
  } catch(e) {
    sendMessage(adminID, JSON.stringify(e,null,4), keyBoard);
  }
}

function sendToSubs(id, text, keyBoard) {
  if(id == adminID) {
    try {
      var data = sheet2.getDataRange().getValues();
      var item = text.split("/subs");
      if(item[1] !== "") {
        for(var i = 2; i < data.length; i++) {
          sendMessage(data[i][1], data[i][3] + item[1], keyBoard);
        }
      } else {
        return sendMessage(id, "Blank Message!\nPlease try again later.", keyBoard);
      }
    } catch(e) {
      sendMessage(adminID, JSON.stringify(e,null,4), keyBoard);
    }
  } else {
    sendMessage(adminID, "Unauthorized User Id: " + id , keyBoard);
  }
}

function feedback(id, firstName, lastName, userName, text, keyBoard) {
  try {
    var dateNow = new Date();
    var item = text.split("/feed");
    if(item[1] !== "") {
      sheet3.appendRow([dateNow, id, userName, firstName, lastName, item[1]]);
      return sendMessage(id, "Thank you " + firstName + " for the feedback!", keyBoard);
    } else {
      return sendMessage(id, "Blank Message!\nPlease try again later.", keyBoard);
    }
  } catch(e) {
    sendMessage(adminID, JSON.stringify(e,null,4), keyBoard);
  }
}

function privateMessage(id, firstName, lastName, userName, text, data, keyBoard) {
  var item = text.split(" ");
  switch (item[0]) {
    case '/start':
      var contentStart = data[2][0];
      sendMessage(id, firstName + contentStart);
      return subUser(id, userName, firstName, lastName, keyBoard); break;
    case '/1':
      var contentMenu = data[2][1];
      return sendMessage(id, contentMenu, keyBoard); break;
    case '/2':
      var contentMenu = data[2][2];
      return sendMessage(id, contentMenu, keyBoard); break;
    case '/3':
      var contentMenu = data[2][3];
      return sendMessage(id, contentMenu, keyBoard); break;
    case '/4':
      var contentMenu = data[2][4];
      return sendMessage(id, contentMenu, keyBoard); break;
    case '/5':
      var contentMenu = data[2][5];
      return sendMessage(id, contentMenu, keyBoard); break;
    case '/off':
      return unsubUser(id, keyBoard); break;
    case '/feed':
      return feedback(id, firstName, lastName, userName, text, keyBoard); break;
    case '/subs':
      return sendToSubs(id, text, keyBoard); break;
    default:
      var contentErro =  data[2][6];
      sendMessage(adminID, JSON.stringify(e,null,4), keyBoard);
      sendMessage(id, contentErro, keyBoard);
  }
}
