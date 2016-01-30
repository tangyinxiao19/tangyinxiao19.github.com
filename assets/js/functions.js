$(function () {

	// 页面效果
	// experience();  //首页个人经历时间轴

	// 插件效果
	// fancybox();  //fancybox弹窗相册

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