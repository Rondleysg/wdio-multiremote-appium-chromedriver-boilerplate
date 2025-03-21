import Page from './Page.js'
import { getDeviceFromCapabilities } from '../helpers/Utils.js'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    private get device() {
        return getDeviceFromCapabilities('browser')
    }
    /**
   * define selectors using getter methods
   */
    public get flashAlert() {
        return this.device.$('#flash')
    }
}

export default new SecurePage()
