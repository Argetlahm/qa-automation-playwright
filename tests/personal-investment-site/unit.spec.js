// @ts-check
import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';
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

test('test homepage', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'stephengunawan.com' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.locator('#menu-item-167').getByRole('link', { name: 'Data Dividen' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tentang Saya' })).toBeVisible();
  await expect(page.getByRole('link', { name: '' })).toBeVisible();
  await expect(page.getByText('stephengunawan.com © 2025.')).toBeVisible();
  await expect(page.locator('.slick-featured-wrap')).toBeVisible();
  await expect(page.locator('.slick-highlights-wrap')).toBeVisible();
  await expect(page.locator('#page div').filter({ hasText: 'Analisa Dividen Saham SPMA 2025 0 Analisa Saham / Data Emiten October 5, 2025' }).nth(3)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Previous' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).nth(1).click();
  await page.getByRole('button', { name: 'Previous' }).nth(1).click();
  await expect(page.getByText('Categories Analisa Saham (11')).toBeVisible();
  await expect(page.getByText('TagsADMF ADRO Analisa ASII')).toBeVisible();
  await expect(page.locator('#custom_html-3')).toBeVisible();
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

test("successful login", async({ page }) => {
  await page.goto("https://stephengunawan.com/opengate");
  await expect(page).toHaveURL("https://stephengunawan.com/wp-login.php?itsec-hb-token=opengate");
  await page.getByLabel("Username or Email Address").fill("test-user");
  await page.evaluate(() => {
    const passwordField = document.querySelector("#user_pass");
    if (passwordField) {
      passwordField.removeAttribute("readonly");
    }
  });
  await page.locator("#user_pass").fill("tester.Stephen01!");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("https://stephengunawan.com/wp-admin/profile.php");
  await expect(page.getByRole("link", {name: "Dashboard" })).toBeVisible();
  await expect(page.getByText("Howdy, tester01")).toBeVisible();
  await expect(page.getByLabel("First Name")).toHaveValue("tester01");
  await page.getByText("Howdy, tester01").hover();
  await page.getByRole("menuitem", { name: "Log Out" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("You are now logged out.")).toBeVisible();
})

test('test comment form', async ({ page }) => {
  await page.getByRole('link', { name: 'Analisa Dividen Saham SPMA' }).first().click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/.*analisa-dividen-saham-spma.*/);
  await expect(page.getByText('Leave a reply')).toBeVisible();
  await expect(page.getByText('Comment *')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Comment *' })).toBeVisible();
  await expect(page.getByText('Name *')).toBeVisible();
  await expect(page.getByText('Email *')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email *' })).toBeVisible();
  await expect(page.getByText('Website', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Website' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'Save my name, email, and' })).toBeVisible();
  await expect(page.getByText('Save my name, email, and')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Post Comment' })).toBeVisible();
  const commentNumber = randomInt(1, 9999);
  await page.getByRole('textbox', { name: 'Comment *' }).click();
  await page.getByRole('textbox', { name: 'Comment *' }).fill('sample comment '+commentNumber);
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('test');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill('nosite');
  await page.getByRole('checkbox', { name: 'Save my name, email, and' }).check();
  await page.getByRole('checkbox', { name: 'Save my name, email, and' }).uncheck();
  await page.getByRole('button', { name: 'Post Comment' }).click();
  await page.waitForLoadState("networkidle");
  await expect(page.getByText('Your comment is awaiting')).toBeVisible();
});



// what to test
// Home Page: / (page load, title, main sections) *done
      // - page load
      // - title
      // - main sections (header, footer, navigation menu, featured content)
// Authentication: /login (valid/invalid login, message assertions, session persistence)
//     - test open page *done
//     - test valid login *done
//     - test invalid login *done
//     - test logout *done
//     - test message assertions (success/error messages) *done
// Form Inputs: /inputs (numeric input), /checkboxes (toggle states), /dropdown (option selection) *done

// https://medium.com/@12charmi/testing-login-flows-with-playwright-from-form-fill-to-redirect-testingday2-dc7ebb826928