'use strict';

require('dotenv').config()
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized',
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://www.instagram.com');

  // Btn cookies.
  const selector = '//button[contains(text(), "Permitir apenas cookies essenciais")]';
  await page.waitForXPath(selector);
  const btn = await page.$x(selector);

  if (btn.length > 0)
    btn[0].click();

  // Login.
  await page.waitForSelector('input[name=username');
  await page.waitForSelector('input[name=password');
  await page.type('input[name=username]', process.env.INSTAUSER, {delay: 10});
  await page.type('input[name=password]', process.env.PASSWORD, {delay: 10});

  const btnLoginSelector = '//div[contains(text(), "Entrar")]';
  await page.waitForXPath(btnLoginSelector);
  const btnLogin = await page.$x(btnLoginSelector);

  if (btnLogin.length > 0)
    setTimeout(() => btnLogin[0].click(), 3000);

  // Go to initial page.
  const initialPageSelector = '//div[contains(text(), "Página inicial")]';
  await page.waitForXPath(initialPageSelector);
  const initialPage = await page.$x(initialPageSelector);

  if (initialPage.length > 0)
    setTimeout(() => initialPage[0].click(), 3000);
}

run()

