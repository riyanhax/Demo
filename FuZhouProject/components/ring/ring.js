;(function(window,document,undefined){
    /**
     * @param {Object} ops 
     * el {外部包围对象} <br>
     * width
     * height
     * x
     * y
     * r 图表的半径
     * length {格子的数量}
     */
    function Ring(ops){
        this.zr = zrender.init(ops.el || document.body)
        this.initWidth = ops.width || this.zr.getWidth();
        this.initHeight = ops.height || this.zr.getHeight();

        this.data = ops.data || []
        this.lenged = ops.lenged || []
        
        var x = ops.x || this.initWidth/2+(this.zr.getWidth()-this.initWidth)/2;
        var y = ops.y || this.initHeight/2+(this.zr.getHeight()-this.initHeight)/2;
        var r = ops.r || this.VHRatio(this.initWidth,this.initHeight)/2;

        this.animation = ops.animation || true;
        this.firstIn = ops.firstIn || true;

        // 球的渐变
        this.bubbleGradient = new zrender.RadialGradient(0.5,0.5,0.55,[
        {
            offset:0.75,
            color:'#0b262c'
        },
        {
            offset:1,
            color:'#0e7088'
        }])

        // 画两边的线
        this.doubleCircle(x,y, r,ops.color || '#0e7088')
        this.doubleCircle(x,y, r*0.75,ops.color || '#0e7088',3,true)

        // 画格子
        this.sectorCircle(x,y,r*0.96,r*0.79,ops.color || '#fff',ops.length || 20,ops.sapce || 5)

        // 画气泡图
        this.sectorBubble(x,y,r*0.4,ops.title || '扬州市高级\n人才占比')

        // 画图例
        this.drawLenged(x,y,r)

    }
    Ring.prototype.update = function(ops){

        var _this = this

        var x = ops.x || this.initWidth/2+(this.zr.getWidth()-this.initWidth)/2;
        var y = ops.y || this.initHeight/2+(this.zr.getHeight()-this.initHeight)/2;
        var r = ops.r || this.VHRatio(this.initWidth,this.initHeight)/2;

        zrender.util.map(this.smallBubbles,function(smallBubbles){
            _this.zr.remove(smallBubbles)
        })
        zrender.util.map(this.sectorCircles,function(sectorCircle){
            _this.zr.remove(sectorCircle)
        })
        this.zr.remove(this.dataSectorCircles)

        this.data = ops.data
        this.sectorCircle(x,y,r*0.96,r*0.79,ops.color || '#fff',ops.length || 20,ops.sapce || 5)
        this.sectorBubble(x,y,r*0.4,ops.title || '扬州市高级\n人才占比')
    }
    Ring.prototype.drawLenged = function(x,y,r){

        var w = r*0.042
        var space = 2*r/this.lenged.length;
        var startX = x-r/2;
        var startY = y+r;
        var _this = this

        zrender.util.map(this.lenged,function(data,i){
            var rect = new zrender.Rect({
                shape:{
                    x:startX+i*space,
                    y:startY*1.05,
                    width:w,
                    height:w
                },
                style:{
                    fill:data.color,
                    text:data.text,
                    textFill:'#227389',
                    fontFamily:'微软雅黑',
                    fontSize:r*0.05,
                    textPosition:'right'
                }
            })
    
            _this.zr.add(rect)
        })
        
    }

    Ring.prototype.sectorBubble = function(x,y,r,text){

        var bubble = new zrender.Circle({
            shape:{
                cx:x,
                cy:y,
                r:r
            },
            style:{
                fill:this.bubbleGradient,
                text:text,
                fontFamily:'微软雅黑',
                fontSize:r*2*0.143,
                textFill:'#eeb033'
            }
        })
        this.zr.add(bubble)
        this.drawSmallBubble(x,y,r)
    }

    Ring.prototype.drawSmallBubble = function(x,y,r){
        var bubbleR = r*0.35;
        var _this = this
        var scale = 0;
        this.smallBubbles = [];
        zrender.util.map(this.data,function(data,i){

            
            var angle = Math.round(data.scale*360/2)+scale

            scale+=Math.round(data.scale*360)
            
            var cx = x+r*1.41*Math.cos(angle*Math.PI/180);
            var cy = y+r*1.42*Math.sin(angle*Math.PI/180);

            var bubble = new zrender.Circle({
                shape:{
                    cx:cx,
                    cy:cy,
                    r:0
                },
                style:{
                    fill:_this.bubbleGradient,
                    text:Math.round(data.scale*100)+'%',
                    fontFamily:'微软雅黑',
                    fontSize:0,
                    textFill:data.color,
                    opacity:0
                }
            })

            if(_this.animation && this.firstIn){
                setTimeout(function(){
                    bubble.animateTo({
                        shape:{
                            r:bubbleR
                        },
                        style:{
                            opacity:1,
                            fontSize:bubbleR*0.7
                        }
                    },600,'cubicOut')
                },80*i)
                
            }else if(!this.firstIn){

                bubble.animateTo({
                    shape:{
                        cx:cx,
                        cy:cy,
                        r:bubbleR
                    },
                    style:{
                        opacity:1,
                        fontSize:bubbleR*0.7
                    }
                },600,'cubicOut')
            }else{
                bubble.attr({
                    shape:{
                        cx:cx,
                        cy:cy,
                        r:bubbleR
                    },
                    style:{
                        opacity:1,
                        fontSize:bubbleR*0.7
                    }
                })
            }
            
            _this.zr.add(bubble)
            _this.smallBubbles.push(bubble)
        })
        this.firstIn = false;
    }

    Ring.prototype.dataSectorCircle = function(target,x,y,r1,r2){
        var start = 0
        var _this = this
        var g = new zrender.Group()
        zrender.util.map(this.data,function(data){
            var dataSector = new zrender.Sector({
                shape:{
                    cx:x,
                    cy:y,
                    r:r1,
                    r0:r2,
                    startAngle:start,
                    endAngle:Math.PI*2
                },
                style:{
                    fill:data.color
                }
            })
            start+=Math.PI*2*data.scale
            dataSector.setClipPath(target)
            g.add(dataSector)
        })
        _this.zr.add(g)
        this.dataSectorCircles = g;
    }

    Ring.prototype.sectorCircle = function(x,y,r1,r2,color,length,space){

        var totalDeg =  Math.PI * 2
        var newSpace = space/360*totalDeg
        var surplus = totalDeg - (newSpace*length)
        var sectorW = surplus/length

        this.sectorCircles = []

        for(var i=0;i<length;i++){

            var start = i==0?0:i*(sectorW+newSpace)
           
            var sector = new zrender.Sector({
                shape:{
                    cx:x,
                    cy:y,
                    r:r1,
                    r0:r2,
                    startAngle:start,
                    endAngle:start+sectorW
                },
                style:{
                    fill:color
                }
            })

            this.dataSectorCircle(sector,x,y,r1,r2)
            this.sectorCircles.push(sector)
            
        }

    }
    Ring.prototype.VHRatio = function(w,h){
        return w>h?h*0.78:w
    }
    Ring.prototype.doubleCircle = function(x,y,r,color,width,fill){
        var gradient = new zrender.RadialGradient(0.5,0.5,0.55,[
            {
                offset:0,
                color:'#194b57'
            },
            {
                offset:1,
                color:'#11181a'
            }])
        var circle = new zrender.Circle({
            shape:{
                cx:x,
                cy:y,
                r:r
            },
            style:{
                stroke:color,
                lineWidth:width || 1,
                fill:fill?gradient:'transparent'
            }
        })
        this.zr.add(circle)
    }
    
    window.Ring = Ring;
})(window,document)

