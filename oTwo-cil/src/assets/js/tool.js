/**
 * 常用工具集 依赖jQuery 1.7+
 *  v1.4 by oTwo 2015年10月14日 10:50:04
 *  	1.增加 DTable 及其 DEMO,本想将其单独放在一个文件中.但为了更简便的维护让其混入了 tool.js中
 *
 *  v1.3 by oTwo 2015年10月13日 17:01:03
 *  	1.重写了tool.countdown,使其更加灵活
 *  	2.重写了tool.Topic 发布-订阅模式. 不要使用dom event以减小浏览器开销
 *  	3.增加格式化成时间字符串
 *
 *  v1.2 by oTwo 2015年9月16日 15:59:01
 *  	修复ajax通信类 get方法的 extend 参数不起作用的问题
 *
 * 	v 1.1 by oTwo 2014-12-13
 * 		修改DB继承参数的BUG
 *
 *	ps:编辑器在折叠代码时看不到多行注释,所以页面中有二种注释.
 *
 */
import $ from 'jquery';
var jQuery = $;
var tool = tool || {};

// 发布-订阅模式
/**
 * 发布-订阅模式
 * 用以在形成一个松耦合的工具集
 *
 *	/ Subscribers
 *	tool.pub("mailArrived").sub(fn1);
 *	tool.pub("mailArrived").sub(fn2);
 *	tool.pub("mailSent").sub(fn1);
 *
 *	// Publisher
 *	tool.pub("mailArrived").pub("hello world!");
 *	tool.pub("mailSent").pub("woo! mail!");
 */
tool.topics = {};
tool.Topic = function(id) {
	var callbacks, method, topic = id && tool.topics[id];
	if (!topic) {
		callbacks = jQuery.Callbacks();
		topic = {
			pub: callbacks.fire,
			sub: callbacks.add,
			unsub: callbacks.remove
		};
		if (id) {
			tool.topics[id] = topic;
		}
	}
	return topic;
};

// ---- CALSS -----------------------------------------------------------------

// 弹出框
/**
 * 弹出框
 */
tool.Boxy = function(option) {
	var def = {
		title: "",
		body: "",
		close: "Ⅹ",

		// alert confirm
		style: "confirm",
		callback: function() {}
	};
	this.option = $.extend(true, def, option);

	this.body = '<div class="boxy"> <div class="boxyAlert"> <h1 class="boxyAlertTitle">标题</h1> <div class="boxyAlertBody"></div> <div class="boxyAlertBtn"> <span class="alertFalse">取消</span> <span class="alertTrue">确认</span> </div> </div> <div class="modal"></div> </div>';
	this.body = this.createBody(this.option.title, this.option.body);
	this.body.appendTo('body');
	if (this.option.style == 'alert') {
		this.body.find('.alertFalse').remove();
	}

	this.setEvent();
	return this;
};
tool.Boxy.prototype = {
	setEvent: function() {
		var self = this;
		this.body.on('click', '.boxy_close', function(event) {
			self.hide();
			return false;
		});
		this.body.on('click', '.alertFalse', function(e) {
			self.hide();
			return false;
		});
		this.body.on('click', '.alertTrue', function(e) {
			self.option.callback();
			self.hide();
			return false;
		});
	},
	move: function() {
		var w = $(window).width(),
			sw = this.body.width(),
			h = $(window).height(),
			sh = this.body.height();

		var top = (h - sh) / 2 < 0 ? 100 : (h - sh) / 2;

		if (top < 0) {
			top = 0;
		}
		this.body.css({
			top: top,
			left: (w - sw) / 2
		});
	},
	show: function() {
		this.body.show();
		var top, h;
		h = this.body.find('.boxyAlert').height();
		top = ($(window).height() - h) / 2 - 100;
		this.body.find('.boxyAlert').css({
			top: top
		});
	},
	hide: function() {
		this.body.fadeOut(300);
	},
	createBody: function() {
		var body = this.body;
		body = body.replace('标题', this.option.title || '');
		body = body.replace('关闭', this.option.close || '&nbsp;');
		body = $(body);
		$(body).find('.boxyAlertBody').append(this.option.body);
		return body;
	},
	setBody: function(ele) {
		this.body.find('.boxyAlertBody').html(ele);
		return this;
	}
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
tool.Countdown = function(n, interval) {
	var countdown = {
		idx: 0,
		max: n,
		i: n,
		callbacks: jQuery.Callbacks(),
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
				self.callbacks.fire.apply(countdown, [self.i]);
			}, interval);
			return self;
		},
		done: function(callback) {
			this.callbacks.add(callback);
			return this;
		}
	};
	countdown.timeout();
	return countdown;
};

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
tool.DB = function(option) {
	this.xhr = {};
	this.queue = [];

	// 默认参数
	this.DEFAULT = {
		url: "",
		type: "GET",
		data: "",
		dataType: "json",

		// 超时(毫秒) 当超时后,将执行.fail(), .done() 不会执行.
		timeout: "",

		// async:false 同步请求
		async: true,

		// cache:false 不缓存此页面 , ture 缓存此页面
		cache: false,

		// 强制HTTP头 解决中文乱码
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',

		success: function(d) {},

		// 错误处理,{600以上:登陆超时,parsererror:JSON解析错误}
		error: function(jqXHR, textStatus, errorThrown) {
			tool.Topic('error').pub('ajax error', jqXHR.status, textStatus, jqXHR);
		}
	};

	// 初始参数,用以回到初始化时的状态
	this.def = $.extend(false, this.DEFAULT, option);

	// 用以记录请求参数变化,保持请求扩展
	this.option = $.extend(false, {}, this.def);
};
tool.DB.prototype = {
	/**
	 * 接口,需要重构.当多个程序都需要在数据加载完成后执行相应对动作时应重构该方法
	 * 原来是通过事件进行绑定的,但后期发现其非常不便于维护
	 * @param  {Object} sendData [发送的数据]
	 * @return {jqXHR}          []
	 */
	load: function(sendData) {
		var ss = this.get(sendData).done(function(d) {
			// dt.load(d);
			// page.load(d);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			console.log('fail');
		});
		return ss;
	},
	//请求数据
	/**
	 * 用以获取 GET 请求.可通过 option [修改相关设置]
	 * @param  {Object/string}  option   [ajax设置参数,当option为字符串时会将其当做option.url进行扩展]
	 * @param  {Boolean} extend [默认true,继承上次请求的参数.]
	 * @param  {Boolean} abort  [默认true,在发起AJAX请求时,如上一请求未完成则自动放弃]
	 * @return {jqXHR}           [ $.ajax() 的返回对象,浏览器的XMLHttpRequest对象的一个超集.]
	 *
	 * ----jqXHR常用方法
	 * ----jqXHR.done(function(data, textStatus, jqXHR) {}); 请求成功
	 * ----jqXHR.fail(function(jqXHR, textStatus, errorThrown) {}); 请求失败
	 * ----jqXHR.always(function(data|jqXHR, textStatus, jqXHR|errorThrown) { });请求完成
	 * ----请参考 http://api.jquery.com/jQuery.ajax/#jqXHR
	 *
	 * 代码示例:
	 * 重复上次讲求 db.get()
	 *
	 * 翻到第2页 db.get({data:{page:2}})
	 *
	 * 回到初始化 db.get(db.def)
	 */
	get: function(option, extend, abort) {
		// 放弃上一个未完成的请求,用以防止连续无意的请求.
		if (this.xhr && this.xhr.done && abort !== false) {
			this.xhr.abort();
		}

		// 在上次请求的基础上扩展请求,以方便的实现翻页,排序等功能.
		if (extend === false) {
			option = $.extend(false, this.DEFAULT, option);
			// console.log(option)
		} else {
			option = $.extend(true, this.option, option);
			// console.log(option)
		}
		this.xhr = $.ajax(option);
		// this.xhr.fail(function (d) {
		// 	console.log("-------------");
		// 	console.log("xhr.fail");
		// 	console.log(option);
		// 	console.log(d);
		// 	console.log("-------------");
		// });
		return this.xhr;
	},

	// 增加post请求
	post: function(option, extend, abort) {
		// 放弃上一个未完成的请求,用以防止连续无意的请求.
		if (this.xhr && this.xhr.done && abort !== false) {
			this.xhr.abort();
		}

		// 在上次请求的基础上扩展请求,以方便的实现翻页,排序等功能.
		if (extend === false) {
			// console.log(111111111111)
			option = $.extend(false, this.DEFAULT, option,{type: "POST"});
		} else {
			// console.log(222222222222)
			option = $.extend(true, this.option, option,{type: "POST"});
		}
		this.xhr = $.ajax(option);
		// this.xhr.fail(function (d) {
		// 	console.log("-------------");
		// 	console.log("xhr.fail");
		// 	console.log(option);
		// 	console.log(d);
		// 	console.log("-------------");
		// });
		return this.xhr;
	},
	// ajax 队列请求
	/**
	 * ajax 队列请求
	 * @param  {array} queueList [队列数组]
	 * queueList = {
	 *		option:{....}  jquery ajax 有请求参数
	 *		callback:function(d){} 回调函数
	 * }
	 *
	 * 在callback中返回 false 可以终止队列
	 */
	queue: function(queueList) {
		if (!queueList) {
			return;
		}
		if (queueList.length === 0) {
			return;
		}

		var ss = queueList.shift(),
			self = this,
			option = $.extend(true, this.defaultAjaxOption, ss.option);
		$.ajax(option).done(function(d) {
			if (ss.callback(d) === false) {
				return;
			}
			self.queue(queueList);
		});
	}
};

//解析URL
tool.parseURL = function(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function() {
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^\/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/')
	};
};
// ---- function --------------------------------------------------------------

// 字符串格式化命令
/**
 * 字串格式化 依次替换 %s 占位附
 * var option  = sprintf('<option value="%s"> %s </option>', '23010', '哈尔滨')
 * option == '<option value="23010"> 哈尔滨 </option>'
 */
tool.sprintf = function(str) {
	var i = 1,
		arg = arguments;
	return str.replace(/%s/g, function() {
		return (i < arg.length) ? arg[i++] : "";
	});
};

// 字符串填充
/**
 * 字符串填充
 * @param  {string} str    [原字符串]
 * @param  {int} n      [字符串总位数,正数在右边填,负数在左边填]
 * @param  {string} strPad [填充的字符,默认 "0"]
 * @return {string}
 */
tool.pad = function(str, n, strPad) {
	strPad = strPad || "0";
	n = n - 0;

	var len = Math.abs(n) - str.toString().length,
		ss = '';

	if (len <= 0) {
		return str;
	}

	ss = new Array(len + 1).join(strPad);
	if (n < 0) {
		str = ss + str;
	} else {
		str = str + ss;
	}

	return str;
};

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

// 格式化 html模板
/**
 * 格式化 html模板
 * @param  {string} tmpl [{字段名};字段名与数据中的一至注意大小写]
 * @param  {json} data [只有一层,多层数据不处理]
 * @return {[string]}      [html字符串]
 */
tool.toHtml = function(tmpl, data, nbsp) {
	nbsp = nbsp || '';
	var f1 = '',
		reg = {},
		ss = tmpl;
	for (f1 in data) {
		reg = new RegExp("\\{\\$" + f1 + "\\}", "g");
		ss = ss.replace(reg, data[f1] || nbsp);
	}
	return ss;
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

// 取得锚点的数据
/**
 * 取得锚点的数据
 * @return {string} [description]
 */
tool.hash = function() {
	var hash = '';
	hash = window.location.hash;
	hash = hash.substr(1);
	return hash;
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
		map[f2] = tool.pad(map[f2], -2);
	}

	for (var f1 in map) {
		format = format.replace(f1, map[f1]);
	}
	return format;
};

// 格式化成时间字符串
/**
 * 格式当前时间
 * @param  {str} format ['Y年M月D日 hh:mm:ss']
 * @return {str}
 */
tool.getNowDate = function(format) {
	var d = new Date(),
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
		map[f2] = tool.pad(map[f2], -2);
	}

	for (var f1 in map) {
		format = format.replace(f1, map[f1]);
	}
	return format;
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
 * 播放视频方法
 * @author gaolei6
 * @time 2016-09-19
 * @param el 视频播放页dom对象
 * @param videoUrl 视频地址
 * @param shutAble 视频地址
 *
 * 代码模板
 * <div id="vbox" class="vbox" style="display: none;position: fixed;z-index: 30;top: 0;left: 0;right: 0;bottom: 0;background: #000000"><div class="vbox_close" style="position:absolute;width:50px;height: 50px;right:-17px;top:10px"><img style="width: 40%" src="/static/minisite_dev/weiboalk/mob/images/closewindow.png" /></div><video  id="vbox_video" class="vbox_video" width="100%" height="100%" controls="controls" src="" preload="none"></video></div>
 */
tool.openVideoMgr = function(el, videoUrl, shutAble, onClose) {

	//判断是否存在video标签
	if ($(el).find('.vbox video').length == 0) {
		$(el).append('<div id="vbox" class="vbox" style="display: none;position: absolute;z-index: 30;top: 0;left: 0;right: 0;bottom: 0;background: #000000;padding-bottom: 50px;"><div class="vbox_close" style="position: absolute; z-index: 99; right: 0px; text-align: center; width: 60px; height: 60px; top: 0px; line-height: 60px;"><img style="width: 40%; border-radius: 50%;" src="http://file.hd.weibo.com/alk/news/play_close1478512683480.png"></div><video  id="vbox_video" class="vbox_video" width="100%" height="100%" controls="controls" src="" preload="none" style="position: relative; z-index: 80;"></video></div>');
	}
	var vd = document.getElementById('vbox_video');
	vd.src = videoUrl;
	if (tool.isWx()) {
		$('.vbox_close').css({
			"position": 'static',
			"float": 'right'
		});
		$('#vbox_video').height($(window).height() - 60 - 50);
	}

	$(".vbox_close").click(function() {
		tool.openVideoMgr(el, videoUrl, false);

		if (onClose && (typeof onClose === 'function')) {
			onClose();
		}
	});
	if (shutAble) {
		if ($('.vbox').css("display") != 'none') {
			vd.load();
			vd.play();
		} else {
			$('.vbox').show();
			vd.load();
			vd.play();
		}
	} else {
		vd.pause();
		$('.vbox').hide();
	}
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

/**
 * 预览图片
 * @author gaolei6
 * @time 2016-09-2
 * @param url 被比较的对象
 * @param obj 参考比较的对象
 * @return Bollean
 */
tool.openImage = function(urlListOld, first) {
	// by oTwo 2017年1月6日 15:26:48
	// 在IOS上,如果URL中存在[中文,特殊字符]的话 微博客户端将无非查看图片.
	// 解决 : 对 URL 进行 encodeURI编码
	for (var i = 0, len = urlListOld.length; i < len; i++) {
		urlListOld[i] = encodeURI(urlListOld[i]);
	}
	var self = this;

	if (tool.isEmpty(urlListOld)) {
		return false;
	}

	var urlList = [];
	for (var i = 0; i <= urlListOld.length - 1; i++) {
		if (urlListOld[i]) {
			urlList[i] = urlListOld[i];
		}
	}

	// 微信
	var url = first || urlList[0];
	if (tool.isWx()) {
		var url_str = '';
		for (var i = 0; i <= urlList.length - 1; i++) {
			url_str += urlList[i] + ',';
		}
		var urls = url_str.substring(0, url_str.length - 1);
		this.wxopenimage(url, urls);
		return;
	}

	// 微博
	if (tool.isWb()) {
		var bridge = window.WeiboJSBridge;
		var urls_arr = urlList;
		bridge.invoke('openImage', {
			url: url,
			urls: urls_arr
		}, {
			success: function(params) {},
			fail: function(params, code) {},
		});
		return;
	}

	// pc
	tool.pcOpenImage(urlListOld, first);
	return;
};

tool.wxopenimage = function(url, urls) {
	var urls_arr = urls.split(',');
	wx.previewImage({
		current: url, // 当前显示图片的http链接
		urls: urls_arr // 需要预览的图片http链接列表
	});
};
tool.pcOpenImage = function(url, first) {
	$('#pcOpenImage').remove();
	var createBody = function(url) {
		var slide = '<div class="swiper-slide" style="background-image:url(%s)"></div>';
		var html = '<div id="pcOpenImage" style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 999; background: rgb(239, 239, 239) none repeat scroll 0% 0%;"> <style> .gallery-top .swiper-slide{-webkit-background-size:contain; background-size:contain; background-repeat: no-repeat; background-position: center center; background-color: rgb(85, 85, 85); } </style> <a href="#" id="pcOpenImageClose" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; color: rgb(255, 255, 255); width: 45px; height: 45px; line-height: 45px; text-align: center; border-radius: 50%; position: absolute; z-index: 20; top: 10px; left: 10px;">关闭</a><div class="swiper-container gallery-top" style="width: 100%; height: 100%;"><div class="swiper-container gallery-top" style="width: 100%; height: 100%;"> <div class="swiper-wrapper">%s </div> <div class="swiper-button-next"></div> <div class="swiper-button-prev"></div> </div> </div> </div>',
			ss = '',
			r = [];
		if (first) {
			r = [first];
			for (var i = 0, len = url.length; i < len; i++) {
				if (url[i] == first) {
					continue;
				}
				r.push(url[i]);
			}
			url = r;
		}

		for (var i = 0, len = url.length; i < len; i++) {
			ss += slide.replace('%s', url[i]);
		}
		html = html.replace(/%s/g, ss);
		return html;
	};
	var body = createBody(url);
	$('body').append(body);
	$('#pcOpenImageClose').click(function(d) {
		$('#pcOpenImage').remove();
		return false;
	});
	var galleryTop = new Swiper('.gallery-top', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		spaceBetween: 10
	});
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
 * 将 Byte 转为 K/m等 单位
 */
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

/*
** 解析当前路由路径的url
** 解析格式http://xxxx/xxx.html#/myInfo?id=1
** 返回格式 {id:'1'}
*/
tool.resolve_url = function(){
	let i = '',search = '';
	i = window.location.hash.indexOf('?');
	if(i != -1)
		search = window.location.hash.substr(i+1);
	var obj = {};
	search.replace(/(\w+)(?:=([^&]*))?/g, function (str, key, value) {
		obj[key] = value;
	});
	return obj;
};
// 整数 千分位逗号
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

// 去掉字符串的前后空格
tool.trim = function(str){
  	return str.replace(/(^\s*)|(\s*$)/g, "");
};

// 将对象 obj 恢复成 objDef
tool.recoverDef = function(objDef={}, obj={}){
	for (let k in objDef) {
		obj[k] = objDef[k];
	};
  	return obj;
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

// 数据获取封装: 支持loading+auth判定
tool.esget = function (vm, db, sd, err) {
	let self = vm;
	if (err !== false) {
		self.$vux.loading.show({
			text: 'Loading'
		});
	};
	let ss = db.get(sd);
	ss.done(function(d) {
		if (d.errno > 0) {
			vm.$message({
				type:'error',
				message:d.error,
				showClose:true
			});
			if (d.errno === '6004') {
				self.$router.push({path: '/login'});
			};
			return;
		};
	}).always(function() {
		if (err !== false) {
			self.$vux.loading.hide({
				text: 'Loading'
			});
		}
	}).fail((d, textStatus) => {
		if (d.readyState === 0) {
			return ss;
		}
		// 错误提示弹窗
        vm.$message({
			type:'error',
			message:'操作失败(' + d.status + ':' + textStatus + ')',
			showClose:true
		});
	});
	return ss;
};
tool.espost = function (vm, db, sd, err) {
	if(!sd)
		sd = {};
	sd['type'] = 'POST';
	return tool.esget(vm, db, sd, err)
};

// 将1000 转化成10.0
tool.changeToInteger = function (val){
    val = parseInt(val / 100 * Math.pow(10, 1)) / Math.pow(10, 1) + '';
	let ss = val.indexOf('.') === -1 ? val + '.0' : val;
	var intPart = Number(ss).toFixed(0);
	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	return intPartFormat + '.0';
};
export default tool;