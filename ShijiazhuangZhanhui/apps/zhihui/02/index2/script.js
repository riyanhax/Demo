var tableData  = [
    {
        detail:'鸟情',
        area:'围栏区域',
        level:'低'
    },
    {
        detail:'火情',
        area:'围栏区域',
        level:'中'
    },
    {
        detail:'外围传感器',
        area:'围栏区域',
        level:'低'
    },
    {
        detail:'鸟情',
        area:'围栏区域',
        level:'高'
    },
    {
        detail:'外围传感器',
        area:'围栏区域',
        level:'中'
    },
    {
        detail:'火情',
        area:'围栏区域',
        level:'中'
    },
    {
        detail:'鸟情',
        area:'围栏区域',
        level:'低'
    }
]

createData()

setInterval(function(){
    $('table > tbody').empty()
    createData()
},3000)

function createData(){
    tableData.forEach(function(data,i){
        var date = new Date()
        var time = date.getFullYear().toString().substr(2)+'-'+toDub(date.getMonth())+'-'+toDub(date.getDate())+' '+toDub(date.getHours())+':'+toDub(date.getMinutes())+':'+toDub(date.getSeconds());
        var html =  '<td>'+toDub(i+1)+'</td>'
                    +'<td>'+data.detail+'</td>'
                    +'<td>'+data.area+'</td>'
                    +'<td>'+data.level+'</td>'
                    +'<td>'+time+'</td>'
        var obj = $('<tr class="opacity"></tr>').html(html).appendTo($('table > tbody'))
        if(data.level == '高'){
            obj.find('td:eq(3)').addClass('fail')
        }
        setTimeout(function(){
            obj.removeClass('opacity')
        },50*i)
    })
}

var zr = zrender.init($('.wrap').get(0))

var pos = [
    {
        name:'通信异常',
        x:386,
        y:450
    },
    {
        name:'模块损坏',
        x:966,
        y:450
    },
    {
        name:'读数异常',
        x:1550,
        y:450
    }
]
var line = [
    {
        x:396,
        y:750,
        name:'通信异常'
    },
    {
        x:396,
        y:822,
        name:'模块损坏'
    },
    {
        x:396,
        y:890,
        name:'读数异常'
    }
]
update()

function update(){
    var removeCircles = []
    var removeLines = []
    for(var i=0;i<3;i++){
        var angle = Math.random()
        var circle = drawSector(pos[i].x,pos[i].y,angle,(angle*100).toFixed(0),pos[i].name)
        removeCircles = removeCircles.concat(circle)
        var lines = drawBar(line[i].x,line[i].y,1246,line[i].name,(angle*100).toFixed(0),angle)
        removeLines = removeLines.concat(lines)
        
    }
    setTimeout(function(){
        for(var i in removeCircles){
            zr.remove(removeCircles[i])
            zr.remove(removeLines[i])
        }
        update()
    },2000)
}


function drawBar(x,y,dis,title,num,scale){
    var line1 = new zrender.Line({
        shape:{
            x1:x,
            y1:y,
            x2:x+dis,
            y2:y
        },
        style:{
            stroke:'#14323a',
            lineWidth:4,
            text:title,
            fontFamily:'微软雅黑',
            textFill:'#00adfe',
            fontSize:36,
            textAlign:'right',
            textPosition:'left'
        }
    })

    var line2 = new zrender.Line({
        shape:{
            x1:x,
            y1:y,
            x2:x+dis*scale,
            y2:y
        },
        style:{
            stroke:'#0e4556',
            lineWidth:8
        }
    })

    var line3 = new zrender.Line({
        shape:{
            x1:x,
            y1:y,
            x2:x,
            y2:y
        },
        style:{
            stroke:'#ea5514',
            lineWidth:10
        }
    })

    var line4 = new zrender.Line({
        shape:{
            x1:x,
            y1:y,
            x2:x+dis,
            y2:y
        },
        style:{
            text:num,
            fontFamily:'微软雅黑',
            textFill:'#00adfe',
            fontSize:36,
            textAlign:'left',
            textPosition:'right'
        }
    })

    line3.animateTo({
        shape:{
            x2:x+dis*scale
        }
    })

    zr.add(line1)
    zr.add(line2)
    zr.add(line3)
    zr.add(line4)
    return [line1,line2,line3,line4]
}

function drawSector(cx,cy,angle,num,title){
    var circle = new zrender.Circle({
        shape:{
            cx:cx,
            cy:cy,
            r:190
        },
        style:{
            stroke:'#5c797f',
            lineWidth:10,
            fill:'transparent',
            textFill:'#ea5514',
            text:num,
            fontFamily:'微软雅黑',
            fontSize:70,
            textVerticalAlign:'bottom'
    
        }
    })
    var circle2 = new zrender.Sector({
        shape:{
            cx:cx,
            cy:cy,
            r:190,
            r0:190,
            startAngle:0,
            endAngle:0
        },
        style:{
            stroke:'#00adfe',
            lineWidth:10,
            fill:'transparent'
    
        }
    })
    var circle3 = new zrender.Sector({
        shape:{
            cx:cx,
            cy:cy,
            r:170,
            r0:170,
            startAngle:0,
            endAngle:0
        },
        style:{
            stroke:'#00adfe',
            lineWidth:5,
            fill:'transparent'
    
        }
    })
    var circle4 = new zrender.Circle({
        shape:{
            cx:cx,
            cy:cy,
            r:190
        },
        style:{
            fill:'transparent',
            textFill:'#0a7cff',
            text:title,
            fontFamily:'微软雅黑',
            fontSize:38,
            textPosition:[120,233]
    
        }
    })
    circle2.animateTo({
        shape:{
            endAngle:Math.PI*2*angle
        }
    })
    circle3.animateTo({
        shape:{
            endAngle:Math.PI*2*angle
        }
    })
    zr.add(circle)
    zr.add(circle2)
    zr.add(circle3)
    zr.add(circle4)
    return [circle,circle2,circle3,circle4]
}




function toDub(n){
    return n<9?'0'+n:n
}