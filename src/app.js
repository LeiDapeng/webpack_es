
const utils = require('./common/utils');

if(utils.isWx()){
    alert('当前微信环境');
}else{
    alert('当前pc环境')
}