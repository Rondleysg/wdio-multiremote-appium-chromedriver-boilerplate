import { getDeviceFromCapabilities } from '../../helpers/Utils'

export default class TabBar {
    static async openHome () {
        const emulator = getDeviceFromCapabilities('mobile')
        await emulator.$('~Home').click()
    }

    static async openWebView () {
        const emulator = getDeviceFromCapabilities('mobile')
        await emulator.$('~Webview').click()
    }

    static async openLogin () {
        const emulator = getDeviceFromCapabilities('mobile')
        await emulator.$('~Login').click()
    }

    static async openForms () {
        const emulator = getDeviceFromCapabilities('mobile')
        await emulator.$('~Forms').click()
    }

    static async openSwipe () {
        const emulator = getDeviceFromCapabilities('mobile')
        await emulator.$('~Swipe').click()
    }

    static async openDrag () {
        const emulator = getDeviceFromCapabilities('mobile')
        await emulator.$('~Drag').click()
    }

    static async waitForTabBarShown ():Promise<boolean|void> {
        const emulator = getDeviceFromCapabilities('mobile')
        return emulator.$('~Home').waitForDisplayed({
            timeout: 20000,
        })
    }
}