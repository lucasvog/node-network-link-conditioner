 <div align="center">
 <a href="https://dvbfast.github.io" target="_blank" title="Link to the dvbfast-Website"><img width=150px src="./assets/logo.jpg" alt="Logo of dvbfast"></a>


# Node Network Link Conditioner Wrapper
*A node wrapper for the MacOS Network Link Conditioner. 
Ideal for automating your test setup on a Mac.*
 </div>

## Notes
The Network Link Conditioner is a tool for developers that can change your Network speed on a system level, and has profiles like "EDGE", "3G" or "LTE" preinstalled.
#### Caveats
This is using applescript to get or set parameters of the conditioner. As a result, you will see the UI pop up on your screen - so no perfect solution. Reason is, that there is no internal API to change the settings. 
You also have to allow the accessibility-setting in 🍎>system preferences>security>Accessibility for the program executing this code. But normally you will be asked to do that the first time you execute some code like the example below.
#### Before using
 To use this, you will need to do the following things:
 1. Have a device/VM that runs MacOS
 2. Have the *Network Link Conditioner* installed. Instructions can be found [here](https://nshipster.com/network-link-conditioner/).

 ## Installation

 ```shell
$ npm install -g network-link-conditioner
 ```

## Example
This showcases all available functions. 

 ```node
var nlc = require("network-link-conditioner");

async function example(){
nlc.setDelay(1);

const profiles = await nlc.getProfileNames();
await nlc.setProfile(profiles[1]);
await nlc.setProfile("3G");

await nlc.on();
await nlc.off();
}
example();
 ```

## Docs

**`on()`**
Enables the Network Link Conditioner.

**`off()`**
Disables the Network Link Conditioner.

**`getProfileNames()`**
Gets all available Profiles as an array of strings.

**`setProfile(NameAsString)`**
Sets a profile. The Name has to be a string.

**`setDelay(timeInSeconds)`**
This sets the delay between actions in applescript. If the code fails on your machine, you might have to increase this number.



