/**
 * 错误处理
 *
 */

import error from 'esbase/assets/js/eserror.js';
/*var error ={
	"6032":"锁屏码绑定时，回复的绑定码（生日）在上机列表中不存在，请先到吧台开卡",
	"6033":"锁屏码绑定时，回复的绑定码（生日）在上机列表存在多个，请回复完整证件号完成绑定",
	"6034":"此证件号已被绑定，不能重复绑定！",
	"6035":"网吧信息未同步，缺少网吧信息",
}*/

// 要处理有错误
// 不是每个错误都可以统一处理.有些错误应该应用页面中处理
// 保证每个错误编号对应一个函数.
var map = {
	"6032" :function () {
		// 转到:"引导吧台激活页面"
		window.location = '#/barBind';
	},
	"6034" :function () {
		window.location = '#/status?statusModel=simple&routeUrl=close&errno=6034&errorTitle=此证件号已被绑定，不能重复绑定！';
	},
	"6035" :function () {
		window.location = '#/status?statusModel=simple&routeUrl=close&errno=6035&errorTitle=网吧信息未同步，缺少网吧信息&errorNote=请与吧台联系';
	}
}
var esError = function (errno,error) {
	var ss = map[errno] || false;
	if (ss) {
		ss();
	}
	return ss;
}
export default esError;
export var errorDisc = error;
