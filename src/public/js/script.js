	jQuery(document).ready(function ($) {
		if ($(".btn-top").length > 0) {
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
		let countCart = 0;
		for(let i = 0; i < localCart.length; i++)
			countCart += localCountProduct[i]
		
		const getCountCart = document.getElementById('countCart');
		getCountCart.append(countCart);
		console.log(getCountCart);
		console.log(localCart);
		console.log(localCountProduct);
	});
	/*Hàm Mở Form*/
	function moForm() {
		document.getElementById("myForm").style.display = "block";
	}
	/*Hàm Đóng Form*/
	function dongForm() {
		document.getElementById("myForm").style.display = "none";
	}

	var localCart = localStorage.getItem('idProduct') !== null ? JSON.parse(localStorage.getItem('idProduct')) : [];
	var localCountProduct = localStorage.getItem('countProduct') !== null ? JSON.parse(localStorage.getItem('countProduct')) : [];


	function saveCart(idProduct) {
		//Lấy id sản phẩm (Đổi thành số)
		let getIdProduct = Number(idProduct);
		//Tìm chỉ mục của sản phẩm nếu nó đã có trong giỏ hàng
		let index = localCart.indexOf(getIdProduct);

		if (index > -1) {
			let count = Number(localCountProduct[index]);

			localCart.splice(index, 1);
			localCountProduct.splice(index, 1);

			localCart.push(getIdProduct);
			localCountProduct.push(count + 1);
		} else {
			let count = 1;
			localCart.push(getIdProduct);
			localCountProduct.push(count);
		}
		localStorage.setItem('idProduct', JSON.stringify(localCart));
		localStorage.setItem('countProduct', JSON.stringify(localCountProduct));
	}