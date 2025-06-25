// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Testes de Autenticação - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('https://www.saucedemo.com/');
  });

  test('deve exibir o título correto', async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('login com sucesso', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('login com usuário bloqueado deve exibir mensagem de erro', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(/Sorry, this user has been locked out/i);
  });

  test('login com senha incorreta deve exibir mensagem de erro', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'senha_errada');
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/i);
  });

  test('login com campos vazios deve exibir mensagem de erro', async ({ page }) => {
    // Act
    await page.click('[data-test="login-button"]');

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/i);
  });

  test('logouth', async ({ page }) => {
    // Act
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.getByRole('button', { name: 'Open Menu'}).click()
    const logoutButton = page.getByText('Logout');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  })

});
