const runApplescript = require('run-applescript');

class NetworkLinkConditioner {
    constructor(delay = 1) {
        this.delay = delay;
    }
    /**
     * switches Network Link Conditioner to "on"
     * @returns promise
     */
    async on() {
        return new Promise(async (resolve, reject) => {
            try {
                await runApplescript(`
            delay ${this.delay}
                tell application "System Preferences"
                activate
                delay ${this.delay}
                set current pane to pane "com.apple.Network-Link-Conditioner"
                end tell
                
                tell application "System Events"
                tell process "System Preferences"
                tell window "Network Link Conditioner"
                delay ${this.delay}
                    click button "ON"
                end tell
                end tell
                end tell
            `);
                this.closeSystemPreferences(true);
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     * switches Network Link Conditioner to "off"
     * @returns promise
     */
    async off() {
        return new Promise(async (resolve, reject) => {
            try {
                await runApplescript(`
            delay ${this.delay}
                tell application "System Preferences"
                activate
                delay ${this.delay}
                set current pane to pane "com.apple.Network-Link-Conditioner"
                end tell
                
                tell application "System Events"
                tell process "System Preferences"
                tell window "Network Link Conditioner"
                delay ${this.delay}
                    click button "OFF"
                    delay ${this.delay}
                end tell
                end tell
                end tell
            `);
                this.closeSystemPreferences(true);
                resolve();
            } catch (e) {
                console.error(e);
                reject(e)
            }
        })
    }


    /**
     * Sets a profile in the link conditioner
     * @param {string} profileName exact name of the profile to set
     * @returns promise
     */
    async setProfile(profileName = "") {
        return new Promise(async (resolve, reject) => {
            if (profileName == "") {
                return;
            }
            try {
                const result = await runApplescript(`
            delay ${this.delay}
                tell application "System Preferences"
                activate
                delay ${this.delay}
                set current pane to pane "com.apple.Network-Link-Conditioner"
                end tell
                
                tell application "System Events"
                tell process "System Preferences"
                tell window "Network Link Conditioner"
                delay ${this.delay}
                    tell group 1
                        click pop up button 1
                        click menu item "${profileName}" of menu 1 of pop up button 1
                    end tell
                end tell
                end tell
                end tell
            `);
                await this.closeSystemPreferences(true);
                resolve()
            } catch (e) {
                reject(e);
                console.error(e);
            }
        })
    }

    /**
     * Gets names of available profiles
     * @returns promise that resolves to an array
     */
    async getProfileNames() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await runApplescript(`
        delay ${this.delay}
    tell application "System Preferences"
    activate
    delay ${this.delay}
    set current pane to pane "com.apple.Network-Link-Conditioner"
    end tell
    
    tell application "System Events"
     tell process "System Preferences"
      tell window "Network Link Conditioner"
      delay ${this.delay}
        tell group 1
            click pop up button 1
            click menu of menu 1 of pop up button 1
            get menu item of menu 1 of pop up button 1
        end tell
      end tell
     end tell
    end tell
   
        `);
                await this.closeSystemPreferences(true);
                const menuItemRegex = /menu\ item\ ([^]+?)\ of\ menu\ \d of pop up button \d\ of\ group\ \d of\ window Network Link Conditioner of application process System Preferences/gi;
                const menuItems = result.match(menuItemRegex);
                let profiles = [];
                for (const menuItemString of menuItems) {
                    const profileMatch = menuItemRegex.exec(menuItemString);
                    if (profileMatch != undefined && profileMatch != null && profileMatch[1] !== undefined) {
                        const profileName = profileMatch[1];
                        if (profileName !== "Preset Profiles" && profileName !== "Custom Profiles") {//those are greyed out
                            profiles.push(profileName);
                        }
                    }
                }
                resolve(profiles)
            } catch (e) {
                this.closeSystemPreferences(true);
                reject(e);
            }
        });
    }

    /**
     * Closes the system preferences if they are open
     * @param {boolean} silentErrors sets if errors are handled silently. Default is false.
     * @returns Promise
     */
    async closeSystemPreferences(silentErrors = false) {
        return new Promise(async (resolve, reject) => {
            try {
                const close = await runApplescript(`
    if application "System Preferences" is running then
    tell application "System Preferences" to quit
   end if`);
                resolve();
            } catch (e) {
                if (!silentErrors) {
                    reject(e);
                } else {
                    console.error(e);
                    resolve();
                }
            }
        });
    }

}

module.exports = NetworkLinkConditioner;