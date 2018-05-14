// 1. 获取canvas画布
var container = document.getElementById('containter')
var canvas = document.getElementById('table')
// 2. 获取上下文对象
var ctx = canvas.getContext('2d')
// 3. 设置canvas大小
canvas.width = container.getBoundingClientRect().width;
canvas.height = container.getBoundingClientRect().height;

// 4. 开始画线

lineData.forEach(function(obj){
    drawline(obj)
})

function drawline(line){
    ctx.beginPath();
    ctx.strokeStyle = line.color;
    ctx.moveTo(line.from.x,line.from.y)
    ctx.lineTo(line.to.x,line.to.y)
    ctx.stroke()
}

// 5. 开始画矩形加描边和文字
    // - 定义数据结构（包括矩形宽高，颜色，位置信息）
    var rectWidth = 264;
    var rectHeight = 49;
    var rectBorderWidth = 2;
    
    // - 循环画矩形
    rectData.forEach(function(rect){
        drawRect(rect)
    })
    
    function drawRect(rect){
        ctx.fillStyle = rect.bgColor;
        ctx.strokeStyle = rect.borderColor;
        ctx.strokeWidth = rectBorderWidth;

        // 画矩形
        var rectangle = Rect(rect.x, rect.y, rectWidth,rectHeight);  
        drawRoundedRect(rectangle, 5);  
        ctx.fillRect(rectangle.x+2, rectangle.y+1, rectWidth-3,rectHeight-3)

        // 画文字
        ctx.font = "24px 微软雅黑"; 
        ctx.fillStyle = '#fff';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; 
        var str = rect.text.split(',')
         if(str.length>1){
            ctx.textBaseline = "bottom";
            ctx.fillText(str[0],rect.x+rectWidth/2,rect.y+rectHeight/2); 
            ctx.textBaseline = "top";
            ctx.fillText(str[1],rect.x+rectWidth/2,rect.y+rectHeight/2); 
        }else{
            ctx.fillText(rect.text,rect.x+rectWidth/2,rect.y+rectHeight/2); 
        }
    }
// 6. 动画函数
function animate(start,end,speed,fn){
    if(start.x>=end.x && start.y>=end.y){
        fn(end,'done')
        return;
    }
    var disX = (end.x - start.x)/speed;
    var disY = (end.y - start.y)/speed;
    start.x+=disX;
    start.y+=disY;
    fn(start)
    setTimeout(function(){
        animate(start,end,speed,fn)
    },1000/60)
}
// - 画圆角矩形
function Rect(x, y, w, h) {  
    return {x:x, y:y, width:w, height:h};  
}  

function Point (x, y) {  
    return {x:x, y:y};  
}
    
function drawRoundedRect(rect, r) {  
    var ptA = Point(rect.x + r, rect.y);  
    var ptB = Point(rect.x + rect.width, rect.y);  
    var ptC = Point(rect.x + rect.width, rect.y + rect.height);  
    var ptD = Point(rect.x, rect.y + rect.height);  
    var ptE = Point(rect.x, rect.y);  
        
    ctx.beginPath();  
        
    ctx.moveTo(ptA.x, ptA.y);  
    ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);  
    ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);  
    ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);  
    ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);  
    
    ctx.stroke();  
} 
