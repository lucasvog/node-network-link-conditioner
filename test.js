var nlc = require("./index.js");

async function test() {
    try {
        nlc.setDelay(1);
        await nlc.on();
        await nlc.off();
        const profiles = await nlc.getProfileNames();
        console.log(profiles);
        await nlc.setProfile(profiles[1]);
        await nlc.on();
        await nlc.off();
    } catch (e) {
        console.log(e);
    }
}
test();