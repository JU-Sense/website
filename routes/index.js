const express = require("express");
const router = express.Router();

async function config() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  // const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  const doc = new GoogleSpreadsheet(
    "16NtFBsiJwaGn2Xvl2ioD6aHoLyONC6srPXp5-o7gBT8"
  );

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  });

  return doc;
}

//home page
router.get("/", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[4];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  const sheet2 = doc.sheetsByIndex[7];
  // read rows
  const rows2 = await sheet2.getRows(); // can pass in { limit, offset }

  res.render("pages/index", { rows: rows, index: rows2 });
});

//news page
router.get("/news", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[4];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  res.render("pages/news", { rows: rows });
});

//profile page
router.get("/users/:userid", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];

  // read rows
  const rows = await sheet.getRows();

  rows.forEach((row) => {
    if (row["UserID"] == req.params["userid"]) {
      res.render("pages/profile", { row: row });
    }
  });
});

//dataset page
router.get("/dataset", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[2];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  // console.timeEnd();
  res.render("pages/dataset", { rows: rows });
});

//publication page
router.get("/publication", async (req, res) => {
  // console.time();
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  res.render("pages/publication", { rows: rows });
});

//research page
router.get("/research", async (req, res) => {
  // console.time();
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[3];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  const sheet2 = doc.sheetsByIndex[0];

  // read rows
  const rows2 = await sheet2.getRows();

  // console.timeEnd();
  res.render("pages/research", { rows: rows, publications: rows2 });
});

// Funded-Projects page
router.get("/funded-projects", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[5];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  res.render("pages/funded_projects", { rows: rows });
});

// Web Apps page
router.get("/webapps", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[6];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  res.render("pages/webapps", { rows: rows });
});

//team page
router.get("/team", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  res.render("pages/team", { rows: rows });
});

//contact page
router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

module.exports = router;
