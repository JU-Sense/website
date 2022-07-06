const express = require("express");
const router = express.Router();

async function config() {
	// console.log(process.env.CLIENT_EMAIL);
	const { GoogleSpreadsheet } = require("google-spreadsheet");
	// const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
	const doc = new GoogleSpreadsheet("16NtFBsiJwaGn2Xvl2ioD6aHoLyONC6srPXp5-o7gBT8");

	await doc.useServiceAccountAuth({
		// client_email: process.env.CLIENT_EMAIL,
		// private_key: process.env.PRIVATE_KEY,
		client_email: "my-service-account@favorable-sylph-351119.iam.gserviceaccount.com",
		private_key:
			"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxQ/J8Fh98Nzvg\niUIQZiu/ico5lG1dY2zVM3f/+IPHH+ZLF9wdOhDGG7SPr4WK2c1xwzTvHr5rqRdG\nRrAyTcYUGs1qKDEjC22JHhdZEJqSp7hklaqbvdz9QClSmBLp8Fsg/8nX3fZIhOaM\ncG22CWHUdR0SMa8J/9yInDwdSB+yE2o8/fNqq9JkCfFzSN9hHUL+20zayFDbPXUI\nw5ltQC5T/toSkqDxElDk3bdS4zc6BJ0hlYXj97y7YWrVCjTAN68Kc7haDk4+kO9G\nb2h3Lvw6OuwDYqvMbivx7IPRjnhYnwaWJ7Q1szw4jh20RfkomqW5vL0oVrtepFo8\nqoSq/W7RAgMBAAECggEAC3eu0dIzOpDu1wlqHwTNDbi3PrRYbYiHZjTMguBWfg+V\nPARmIUnmreTlmxSqxJ8ZyE3tjbk6bl04++Xfc3xOinHAGimmzB1AJR+vjlEhqXJ0\n3k+ZrYuXJpb7qrPbKAvRiWKixyE9KSyCfFFa95dxybxtzgXYIgMjBtS8mtRV9eoU\ntYjoBf/KoVPTRf9VkrjVnGJREOUyYtcslAdcbALs+KjfzMzsYiM9fZ3pHbyqoQru\ncY3HAaTblDF9o2K8L5lDfvuLkQRhVFsSFS4h4zG8PKh7v5ZOjlULAyq9xCXw9ytb\n2EWQFQtCTWAUq71Z5NJswqxnxjidkSxOx6Uuwzy+sQKBgQDch6QtG2ZDt1bPiHCk\n2YOsnYkViqDNbQlsHmi/lEX90iv8IFINTr/vUFPBKOJDiZXR8VNRmUhyNJ+r7Adv\n01TNps/Na6Tk3gKqMd4D9mS0WfLl7t9NUQ8NWSnmIo6xeJ6uIEx5sFn3g/8p002P\n0RY5iL5/kdrmzTUTHLOgZwQx7QKBgQDNxuJ8fPjVhAj6zOs27GnYZ6VBKaeq4LwC\nmnPxVXbW3V9O4Wb39x76an0dxqC9uaMtDwj9E7mfhWyY1jB2z50xmh9i1hnjOV0c\nylNBXHFaJes2R+pFi7gU8WqAmzD7PV9tJ0t1Iqnq/+Rj+px95s4NukrCB0ECxe81\n0XMnTfdj9QKBgQDON/kKRSjoAbWn88qCHPTIobfi8PNVpbS96eHB5IFezP5ckkyo\nLQ/GVbM8WWLcDPiQjb5/+3qHcTYuqlR5+YC/nlGLojFb409Sn7cgtXOOQt6krS8b\nOcV9kfdgQMh2pHieE43v7Tzz+/bLwdAxwC+sNXcOC/JLCXGsIZbHVA3UMQKBgB7z\n5amYGs3zOG6RWGhAk4NLw93TaDcZ6u3xUbNhiai0T9vLp/NwpqZAUmWiNReUzui+\nNDntN6S5KyaqQUv92sVVS5dQYUB+pnToMjHIt/w5a/IUSzb+10e/MKf7sBh6mNoQ\naRdLiYehyjcHwXZmu2PxO8GH2c2S/HJ5+PpWjfnpAoGBAK47yWZCoskjQF7MlGOh\nxQgOolN3C1H0pzOprJyH6ZrBLXhT/WyZ+idZymMJ73luO9qAEddJYOnfjVudx9f0\ns/5HDrgTo9rmqzlP8VxTAiyRERWDeWVn88t5DnK7PM1JI1oCeMEII7KWTaoiVfOi\nDhbOAnYNccCAVRlikqPce4BP\n-----END PRIVATE KEY-----\n",
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

	// console.timeEnd();
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
