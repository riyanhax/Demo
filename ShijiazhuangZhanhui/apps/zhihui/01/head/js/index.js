$(function(){
	update ();
	setInterval(function () {
		$('.period').find('.time').html(time());
	}, 1000);
	function time(){
		var _date = new Date(); 
		var h = String(_date.getHours()); 
		var m = String(_date.getMinutes());
		var s = String(_date.getSeconds());
		var hh = h.length < 2 ? '0' + h : h;
		var mm = m.length < 2 ? '0' + m : m;
		var ss = s.length < 2 ? '0' + s : s;
		return hh + ':' + mm + ':' + ss;
	}
	function update () {
		$.ajax({
	        type:'get',
	        url:'http://api.map.baidu.com/telematics/v3/weather?output=json&ak=0A5bc3c4fb543c8f9bc54b77bc155724',
	        data:{location:'北京'},
	        dataType:'jsonp',
	        success:function(data){
	        	if (data && data.error == 0) {
	        		var weather_data = data.results[0].weather_data;
	        		var week = weather_data[0].date.split(' ')[0];
	        		$('.period').find('.date').html(data.date);
	        		$('.period').find('.week').html(week);
		            $('.period').find('.tq').html(weather_data[0].weather);
		            $('.period').find('.wd').html(weather_data[0].temperature);
		            $('.period').find('.pm span').html(data.results[0].pm25);
		            $('.period').find('.atmosphere span').html(weather_data[0].wind);
	        	}
	        }
	    });
	}
})

