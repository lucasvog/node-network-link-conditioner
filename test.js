var NetworkLinkConditioner = require("./index");

var nlc = new NetworkLinkConditioner();
async function test(){
    try{
    await nlc.on();
    wait(2);
    await nlc.off();
    wait(2);
    await nlc.getProfileNames();
    wait(2);
    await nlc.setProfile("3G");
    wait(2);
    await nlc.on();
    wait(2);
    await nlc.off();
    }catch(e){
        console.log(e);
    }
}
test();

async function wait(seconds){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },seconds)
    })
}