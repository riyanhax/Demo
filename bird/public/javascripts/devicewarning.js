var oStatusWrap = document.getElementById('warn-wrap');
var oDeviceList = oStatusWrap.getElementsByClassName('device-list')[0];
var aLi = oStatusWrap.getElementsByClassName('top-menu')[0].children;
var oTemplate = document.getElementById('template');
var parser = new DOMParser();
var tmpDom = parser.parseFromString(oTemplate.innerHTML, "text/html").body;
var deviceStatusList = null;
var menuStatusNames = ['05','10','08','07','06','09','00'];
var oCloseBtn = document.getElementById('close-btn');
var oldRealTime = [];
var currentTab = '05';
//var oAlarm = document.getElementById('alarm');


for(var i=0;i<aLi.length;i++){
  (function(i){
    aLi[i].onclick=function(){
      for(var j=0;j<aLi.length;j++){
        aLi[j].classList.remove('active');
      }
      this.classList.add('active');
      genertorDeviceList(deviceStatusList[menuStatusNames[i]]);
      currentTab = menuStatusNames[i];
    }
  })(i);
}

startState();
setInterval(startState,1000);

function startState(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/device/getStatus',true);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var res = JSON.parse(this.responseText);
      var data = res.data;
      if(JSON.stringify(data) !== JSON.stringify(oldRealTime)){
        var json = {};
        for(var i=0;i<menuStatusNames.length;i++){
          json[menuStatusNames[i]] = [];
        }

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
        genertorDevicesBadge(json);
        //alarm(json);
        oldRealTime = data;
      }

    }
  }
}

function alarm(json){
  for(var key in json){
    var data = json[key];
    for(var i=0;i<data.length;i++){

      if(+data[i].alert == 0){
        continue;
      }

      if(+data[i].alert != 2){
        oAlarm.play();
      }

    }
  }
}

function genertorDevicesBadge(json){
  var menuStates = [];
  for(var i=0;i<menuStatusNames.length;i++){
    var data = json[menuStatusNames[i]];
    if(data == undefined){
      continue;
    }
    var n = 0;
    for(var j=0;j<data.length;j++){
      if(+data[j].alert == 1 || +data[j].alert == 2){
        n++;
      }
    }
    menuStates.push(n)
  }

  for(var i=0;i<menuStates.length;i++){
    if(menuStates[i]!==0){
      aLi[i].querySelector('.warn-num').innerText = menuStates[i];
      aLi[i].querySelector('.warn-num').style.display = 'block';
    }else{
      aLi[i].querySelector('.warn-num').style.display = 'none';
    }
  }
}

function genertorDeviceList(deviceList){

  oDeviceList.innerHTML = '';
  if(deviceList == undefined){
    return;
  }

  for(var i=0;i<deviceList.length;i++){
    if(+deviceList[i].alert == 0){
      continue;
    }
    var oLi = document.createElement('li');
    oLi.deviceId = deviceList[i].deviceId;
    tmpDom.children[1].innerHTML = '(故障)';
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

    if(deviceList[i].deviceType == '09'){
      tmpDom.children[0].children[4].style.display = 'none';
    }else{
      tmpDom.children[0].children[4].style.display = 'block';
    }

    if(deviceList[i].alert != 2){
      oLi.classList.add('fault');
      tmpDom.children[1].classList.add('fault');
      tmpDom.children[2].style.display = "block";
    }else{
      tmpDom.children[2].style.display = "none";
    }

    tmpDom.children[0].children[2].classList.remove('badbreak');
    tmpDom.children[0].children[3].classList.remove('badbreak');
    tmpDom.children[0].children[4].classList.remove('badbreak');
    tmpDom.children[0].children[5].classList.remove('badbreak');
    if(deviceList[i].deviceType != '09'){
      var warnInfo = deviceList[i].Alert_reasons.split(',');
      for(var j=0;j<warnInfo.length;j++){
        switch (warnInfo[j]) {
          case '1':
            tmpDom.children[0].children[3].classList.add('badbreak');
            break;
          case '2':
            tmpDom.children[0].children[4].classList.add('badbreak');
            break;
          case '3':
            tmpDom.children[0].children[2].classList.add('badbreak');
            break;
          case '4':
            tmpDom.children[0].children[5].classList.add('badbreak');
            break;
        }
      }
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

oDeviceList.onclick = function(e){
  if(e.target.className == 'confirm-btn'){

    //oAlarm.pause();
    //oAlarm.currentTime = 0;
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/device/updateState',true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send('deviceId='+e.target.parentNode.deviceId+'&alert=2');
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        var res = JSON.parse(this.responseText);
        var data = res.data;
        e.target.parentNode.classList.remove('fault');
        e.target.parentNode.removeChild(e.target);
        startState();
      }
    }

  }
}
