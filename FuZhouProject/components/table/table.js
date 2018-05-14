;(function(window,document,undefined){
    function Table(ops){
		var data=[
			["区域","预警次数","方案推送数量","诊断准确率"],
			["地区一","23","10","10%"],
			["地区二","23","10","10%"],
			["地区三","13","31","11%"],
			["地区四","21","5","3%"],
			["地区五","14","5","9%"],
			["地区六","14","5","9%"]
		];
		for(var i=0;i<data.length;i++){
			ops.el.append(
				'<tr class="toTake_head">'+
					'<td>'+data[i][0]+'</td>'+
					'<td>'+data[i][1]+'</td>'+
					'<td>'+data[i][2]+'</td>'+
					'<td>'+data[i][3]+'</td>'+
				'</tr>'
			)
		}
        
    }
    window.Table = Table;
})(window,document)