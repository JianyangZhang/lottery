function isNull(arg1) {
	return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
}
if (isNull(store.get('numberArr'))) {
	resetList();
}
//获取url参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return (r[2]); return null;
}

window.onload = function () {
	if (store.get('numberArr').length <= 0) {
		alert("名额不足，已重置抽奖名单");
		resetList();
	}
	var l = GetQueryString('l'), g = GetQueryString('g');
	if (l != null && g != null) {
		var numberArr = store.get('numberArr');
		var nameArr = store.get('nameArr');
		var areaArr = [];
		var phoneArr = [];
		var timers = t = null, c = 0, rNumerIndex, rNameIndex, rAreaIndex, rPhoneIndex;

		//显示动画效果
		function liffect(t) {
			if (t == undefined) t = 0;
			$("ul[data-liffect] li").each(function (i) {
				$(this).attr("style", "-webkit-animation-delay:" + i * t + "ms;"
					+ "-moz-animation-delay:" + i * t + "ms;"
					+ "-o-animation-delay:" + i * t + "ms;"
					+ "animation-delay:" + i * t + "ms;");
				if (i == $("ul[data-liffect] li").size() - 1) {
					$("ul[data-liffect]").addClass("play");
				}
			});
		}

		if (l > 3) {
			$('#winningListA').show();
			liffect();
		} else {
			$('#winningListA').hide();
			$('#winningListB').show();
		}

		//开始 暂停
		$('.sBtn').click(function () {
			var thisId = $(this).attr('id');
			if (thisId == 'start') {
				$(this).attr('id', 'stop').text('停止'); thisId = 'stop';
				clearTimeout(t);
				t = setTimeout(function () {
					if (l > 3) {
						if (timers == undefined) {
							timers = setInterval(function () {
								$('#winningListA .wList li').each(function () {
									rNumerIndex = Math.floor(Math.random() * numberArr.length);
									$(this).find('.name').text(nameArr[rNumerIndex]);
									$(this).find('.serial_bumber').text(numberArr[rNumerIndex]);
								});
							}, 30);
						}
					} else {
						if (timers == undefined) {
							timers = setInterval(function () {
								rNumerIndex = Math.floor(Math.random() * numberArr.length);
								$('#winningListB .wList .name').text(nameArr[rNumerIndex]);
								$('#winningListB .wList .serial_number').text(numberArr[rNumerIndex]);
							}, 30);
						}
					}
				}, 30);
			} else {
				$(this).attr('id', 'start').text('开始'); thisId = 'start';
				clearInterval(timers);
				$('.sBtn').hide();
				if (l > 3) {
					if (numberArr.length < $('#winningListA .wList li').length) {
						alert("名额不足，已重置抽奖名单");
					}
					for (var i = 0; i < $('#winningListA .wList li').length; i++) {
						rNumerIndex = Math.floor(Math.random() * numberArr.length);
						$('#winningListA .wList li').eq(i).find('.name').text(nameArr[rNumerIndex]);
						$('#winningListA .wList li').eq(i).find('.serial_bumber').text(numberArr[rNumerIndex]);
						nameArr.splice(rNumerIndex, 1);
						numberArr.splice(rNumerIndex, 1);
					}
					$('#winningListA').show();
					store.set('nameArr', nameArr);
					store.set('numberArr', numberArr);
				} else {
					rNumerIndex = Math.floor(Math.random() * numberArr.length);
					$('#winningListB .wList .name').text(nameArr[rNumerIndex]);
					$('#winningListB .wList .serial_number').text(numberArr[rNumerIndex]);
					$('#winningListB').show();
					nameArr.splice(rNumerIndex, 1);
					numberArr.splice(rNumerIndex, 1);
					store.set('nameArr', nameArr);
					store.set('numberArr', numberArr);
				}
			}
		});
	}

	$('#mainMenus li a.jName').click(function () {
		if (!$(this).parent().hasClass('active')) {
			$('#mainMenus li').removeClass('active');
			$(this).parent().addClass('active');
		} else {
			$(this).parent().removeClass('active');
		}
	});

	$("#btn_reset").click(function () {
		store.clearAll();
		resetList();
	});
}


function resetList() {
	store.set('numberArr', [18081111, 18082222, 18083333, 18084444]);
	store.set('nameArr', ["张一", "李二", "王三", "刘四"]);
}