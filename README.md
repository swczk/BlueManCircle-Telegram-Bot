<p align="center">
  <img align="center" width="150px" height="150px" src="images/icon.png" alt="Bot Picture">
  <h1 align="center">Blue Man Circle (Telegram Bot)</h1>
</p>

__Blue Man Circle__ is a simple Telegram Bot with advanced features to be hosted and managed mostly in a Google Spreadsheet.

You can see the final result in the Telegram [here](https://t.me/BlueManCircle_bot).

## Screenshots

### Telegram Screenshots
[<img width=400 alt="Screenshot 1" src="images/phoneScreenshots/screenshot1.png?raw=true">](images/phoneScreenshots/screenshot1.png?raw=true)

### Google Sheets Screenshots
[<img width=900 alt="Screenshot 1" src="images/spreadsheetScreenshots/screenshot1.png?raw=true">](images/spreadsheetScreenshots/screenshot1.png?raw=true)
[<img width=900 alt="Screenshot 2" src="images/spreadsheetScreenshots/screenshot2.png?raw=true">](images/spreadsheetScreenshots/screenshot2.png?raw=true)
[<img width=900 alt="Screenshot 3" src="images/spreadsheetScreenshots/screenshot3.png?raw=true">](images/spreadsheetScreenshots/screenshot3.png?raw=true)

## Features

- Free and open source
- All the content displayed to the users is from your spreadsheet
  - When you edit the spreadsheet the bot will display the new content from now on
  - Inline Keyboard
    - The buttons name and content displayed is taken from the `Content` spreadsheet
- Subscribers
  - Know who whats to revoice your updates
  - Send menssages to all your Subscribers
  - The user can unsubscribe from your menssages
- feedback
  - You can revoice feedback from the users directly in the spreadsheet

#### Connect Telegram Bot to Google Sheets
Connect Telegram Bot to Google Sheets via Google Apps Scripts. This video explains all steps in detail: 

[How to create a Telegram Bot that interacts with a spreadsheet (Part 1 of 3)](https://youtu.be/pV1Jt3fjcq8)

#### Step 1: Setting up the Telegram Bot
- Go to [Telegram for Web](https://web.telegram.org/)
- Search for BothFather
- Use /newbot to create a bot. This will give you an access token to use in your script. For further Telegram information, RTFM at (https://core.telegram.org/bots/api)

#### Step 2: Setting up Google Apps Script
Create a new Google Sheet in Google Drive. Go to script editor (Tools > Script Editor) and paste the code into the newly created code.gs file. Once done, deply the script as a web application. You will get a URL to use in the code.gs file.

- Run `getMe()` and `setWebhook()` to initialise the integration.

#### Step 3: Add your Spreadsheet ID to the Script
Find your Google Sheet ID in the URL: `https://docs.google.com/spreadsheets/d/{ID_HERE}/edit` and past it into the code.gs file.

#### Step 4: Add your Telegram ID to the Script for error catching
After you seccusfully communicated with the bot, your chat ID should be in the recording spreadsheet entries. Copy and past this into the `adminID` variable in the script

## License
<p align="center">
  <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
    <img width="100px" src="https://www.gnu.org/graphics/gplv3-127x51.png" align="center" alt="GNU GPLv3 Image"/>
  </a>
</p>

This project is licensed under the GNU General Public License v3.0. See the
[LICENSE](LICENSE) file for details.

_The Bot Picture_

Photo by [Ben Sweet](https://unsplash.com/@benjaminsweet) on [Unsplash](https://unsplash.com/) under this [License](https://unsplash.com/license).

*BlueManCircle is based on [Mars Escobin](https://github.com/mariannetrizha)'s bot.*
