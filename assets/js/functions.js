$(function () {

	// 页面效果
	// experience();  //首页个人经历时间轴

	// 插件效果
	circleProgress();  //环形进度条

})





//*********************************************************************//
//                              页面效果                               //
//*********************************************************************//


// 首页个人经历时间轴
function experience () {
}





//*********************************************************************//
//                              插件效果                               //
//*********************************************************************//


// 环形进度条
function circleProgress () {
	$(".circle_progress").each(function () {
		var percentage = parseInt($(this).find(".center span").html().split("%")[0])/100;
		setPercentage(0,percentage,$(this));  //初始化进度条
	})

	// 设置进度条，3个参数分别为：旧百分比、新百分比、作用对象
	function setPercentage (m,n,obj) {
		var speed = 0.5  //设置动画时长（单位：秒）
		if (n >= 0 && n < 0.5) {  //是否低于50%
			if (m >= 0.5) {  //跨越50%时，动画分两段播放，将第二段延迟
				resetTime();  //重置延迟与动画时间
				obj.find(".pie_left").css({
					// 计算左半环的动画时间
					"transition-duration":speed/(m-n)*(m-0.5) + "s",
					"-webkit-transition-duration":speed/(m-n)*(m-0.5) + "s"
				})
				obj.find(".pie_right").css({
					// 计算右半环的动画时间
					"transition-duration":speed/(m-n)*(0.5-n) + "s",
					"-webkit-transition-duration":speed/(m-n)*(0.5-n) + "s",
					// 将左半环动画时间，设置为右半环的延迟
					"transition-delay":speed/(m-n)*(m-0.5) + "s",
					"-webkit-transition-delay":speed/(m-n)*(m-0.5) + "s"
				})
			}
			obj.find(".pie_right").css({  //将右半环转到相应位置
				"transform":"rotate(" + n*360 + "deg)",
				"-webkit-transform":"rotate(" + n*360 + "deg)"
			})
			obj.find(".pie_left").css({  //将左半环转到默认位置
				"transform":"rotate(0deg)",
				"-webkit-transform":"rotate(0deg)"
			})
		}
		else if (n >= 0.5 && n <= 1) {  //是否超过50%
			if (m <= 0.5) {  //跨越50%时，动画分两段播放，将第二段延迟
				resetTime();  //重置延迟与动画时间
				obj.find(".pie_right").css({
					// 计算右半环的动画时间
					"transition-duration":speed/(n-m)*(0.5-m) + "s",
					"-webkit-transition-duration":speed/(n-m)*(0.5-m) + "s"
				})
				obj.find(".pie_left").css({
					// 计算左半环的动画时间
					"transition-duration":speed/(n-m)*(n-0.5) + "s",
					"-webkit-transition-duration":speed/(n-m)*(n-0.5) + "s",
					// 将右半环动画时间，设置为左半环的延迟
					"transition-delay":speed/(n-m)*(0.5-m) + "s",
					"-webkit-transition-delay":speed/(n-m)*(0.5-m) + "s"
				})
			}
			obj.find(".pie_right").css({  //将右半环转到默认位置
				"transform":"rotate(180deg)",
				"-webkit-transform":"rotate(180deg)"
			})
			obj.find(".pie_left").css({  //将左半环转到相应位置
				"transform":"rotate(" + (n-0.5)*360 + "deg)",
				"-webkit-transform":"rotate(" + (n-0.5)*360 + "deg)"
			})
		}
		function resetTime () {  //重置延迟与动画时间
			obj.find(".pie_wrap span").css({
				"transition-delay":"0",
				"-webkit-transition-delay":"0",
				"transition-duration":speed + "s",
				"-webkit-transition-duration":speed + "s"
			});
		}
	}
}