const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const beta_data = [];
  let status = 404;

  const body = req.body;
  var stocks = body.stocks;
  console.log(body);
  console.log(stocks);
  if (!stocks || stocks.length == 0) {
    console.log("(betas)", "no stocks provided.");
    res.status(400).send("Must provide at least one stock.");
    return;
  }

  const url = `https://finviz.com/screener.ashx?v=152&ft=4&t=${stocks.toString()}&c=1,48`;

  async function getBetas(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      $(".table-light > tbody > tr").each((index, item) => {
        if (index > 0) {
          temp_ticker = $(item)
            .children(".screener-body-table-nw")
            .children(".screener-link-primary")
            .text();
          temp_beta = $(item).children(".screener-body-table-nw").children(".screener-link").text();
          beta_object = {
            ticker: temp_ticker,
            beta: temp_beta,
          };
          beta_data.push(beta_object);
        }
      });
      console.log("(betas)", beta_data);
      status = 200;
    } catch (error) {
      console.log("(betas)", error);
    }
  }

  await getBetas(url);
  res.status(status).send(beta_data);
  return;
});

module.exports = router;
