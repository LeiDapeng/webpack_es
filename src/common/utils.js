var userAgent = window.navigator.userAgent.toLowerCase(); 
 const utils={
    isWx:()=>{
        return /MicroMessenger/i.test(userAgent);
    }
}
module.exports=utils;