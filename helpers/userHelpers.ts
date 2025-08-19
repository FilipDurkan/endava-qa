import { expect, Page } from "@playwright/test";

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
  // Navigate to the registration page
  await page.goto("/register");

  // Fill in personal details
  await page.locator("#gender-male").check(); // Select gender (male or female)
  await page.locator("#FirstName").fill(user.firstName); // Enter first name
  await page.locator("#LastName").fill(user.lastName); // Enter last name
  await page.locator("#Email").fill(user.email); // Enter email address

  // Fill in password fields
  await page.locator("#Password").fill(user.password); // Enter password
  await page.locator("#ConfirmPassword").fill(user.password); // Confirm password

  // Submit the registration form
  await page.locator("#register-button").click();

  // Check for error messages (e.g., email already exists)
  const errorLocator = page.locator(
    ".message-error .validation-summary-errors li"
  );

  if ((await errorLocator.count()) > 0) {
    const errorMessage = await errorLocator.textContent();

    if (errorMessage?.includes("The specified email already exists")) {
      // Generate a unique email to avoid duplicate registration
      const timestamp = Date.now();
      user.email = `test${Math.floor(Date.now() / 1000)}${Math.floor(
        Math.random() * 1000
      )}@mail.com`;

      // Update the email field and re-submit registration
      await page.locator("#Email").fill(user.email);
      await page.locator("#register-button").click();
    }
  } else {
    // No errors, registration successful
    return;
  }

  // Verify that registration was successful by checking for confirmation text
  await expect(page.getByText("Your registration completed")).toBeVisible();
}

// ----------------------------
// Login a user
// ----------------------------
export async function loginUser(page: Page, user: User) {
  // Navigate to the login page
  await page.goto("/login");

  // Fill login credentials
  await page.locator("#Email").fill(user.email);
  await page.locator("#Password").fill(user.password);

  // Submit the login form
  await page.locator('input[type="submit"][value="Log in"]').click();

  // Wait for logout link to appear to confirm successful login
  await page.waitForSelector("text=Log out");

  // Ensure login button is hidden (sanity check)
  const loginBtn = page.locator(".ico-login");
  await expect(loginBtn).toBeHidden();
}

// ----------------------------
// Logout user
// ----------------------------
export async function logoutUser(page: Page) {
  // Locate the logout button
  const logoutBtn = page.locator(".ico-logout");

  // Ensure the logout button is visible before clicking
  await expect(logoutBtn).toBeVisible({ timeout: 60000 });

  // Click the logout button
  await logoutBtn.click();

  // Wait for the login link to appear again to confirm successful logout
  await page.waitForSelector("text=Log in");

  // Ensure login button is visible again after logout
  const loginBtn = page.locator(".ico-login");
  await expect(loginBtn).toBeVisible();
}

// ----------------------------
// Change password
// ----------------------------
export async function changePassword(
  page: Page,
  oldPassword: string,
  newPassword: string
) {
  // Navigate to the change password page
  await page.goto("/customer/changepassword");

  // Fill in the old and new passwords
  await page.locator("#OldPassword").fill(oldPassword);
  await page.locator("#NewPassword").fill(newPassword);
  await page.locator("#ConfirmNewPassword").fill(newPassword);

  // Submit the change password form
  await page.locator("input.button-1.change-password-button").click();

  // Verify that the password change was successful
  await page.waitForSelector("text=Password was changed");
  await expect(page.getByText("Password was changed")).toBeVisible();
}
