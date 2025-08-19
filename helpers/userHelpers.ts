import { Page } from '@playwright/test';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// ----------------------------
// Register a new user
// ----------------------------
export async function registerUser(page: Page, user: User) {
  await page.goto('/register');

  // Fill personal details
  await page.locator('#gender-male').check(); // or female
  await page.locator('#FirstName').fill(user.firstName);
  await page.locator('#LastName').fill(user.lastName);
  await page.locator('#Email').fill(user.email);

  // Fill password
  await page.locator('#Password').fill(user.password);
  await page.locator('#ConfirmPassword').fill(user.password);

  // Submit registration
  await page.locator('#register-button').click();

const errorLocator = page.locator('.message-error .validation-summary-errors li');

if (await errorLocator.count() > 0) {
    const errorMessage = await errorLocator.textContent();
    if (errorMessage?.includes('The specified email already exists')) {
        // Generate a new unique email
        const timestamp = Date.now();
        user.email = `test${Math.floor(Date.now() / 1000)}${Math.floor(Math.random()*1000)}@mail.com`;
        console.log('Email exists, new email:', user.email);
         await page.locator('#Email').fill(user.email);
          await page.locator('#register-button').click();
    }
} else {
    console.log('Email is available, continue test');
}

  // Verify registration success
  await page.waitForSelector('text=Your registration completed');
}

// ----------------------------
// Login a user
// ----------------------------
export async function loginUser(page: Page, user: User) {
  await page.goto('/login');

  await page.locator('#Email').fill(user.email);
  await page.locator('#Password').fill(user.password);
  await page.locator('input[type="submit"][value="Log in"]').click();

  // Verify login success (example: logout link visible)
  await page.waitForSelector('text=Log out');
}

// ----------------------------
// Logout user
// ----------------------------
export async function logoutUser(page: Page) {
  await page.locator('text=Log out').click();
  await page.waitForSelector('text=Log in'); // back to login link
}

// ----------------------------
// Change password
// ----------------------------
export async function changePassword(page: Page, oldPassword: string, newPassword: string) {
  await page.goto('/customer/changepassword');

  await page.locator('#OldPassword').fill(oldPassword);
  await page.locator('#NewPassword').fill(newPassword);
  await page.locator('#ConfirmNewPassword').fill(newPassword);

  await page.locator('input.button-1.change-password-button').click();

  // Verify password change success
  await page.waitForSelector('text=Password was changed');
}
