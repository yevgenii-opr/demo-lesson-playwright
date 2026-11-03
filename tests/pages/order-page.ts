import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly usernameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly createOrderButton: Locator
  readonly successMessage: Locator
  readonly usernameInputError: Locator
  readonly phoneInputError: Locator
  readonly logoutButton: Locator
  readonly orderSearchInput: Locator
  readonly orderSearchButton: Locator
  readonly orderNotFoundTitle: Locator
  readonly orderNotFoundImage: Locator
  readonly orderNameDetails: Locator
  readonly orderStatusOpen: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.usernameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.successMessage = page.getByTestId('orderSuccessfullyCreated-popup')
    this.usernameInputError = page.getByTestId('username-input-error')
    this.phoneInputError = page.getByTestId('phone-input-error')
    this.logoutButton = page.getByTestId('logout-button')
    this.orderSearchInput = page.getByTestId('searchOrder-input')
    this.orderSearchButton = page.getByTestId('searchOrder-submitButton')
    this.orderNotFoundTitle = page.getByTestId('orderNotFound-title')
    this.orderNotFoundImage = page.getByTestId('orderNotFound-image')
    this.orderNameDetails = page.getByTestId('order-item-0')
    this.orderStatusOpen = page.getByTestId('status-item-0')
  }
}
