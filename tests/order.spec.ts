// tests/order.spec.ts
import { test } from '@playwright/test';
import { registerUser, loginUser, logoutUser } from '../helpers/userHelpers';
import { user } from '../helpers/userData';
import { addToCartAndCheckout } from '../helpers/productHelper';


test('Logged in user can add product to cart and complete order', async ({ page }) => {
await registerUser(page, user);

await addToCartAndCheckout(page,'laptop');
await logoutUser(page);
});
