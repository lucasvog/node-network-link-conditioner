# Network Link Conditioner
A node wrapper for the macOS Network Link Conditioner. Ideal for automating your test setup on a Mac.

##Notes
This is using applescript to get or set parameters of the conditioner. As a result, you will see the UI pop up on your screen - so no perfect solution. Reason is, that there is no internal API to change the settings. 
You also have to allow the accessibility-setting in 🍎>system preferences>security>Accessibility for the program executing this code. But normally you will be asked to do that the first time you execute some code like the example below.
###Before using
 To use this, you will need to do the following things:
 1. Have a device/VM that runs macOS
 2. Have the *Network Link Conditioner* installed. Instructions can be found [here](https://nshipster.com/network-link-conditioner/).

 ## Installation

 ```shell
$ npm install -g network-link-conditioner
 ```

## Example
This showcases all available functions. 

 ```node
var nlc = require("./index.js");

async function example(){
nlc.setDelay(1);

const profiles = await nlc.getProfileNames();
await nlc.setProfile(profiles[1]);

await nlc.on();
await nlc.off();
}
example();
 ```

##Docs

**`on()`**
Enables the Network Link Conditioner.

**`off()`**
Disables the Network Link Conditioner.

**`getProfileNames()`**
Gets all available Profiles as an array of strings.

**`setProfile(NameAsString)`**
Sets a profile. Name has to be a string.

`setDelay(timeInSeconds)`
This sets the delay between actions in applescript. If the code fails, you might have to increase this number.



