!function(t,e,a){function r(t,e,a){function r(t,e,a,r){for(var l=0;l<28;l++)c.beginPath(),c.fillStyle="#2b2a3a",c.fillRect(t+(a+4)*l,e,a,r)}function l(t,e,a,r,l,o){var i=null,n=0;i=setInterval(function(){if(n>=o)return clearInterval(i),void(n=o);c.save(),c.beginPath(),c.fillStyle=l||"#2b2a3a",c.fillRect(t+(a+4)*n,e,a,r),c.restore(),n++},50)}var o=$("<canvas></canvas>"),i=$(".chart-top");o.attr({width:i.width(),height:i.height()}),o.appendTo(i);for(var n=["#0092f9","#00b191","#3bb001","#edbe00","#d95700","#d23c96"],s=["语义分析","检索","推荐","富标签","数据订阅","第三方"],c=o[0].getContext("2d"),h=0;h<6;h++)c.beginPath(),c.fillStyle="#131126",c.fillRect(310*h,0,290,565),c.strokeStyle="#2c2b3b",c.lineWidth=15,c.arc(138+310*h,181,108,0,2*Math.PI,!0),c.stroke(),c.fillStyle=n[h],c.fillRect(16+310*h,18,8,24),function(e){var a=null,r=360*t[e],l=r/60,o=0;a=setInterval(function(){o>=r?(o=r,clearInterval(a)):o+=l,c.save(),c.beginPath(),c.strokeStyle=n[e],c.lineCap="round",c.arc(138+310*e,181,108,-Math.PI/2,(o-90)*Math.PI/180,!1),c.stroke(),c.restore()},1e3/60)}(h),c.font="20px Micrisoft Yahei",c.fillStyle="#fff",c.fillText(s[h],36+310*h,36),c.fillText("TOP3",18+310*h,335),function(t,e,a,o){for(var i=0;i<3;i++)r(310*t+18,376+71*i,5,22),l(310*t+18,376+71*i,5,22,e,a[i]),c.fillStyle="#fff",o[i].right&&(c.save(),c.textAlign="left",c.fillText(o[i].right,18+310*t,370+71*i),c.textAlign="right",c.fillText(o[i].left,265+310*t,370+71*i),c.restore())}(h,n[h],e[h],a[h])}function l(t,e){e=e||{};var r,l=$(t),o=e.time,i=e.num,n=16*i/(1e3*o),s=0,c=0;r=setInterval(function(){(s+=n)>=i&&(clearInterval(r),r=a,s=i);var t=Math.floor(s);t!=c&&(c=t,str=e.hadStr?"<span>次</span>":"",l.html(c+str))},16)}!function(t){for(var t=t||[],e=[],a=0;a<=24;a++)t.push([a,100*Math.random()]),e.push(a);var r=echarts.init($(".chart-bottom").get(0)),l={normal:{color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"rgb(22,128,62)"},{offset:1,color:"rgb(8,67,133)"}]),label:{show:!1}}},o={backgroundColor:"rgba(0,0,0,0)",title:{show:!0,text:"24小时服务请求总量趋势",textStyle:{color:"rgba(255,255,255,0.8)"},padding:[10,20]},grid:{show:!1,borderWidth:0,x:40,y:60,x2:10,y2:25},calculable:!1,xAxis:[{type:"value",max:24,min:0,interval:1,data:e,axisLine:{show:!0},splitLine:{show:!1}}],yAxis:[{show:!0,type:"value",splitLine:{show:!0,lineStyle:{type:"dashed",color:"rgba(255,255,255,0.2)"}},axisLine:{show:!1}}],series:[{type:"line",smooth:!0,areaStyle:{normal:{}},itemStyle:l,data:t,showSymbol:!1}]};r.setOption(o)}();var o=[];$.get(Config.api.api1,function(t){if(200==t.code){var e=t.data;l($(".chart-title span"),{num:e.totalcount,time:1,hadStr:!1});for(var a=["semantic","retrieval","recommend","tag","subscription","thirdparty"],i=[],n=[],s=0;s<a.length;s++){l($(".chart-text li")[s],{num:e.count[0][a[s]+"Count"],time:1,hadStr:!0}),i.push((e.count[0][a[s]+"Count"]/e.totalcount).toFixed(2));for(var c=[],h=[],f=0;f<3;f++){var u=e.count[0][a[s]][f];u?(c.push(Math.floor(28*u.accessCount/e.count[0][a[s]+"Count"])),h.push({left:u.accessCount,right:u.apiName})):(c.push(0),h.push({}))}n.push(c),o.push(h)}r(i,n,o)}else console.error("接口数据有误！")})}(window,document);