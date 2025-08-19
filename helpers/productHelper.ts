import { Page, expect } from "@playwright/test";

// ----------------------------
// Search for a product
// ----------------------------
export async function searchProduct(page: Page, productName: string) {
  // Enter product name in the search box
  await page.locator("#small-searchterms").fill(productName);

  // Click the search button to execute search
  await page.locator('input[value="Search"]').click();

  // Get the list of product items from search results
  const products = await page.locator(".product-item");

  // Verify that at least one product is visible in search results
  await expect(products).toBeVisible();
}

// ----------------------------
// Add a product to cart and complete checkout
// ----------------------------
export async function addToCartAndCheckout(page: Page, productName: string) {
  // Search for the product first
  await searchProduct(page, productName);

  // Add the first product in the search results to the shopping cart
  await page
    .locator(".product-item")
    .first()
    .locator('input[value="Add to cart"]')
    .click();

  // Wait for confirmation message that product has been added to cart
  await page.waitForSelector(
    "text=The product has been added to your shopping cart"
  );

  // Navigate to the shopping cart page
  await page.locator('a[href="/cart"]').first().click();

  // Agree to terms of service before checkout
  await page.locator('input[name="termsofservice"]').check();

  // Click checkout button to start the checkout process
  await page.locator("#checkout").click();

  // ----------------------------
  // Fill Billing Address
  // Only required fields are filled here for simplicity
  // ----------------------------
  await page.selectOption("#BillingNewAddress_CountryId", { label: "Croatia" });
  await page.locator("#BillingNewAddress_City").fill("Zabok");
  await page.locator("#BillingNewAddress_Address1").fill("Testna Addresa 48 A");
  await page.locator("#BillingNewAddress_ZipPostalCode").fill("49210");
  await page.locator("#BillingNewAddress_PhoneNumber").fill("+385991234567");

  // Click Continue to proceed through the checkout steps
  await page
    .locator("#billing-buttons-container")
    .getByRole("button", { name: "Continue" })
    .click();
  await page
    .locator("#shipping-buttons-container")
    .getByRole("button", { name: "Continue" })
    .click();
  await page
    .locator("#shipping-method-buttons-container")
    .getByRole("button", { name: "Continue" })
    .click();
  await page
    .locator("#payment-method-buttons-container")
    .getByRole("button", { name: "Continue" })
    .click();
  await page
    .locator("#payment-info-buttons-container")
    .getByRole("button", { name: "Continue" })
    .click();

  // Confirm the order at the final step
  await page
    .locator("#confirm-order-buttons-container")
    .getByRole("button", { name: "Confirm" })
    .click();

  // ----------------------------
  // Verify order completion
  // ----------------------------
  await page.waitForSelector(
    "text=Your order has been successfully processed!"
  );

  // Ensure the order confirmation section is visible
  await expect(page.locator(".order-completed")).toBeVisible();

  // Click Continue to finish the checkout flow
  await page
    .locator(".order-completed")
    .getByRole("button", { name: "Continue" })
    .click();
}
