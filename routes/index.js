const express = require("express");
const router = express.Router();

async function config() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

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
  const sheet = doc.sheetsByIndex[3];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  res.render("pages/index", { rows: rows });
});

//news page
router.get("/news", (req, res) => {
  res.render("pages/news");
});

//dataset page
router.get("/dataset", (req, res) => {
  res.render("pages/dataset");
});

//publication page
router.get("/publication", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  // console.log("Rows : ", rows.length);

  //   for (let i = 0; i < rows.length; i++) {
  // console.log("----------------Entry------------------");
  // read/write row values
  // console.log(rows[i]["Title"]);
  // console.log(rows[i]["Year"]);
  // console.log(rows[i]["Authors"]);
  // console.log(rows[i]["Publisher"]);
  // console.log(rows[i]["Date"]);
  // console.log(rows[i]["Download link"]);
  // console.log("---------------------------------------------");
  //   }

  res.render("pages/publication", { rows: rows });
});

//research page
router.get("/research", async (req, res) => {
  let doc = await config();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[3];

  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  res.render("pages/research", { rows: rows });
});

//team page
router.get("/team", (req, res) => {
  res.render("pages/team");
});

//contact page
router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

module.exports = router;
