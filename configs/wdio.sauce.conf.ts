// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config } = require('./wdio.shared.conf')

const headless = process.argv.includes('--headless')

config.user = process.env.SAUCE_LABS_USER
config.key = process.env.SAUCE_LABS_KEY
config.region = process.env.SAUCE_LABS_REGION
config.hostname = process.env.SAUCE_LABS_HOST
config.port = 443
config.baseUrl = 'wd/hub'

const browserOptions = {
    args: [
        '--allowed-ips',
        'start-maximized',
        'disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-infobars',
        '--window-size=1366,784',
        '--disable-setuid-sandbox',
    ],
}

if (headless) {
    browserOptions.args.push('headless=new')
}

const browserCap = {
    browserName: 'chrome',
    browserVersion: 'latest',
    platformName: 'Windows 11',
    'sauce:options': {
        build: 'test-wdio-browser',
        name: 'Example Test',
    }
}

const androidCap = {
    platformName: 'Android',
    'appium:autoGrantPermissions': true,
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:app': 'storage:filename=android.wdio.native.app.v1.0.8.apk',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2',
    'sauce:options': {
        build: 'test-wdio-emulator',
        deviceOrientation: 'PORTRAIT',
        name: 'Example Test',
    }
}

config.capabilities = {
    mobile: {
        capabilities: androidCap,
    },
    browser: {
        capabilities: browserCap,
    },
}

config.services = [
    ['sauce', {
        sauceConnect: true,
        sauceConnectOpts: {
        }
    }]
]

exports.config = config