var oStatusWrap = document.getElementById('status-wrap');
var oDeviceList = oStatusWrap.getElementsByClassName('device-list')[0];
var aLi = oStatusWrap.getElementsByClassName('top-menu')[0].children;
var oTemplate = document.getElementById('template');
var parser = new DOMParser();
var tmpDom = parser.parseFromString(oTemplate.innerHTML, "text/html").body;
var deviceStatusList = null;
var oCloseBtn = document.getElementById('close-btn');
var menuStatusNames = ['05','10','08','07','06','09','00'];
var oldState = [];
var currentTab = '05';
for(var i=0;i<aLi.length;i++){
  (function(i){
    aLi[i].onclick=function(){
      currentTab = menuStatusNames[i];
      for(var j=0;j<aLi.length;j++){
        aLi[j].classList.remove('active');
      }
      this.classList.add('active');
      genertorDeviceList(deviceStatusList[menuStatusNames[i]]);
    }
  })(i);
}
var statusText = ['(通信故障)','(通信正常)'];
getStatusState();
setInterval(getStatusState,1000);
function getStatusState(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/device/getStatus',true);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var res = JSON.parse(this.responseText);
      var data = res.data;
      var json = {'09':[]};
      if(JSON.stringify(data) !== JSON.stringify(oldState)){
          for(var i=0;i<data.length;i++){
            if(typeof json[data[i].deviceType] == 'object'){
              json[data[i].deviceType].push(data[i]);
            }else{
              json[data[i].deviceType] = [];
              json[data[i].deviceType].push(data[i]);
            }

          }

          json['00'] = data;
          deviceStatusList = json;
          genertorDeviceList(json[currentTab]);
          oldState = data;
      }
    }
  }
}

function genertorDeviceList(deviceList){
  oDeviceList.innerHTML = '';
  if(deviceList == undefined){
    return;
  }
  for(var i=0;i<deviceList.length;i++){
    var oLi = document.createElement('li');
    tmpDom.children[1].innerHTML = statusText[deviceList[i].runningstate];
    tmpDom.children[0].children[0].children[1].innerText = deviceList[i].devicename;
    tmpDom.children[0].children[1].children[1].innerText = deviceList[i].deviceId;
    tmpDom.children[0].children[2].children[1].innerText = deviceList[i].Batterystate || '';
    tmpDom.children[0].children[3].children[1].innerText = deviceList[i].pressurestate;

    if(deviceList[i].deviceType == '05'){
      tmpDom.children[0].children[3].style.display = 'block';
    }else{
      tmpDom.children[0].children[3].style.display = 'none';
    }

    if(deviceList[i].deviceType == '07'){
      tmpDom.children[0].children[2].style.display = 'none';
    }else {
      tmpDom.children[0].children[2].style.display = 'block';
    }

    if(+deviceList[i].runningstate){
      oLi.classList.remove('fault');
      tmpDom.children[1].classList.remove('fault')
    }else{
      oLi.classList.add('fault');
      tmpDom.children[1].classList.add('fault')
    }
    oLi.innerHTML = tmpDom.innerHTML;
    if(i==0){
      oLi.classList.add('active');
    }
    oDeviceList.appendChild(oLi);
  }
}

oCloseBtn.onclick = function(){
  oStatusWrap.classList.add('scale-out');
  location.hash = JSON.stringify({closeWindow:true});
}
