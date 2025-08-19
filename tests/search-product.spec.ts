import { test } from '@playwright/test';
import { loginUser, logoutUser, registerUser } from '../helpers/userHelpers';
import { searchProduct } from '../helpers/productHelper';
import { user } from '../helpers/userData';


test('Visitor can search for products', async ({ page }) => {
   await page.goto('/');
  await searchProduct(page, 'Laptop');
});

test('Logged in user can search for products', async ({ page }) => {
  await registerUser(page, user);
  await searchProduct(page, 'Laptop');
  await logoutUser(page);
});
