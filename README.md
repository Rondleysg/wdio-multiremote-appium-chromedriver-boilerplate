# Appium and Chromedriver Multiremote WebdriverIO Boilerplate

This is a boilerplate project to help show how to run webdriverio multi-remote using appium and chromedriver service with the latest WebdriverIO.

<br>
<div align="center">
  <img src="https://webdriver.io/img/webdriverio.png" alt="WebdriverIO" width="200" />
</div>
<br>

*WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and stable test suite.*
<br>

> [!IMPORTANT]
> This boilerplate uses the WebdriverIO native demo app which can be found [here](https://github.com/webdriverio/native-demo-app).

> [!NOTE]
> Multiremote is not meant to execute all your tests in parallel. It is intended to help coordinate multiple browsers and/or mobile devices for special integration tests (e.g. chat applications).

## Based on

This boilerplate is currently based on:

- **WebdriverIO:** `9.x`
- **Appium:** `2.x`
- **Chromedriver**
- **Mocha**

## Installation

1. Clone this project by running

```sh
git clone https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate.git
```

2. Install all dependencies

```sh
yarn
```

> [!TIP]
> Use the [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) package to setup Appium on your local machine. This will also help you configure Android Emulators/ iOS Simulators.

1. Download the application files (`.zip` / `.apk`) with version >= `1.0.0`, which can be found [here](https://github.com/webdriverio/native-demo-app/releases), and place them in the `./apps` folder.

2. Adjust the configuration files for [Android](./wdio.local.conf.ts) and [iOS](./wdio.local.conf.ts) relative to the device configuration you created on your local machine. If you prefer, you can create a separate configuration file for each.

3. Running tests locally
    - **Multiremote with Android:** `yarn test-android`
    - **Multiremote with iOS:** `yarn test-ios`

### What is multi-remote

The multiremote feature in webdriverio allows to run multiple browser instances with different capabilities and access them within the same test example. In our project we use as an example the use of a mobile device together with a chrome browser

```typescript
export function getDeviceFromCapabilities(key: string): WebdriverIO.Browser {
    const device = driver[key as keyof typeof driver] as WebdriverIO.Browser
    return device
}

//where 'emulator' can be appium and 'browser' can be chromedriver
const emulator = getDeviceFromCapabilities('mobile')
const browser = getDeviceFromCapabilities('browser')
emulator.click()
browser.click()
```

## Contact

- **Email**: <rondleyemail@gmail.com>
- **Linkedin**: <https://www.linkedin.com/in/rondleysg/>
