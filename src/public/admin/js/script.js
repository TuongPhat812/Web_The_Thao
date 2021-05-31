	jQuery(document).ready(function($){ 	
	if($(".btn-top").length > 0){
		$(window).scroll(function () {
			var e = $(window).scrollTop();
			if (e > 300) {
				$(".btn-top").show()
			} else {
				$(".btn-top").hide()
			}
		});
		$(".btn-top").click(function () {
			$('body,html').animate({
				scrollTop: 0
			})
		})
	}		
});
/*Hàm Mở Form*/
 function moForm() {
   document.getElementById("myForm").style.display = "block";
 }
 /*Hàm Đóng Form*/
 function dongForm() {
   document.getElementById("myForm").style.display = "none";
 }
