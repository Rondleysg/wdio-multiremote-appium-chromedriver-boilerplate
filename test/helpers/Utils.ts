import { BUNDLE_ID, PACKAGE_NAME } from './Constants'

export function getDeviceFromCapabilities(key: string): WebdriverIO.Browser {
    const device = driver[key as keyof typeof driver] as WebdriverIO.Browser
    return device
}

export function getElementByTestIDApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$(`//*[@resource-id="${selector}"]`)
    }
    return mobile.$(`~${selector}`)
}

export function getElementsByTestIDApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$$(`//*[@resource-id="${selector}"]`)
    }
    return mobile.$$(`~${selector}`)
}

export function getElementByAccessibilityLabelApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$(`//*[@content-desc="${selector}"]`)
    }
    return mobile.$(`~${selector}`)
}

export function getElementByTextApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$(`//*[@text="${selector}"]`)
    }
    return mobile.$(`-ios predicate string:label == "${selector}"`)
}

export async function reLaunchApp(emulator: WebdriverIO.Browser) {
    const identifier = emulator.isAndroid ? PACKAGE_NAME : BUNDLE_ID

    const appIdentifier = {
        [emulator.isAndroid ? 'appId' : 'bundleId']: identifier,
    }
    const terminateCommand = 'mobile: terminateApp'
    const launchCommand = `mobile: ${
        emulator.isAndroid ? 'activateApp' : 'launchApp'
    }`

    await emulator.execute(terminateCommand, appIdentifier)
    await emulator.execute(launchCommand, appIdentifier)
}