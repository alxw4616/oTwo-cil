/**
 * 常用工具集
 * by oTwo 2019年3月31日 21:33:57
 * v 1.5 去 jquery.支持vue
 * 		一些老的函数,现在被ES6语法取代. 这些函数将注释成ES6语法.
 * 		jquery 3.3.1 现在有127K. 在项目中使用有些大.故tool.js 不在依赖jquery.
 * 		深拷贝 extend 被从jquery中复制出来.
 *
 */
var tool = {};

// ---- CALSS -----------------------------------------------------------------
// ajax通信类
/**
 * ajax通信类
 * 依赖 jQuery 1.6+
 * 扩展jQuery的ajax 对象,用以实现 :
 * 1.继承上次请求的参数,
 * 2.如果上次请求未完成,自动放弃.
 * 3.ajax 队列请求
 *
 * v1.1 by oTwo 2014年9月19日 16:06:44
 *  重构方法加强效率
 *  维护注释
 *  维护测试
 *
 * by oTwo alxw4616@msn.com
 * v 1.0 2013年7月31日
 */

// ---- function --------------------------------------------------------------
tool.isPlainObject = function( obj ) {
	var proto, Ctor;

	// Detect obvious negatives
	// Use toString instead of jQuery.type to catch host objects
	if ( !obj || toString.call( obj ) !== "[object Object]" ) {
		return false;
	}

	proto = getProto( obj );

	// Objects with no prototype (e.g., `Object.create( null )`) are plain
	if ( !proto ) {
		return true;
	}

	// Objects with prototype are plain iff they were constructed by a global Object function
	Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
	return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
}

// 深拷贝
tool.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( tool.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && tool.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = tool.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

// 倒计时器
/**
 * 倒计时器,该函数将返回一个countdown对象.
 * countdown对象拥有stop(),restart(),start(),done(callback),timeout()方法
 * 注意
 * 1.最后一次为0
 * 2.首次执行必定在延时之后
 * 3.二个参数必须为 number,不然会一直执行
 *
 * 参数
 * @param  {number} n        [倒数读秒]
 * @param  {number} interval [间隔]
 *
 * 示例
 * 无无限循环
	var ss = tool.Countdown(-1,1000).done(function (i) {
		console.log(i);
	});

 * 不立即执行
 	var ss = tool.Countdown(10,1000).stop().done(function (i) {
		console.log(i);
	});

 * 特定条件停止
 	var ss = tool.Countdown(10,1000).done(function (i) {
		console.log(i);
		if (i < 5) {
			this.stop();
		};
	});
 */
tool.countdown = function(n, interval) {
	var countdown = {
		idx: 0,
		max: n,
		i: n,
		callback: function () {
		},
		stop: function() {
			clearTimeout(this.idx);
			return this;
		},
		restart: function() {
			this.i = this.max;
			this.timeout();
			return this;
		},
		start: function() {
			this.timeout();
			return this;
		},
		timeout: function() {
			var self = this;
			self.idx = setTimeout(function() {
				// 当 tool.countdown(-1,1000) 时可以一直执行
				if (self.i === 0) {
					return self;
				}

				self.i--;
				self.timeout();
				self.callback.apply(countdown, [self.i]);
			}, interval);
			return self;
		},
		done: function(callback) {
			this.callback = (callback);
			return this;
		}
	};
	countdown.timeout();
	return countdown;
};

// 字符串填充
// padStart （）用于头部补全，padEnd （）用于尾部补全。
// 'ss'.padStart(3,'0')
// "0ss"
// 'ss'.padEnd(3,'0')
// "ss0"

// 去掉字符串的前后空格
// strim()

// 字符串填充 ``

// 快速排序 min-max
/**
 * 快速排序 min-max
 * by oTwo 2014年6月17日 13:33:29
 * @param  {array} d [description]
 * @return {array}
 *
 * ps:不改变原集合
 */
tool.quickSort = function(d) {
	if (d.length <= 1) {
		return d;
	}

	var k = d[0],
		big = [],
		small = [],
		i, len;
	for (i = 1, len = d.length; i < len; i++) {
		if (d[i] < k) {
			small.push(d[i]);
		} else {
			big.push(d[i]);
		}
	}
	small = tool.quickSort(small);
	big = tool.quickSort(big);

	return [].concat(small, k, big);
};

// 按KEY从小到大排序对象数组(JSON),不支持多层
/**
 * 按KEY从小到大排序对象数组(JSON),不支持多层
 * @param  {[{},{},{}]} d [对象数组(JSON)]
 * @param  {string} key  [对象中的键]
 * @return {JSON}      [description]
 */
tool.jsonSort = function(d, key) {
	if (d.length <= 1) {
		return d;
	}
	var k = d[0],
		big = [],
		small = [],
		i, len;
	for (i = 1, len = d.length; i < len; i++) {
		if (d[i][key] < k[key]) {
			small.push(d[i]);
		} else {
			big.push(d[i]);
		}
	}
	small = tool.jsonSort(small, key);
	big = tool.jsonSort(big, key);
	return [].concat(small, k, big);
};

// 生成指定范围内的随机整数
/**
 * 生成指定范围内的随机整数
 * by oTwo 2014年6月17日 13:33:35
 * @param  {number} begin [开始范围,默认 100, 可选]
 * @param  {number} end   [结束范围,默认 0, 可选]
 * @return {int}      [随机数]
 *
 * ps:把begin作为大数的原因是可以只写一个参数.roll(1000) === roll(1000,0)
 */
tool.roll = function(begin, end) {
	begin = isNaN(begin - 0) ? 100 : begin;
	end = isNaN(end - 0) ? 0 : end;
	if (begin < end) {
		var ss = begin;
		begin = end;
		end = ss;
	}

	var r = Math.random();
	r = r * (begin - end + 1) + end;
	r = parseInt(r, 10);

	return r;
};

// 取得地址档中GET的参数
/**
 * 取得地址档中GET的参数
 * @return {JSON} [description]
 */
tool.request = function() {
	var request = {},
		hash = '',
		ss;
	hash = window.location.search;
	hash = hash.substr(1);

	//在这里返回 undefined 要比返回空对象好一点,取值我们更容易发现出了什么问题
	if (!hash) {
		return;
	}

	hash = decodeURIComponent(hash);
	hash = hash.split(/&/g);
	for (var f1 in hash) {
		ss = hash[f1].split(/=/g);
		request[ss[0]] = ss[1];
	}
	return request;
};

// 格式化成时间字符串
/**
 * 格式化成时间字符串 简版,依赖 tool.pad
 * @param  {date/str/number} date   [时间对像,或能转为时间对像字符串/数字]
 * @param  {str} format ['Y年M月D日 hh:mm:ss']
 * @return {str}
 */
tool.formatDate = function(date, format) {
	var d = new Date(date),
		map = {
			Y: d.getFullYear(),
			M: d.getMonth() + 1,
			D: d.getDate(),
			hh: d.getHours(),
			mm: d.getMinutes(),
			ss: d.getSeconds(),
		};

	//从左边补齐二位
	for (var f2 in map) {
		map[f2] = map[f2].toString().padStart(2,'0');
	}

	for (var f1 in map) {
		format = format.replace(f1, map[f1]);
	}
	return format;
};

// 通过id搜索数据
tool.findData = function(d, id, key) {
	key = key || 'id';
	for (var i = 0, len = d.length; i < len; i++) {
		if (d[i][key] == id) {
			return d[i];
		}
	}
	return null;
};


tool.isIOS = function() {
	var u = navigator.userAgent;
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	return isIOS;
};

/**
 * 判断案例库的平台是否为微信
 * @author gaolei6
 * @time 2016-09-18
 * @return String
 */
tool.isWx = function() {
	var ua = navigator.userAgent;
	var pattern_equipent = /MicroMessenger/;
	if (pattern_equipent.test(ua)) {
		//微信客户端
		return true;
	}

	return false;
};

/**
 * 判断案例库的平台是否为微博
 * @author gaolei6
 * @time 2016-09-18
 * @return String
 */
tool.isWb = function() {
	var ua = navigator.userAgent;
	var pattern_weibo = /weibo/;
	if (pattern_weibo.test(ua)) {
		//微博客户端
		return true;
	}
	return false;
};


/**
 * 比较两个obj是否相同
 * @author gaolei6
 * @time 2016-09-18
 * @param obj 被比较的对象
 * @param obj 参考比较的对象
 * @return Bollean
 */
tool.cmpObj = function(x, y) {
	// If both x and y are null or undefined and exactly the same
	if (x === y) {
		return true;
	}

	// If they are not strictly equal, they both need to be Objects
	if (!(x instanceof Object) || !(y instanceof Object)) {
		return false;
	}

	//They must have the exact same prototype chain,the closest we can do is
	//test the constructor.
	if (x.constructor !== y.constructor) {
		return false;
	}

	for (var p in x) {
		//Inherited properties were tested using x.constructor === y.constructor
		if (x.hasOwnProperty(p)) {
			// Allows comparing x[ p ] and y[ p ] when set to undefined
			if (!y.hasOwnProperty(p)) {
				return false;
			}

			// If they have the same strict value or identity then they are equal
			if (typeof(x[p]) == "object" && typeof(y[p]) == "object") {
				if (cmpObj(x[p], y[p])) {
					continue;
				} else {
					return false;
				}
			}

			if (x[p] != y[p]) {
				return false;
			}
		}
	}

	for (p in y) {
		// allows x[ p ] to be set to undefined
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
			return false;
		}
	}
	return true;
};

//进入全屏
tool.requestFullScreen = function() {
	var de = document.documentElement;
	if (de.requestFullscreen) {
		de.requestFullscreen();
	} else if (de.mozRequestFullScreen) {
		de.mozRequestFullScreen();
	} else if (de.webkitRequestFullScreen) {
		de.webkitRequestFullScreen();
	}
}
//退出全屏
tool.exitFullscreen = function() {
	var de = document;
	if (de.exitFullscreen) {
		de.exitFullscreen();
	} else if (de.mozCancelFullScreen) {
		de.mozCancelFullScreen();
	} else if (de.webkitCancelFullScreen) {
		de.webkitCancelFullScreen();
	}
};

/**
 * 1 所有可以转为 false 的值 都是"空".
 * 2 深度检测对象,如果对象的所有值都是"空"则该对象是"空"
 *
 * by oTwo 2016年10月25日 11:54:57
 * @return {Boolean}   [description]
 */
tool.isEmpty = function(d) {
	if (typeof d != 'object') {
		return !d;
	}
	var ss = true,
		f1;
	for (f1 in d) {
		if (typeof d[f1] == 'object') {
			ss = tool.isEmpty(d[f1]);
		} else {
			ss = !d[f1];
		}

		if (ss === false) {
			return false;
		}
	}
	return true;
};

tool.isURL = function(str_url) {
	var strRegex = '^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
		+
		'(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
		+
		'|' // 允许IP和DOMAIN（域名）
		+
		'([0-9a-z_!~*\'()-]+.)*' // 域名- www.
		+
		'([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
		+
		'[a-z]{2,6})' // first level domain- .com or .museum
		+
		'(:[0-9]{1,4})?' // 端口- :80
		+
		'((/?)|' // a slash isn't required if there is no file name
		+
		'(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
	var re = new RegExp(strRegex);
	//re.test()
	if (re.test(str_url)) {
		return (true);
	} else {
		return (false);
	}
};


/**
 * 检测字符串是否在数组中
 */
tool.in_array = function(search, array) {
	for (var i in array) {
		if (array[i] == search) {
			return true;
		}
	}
	return false;
};
tool.isPC = function() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
};

// 是否为验证码
tool.isCode = function(code) {
	var reg = /^[\d]{6}$/;
	return reg.test(code);
};

// 是否为手机
tool.isPhone = function(phone) {
	var reg = /^1[34578]\d{9}$/;
	return reg.test(phone);
};

// 是否为邮箱
tool.isEmail = function(email) {
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(email);
};

// 验证身份证信息
tool.cert = function(val){
	let reg = new RegExp(/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);
	let card, cardX, last, sum;
	card = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
	cardX = ['1','0','X','9','8','7','6','5','4','3','2'];
	last = 0;
	sum = 0;
	if (!reg.test(val)) {
		return false;
	}
	// 校验位识别
	for(let i = 0, l = val.length; i < l; i++){
		if (i < val.length - 1) {
			sum += val[i] * card[i];
		}
		if (i === val.length - 1) {
			last = val[i];
		}
	}
	return cardX[sum % 11] === last;
};

// 将 Byte 转为 K/m等 单位
tool.toKB = function(int) {
	int = int / 1024;
	if (int < 1024) {
		return Math.ceil(int) + ' K';
	}

	int = int / 1024;
	if (int < 1024) {
		return Math.ceil(int) + ' M';
	}
};

// 整数 千分位逗号
// todo 数字 千分位逗号
tool.toThousands = function(val){
	val = (val || 0).toString();
    let l = val.length,
        one =0, two = 0;
    if (l>3) {
        one = val.substr(0,l-3);
        two = val.substr(l-3);
        return one+','+two;
    }else{
        return val;
    }
};
export default tool;