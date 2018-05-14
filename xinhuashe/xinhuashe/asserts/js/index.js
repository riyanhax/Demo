(function(window,document,undefined){

	var iframes = $('iframe');
	var realsrc = [];
	var total = iframes.length;
	var now = 0;

	iframes.each(function(){
		realsrc.push($(this).data('src'));
	});

	$(iframes[0]).attr('src',realsrc[0]).fadeIn(2000);

	$('.rightBtn').on('click',function(){
		switchView('next');
	});

	$('.leftBtn').on('click',function(){
		switchView('prev');
	});

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
				})
				
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
