import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import logger from '../utils/logger';

export class CartPage extends BasePage {
  private readonly cartItems = this.page.locator('.cart_item');
  private readonly cartItemNames   = this.page.locator('[data-test="inventory-item-name"]');
  private readonly checkoutButton  = this.page.locator('[data-test="checkout"]');
  private readonly continueButton  = this.page.locator('[data-test="continue-shopping"]');

  constructor(page: Page) {
    super(page);
  }

 async getCartItemCount(): Promise<number> {
  return this.cartItems.count();
}

  async getCartItemNames(): Promise<string[]> {
    return this.cartItemNames.allInnerTexts();
  }

  async proceedToCheckout(): Promise<void> {
    logger.info('Proceeding to checkout');
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueButton.click();
  }
}