;(function(window,document,undefined){
    function Chartline4(ops){

        var blueSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEX///8zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc7///+xxXthAAAASHRSTlMAIi8BE49phT1nTSCLCSaIBmBUAn01A77f3SUQjhc+dmazSGwKH+pGBSsaCyr8cm5FW1mXBw2NFe9PgDFEcDBDcYIbLGRaVWiOMnmnAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+IDHRAeFk44zEUAAACfSURBVAjXLY/XAoJADARXEM+CXRHEXil2BTt25f+/yGvzcEnmHrIBKAlFoEKQ1FIckpYikxU1p+d5LRRL8qdcYW+1VofRME2rCbvVpqLTVdGLKX1gMARG+hj2hIl4Coe48DQfszkXC2C5AtYbYMtmaweXOEAQetgfqDjCOJ3ZmsuVRogiBbjd+XbjoYgYQfgUzYuIU94fGRBfccvPp/0fEYkSPlK77+8AAAAASUVORK5CYII='
        var yellowSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA6lBMVEX////usDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDP///+DuKlwAAAATHRSTlMAByYTUoNzdoIDFI8QcUNpSxqNDSiGBT6/fllbAjQE0vwtC4wcQHQBaEFnTqrxDpEKF44l+XVuR1Vfi9oGLAkgDD8vPXdEcHwpGSRKctb04AAAAAFiS0dEAIgFHUgAAAAHdElNRQfiAx0QICG3QHI3AAAApElEQVQI1y2P5RaCQBSExwBRMTAXA1vswEAxEDv2/Z/HXZbvz9yZc88NAAiFBREERCWZE1PiwieSqihSaaGZbNCp5fJcCsUSyoQQHahUma/pdRgNSmmzhXanC/T6JgaUQ4ChDIzGwMQPpjNo8wWWlorVmgcbYGuzIbs94DB/OOIkGSw4Oy4unue5MJSrv/52N8Udj6dQ82X7r7ytT3DhVxb8uPkDe4IT6n/KNScAAAAASUVORK5CYII='
        var whiteSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAQAAAAKsiavAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiAx0QIRjxXst+AAAA7UlEQVQY01XRPyuFARiG8d97HCGRTbajfAQZjkRKlGREWX0DRUaDktJRdrNSZzFYxECyGqwMBjYlg6LbcA5e1z0+PX+6niLarBlVpukMpJWR7KYrfjOY/QxEVEBhSdNHqf/FjUWogrovt5gzC47cObWt5lGkO3sZjvTnOS2uU0QmspGignn3HrBlsL2gbgVXOo1JRw5Si1Tzmj+uozWj4suFGXw6LB3ZQMW0c5Gu7GYk0pundv9lRKaynqKKD01LdrxbNQmO0WtB40dLkc2MlzSJLGc18mtyOHvpKZWHsp++SFsUD+41/v3ixBt8A6SUmUOwK8RLAAAAAElFTkSuQmCC'
        var blueWhiteSymbol="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAbCAYAAACEP1QvAAADI0lEQVRIiaWWWWtVMRCAv3vqLu4bLtiq2ChWXPBBRUXwQanggq31H4iCvgRRAhYLEkGMvgo+i/uKqIgFkYKK4oIIRkQquKPg1rqgrQ9J23NPc057rgOXy5nM5Jskk8kU2tvbSRNh9DBgaKpBtrRaqT5lGRTS4MLoCKgHxpcI/wbUW6la0wz6ZDgv9+BWIHMFARkODAFWA6fSjIIrF0YPBvYCg4DDVqoHecjC6ApgF9AGNFip3ofsohT/tR78LC8YwErVDNwCyoCNaXbd4MLoicBSXNTH84Jjch74CVQJo2f1Co6LNAKarFSvSyVbqb4Al/1nnTC6LGlTlHDC6HnADFySXUwaC6PLgYoU3jsrlU3oGoFlwDhcAjfGBzsTThjdF9gDjAZOWqmKDIXRfYCHQHALgQ9ApV9x3G8OsNUvqN5K9a1jLL7tKzz4LXAjMPmWDDDAWGB3UmmlegQ8xSXwmvhY5KMbDlR73Skr1d9E9KNwu9KTbBNGTw/oT+ASeIkwelIRHFgH9AceW6meBJwbgJG9gPcDDiWVVqo3wE3Pq+uE+4KwEPhDoBoJo6uAzb0Ad8hqYfSqgP4i0AJUCqPn4yOpBQrAzZRKtJ/sMhwSk1RYqVrounobhNFRBLz0inJhdCEw0f2c4CyfCv//ykrVFgGXgO/ANGBBwGEfkKfYtAA7k0ph9FQ/f+fxRv7Ju+BtNgij+8Wd/HbtygHf5xMsDi4Am3DH22il+ghd2d4EvAJGACsDEx4FbvcC3AwcDOgXAeXAV7rO3cGtVG24uwiwUhg9Iu5ppWoHtgPpbY+THVaqH3GFMHoAsN5/nrVS/SyCe8Az4AHQF6hJzmqluou7ww9TfsesVKcDAVXjWrFmErtX1Ez4StaAu1oHrFTPe1hppgijx+AqYxmw30r1Ij5e9KT6hu86LjHqUq5eHqnBLeRuEtwN7uUK8BmYDCwulSqMngnMBX4DZ0I23eBWql/AOf+5Thg9sARwRFf7dNVK9Tlkl1Y27+Ae/yk+gKac/NnABFzXey3NKKtvn4KrVP9z7kesVPdyw30AtYAoEfzeSnUky+Af5joKj/j1uGAAAAAASUVORK5CYII="
        var yellowWhiteSymbol="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAADC0lEQVRIiaXWT4iVVRjH8c9cNUP7oySBFZEtalEIbtRFp6QMssgytFlEcDbCgYhw0SKCIlsUQQs39e56Fy2akQGDpCaihGOtTIKIoNwZRGEZukiaGW+L91y9vnPvnZnrD1645/e853zfc+45z3Mmut2uYaqrsAlvYfXQl0brWEz582HBzhKd918HGPbUVdgwLDh04LoK92Mb/sMbMeXzK6HWVXgJW7EPHw16Z+DM6yp0MFmasysFFx3FPHbUVdiybDgC7sTfmB0DLKb8J77GBCbrKkwsCa+rsA7PlOZMTHluHHjRcVzAFuxYEo6nsR5n8P11gMWUL+FYae6rq7C2P37NhqursBm70MUnMeVuK34PfsaNQ3ivxZTfbXnflTHvxp6+j1k08wPF+zamfHbA4O+PAMPrdRXu6DfKBKY0E9pdV+G2RfC6ClvxAC7h0/aodRV24bkRYLgJ77TNmPIZnMIazQSvwusqrO4zj8eUL7TAq3BkCXBPL9ZV2D7An8EcttVVuO8KHI/idvSOR1sHNQljOZrAkfbRKrnii9KcrKvQ6dRVuAVPFfNoTHm+v1NdhY14e5ngnnbihQH+lziPu/BQRzP73lfOD+iwqjwr1Q0DvC4Wyu81nZjyP+hVnudLar2imPI5TWVbiU6jHuA/hk34HSd6oK9wDpvxyIBOH2jO93LUxSsx5cv9ZqluT5bm0ZjyQgdKCp0pgb11Fdb3dyzxQ8uET8eUTw7wn8Va/BhT/om+cx5TPo1fsA572z1jyrOaXD1K/+LVtlky407Nnpru+e0MN4XLeLidqYoOaer7ML3XzozlyE1qNvU3pdothseUf8PJ4k9qKab8q2bDbBzyDDqS23EvLmqt3ET7DldX4WYc1iz/hzHlH0bMdKRKFTuMDfg4ppz744tKakz5Ij4rzQMl9Y6rJwr4rGZFr9Gwm8wJ/KFZ4t3jUEv1erw0p9rleSg8pryg2Xw0N9Bbx+Dv11SxU2WvLNKi/7xfdRVexoNjgHuaw5sx5b8GBZe6t0+7movH0ewwMPwPXnjvALNrsykAAAAASUVORK5CYII="
        
        var symbolSize = 30

        this.myChart = echarts.init(ops.el)
        this.initWidth = ops.width || this.myChart.getWidth()
        this.initHeight = ops.height || this.myChart.getHeight()

        this.option = option = {
            title: {
                text: '折线图堆叠',
                textStyle:{
                    color:'#33adce',
                    fontSize:32
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
                data: ["企业01","企业02","企业03","企业04","企业05"]
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
                boundaryGap: true,
                data: ['2014','2015','2016','2017'],
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
                    symbol:'image://'+yellowSymbol,
                    symbolSize:symbolSize,
                    name: '企业01',
                    type:'line',
                    data:[ 210, 300, 800, 2200],
                    itemStyle:{
                        color:'#eeb033'
                    }
                },
                {
                    symbol:'image://'+blueWhiteSymbol,
                    symbolSize:symbolSize,
                    name: '企业02',
                    type:'line',
                    data:[ 400, 150, 900, 1600],
                    itemStyle:{
                        color:'#268c85'
                    }
                },
                {
                    symbol:'image://'+yellowWhiteSymbol,
                    symbolSize:symbolSize,
                    name: '企业03',
                    type:'line',
                    data:[ 1400, 1200, 1700, 800],
                    itemStyle:{
                        color:'#9f973c'
                    }
                },
                {
                    symbol:'image://'+whiteSymbol,
                    symbolSize:symbolSize,
                    name: '企业04',
                    type:'line',
                    data:[ 2100, 1900, 2300, 600],
                    itemStyle: {
                        color:'#fff'
                    }
                },
                {
                    symbol:'image://'+blueSymbol,
                    symbolSize:symbolSize,
                    name: '企业05',
                    type:'line',
                    data:[ 700, 1500, 1800, 1100],
                    itemStyle: {
                        color:'#2f99b6'
                    }
                }
                
                
            ]
        }
        
        this.myChart.setOption(this.option)
    }

    window.Chartline4 = Chartline4
})(window,document)