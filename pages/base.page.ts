import { Page, Locator } from '@playwright/test';
import logger from '../utils/logger';

/**
 * BasePage — абстрактный базовый класс для всех Page Objects.
 * Паттерн Page Object Model (Martin Fowler, 2013).
 * Инкапсулирует ссылку на page и общие методы навигации.
 * ВАЖНО: не содержит assertions — только действия и ожидания.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Переход по пути относительно baseURL из playwright.config.ts */
  async navigate(path: string = '/'): Promise<void> {
    logger.info(`Navigating to: ${path}`);
    await this.page.goto(path);
  }

  /** Ожидание завершения всех сетевых запросов */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    logger.info('Page fully loaded (networkidle)');
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async waitForElement(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    const buffer = await this.page.screenshot({ fullPage: false });
    logger.info(`Screenshot taken: ${name}`);
    return buffer;
  }
}
