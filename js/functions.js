$(function () {

	// 页面效果
	experience();  //首页个人经历时间轴
	parallax();  //首页视觉差滚动

	// 基础功能
	anchorSlide();  //锚链接平滑移动
	picCenter();  //居中截取图片
	lightWave();  //鼠标点击光晕扩散

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
		var flag = 0;
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
			// 首屏
			if (distanceTop <= $(".banner").height()) {
				areaHeight = $(".banner").height();
				$(".banner .inner").css({
					"transform":"translate(0," + 0.8*distanceTop + "px)",
					"-webkit-transform":"translate(0," + 0.8*distanceTop + "px)",
					"opacity":(1 - (distanceTop/(areaHeight - headerHeight)))
				});
			};
			// 关于
			if (distanceTop >= $(".about").offset().top - wHeight + $(".about").height()*0.5) {
				$(".about .avatar img").css({
					"animation":"movein_right .3s ease-out both",
					"-webkit-animation":"movein_right .3s ease-out both"
				})
				$(".about .text .inner h2").css({
					"animation":"movein_left .3s ease-out .2s both",
					"-webkit-animation":"movein_left .3s ease-out .2s both"
				})
				$(".about .text .inner p").css({
					"animation":"movein_left .3s ease-out .3s both",
					"-webkit-animation":"movein_left .3s ease-out .3s both"
				})
				$(".about .text .inner ol").css({
					"animation":"movein_left .3s ease-out .4s both",
					"-webkit-animation":"movein_left .3s ease-out .4s both"
				})
			};
			// 个人经历
			if (distanceTop >= $(".experience").offset().top - wHeight + $(".experience").height()*0.2) {
				$(".experience .item").each(function (index) {
					$(this).css({
						"animation":"zoomin .5s ease-in-out " + index*0.1 + "s both",
						"-webkit-animation":"zoomin .3s ease-in-out " + index*0.1 + "s both"
					})
				})
			};
			// 技能
			if (distanceTop >= $(".skills").offset().top + $(".skills").height() - wHeight && distanceTop <= $(".skills").offset().top + $(".skills").height() - headerHeight) {
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
			if (distanceTop >= $(".skills ul").offset().top - wHeight && distanceTop < $(".skills").offset().top + $(".skills").height() - wHeight*0.8) {
				if (!flag) {
					$(".skills li span").each(function (index) {
						$(this).css({
							"animation":"zoomin .3s ease-in-out " + index*0.1 + "s both",
							"-webkit-animation":"zoomin .3s ease-in-out " + index*0.1 + "s both"
						})
					})
					flag = 1;
				};
			}
			if (distanceTop >= $(".skills").offset().top + $(".skills").height() - wHeight*0.8) {
				if (flag) {
					$(".skills li span").each(function (index) {
						$(this).css({
							"animation":"zoomout .3s ease-in-out " + index*0.1 + "s both",
							"-webkit-animation":"zoomout .3s ease-in-out " + index*0.1 + "s both"
						})
					})
					flag = 0;
				};
			};
		}
	};
}


// 鼠标点击光晕扩散
function lightWave () {
	if ($(".lightglow").length > 0) {
		$(".lightglow").click(function (e) {
			var mouseX = e.pageX, mouseY = e.pageY;
			var wrapper = $(this).find("svg");
			var light = $(this).find("svg ellipse");
			light.attr({"cx":mouseX - wrapper.offset().left,"cy":mouseY - wrapper.offset().top});
			light.css({"fill":"#fff","transform":"scale(50,50)","-webkit-transform":"scale(50,50)","opacity":0});
			var reset = setTimeout(function () {
				light.removeAttr("style");
			},500);
		})
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