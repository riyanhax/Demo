;(function(window,document,undefined){
    function Chartline5(ops){

        var blueSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEX///8zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc7///+xxXthAAAASHRSTlMAIi8BE49phT1nTSCLCSaIBmBUAn01A77f3SUQjhc+dmazSGwKH+pGBSsaCyr8cm5FW1mXBw2NFe9PgDFEcDBDcYIbLGRaVWiOMnmnAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+IDHRAeFk44zEUAAACfSURBVAjXLY/XAoJADARXEM+CXRHEXil2BTt25f+/yGvzcEnmHrIBKAlFoEKQ1FIckpYikxU1p+d5LRRL8qdcYW+1VofRME2rCbvVpqLTVdGLKX1gMARG+hj2hIl4Coe48DQfszkXC2C5AtYbYMtmaweXOEAQetgfqDjCOJ3ZmsuVRogiBbjd+XbjoYgYQfgUzYuIU94fGRBfccvPp/0fEYkSPlK77+8AAAAASUVORK5CYII='
        var yellowSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA6lBMVEX////usDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDP///+DuKlwAAAATHRSTlMAByYTUoNzdoIDFI8QcUNpSxqNDSiGBT6/fllbAjQE0vwtC4wcQHQBaEFnTqrxDpEKF44l+XVuR1Vfi9oGLAkgDD8vPXdEcHwpGSRKctb04AAAAAFiS0dEAIgFHUgAAAAHdElNRQfiAx0QICG3QHI3AAAApElEQVQI1y2P5RaCQBSExwBRMTAXA1vswEAxEDv2/Z/HXZbvz9yZc88NAAiFBREERCWZE1PiwieSqihSaaGZbNCp5fJcCsUSyoQQHahUma/pdRgNSmmzhXanC/T6JgaUQ4ChDIzGwMQPpjNo8wWWlorVmgcbYGuzIbs94DB/OOIkGSw4Oy4unue5MJSrv/52N8Udj6dQ82X7r7ytT3DhVxb8uPkDe4IT6n/KNScAAAAASUVORK5CYII='
        var whiteSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAQAAAAKsiavAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiAx0QIRjxXst+AAAA7UlEQVQY01XRPyuFARiG8d97HCGRTbajfAQZjkRKlGREWX0DRUaDktJRdrNSZzFYxECyGqwMBjYlg6LbcA5e1z0+PX+6niLarBlVpukMpJWR7KYrfjOY/QxEVEBhSdNHqf/FjUWogrovt5gzC47cObWt5lGkO3sZjvTnOS2uU0QmspGignn3HrBlsL2gbgVXOo1JRw5Si1Tzmj+uozWj4suFGXw6LB3ZQMW0c5Gu7GYk0pundv9lRKaynqKKD01LdrxbNQmO0WtB40dLkc2MlzSJLGc18mtyOHvpKZWHsp++SFsUD+41/v3ixBt8A6SUmUOwK8RLAAAAAElFTkSuQmCC'
        var blueWhiteSymbol="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAbCAYAAACEP1QvAAADI0lEQVRIiaWWWWtVMRCAv3vqLu4bLtiq2ChWXPBBRUXwQanggq31H4iCvgRRAhYLEkGMvgo+i/uKqIgFkYKK4oIIRkQquKPg1rqgrQ9J23NPc057rgOXy5nM5Jskk8kU2tvbSRNh9DBgaKpBtrRaqT5lGRTS4MLoCKgHxpcI/wbUW6la0wz6ZDgv9+BWIHMFARkODAFWA6fSjIIrF0YPBvYCg4DDVqoHecjC6ApgF9AGNFip3ofsohT/tR78LC8YwErVDNwCyoCNaXbd4MLoicBSXNTH84Jjch74CVQJo2f1Co6LNAKarFSvSyVbqb4Al/1nnTC6LGlTlHDC6HnADFySXUwaC6PLgYoU3jsrlU3oGoFlwDhcAjfGBzsTThjdF9gDjAZOWqmKDIXRfYCHQHALgQ9ApV9x3G8OsNUvqN5K9a1jLL7tKzz4LXAjMPmWDDDAWGB3UmmlegQ8xSXwmvhY5KMbDlR73Skr1d9E9KNwu9KTbBNGTw/oT+ASeIkwelIRHFgH9AceW6meBJwbgJG9gPcDDiWVVqo3wE3Pq+uE+4KwEPhDoBoJo6uAzb0Ad8hqYfSqgP4i0AJUCqPn4yOpBQrAzZRKtJ/sMhwSk1RYqVrounobhNFRBLz0inJhdCEw0f2c4CyfCv//ykrVFgGXgO/ANGBBwGEfkKfYtAA7k0ph9FQ/f+fxRv7Ju+BtNgij+8Wd/HbtygHf5xMsDi4Am3DH22il+ghd2d4EvAJGACsDEx4FbvcC3AwcDOgXAeXAV7rO3cGtVG24uwiwUhg9Iu5ppWoHtgPpbY+THVaqH3GFMHoAsN5/nrVS/SyCe8Az4AHQF6hJzmqluou7ww9TfsesVKcDAVXjWrFmErtX1Ez4StaAu1oHrFTPe1hppgijx+AqYxmw30r1Ij5e9KT6hu86LjHqUq5eHqnBLeRuEtwN7uUK8BmYDCwulSqMngnMBX4DZ0I23eBWql/AOf+5Thg9sARwRFf7dNVK9Tlkl1Y27+Ae/yk+gKac/NnABFzXey3NKKtvn4KrVP9z7kesVPdyw30AtYAoEfzeSnUky+Af5joKj/j1uGAAAAAASUVORK5CYII="
        var yellowWhiteSymbol="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAADC0lEQVRIiaXWT4iVVRjH8c9cNUP7oySBFZEtalEIbtRFp6QMssgytFlEcDbCgYhw0SKCIlsUQQs39e56Fy2akQGDpCaihGOtTIKIoNwZRGEZukiaGW+L91y9vnPvnZnrD1645/e853zfc+45z3Mmut2uYaqrsAlvYfXQl0brWEz582HBzhKd918HGPbUVdgwLDh04LoK92Mb/sMbMeXzK6HWVXgJW7EPHw16Z+DM6yp0MFmasysFFx3FPHbUVdiybDgC7sTfmB0DLKb8J77GBCbrKkwsCa+rsA7PlOZMTHluHHjRcVzAFuxYEo6nsR5n8P11gMWUL+FYae6rq7C2P37NhqursBm70MUnMeVuK34PfsaNQ3ivxZTfbXnflTHvxp6+j1k08wPF+zamfHbA4O+PAMPrdRXu6DfKBKY0E9pdV+G2RfC6ClvxAC7h0/aodRV24bkRYLgJ77TNmPIZnMIazQSvwusqrO4zj8eUL7TAq3BkCXBPL9ZV2D7An8EcttVVuO8KHI/idvSOR1sHNQljOZrAkfbRKrnii9KcrKvQ6dRVuAVPFfNoTHm+v1NdhY14e5ngnnbihQH+lziPu/BQRzP73lfOD+iwqjwr1Q0DvC4Wyu81nZjyP+hVnudLar2imPI5TWVbiU6jHuA/hk34HSd6oK9wDpvxyIBOH2jO93LUxSsx5cv9ZqluT5bm0ZjyQgdKCp0pgb11Fdb3dyzxQ8uET8eUTw7wn8Va/BhT/om+cx5TPo1fsA572z1jyrOaXD1K/+LVtlky407Nnpru+e0MN4XLeLidqYoOaer7ML3XzozlyE1qNvU3pdothseUf8PJ4k9qKab8q2bDbBzyDDqS23EvLmqt3ET7DldX4WYc1iz/hzHlH0bMdKRKFTuMDfg4ppz744tKakz5Ij4rzQMl9Y6rJwr4rGZFr9Gwm8wJ/KFZ4t3jUEv1erw0p9rleSg8pryg2Xw0N9Bbx+Dv11SxU2WvLNKi/7xfdRVexoNjgHuaw5sx5b8GBZe6t0+7movH0ewwMPwPXnjvALNrsykAAAAASUVORK5CYII="
        var hoverYellowSymbol="data:image/png;base64,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"
        var images="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABECAYAAAAvMQN7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/pJREFUeNrsnM1qHEcQx7t6P2zLJpaCDQETry7xOUZ6AT+Bg5/AN13zBn6B5J5jCPgayAMEx8eARHL2SRsMFhgjIcfS2rPT5aqu7pme2ZEMtnxI+BcM1V1VXdP965np6WFZYmaX5fC37U1RDx1kSH7euL+7nyvjnlPBPQKjQflDjlVwm5ub9M1XvH7tygiIBuT1af3l79/RSO7QugNuPp9PT05ujqbTKSgNyGKxuCLqKhH9K/CCV+POzg6JulwvlzeAaFjqqrotkDakGG/JCG5vb0/VJITwBRANi7C5KeCuZmY+O0jLzBMgOlOmZFcbdcBBPiiUoQHcJwjAARzAAdz/WTp71WUI1WJx+k8IvCavJt4RDbXhlUJadMjpFwNaXYvObecGzJSqNBBC/XAaWv46RV49VdnRc3tMzES+quu6KjONi5ggO4dXpyG8ChIU5GokbaYuA8htKBVdIselrxvb2LhvcymO+jbu5qQ8ToukdmCUQgo4TOXgYyxzCcPacJkr+blJksuUp897WvCyPpRynYMiuK2tLd09VH7kj/xofEzeL73dxtyCI7aUecBxKpzFRF/qhcVxjks+7rcvIHOvbr3u+PoQ7Eh1auslzNjDsg05q3Ppb3tGBj6DZcpTLn2panYHXFVvdBPh7EJME0t06frG+vZ4PP5eLGMjEeEYJGe6PJItMHlnNklqp1KbDj5DbfK4Jo/afITEZg/xGo8dy5OiedKkxBYhDTa29oaVPeVByt6bXWoRY5N27DXU697cYEYwml1Opzm9S7HZTzFWR6PtnTzD3v70+vj4Tzl33OQ3t+psNnu3qN4dymCPnYCIp/deU4SoY9d9YCm7aCMbOHnTMdbF2BhHPkPlGOt8bBPjNUbh+F5OyrrJHSxGuiOt5WGiAxGtZ9IPFKo1oo42G2xQ3D5BtjZqj1OqcYEaf9S1a/wpj/i82TRnHUGO/OhAwL1RaJ1n3P7+Pt+6/fVS1wiD4EMHXDOQDK4BFlpw1ILzJVRq8iVwBqcb2wWYbKYVXAlBz1Tb1RNCCy7aGiDUa+MsrucX7hQyJGomJcaSXT7aZjSZvM3f4oa+AF+08AUf7gx9ns+dsUTjPQ4vwAAHcBCAAziAAziAgwAcwAEcwEEADuAADuAADgJwAAdwAAdwEIADOIADOICDABzAARzAQQDuYqT/i8zncvxY1Pkjy3wBOfrlLNTTH7J9qp8KNq2z/BcICG5VgPtPPOO2f/1rXdS3wDIof+8+uHt01uKg0J6A0aDcc/anLavgjn75Ya2aP5uD0apMZnfW3IPHw7fqYvfpiagZMK1K/fLFCRYHrKoAB3AABwG4z75z0Fc5OZ4Cy6AclZX3AgwAou2AkfoyJoQAAAAASUVORK5CYII="
        var symbolSize = 30;
		var data=[ 300, {value:400,symbol:'image://'+hoverYellowSymbol,symbolSize:60}, 600]
        
        this.myChart = echarts.init(ops.el)
        this.initWidth = ops.width || this.myChart.getWidth()
        this.initHeight = ops.height || this.myChart.getHeight()

        this.option = option = {
            title: {
                text: '扬州市各类创新成果成长趋势分析',
                textStyle:{
                    color:'#33adce',
                    fontSize:24
                }
            },
            legend: {
                type:'plain',
                right:50,
                top:10,
                itemWidth:18,
                itemHeight:18,
                itemGap: 40,
                show:true,
                textStyle: {
                    color:'#33adce',
                    fontSize:16
                },
                data: ["双创人才","院士","省级千人","国家千人","领军人物"]
            },
            grid: {
                top:'80',
                left: '20',
                right: '50',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name:"年",
                nameTextStyle:{"color":"#236e82","fontSize":"20"},
                boundaryGap: true,
                data: ['2015','2016','2017'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle:{
                        color:'#236e82'
                    }
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#122025',
                        width:2
                    }
                },
                axisLabel: {
                    fontSize:20
                }
            },
            yAxis: {
                type: 'value',
                name:"/万元",
                nameTextStyle:{"color":"#236e82","fontSize":"20"},
                axisLine:{
                    lineStyle:{
                        color:'#236e82'
                    }
                },
                splitNumber:4,
                axisTick: {
                    show:true
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#122025',
                        width:2
                    }
                },
                axisLabel: {
                    fontSize:20
                },
                splitArea: {
                    show: true,
                    interval: '1',
                    areaStyle:{
                        color:[
                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(8, 23, 29, 0.2)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(8, 23, 29, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(8, 23, 29, 0.2)'
                            }]),
                            'transparent'
                        ]
                    }
                }
            },
            series: [
            	{
                    symbol:'image://'+whiteSymbol,
                    symbolSize:symbolSize,
                    name: '双创人才',
                    type:'line',
                    data:[ 100, 750, 500],
                    itemStyle: {
                        color:'#fff'
                    }
                },
            	{
                    symbol:'image://'+yellowSymbol,
                    symbolSize:symbolSize,
                    name: '院士',
                    type:'line',
                    markPoint:{
			        	symbol:'image://'+images,
			        	symbolSize: [72, 68],
			        	symbolOffset: [0, '-90%'],
			        	
			        	itemStyle:{
			        		normal:{
								label:{
				                    color:'#CA9933',
				                    fontSize: 24
				                }
			        		}
			        	},
			        	data :[{
			        		value:data[1].value,
			        		coord: ["2016", data[1].value+25]
			        	}]
			        },
                    data:data,
                    itemStyle:{
                        color:'#eeb033'
                    }
                },
                {
                    symbol:'image://'+yellowWhiteSymbol,
                    symbolSize:symbolSize,
                    name: '省级千人',
                    type:'line',
                    data:[ 500, 800, 750],
                    itemStyle:{
                        color:'#9f973c'
                    }
                },
                {
                    symbol:'image://'+blueWhiteSymbol,
                    symbolSize:symbolSize,
                    name: '国家千人',
                    type:'line',
                    data:[ 700, 900, 800],
                    itemStyle:{
                        color:'#268c85'
                    }
                },
                {
                    symbol:'image://'+blueSymbol,
                    symbolSize:symbolSize,
                    name: '领军人物',
                    type:'line',
                    data:[ 850, 550,950 ],
                    itemStyle: {
                        color:'#2f99b6'
                    }
                }
                
                
            ]
        }
        
        this.myChart.setOption(this.option);
       
    }
	
    window.Chartline5 = Chartline5
})(window,document)