import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/LoginPage'
import SecurePage from '../pageobjects/SecurePage'
import TabBar from '../screenobjects/components/TabBar'
import LoginScreen from '../screenobjects/LoginScreen'
import NativeAlert from '../screenobjects/components/NativeAlert'
import HomeScreen from '../screenobjects/HomeScreen'
import { getDeviceFromCapabilities, reLaunchApp } from '../helpers/Utils'

describe('Open mobile and browser instances and perform actions in both within the same test', () => {

    async function loginInBrowser() {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining('You logged into a secure area!'))
    }

    async function loginInApp() {
        await TabBar.waitForTabBarShown()
        await TabBar.openLogin()
        await LoginScreen.waitForIsShown(true)
        await LoginScreen.tapOnLoginContainerButton()
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test1234!' })
        await NativeAlert.waitForIsShown()
        await expect(await NativeAlert.text()).toContain('Success')
        await NativeAlert.topOnButtonWithText('OK')
        await NativeAlert.waitForIsShown(false)
    }

    it('Perform login in both browser and mobile app sequentially', async () => {
        await loginInBrowser()
        await loginInApp()
    })

    it('Perform login in both browser and mobile app simultaneously', async () => {
        const emulator = getDeviceFromCapabilities('mobile')
        const browser = getDeviceFromCapabilities('browser')

        await Promise.all([
            browser.reloadSession(),
            reLaunchApp(emulator),
        ])

        await HomeScreen.waitForIsShown(true)

        await Promise.all([
            loginInBrowser(),
            loginInApp(),
        ])
    })
})
