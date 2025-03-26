import { join } from 'node:path'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config } = require('./wdio.shared.conf')

const iOSAppPath = join(process.cwd(), './apps/ios.wdio.native.app.v1.0.8.app')
const headless = process.argv.includes('--headless')

const browserOptions = {
    args: [
        '--allowed-ips',
        'start-maximized',
        'disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-infobars',
        '--window-size=1280,800',
        '--disable-setuid-sandbox',
    ],
}

if (headless) {
    browserOptions.args.push('headless=new')
}

const browserCap = {
    browserName: 'chrome',
    'wdio:chromedriverOptions': {},
    'goog:chromeOptions': browserOptions,
}

const iOSCap = {
    'appium:platformName': 'iOS',
    'appium:deviceName': 'iPhone 11 Pro',
    'appium:platformVersion': '15.2',
    'appium:automationName': 'XCUITest',
    'appium:orientation': 'PORTRAIT',
    'appium:app': iOSAppPath,
    'appium:appWaitActivity': '*',
    'appium:autoGrantPermissions': true,
    'appium:deviceType': 'phone',
}

config.capabilities = {
    mobile: {
        capabilities: iOSCap,
    },
    browser: {
        capabilities: browserCap,
    },
}

config.services = [
    ['chromedriver'],
    [
        'appium',
        {
            command: 'appium',
        },
    ],
]

exports.config = config