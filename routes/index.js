const express = require("express");
const router = express.Router();

async function config() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  // const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  const doc = new GoogleSpreadsheet(
    "16NtFBsiJwaGn2Xvl2ioD6aHoLyONC6srPXp5-o7gBT8"
  );

  await doc.useServiceAccountAuth({
    // client_email: process.env.CLIENT_EMAIL,
    // private_key: process.env.PRIVATE_KEY,
    client_email: "jusense-sa@avian-augury-431206-k1.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDn/NZ8YN4N6NkW\nyhJBYhJdq/yIpFIzJez7V103GA2tzY/PMnQzcJqXjdmTamtG4YS91N2nIsFeth7y\ndZrxasBnUocKaFcnIF7Ub6qDDhZnr3LhCPZmRsNaGjXymgJzGnSw4lHfMibeTDci\n3TyM8piYtVFvigRM07b3d0zFfs3mfWGpkVNMLT7isGD4YCDJ0q7aCVm2ITyoURhg\nx4Siv3X5c9XG+mOT/CgHpREQOhAUIhIFTpO6eTG5H5FeNanAatGXF/AgsFkV/jpt\nHzM6A36y/Mo0FN6teiPaZjr9c1hR3SFcTN/yrQ4USOehqMmRbusiX2YJJFSn7wBI\nRSpH4iMZAgMBAAECggEAB/bsPjTtKrkVyuyBF/GQA9tFvkM19z+UFUT4lE2lGpR2\nHXzz9FgnVpCuKZt7t2FCt2m5emV9Eg1anqRe/27U0DdLH5ZZd6Rq3QxAZGN1bXXe\nkc9G9lfzmQJRW9ThxKXh37jFas5D+1nOgsnprEUf7A49j4DDiQezvmdAIX+q/gC7\nPupbUIrIPHTM5fo83xpNrt1v4zW7FdVN9RkmYuVvB6VVG++w8ty3LJBIE4waEOnm\nmknIs91KmIcyI/EcbbTUwkFpl6ap9UYK5jcEcAthEX5ITW1ZN/eCl4OJ/E4/o57t\ndX4a3wMY5BV2v2r0VBr2xCIfopZg0CJGd32wXNTyaQKBgQD45mrYa6ZM7udsgfr1\nRtf1UkZ9jW19nyMgHv+jHYmMwjT/NtbDxj2Xf7hQJwqkvgmBYMEDUViLUOJlvqnu\nUkRYrOxF026uEiBf75eWPiYkHsEy1FV2S4ihfoOXFrs274Gg12GjpqsG4BEC1LaK\no/CPSBWCFvQ9A4p2X3NdgmafKwKBgQDumusP0tzfYR8LW2oUYEHcNp+7Fv8Ilf36\nttiNF4yeOimW7kGPlZONbVzdmjQDrtitSxRkTgySoWEMUZRWTXdt3lF07sqzcRfc\nSBBMw3OkNTA8nMW0sQzAl7ewbznX5gwwmXLRN/yT7S495uvnMsBAMZGYxZXgvjXS\nTHidYW/EywKBgCCbv1+/KrhljDgxBznfICfpsYZ9YtzUXnu00/UAx6aDQwI0owpf\nDG6usuz9UG2o4AHtNRxEKf+Gh0KhKg4pBP9BGGtFefigM1GeSBPM7J5K0TDhlJi8\n6JePxZmjxr85vZfe39Ha4gkyjcf7Kjcbp0Z+QSMb8r+TmS5M7wZPMTalAoGBAIMO\nioBFhNYZRXD6hBivCl3HjxK3PdvcbwVvuyA8SBt8vO1O7qnMMaCj6jc6BMnlFtSQ\ngaHakONVSrX2dTC2Ghw52aoNoz7Opply56kSTglqwZT5U0q9WNDMRLPfU/k3PYjQ\nMBWk19H0m8qadQanhJt93of4NyubrnpVUIa5RyfjAoGBAK0n1ULfnWYJlYiFw794\nCe3bVIQ1ff0SQO0mXi0dzojbgluPv1UFqrC9iLyIpiC+1YElx69VL8xregzO8Rxv\n+AldueecgLEkXdsiNCJ8ibRriiWbcF3yt8Z9tbhzBsIAsXiT4bDxDnK/oLCFKwtt\n7y4GVVG8hYOx5Rv+0xscAF0M\n-----END PRIVATE KEY-----\n",
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
