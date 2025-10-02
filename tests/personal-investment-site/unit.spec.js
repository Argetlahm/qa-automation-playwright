// @ts-check
import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto('https://stephengunawan.com/');
});

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
  await expect(page).toHaveTitle("stephengunawan.com -");
  await expect(page).toHaveURL("https://stephengunawan.com/");
});

test("open login page", async ({ page }) => {
  await page.goto("https://stephengunawan.com/opengate");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("https://stephengunawan.com/wp-login.php?itsec-hb-token=opengate");
  await expect(page.getByText("Username or Email Address")).toBeVisible();
  await expect(page.getByLabel("Username or Email Address")).toBeVisible();
  await expect(page.getByText("Password", {exact:true})).toBeVisible();
  await expect(page.getByLabel("Password", {exact:true})).toBeVisible();
  await expect(page.getByLabel("Remember Me")).toBeVisible();
  await expect(page.getByText("Remember Me")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Lost your password?" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go to stephengunawan.com" })).toBeVisible();
})
//test sparingly due to login attempt limit
// test("open login page invalid", async({ page }) => {
//   await page.goto("https://stephengunawan.com/opengate");
//   await expect(page).toHaveURL("https://stephengunawan.com/wp-login.php?itsec-hb-token=opengate");
//   await page.getByLabel("Username or Email Address").fill("invalid_user");
//   // await page.getByRole("textbox", {name: "pwd"}).fill("random");
//   // must use evaluate to remove readonly attribute
//   await page.evaluate(() => {
//     const passwordField = document.querySelector("#user_pass");
//     if (passwordField) {
//       passwordField.removeAttribute("readonly");
//     }
//   });
//   await page.locator("#user_pass").fill("random");
//   await page.getByRole("button", { name: "Log In" }).click();
//   await page.waitForLoadState("networkidle");
//   const errorMessage = "ERROR: Incorrect Username or Password";
//   await page.evaluate(() => {
//     if (document.querySelector("#login_error p")?.innerHTML.includes("maximum login retries")) {
//       errorMessage = "You have exceeded maximum login retries";
//     }
//   })
//   await expect(page.getByText(errorMessage)).toBeVisible();
// });



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

// https://medium.com/@12charmi/testing-login-flows-with-playwright-from-form-fill-to-redirect-testingday2-dc7ebb826928