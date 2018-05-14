(function(window,document,undefined){

	var path = process.execPath;
	var packager = /electron-prebuilt|Roaming/.test(path);
	window.configPath = !!packager?'':path.slice(0,path.lastIndexOf('\\')+1);

	$(document).on('selectstart',function(){return !1});
	var config = require(configPath+'./config.json');

	var iframes = $('iframe');
	var realsrc = [];
	var total = iframes.length;
	var now = 0;

	iframes.each(function(){
		realsrc.push($(this).data('src'));
	});

	$(iframes[0]).attr('src',realsrc[0]).fadeIn(2000);

	setInterval(function(){
		now++;
		now %= total;
		var index = now%total?now:total;
		$(iframes[index-1])
		.fadeOut(1000,function(){
			$(iframes[index-1]).attr('src','about:blank');
		});
		setTimeout(function(){
			$(iframes[now])
				.attr('src',realsrc[now])
				.fadeIn(1000);
		},1000)

	},1000*config.slideTime)

	/*$('.rightBtn').on('click',function(){
		switchView('next');
	});

	$('.leftBtn').on('click',function(){
		switchView('prev');
	});*/

	function switchView(action){
		if(action == 'prev'){

			now--;
			if(now<0){
				now = 0;
				return;
			}

			if(now+1<total){
				$(iframes[now+1])
				.fadeOut(1000,function(){
					$(iframes[now+1]).attr('src','about:blank');
				});

			}

		}else if(action == 'next'){
			now++;

			if(now>=total){
				now = total-1;
				return;
			}

			if(now-1>=0){
				$(iframes[now-1])
				.fadeOut(1000,function(){
					$(iframes[now-1]).attr('src','about:blank');
				});
			}
		}

		setTimeout(function(){
			$(iframes[now])
				.attr('src',realsrc[now])
				.fadeIn(1000);
		},1000)
	}
})(window,document);
