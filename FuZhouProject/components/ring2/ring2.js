;(function(window,document,undefined){

    function Ring2(ops){
        this.dom = ops.el
        this.zr = zrender.init(this.dom)

        this.pointers = []
        this.polylines = []
        this.sectors = []

        this.initWidth = ops.width || this.zr.getWidth()
        this.initHeight = ops.height || this.zr.getHeight()
        this.posX = ops.x || this.initWidth/2
        this.posY = ops.y || this.initHeight/1.5
        this.sectorRadius = this.VHRatio(this.initWidth,this.initHeight)/3
        this.title = ops.title || {text:'投资轮次\n分析',color:'#eeb033'}
        this.legend = ops.legend || ['技改券','创新券','服务券']
        this.legendTitle = ops.legendTitle || '企业数量增长'

        this.data = ops.data || [{
                value:0.35,
                color:'#8f6d2f'
            },
            {
                value:0.4,
                color:'#9a9181'
            },
            {
                value:0.25,
                color:'#32a5c3'
            }
        ]

        this.drawSectorByPattern()
        this.drawSector()
        this.drawTitle()
        this.drawPointer()
        this.drawLegend()
    }

    Ring2.prototype.update = function(data){
        this.data = data
        var _this = this
        zrender.util.map(this.sectors,function(data,i){
            _this.zr.remove(data)
            _this.zr.remove(_this.polylines[i])
            _this.zr.remove(_this.pointers[i])
        })
        this.drawSector()
        this.drawPointer()
    }

    Ring2.prototype.drawLegend = function(){
        var _this = this
        this.legend.reverse()
        var index = this.legend.length
        var fontSize = this.sectorRadius*0.078
        zrender.util.map(this.legend,function(data,i){
            index--
            var rgbaArr = zrender.color.parse(_this.data[index].color)
            rgbaArr.length = 3
            var rect = new zrender.Rect({
                shape:{
                    x:_this.initWidth-_this.sectorRadius*0.7843*i-fontSize*2,
                    y:0,
                    width:fontSize,
                    height:fontSize
                },
                style:{
                    fill:'rgba('+rgbaArr.join(',')+',0.2)',
                    stroke:'rgb('+rgbaArr.join(',')+')',
                    text:data,
                    textFill:'#237e97',
                    fontSize:fontSize,
                    fontFamily:'微软雅黑',
                    textPosition:'left'
                }
            })
            _this.zr.add(rect)
        })
        var rect = new zrender.Rect({
            shape:{
                x:0,
                y:0,
                width:0,
                height:fontSize*1.4
            },
            style:{
                text:this.legendTitle,
                textFill:'#33adce',
                fontFamily:'微软雅黑',
                fontSize:fontSize*1.4,
                textPosition:'right'
            }
        })
        this.zr.add(rect)
    }

    Ring2.prototype.drawPointer = function(){
        var _this = this
        var minX = this.posX - this.sectorRadius
        var maxX = this.posX + this.sectorRadius
        var spaceX = (maxX-minX)/(this.data.length-1)
        var y = this.posY - this.sectorRadius*1.4824
        var angleValue = 0  
        
        zrender.util.map(this.data,function(data,i){

            var circle = new zrender.Circle({
                shape:{
                    cx:spaceX*i+minX,
                    cy:y,
                    r:_this.sectorRadius*0.0178
                },
                style:{
                    fill:'#33adce',
                    text:data.value*100+'%',
                    textFill:'#af852c',
                    fontSize:_this.sectorRadius*0.1077,
                    fontFamily:'微软雅黑',
                    textPosition:'top',
                    opacity:0
                }
            })

            _this.zr.add(circle)
            _this.pointers.push(circle)

            var angle = _this.data[i].value*360
            _this.drawPointerLine(spaceX*i+minX,y,angle/2+angleValue,i)

            angleValue+=angle

            setTimeout(function() {
                circle.animateTo({
                    style:{
                        opacity:1
                    }
                },600,'cubicOut')
            }, 200*i);
            
        })
    }

    Ring2.prototype.drawPointerLine = function(x,y,angle,i){
        
        var cx = this.posX+this.sectorRadius*0.8*Math.cos(angle*Math.PI/180)
        var cy = this.posY+this.sectorRadius*0.8*Math.sin(angle*Math.PI/180)
        var polyLinePoints = [[x,y],[x,cy*0.7],[cx,cy]]
        var polyline = new zrender.Polyline({
            shape:{
                points:polyLinePoints
            },
            style:{
                stroke:'#33adce',
                opacity:0
            }
        })
        this.zr.add(polyline)
        this.polylines.push(polyline)

        setTimeout(function() {
            polyline.animateTo({
                style:{
                    opacity:1
                }
            },600,'cubicOut')
        }, 200*i);
    }

    Ring2.prototype.drawTitle = function(){
        var circle = new zrender.Circle({
            shape:{
                cx:this.posX,
                cy:this.posY,
                r:this.sectorRadius*0.677
            },
            style:{
                fill:'transparent',
                text:this.title.text,
                textFill:this.title.color,
                fontFamily:'微软雅黑',
                fontSize:this.sectorRadius*0.1677
            }
        })
        this.zr.add(circle)
    }

    Ring2.prototype.drawSector = function(){
        var _this = this
        var endAngle = 0
        var startAngle = 0
        zrender.util.map(this.data,function(data,i){
            var rgbaArr = zrender.color.parse(data.color)
            rgbaArr.length = 3
            var gradient = new zrender.RadialGradient(0.5,0.5,data.value+0.3,[
            {
                offset:0,
                color:'rgba('+rgbaArr.join(',')+',0.7)'
            },
            {
                offset:0.5,
                color:'rgba('+rgbaArr.join(',')+',0.5)'
            },
            {
                offset:1,
                color:'rgba('+rgbaArr.join(',')+',0.1)'
            }])
            startAngle+=(_this.data[i-1]?_this.data[i-1].value:0)
            endAngle+=_this.data[i].value
            var sector = new zrender.Sector({
                shape:{
                    cx:_this.posX,
                    cy:_this.posY,
                    r:_this.sectorRadius,
                    r0:_this.sectorRadius*0.677,
                    startAngle:Math.PI*2*startAngle,
                    endAngle:Math.PI*2*endAngle
                },
                style:{
                    stroke:data.color,
                    lineWidth:4,
                    fill:gradient,
                    opacity:0
                }
            })
            _this.zr.add(sector)
            _this.sectors.push(sector)

            setTimeout(function() {
                sector.animateTo({
                    style:{
                        opacity:1
                    }
                },600,'cubicOut')
            }, 200*i);
        })
        
    }

    Ring2.prototype.drawSectorByPattern = function(){
        var pattern = new zrender.Pattern(this.drawPattern())

        var sector = new zrender.Sector({
            shape:{
                cx:this.posX,
                cy:this.posY,
                r:this.sectorRadius,
                r0:this.sectorRadius*0.677
            },
            style:{
                stroke:'#1f6477',
                lineWidth:2,
                fill:pattern
            }
        })
        this.zr.add(sector)
        
    }

    Ring2.prototype.drawPattern = function(){
        var canvas = zrender.util.createCanvas()
        canvas.width = this.sectorRadius
        canvas.height = this.sectorRadius
        var ctx = canvas.getContext('2d')
        var num = Math.round(this.sectorRadius/8)
        ctx.fillStyle = '#1e6377'
        ctx.rotate(Math.PI/180*-45)

        for(var i=0;i<num;i++){
            ctx.save()
            ctx.translate(-canvas.width,i*6)
            ctx.fillRect(0,i*6,canvas.width*2,2)
            ctx.restore()
           
        }
        
        var image = new Image()
        image.src = canvas.toDataURL()

        return image
    }

    Ring2.prototype.VHRatio = function(w,h){
        return w>h?h*0.78:w
    }

    window.Ring2 = Ring2
})(window,document)