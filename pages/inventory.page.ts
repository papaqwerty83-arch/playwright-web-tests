import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import logger from '../utils/logger';

/**
 * InventoryPage — Page Object страницы каталога товаров.
 *
 * Зона ответственности: управление сортировкой, чтение списка товаров,
 * добавление товаров в корзину, навигация к оформлению заказа.
 * Наследует BasePage. Отношение к тестам: ассоциация (используется в тестах).
 */
export class InventoryPage extends BasePage {
  private readonly sortDropdown       = this.page.locator('[data-test="product-sort-container"]');
  private readonly productItems       = this.page.locator('[data-test="inventory-item"]');
  private readonly productNames       = this.page.locator('[data-test="inventory-item-name"]');
  private readonly cartBadge          = this.page.locator('[data-test="shopping-cart-badge"]');
  private readonly cartLink           = this.page.locator('[data-test="shopping-cart-link"]');
  private readonly menuButton         = this.page.locator('#react-burger-menu-btn');
  private readonly logoutLink         = this.page.locator('#logout_sidebar_link');
  private readonly pageTitle          = this.page.locator('[data-test="title"]');

  constructor(page: Page) {
    super(page);
  }

  /** Дождаться загрузки каталога */
  async waitForInventory(): Promise<void> {
    await this.waitForElement(this.pageTitle);
    logger.info('Inventory page ready');
  }

  /** Получить текст заголовка страницы */
  async getPageTitle(): Promise<string> {
    return this.pageTitle.innerText();
  }

  /** Получить количество отображаемых товаров */
  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  /** Получить имя первого товара в списке */
  async getFirstProductName(): Promise<string> {
    return this.productNames.first().innerText();
  }

  /** Получить все имена товаров в порядке отображения */
  async getAllProductNames(): Promise<string[]> {
    return this.productNames.allInnerTexts();
  }

  /**
   * Выбрать критерий сортировки.
   * @param option  'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    const values = { az: 'az', za: 'za', lohi: 'lohi', hilo: 'hilo' };
    logger.info(`Sorting inventory by: ${option}`);
    await this.sortDropdown.selectOption(values[option]);
    await this.page.waitForTimeout(300); // ожидание перерисовки списка
  }

  /**
   * Добавить первый товар в корзину.
   * Метод находит кнопку «Add to cart» первого товара и кликает по ней.
   */
  async addFirstItemToCart(): Promise<void> {
    const addButton = this.productItems
      .first()
      .locator('button[data-test^="add-to-cart"]');
    await addButton.click();
    logger.info('First item added to cart');
  }

  /**
   * Добавить товар по индексу (0-based) в корзину.
   */
  async addItemToCartByIndex(index: number): Promise<void> {
    const addButton = this.productItems
      .nth(index)
      .locator('button[data-test^="add-to-cart"]');
    await addButton.click();
     await this.page.waitForTimeout(500);
    logger.info(`Item at index ${index} added to cart`);
  }

  /** Получить число товаров в корзине (из badge на иконке) */
  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  /** Перейти в корзину */
  async openCart(): Promise<void> {
    await this.cartLink.click();
    logger.info('Cart opened');
  }

  /** Выйти из системы через боковое меню */
  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
    await this.logoutLink.click();
    logger.info('Logged out');
  }
}
