import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(9))
  await loginPage.signInButton.click()

  await expect(loginPage.authError).toBeVisible()
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.statusButton).toBeVisible()
  await expect(orderCreationPage.usernameInput).toBeVisible()
  await expect(orderCreationPage.phoneInput).toBeVisible()
  await expect(orderCreationPage.commentInput).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeVisible()
  // verify at least few elements on the order creation page
})

test('login and create order', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.usernameInput.fill('random-user')
  await orderCreationPage.phoneInput.fill('587458745')
  await orderCreationPage.commentInput.fill('random comment')
  await orderCreationPage.createOrderButton.click()

  await expect(orderCreationPage.createOrderButton).toBeVisible()
})

test('check errors on order creation', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.usernameInput.fill('r')
  await orderCreationPage.phoneInput.fill('12345')
  await orderCreationPage.commentInput.fill('random comment')

  await expect(orderCreationPage.usernameInputError).toBeVisible()
  await expect(orderCreationPage.phoneInputError).toBeVisible()

  await expect(orderCreationPage.createOrderButton).toBeDisabled()
})

test('logout button from order page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.logoutButton.click()

  await expect(loginPage.signInButton).toBeVisible()
  //await expect(orderCreationPage.logoutButton).toBeHidden()
  expect(loginPage.page.url()).toContain('/signin')
})

test('order not found page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.statusButton.click()
  await orderCreationPage.orderSearchInput.fill('123456789')
  await orderCreationPage.orderSearchButton.click()

  await expect(orderCreationPage.orderNotFoundTitle).toBeVisible()
  await expect(orderCreationPage.orderNotFoundImage).toBeVisible()
})

test('order status page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderCreationPage.statusButton.click()
  await orderCreationPage.orderSearchInput.fill('20616')
  await orderCreationPage.orderSearchButton.click()

  await expect(orderCreationPage.orderNameDetails).toBeVisible()
  await expect(orderCreationPage.orderStatusOpen).toBeVisible()
})
