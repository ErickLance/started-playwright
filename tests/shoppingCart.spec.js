// @ts-check
import { test, expect } from '@playwright/test';
test.use({ browserName: 'chromium' });

test.describe('Testes de Compras - SauceDemo', () =>{

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  })

  test('Realizar Comopras Com Sucesso', async ({ page }) => {

    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page
      .locator('.inventory_item_description')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .getByRole('button', { name: 'Add to cart' })
      .click()

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
    await page.locator('[data-test="shopping-cart-link"]').click()

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

    await page.locator('[data-test="checkout"]').click();
    //await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html') Aprender variações de URL
    await page
      .getByPlaceholder('First Name')
      .fill('Teste')
    await page
      .getByPlaceholder('Last Name')
      .fill('Saucedemo')
    await page
      .getByPlaceholder('Zip/Postal Code')
      .fill('20252025')
    const continueButton = page.getByText('continue')
    await expect(continueButton).toBeVisible()
    await continueButton.click()

    //await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html') Aprender variações de URL

    const finishButton = page.getByText('Finish')
    await expect(finishButton).toBeVisible()
    await finishButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')

    const backHomeButton = page.getByText('Back Home')
    await expect(backHomeButton).toBeVisible()
    await backHomeButton.click()

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  })
})