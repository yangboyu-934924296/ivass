var docElement = document.documentElement
resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
recalc = function () {
//设置字体大小
	$("html").css("fontSize",10 * (docElement.clientWidth / 192))
	docElement.style.fontSize = 10 * (docElement.clientWidth / 192);
}
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);

//回调
function get_screen(id,callback){
	var obj = {}
	$.ajax({
		type: "get",
		url: urll + "/req/assert_area_import?company_id=" + id,
		async: true,
		success: function(res) {
			if (res.res_code == 0) {
				obj = res.res_obj
				callback(obj)
			} else {
				console.log(res.res_msg)
			}
		},
		error: function() {
			console.log("系统错误请联系管理员")
		}
	})
}
//ajax 添加Code
function addCode(arg) {
	if (typeof arg == "string") {
		return arg + "?userid=" + getCookie("userid")
	} else {
		return arg.Code = getCookie("userid")
	}
}
//数组查重
function distinct(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}

//正则判断
function ret(str){
	var checkNum = /^\d+.\d+.\d+.\d+$/
	return checkNum.test(str)
}
//获取指定Url参数的方法
function GetUrlParam(paraName) {
　　　　var url = document.location.toString();
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
　　}
//数据销毁
function destroyed_data(data){
	for(var k in data){
		data[k] = null
	}
}

//存储&拿取&删除cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function clearCookie(name) {
    setCookie(name, "", -1);
}
//界面跳转
var ws = null;
v = null;
var settlist = null
function gopage(query,target) {
	if(v!=null){
		destroyed_data(v.data)
		v.$destroy()
		v = null
	}
	if(settlist!=null){
		clearInterval(settlist)
		settlist = null
	}
	if(ws!=null){
		ws.close()
		ws = null
	}
	$.ajax({
		type: "get",
		url: query,
		async: true,
		success: function(data) {
			$(".children-li").removeClass("on")
			$(".children-li[tab='"+query+"']").addClass("on")
			$("#iframe").hide()
			$("#iframe").children().remove();
			$("#iframe").html(data);
			$("#iframe").stop().fadeIn()
		},
		error: function(data) {

		}
	});
	//屏蔽超级链接跳转
	return false;
}
//汉字转化为unicode
function toUnicodeFun(data) {
	if(data == '' || typeof data == 'undefined') return '';
	var str = '';
	for(var i = 0; i < data.length; i++) {
		str += "\\u" + data.charCodeAt(i).toString(16);
	}
	return str;
}
//unicode转化为汉字
function toChineseWords(data) {
	if(data == '' || typeof data == 'undefined') return '';
	data = data.split("\\u");
	var str = '';
	for(var i = 0; i < data.length; i++) {
		str += String.fromCharCode(parseInt(data[i], 16).toString(10));
	}
	return str.slice(1);
}
//表头冻结
function fixedtable() {
	var freeze = $(".freeze-table")
	for(var i = 0; i < freeze.length; i++) {
		let ths = $(freeze[i]).find("> .freeze-body .freeze-th")
		for(var j = 0; j < ths.length; j++) {
			$($(freeze[i]).find("> .freeze-head th")[j]).width($(ths[j]).width())
		}

	}
}
//获取当前日期yyyy-mm-ddd
function GetCurrentDateTime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ms = d.getMilliseconds();
    var curDateTime = year;
//  if (month > 9)
//      curDateTime = curDateTime + "年" + month;
//  else
//      curDateTime = curDateTime + "年0" + month;
//  if (date > 9)
//      curDateTime = curDateTime + "月" + date + "日";
//  else
//      curDateTime = curDateTime + "月0" + date + "日";
    if (month > 9)
        curDateTime = curDateTime + "-" + month;
    else
        curDateTime = curDateTime + "-0" + month;
    if (date > 9)
        curDateTime = curDateTime + "-" + date + "";
    else
        curDateTime = curDateTime + "-0" + date + "";
//  if (hours > 9)
////      curDateTime = curDateTime + " " + hours;
//  else
////      curDateTime = curDateTime + " 0" + hours;
//  if (minutes > 9)
////      curDateTime = curDateTime + ":" + minutes;
//  else
////      curDateTime = curDateTime + ":0" + minutes;
//  if (seconds > 9)
////      curDateTime = curDateTime + ":" + seconds;
//  else
////      curDateTime = curDateTime + ":0" + seconds;
    var weekday = "";
    if (week == 0)
        weekday = "星期日";
    else if (week == 1)
        weekday = "星期一";
    else if (week == 2)
        weekday = "星期二";
    else if (week == 3)
        weekday = "星期三";
    else if (week == 4)
        weekday = "星期四";
    else if (week == 5)
        weekday = "星期五";
    else if (week == 6)
        weekday = "星期六";
//  curDateTime = curDateTime + "　" + weekday;
    return curDateTime;
}
//获取当前日期yyyy-mm-ddd hh:mm:ss
function GetCurrentDateTimehh() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ms = d.getMilliseconds();
    var curDateTime = year;
    //  if (month > 9)
    //      curDateTime = curDateTime + "年" + month;
    //  else
    //      curDateTime = curDateTime + "年0" + month;
    //  if (date > 9)
    //      curDateTime = curDateTime + "月" + date + "日";
    //  else
    //      curDateTime = curDateTime + "月0" + date + "日";
    if (month > 9)
        curDateTime = curDateTime + "-" + month;
    else
        curDateTime = curDateTime + "-0" + month;
    if (date > 9)
        curDateTime = curDateTime + "-" + date + "";
    else
        curDateTime = curDateTime + "-0" + date + "";
      if (hours > 9)
         curDateTime = curDateTime + " " + hours;
     else
         curDateTime = curDateTime + " 0" + hours;
      if (minutes > 9)
          curDateTime = curDateTime + ":" + minutes;
      else
          curDateTime = curDateTime + ":0" + minutes;
      if (seconds > 9)
          curDateTime = curDateTime + ":" + seconds;
      else
          curDateTime = curDateTime + ":0" + seconds;
    var weekday = "";
    if (week == 0)
        weekday = "星期日";
    else if (week == 1)
        weekday = "星期一";
    else if (week == 2)
        weekday = "星期二";
    else if (week == 3)
        weekday = "星期三";
    else if (week == 4)
        weekday = "星期四";
    else if (week == 5)
        weekday = "星期五";
    else if (week == 6)
        weekday = "星期六";
    //  curDateTime = curDateTime + "　" + weekday;
    return curDateTime;
}
//获取d的yyyy-mm-dd
function Getyy_mm_dd(d) {
    var d = new Date(d);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ms = d.getMilliseconds();
    var curDateTime = year;
    //  if (month > 9)
    //      curDateTime = curDateTime + "年" + month;
    //  else
    //      curDateTime = curDateTime + "年0" + month;
    //  if (date > 9)
    //      curDateTime = curDateTime + "月" + date + "日";
    //  else
    //      curDateTime = curDateTime + "月0" + date + "日";
    if (month > 9)
        curDateTime = curDateTime + "-" + month;
    else
        curDateTime = curDateTime + "-0" + month;
    if (date > 9)
        curDateTime = curDateTime + "-" + date + "";
    else
        curDateTime = curDateTime + "-0" + date + "";
    //  if (hours > 9)
    ////      curDateTime = curDateTime + " " + hours;
    //  else
    ////      curDateTime = curDateTime + " 0" + hours;
    //  if (minutes > 9)
    ////      curDateTime = curDateTime + ":" + minutes;
    //  else
    ////      curDateTime = curDateTime + ":0" + minutes;
    //  if (seconds > 9)
    ////      curDateTime = curDateTime + ":" + seconds;
    //  else
    ////      curDateTime = curDateTime + ":0" + seconds;
    var weekday = "";
    if (week == 0)
        weekday = "星期日";
    else if (week == 1)
        weekday = "星期一";
    else if (week == 2)
        weekday = "星期二";
    else if (week == 3)
        weekday = "星期三";
    else if (week == 4)
        weekday = "星期四";
    else if (week == 5)
        weekday = "星期五";
    else if (week == 6)
        weekday = "星期六";
    //  curDateTime = curDateTime + "　" + weekday;
    return curDateTime;
}
//日期计算间隔天数
function GetDateDiff(startDate, endDate)
{
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = (endTime - startTime) / (1000 * 60 * 60 * 24);
    return dates;
}
// 日期，在原有日期基础上，增加days天数，默认增加1天
function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "-" + month + "-" + day;
    return val;
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}
//获取周一日期
function getFirstDayOfWeek(date) {
    var day = date.getDay() || 7;
    return Getyy_mm_dd(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day));
};