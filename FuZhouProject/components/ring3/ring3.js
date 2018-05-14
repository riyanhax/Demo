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
    function Ring3(ops){
        this.zr = zrender.init(ops.el || document.body)
        this.initWidth = ops.width || this.zr.getWidth();
        this.initHeight = ops.height || this.zr.getHeight();

        this.data = ops.data || []
        this.indicator = ops.indicator || [
            { text: '企业健康度' },
            { text: '政策' },
            { text: '人才' },
            { text: '成果' },
            { text: '金融' }
        ]
        
        var x = ops.x || this.initWidth/4;
        var y = ops.y || this.initHeight/2+(this.zr.getHeight()-this.initHeight)/2;
        this.outterR = ops.r || this.VHRatio(this.initWidth,this.initHeight)/2;
        var r = this.outterR*0.703

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

        // 画外部的壳
        this.drawOuterCircle(x,y,this.outterR)
       
        // 画两边的线
        this.doubleCircle(x,y, r,ops.color || '#0e7088')
        this.doubleCircle(x,y, r*0.75,ops.color || '#0e7088',3,true,ops.title || '近三年扬州市\n\n各类创新创业企业\n\n业务领域分布')

        // 画格子
        this.sectorCircle(x,y,r*0.96,r*0.79,ops.color || '#fff',ops.length || 20,ops.sapce || 5)

        // 画气泡图
        this.drawSmallBubble(x,y,r*0.4)

        // 画图例
        this.drawLenged(x,y,r)

    }
    Ring3.prototype.update = function(ops){

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
        this.sectorBubble(x,y,r*0.4,ops.title || '近三年扬州市\n各类创新创业企业\n业务领域分布')
    }
    Ring3.prototype.drawOuterCircle = function(x,y,r){
        gradient = new zrender.RadialGradient(0.5,0.5,0.7,[
            {
                offset:0,
                color:'rgba(9,52,65,0)'
            },
            {
                offset:0.5,
                color:'rgba(9,52,65,0.05)'
            },
            {
                offset:1,
                color:'rgba(9,52,65,1)'
            }])
        var circle = new zrender.Circle({
            shape:{
                cx:x,
                cy:y,
                r:r
            },
            style:{
                fill:gradient,
                stroke:'rgba(9,52,65,1)'
            }
        })
        this.zr.add(circle)
    }

    Ring3.prototype.drawSmallBubble = function(x,y,r){
        var bubbleR = r*0.5;
        var _this = this
        var scale = 0;
        this.smallBubbles = [];
        zrender.util.map(this.data,function(data,i){

            
            var angle = Math.round(data.scale*360/2)+scale

            scale+=Math.round(data.scale*360)
            
            var cx = x+r*3.01*Math.cos(angle*Math.PI/180);
            var cy = y+r*3.02*Math.sin(angle*Math.PI/180);

            var bubble = new zrender.Circle({
                shape:{
                    cx:cx,
                    cy:cy,
                    r:0
                },
                style:{
                    fill:_this.bubbleGradient,
                    text:data.scale*1000,
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

    Ring3.prototype.dataSectorCircle = function(target,x,y,r1,r2){
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

    Ring3.prototype.sectorCircle = function(x,y,r1,r2,color,length,space){

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
    Ring3.prototype.VHRatio = function(w,h){
        return w>h?h*0.78:w
    }
    Ring3.prototype.doubleCircle = function(x,y,r,color,width,fill,title){
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
        if(fill && title !==''){
            circle.attr({
                style:{
                    text:title,
                    fontFamily:'微软雅黑',
                    fontSize:r*0.143,
                    textFill:'#eeb033',
                    textPadding:[20, 40]
                }
            })
        }
        this.zr.add(circle)
    }

    Ring3.prototype.drawLenged = function(ops){
        
        var gradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: 'rgba(27, 27, 27, 0.5)'
        }, {
            offset: 0.5,
            color: 'rgba(9, 42, 48, 0.9)'
        },
        {
            offset: 1,
            color: 'rgba(27, 27, 27, 0.5)'
        }])

        var width = this.outterR*0.92
        var height = width*1.3

        var x = (ops.lenged && ops.lenged.x) || this.initWidth*0.95 - width
        var y = (ops.lenged && ops.lenged.y) || this.initHeight*0.95 - height
 
        this.createRect(x,y,width,height,gradient)
        this.createRect(x,y,width,width*0.076,'#1b1b1b')
        this.createRect(x,y+width*0.076,width,width*0.076/2,'#000')
        this.createRect(x,y,width,width*0.076/4,'#a67d29')
        this.createRect(x,y+height-width*0.076,width,width*0.076,'#1b1b1b')
        this.createRect(x,y+height-width*0.076,width,width*0.076/4,'#2d8ca6')
        this.createRect(x,y+height-width*0.076-width*0.076/2,width,width*0.076/2,'#000')

        this.createText(x,y+width*0.076+width*0.076/4,width,width*1.105)

    }

    Ring3.prototype.createRect = function(x,y,w,h,color){
        var rect = new zrender.Rect({
            shape:{
                x:x,
                y:y,
                width:w,
                height:h
            },
            style:{
                fill:color   
            }
        })
       this.zr.add(rect)
    }

    Ring3.prototype.createText = function(x,y,width,height){
        var singleHeight = height/this.indicator.length
        var ySpace = singleHeight*0.42
        y+=ySpace
        var _this = this
        zrender.util.map(this.indicator,function(lenged,i){
            var rect = new zrender.Rect({
                shape:{
                    x:x*1.02,
                    y:y+i*singleHeight*0.5+i*ySpace,
                    width:singleHeight*0.5,
                    height:singleHeight*0.5
                },
                style:{
                    fill: _this.data[i].color ,
                    text:lenged.text,
                    textFill:'#2a89a2',
                    fontSize:height*0.08,
                    fontFamily:'微软雅黑',
                    textAlign:'left',
                    textPosition:[singleHeight*0.7,singleHeight*0.25],
                    textVerticalAlign:'middle'
                }
            })
           _this.zr.add(rect)
        })
        
    }
    
    window.Ring3 = Ring3;
})(window,document)

