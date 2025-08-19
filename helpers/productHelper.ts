import { Page, expect } from '@playwright/test';

export async function searchProduct(page: Page, productName: string) {
 // search product to add to cart
  await page.locator('#small-searchterms').fill(productName);
  await page.locator('input[value="Search"]').click();
 const products = await page.locator('.product-item');
 const productCount = await products.count();
 expect(productCount).toBeGreaterThan(0);
}

export async function addToCartAndCheckout(page: Page, productName: string) {

  await searchProduct(page, productName);
  await page.locator('.product-item').first().locator('input[value="Add to cart"]').click();

  // wait for product to be added to cart
  await page.waitForSelector('text=The product has been added to your shopping cart');
// go to cart
  await page.locator('a[href="/cart"]').first().click();
// check terms
  await page.locator('input[name="termsofservice"]').check();
  await page.locator('#checkout').click();

//Fill Billing Address, fill only required fields for purpose of the assignment, to extend test would fill all, 
// and would leave required empty to test all scenarios
  await page.selectOption('#BillingNewAddress_CountryId', { label: 'Croatia' });
  await page.locator('#BillingNewAddress_City').fill('Zabok')
  await page.locator('#BillingNewAddress_Address1').fill('Testna Addresa 48 A');
  await page.locator('#BillingNewAddress_ZipPostalCode').fill('49210');
  await page.locator('#BillingNewAddress_PhoneNumber').fill('+385991234567');
 await page.locator('#billing-buttons-container').getByRole('button', { name: 'Continue' }).click();
 await page.locator('#shipping-buttons-container').getByRole('button', { name: 'Continue' }).click();
 await page.locator('#shipping-method-buttons-container').getByRole('button', { name: 'Continue' }).click();
 await page.locator('#payment-method-buttons-container').getByRole('button', { name: 'Continue' }).click();
 await page.locator('#payment-info-buttons-container').getByRole('button', { name: 'Continue' }).click();
 await page.locator('#confirm-order-buttons-container').getByRole('button', { name: 'Confirm' }).click();

 // Verify order is completed
  await page.waitForSelector('text=Your order has been successfully processed!');

  await page.locator('.order-completed').getByRole('button', { name: 'Continue' }).click();

}
