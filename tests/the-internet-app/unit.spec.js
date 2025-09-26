// @ts-check
import { test, expect } from '@playwright/test';

test("page loaded", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle(/The Internet/);
});

// what to test
// Authentication: /login (valid/invalid login, message assertions, session persistence)
// Form Inputs: /inputs (numeric input), /checkboxes (toggle states), /dropdown (option selection)
// Dynamic Loading: /dynamic_loading/1 and /2 (explicit waits for loaded elements)
// JavaScript Alerts: /javascript_alerts (alert/confirm/prompt handling)
// File Upload: /upload (attach file and assert uploaded filename)
// Drag and Drop: /drag_and_drop (HTML5 drag/drop handling)
// Infinite Scroll: /infinite_scroll (scroll triggers content load)
// Hovers: /hovers (hover reveals captions/links)
// Status Codes: /status_codes (validate HTTP statuses via links)
// Secure Area: /basic_auth (basic auth header handling)