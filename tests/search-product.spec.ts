import { test } from "@playwright/test";
import { loginUser, logoutUser, registerUser } from "../helpers/userHelpers";
import { searchProduct } from "../helpers/productHelper";
import { user } from "../helpers/userData";

// ----------------------------
// Test: Visitor can search for products without logging in
// ----------------------------
test("Visitor can search for products", async ({ page }) => {
  // Go to homepage
  await page.goto("/");

  // Search for a product ("Laptop") and verify results are visible
  await searchProduct(page, "Laptop");
});

// ----------------------------
// Test: Logged-in user can search for products
// ----------------------------
test("Logged in user can search for products", async ({ page }) => {
  // Register a new user
  await registerUser(page, user);

  // Search for a product ("Laptop") while logged in
  await searchProduct(page, "Laptop");

  // Logout after search to clean up session
  await logoutUser(page);
});
