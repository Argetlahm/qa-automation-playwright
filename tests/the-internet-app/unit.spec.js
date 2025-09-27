// @ts-check
import { test, expect } from '@playwright/test';

test("page loaded", async ({ page }) => {
  // Mock the network request to avoid external dependency
  // await page.route('https://the-internet.herokuapp.com/', route =>
  //   route.fulfill({
  //     status: 200,
  //     contentType: 'text/html',
  //     body: `
  //       <html>
  //         <head><title>The Internet</title></head>
  //         <body>
  //           <h1>Welcome to the-internet</h1>
  //         </body>
  //       </html>
  //     `
  //   })
  // );
  // test.setTimeout(90*1000); // 1.5 minutes timeout
  await page.goto("https://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle("The Internet");
  await expect(page.locator("h1")).toHaveText("Welcome to the-internet");
});

test("open login page", async({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await page.getByRole("link", { name:"Basic Auth"}).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/basic_auth");
});



// what to test
// Authentication: /login (valid/invalid login, message assertions, session persistence)
//     - test open page
//     - test valid login
//     - test invalid login
//     - test logout
//     - test session persistence (cookie/localStorage)
//     - test message assertions (success/error messages)
// Form Inputs: /inputs (numeric input), /checkboxes (toggle states), /dropdown (option selection)
// Dynamic Loading: /dynamic_loading/1 and /2 (explicit waits for loaded elements)
// JavaScript Alerts: /javascript_alerts (alert/confirm/prompt handling)
// File Upload: /upload (attach file and assert uploaded filename)
// Drag and Drop: /drag_and_drop (HTML5 drag/drop handling)
// Infinite Scroll: /infinite_scroll (scroll triggers content load)
// Hovers: /hovers (hover reveals captions/links)
// Status Codes: /status_codes (validate HTTP statuses via links)
// Secure Area: /basic_auth (basic auth header handling)