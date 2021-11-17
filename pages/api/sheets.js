import { google } from 'googleapis';

export async function getList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'GoogleSheetsDB',
    });

    const rows = response.data.values;

    if (rows.length) {
      return rows.map((row) => ({
        id: row[0],
        name: row[1],
        age: row[2],
        country: row[3],
      }));
    }
  } catch (err) {
    console.log(err);
  }
}

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(getList()));
};
