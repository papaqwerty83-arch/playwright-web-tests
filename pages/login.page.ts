import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import logger from '../utils/logger';

/**
 * LoginPage — Page Object страницы авторизации SauceDemo.
 *
 * Зона ответственности: инкапсуляция локаторов формы входа
 * и предоставление высокоуровневых методов-действий пользователя.
 * Наследует BasePage (отношение: наследование / generalization).
 */
export class LoginPage extends BasePage {
  // Локаторы объявлены как приватные — тест не имеет к ним доступа
  private readonly usernameInput  = this.page.locator('#user-name');
  private readonly passwordInput  = this.page.locator('#password');
  private readonly loginButton    = this.page.locator('#login-button');
  private readonly errorMessage   = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  /** Открыть страницу авторизации */
  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForLoad();
    logger.info('LoginPage opened');
  }

  /**
   * Выполнить вход с заданными учётными данными.
   * Публичный метод — семантика пользовательского действия, не технического.
   */
  async login(username: string, password: string): Promise<void> {
    logger.info(`Attempting login with user: ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    logger.info(`Login button clicked for user: ${username}`);
  }

  /** Получить текст сообщения об ошибке */
  async getErrorText(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return this.errorMessage.innerText();
  }

  /** Проверить, отображается ли сообщение об ошибке */
  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
