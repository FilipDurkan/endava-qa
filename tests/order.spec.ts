// tests/order.spec.ts
import { test } from "@playwright/test";
import { registerUser, loginUser, logoutUser } from "../helpers/userHelpers";
import { user } from "../helpers/userData";
import { addToCartAndCheckout } from "../helpers/productHelper";

// ----------------------------
// Test: Logged-in user can add a product to the cart and complete an order
// ----------------------------
test("Logged in user can add product to cart and complete order", async ({
  page
}) => {
  // Register a new user (or handle existing email if needed)
  await registerUser(page, user);

  // Add a specific product ("laptop") to the shopping cart and complete checkout
  await addToCartAndCheckout(page, "laptop");

  // Logout the user to end the session
  await logoutUser(page);
});
