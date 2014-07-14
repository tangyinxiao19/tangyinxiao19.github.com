$(function () {

	// 页面效果
	experience();  //首页个人经历时间轴
	parallax();  //首页视觉差滚动

	// 基础功能
	anchorSlide();  //锚链接平滑移动
	picCenter();  //居中截取图片

	// 插件效果
	fancybox();  //fancybox弹窗相册

})





//*********************************************************************//
//                              页面效果                               //
//*********************************************************************//


// 首页个人经历时间轴
function experience () {
	if ($(".index .experience").length > 0) {
		$(".index .experience .item:even").addClass("even");
		$(".index .experience .item:odd").addClass("odd");
	};
}


// 首页视觉差滚动
function parallax () {
	if ($(".index").length > 0) {
		$(window).load(function () {
			setScrolling();
		}).scroll(function () {
			setScrolling();
		}).resize(function () {
			setScrolling();
		})
		function setScrolling () {
			var headerHeight = 80;
			var wHeight = $(window).height();
			var distanceTop = $(window).scrollTop();
			var areaHeight, areaOffset;
			$(".header").css({"background":"rgba(51,51,51," + distanceTop/($(".banner").height() - headerHeight) + ")"});
			// 首屏部分
			if (distanceTop <= $(".banner").height()) {
				areaHeight = $(".banner").height();
				$(".banner .inner").css({
					"transform":"translate(0," + 0.8*distanceTop + "px)",
					"-webkit-transform":"translate(0," + 0.8*distanceTop + "px)",
					"opacity":(1 - (distanceTop/(areaHeight - headerHeight)))
				});
			};
			// 关于
			if (distanceTop >= $(".about").offset().top - wHeight && distanceTop <= $(".about").offset().top - wHeight + $(".about").height()) {
				areaHeight = $(".about").height();
				areaOffset = $(".about").offset().top;
				$(".about .avatar img").css({
					"transform":"translate(0," + (-150)*(areaHeight - distanceTop + areaOffset - wHeight)/areaHeight + "px)",
					"-webkit-transform":"translate(0," + (-150)*(areaHeight - distanceTop + areaOffset - wHeight)/areaHeight + "px)",
					"opacity":(distanceTop - areaOffset + wHeight)/areaHeight
				})
				$(".about .text .inner").css({
					"transform":"translate(0," + (-150)*(areaHeight - distanceTop + areaOffset - wHeight)/areaHeight + "px)",
					"-webkit-transform":"translate(0," + (-150)*(areaHeight - distanceTop + areaOffset - wHeight)/areaHeight + "px)",
					"opacity":(distanceTop - areaOffset + wHeight)/areaHeight
				})
			};
			// 技能
			if (distanceTop >= $(".contact").offset().top - wHeight && distanceTop <= $(".contact").offset().top - headerHeight) {
				areaOffset = $(".contact").offset().top;
				$(".skills .inner").css({
					"transform":"translate(0," + 0.8*(distanceTop - areaOffset + wHeight) + "px)",
					"-webkit-transform":"translate(0," + 0.8*(distanceTop - areaOffset + wHeight) + "px)",
					"opacity":(1 - (distanceTop - areaOffset + wHeight)/(wHeight - headerHeight))
				});
			}
			else {
				$(".skills .inner").css({
					"transform":"translate(0,0)",
					"-webkit-transform":"translate(0,0)",
					"opacity":1
				});
			}
			if (distanceTop >= $(".skills ul").offset().top - wHeight && distanceTop <= $(".skills ul").offset().top - wHeight + $(".skills ul").height()) {
				areaHeight = $(".skills ul").height()
				areaOffset = $(".skills ul").offset().top;
				var maxDivision = $(".skills li").length + 2;
				var percentage = (distanceTop - areaOffset + wHeight)/areaHeight;
				$(".skills li").each(function (index) {
					if (percentage >= index/maxDivision && percentage <= (index + 1 + 2)/maxDivision) {
						$(this).css({
							"transform":"scale(" + (percentage - index/maxDivision)/(1 + 2)*maxDivision + "," + (percentage - index/maxDivision)/(1 + 2)*maxDivision + ")"
						})
					}
					else if (percentage < index/maxDivision) {
						$(this).css({
							"transform":"scale(0,0)"
						})
					}
					else {
						$(this).css({
							"transform":"scale(1,1)"
						})
					}
				})
			}
			else {
				$(".skills li").css({
					"transform":"scale(1,1)"
				})
			}
		}
	};
}





//*********************************************************************//
//                              基础功能                               //
//*********************************************************************//


// 锚链接平滑移动
function anchorSlide () {
	var scrollSpeed = 1000;
	$("a[href*='#']").click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $("[name=" + this.hash.slice(1) + "]");
			if (this.hash.slice(1)){
				if($target.length){
					var targetOffset = $target.offset().top;
					if ($(".index").length > 0) {
						$("html,body").animate({
							scrollTop: targetOffset - $(".header").height()
						},
						scrollSpeed);
					}
					else {
						$("html,body").animate({
							scrollTop: targetOffset
						},
						scrollSpeed);
					}
				}
			}
			else{
				$("html,body").animate({
					scrollTop: 0
				},
				scrollSpeed);
			}
			return false;  //防止页面跳动
		}
	});	
}

// 居中截取图片
function picCenter () {
	if($(".pic_center").length > 0)
	{
		setAllCenter();
	}
	function setImg(thisEle){
		var wrapWidth = $(thisEle).width();
		var wrapHeight = $(thisEle).height();
		var picWidth = $(thisEle).find("img").width();
		var picHeight = $(thisEle).find("img").height();
		var wrapShape = wrapWidth / wrapHeight;
		var picShape = picWidth / picHeight;
		var picWidthS = picWidth/picHeight*wrapHeight;
		var picHeightS = picHeight/picWidth*wrapWidth;
		if(wrapShape > picShape)
		{
			$(thisEle).find("img").css({"width":"100%","height":"auto","top":(wrapHeight-picHeightS)/2,"left":"0"});
		}
		else
		{
			$(thisEle).find("img").css({"width":"auto","height":"100%","left":(wrapWidth-picWidthS)/2,"top":"0"});
		}
	}
	function setAllCenter(){
		$(".pic_center").each(function(){
			var self = this;
			var pic = $(self).find("img");
			var src = $(this).attr("src");
			$(pic).hide();
			var imgW,imgH;
			var img = new Image();
			$(img).bind("load", function() {
				imgW = pic.width();
				imgH = pic.height();
				setImg(self);
			}).attr("src", pic.attr("src"));
			pic.show()
		});
	}
}






//*********************************************************************//
//                              插件效果                               //
//*********************************************************************//


// fancybox弹窗相册
function fancybox () {
	if ($(".fancybox").length > 0) {
		$('.fancybox').fancybox({
			prevEffect : 'none',
			nextEffect : 'none',
			closeBtn  : false,
			arrows    : true,
			nextClick : true
		});
	};
}