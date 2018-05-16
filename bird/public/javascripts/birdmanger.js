var oBirdWrap = document.getElementById('birdWrap');
var aBirdManger = document.querySelectorAll('.bird-manger');
var menuIndex = localStorage.getItem('number') || 0;
var oCloseBtn = document.getElementById('close-btn');
var checkAll = document.querySelectorAll('.bird-manger .title input');
var switchBtn = document.getElementById('switch-btn');
var switchBox = document.getElementById('switch-box');
var aMenu = document.querySelectorAll('.bird-manger .title');

if(localStorage.getItem('number') == 1){
  document.querySelector('.check-text').classList.remove('hide');
  document.querySelector('.switch-btn').classList.remove('hide');
}

switchBtn.onclick = function(){
  switchBox.checked = !switchBox.checked;
  var aChk = aBirdManger[1].querySelectorAll('ol input[type=checkbox]');
  if(switchBox.checked){

    for(var i=0;i<aChk.length;i++){
      if(!aChk[i].checked){
        aChk[i].parentNode.parentNode.style.display = 'none';
      }
    }
  }else{
    for(var i=0;i<aChk.length;i++){
      aChk[i].parentNode.parentNode.style.display = 'block';
    }
  }
}

aBirdManger[0].onclick = function(e){
  if(e.target.nodeName == 'INPUT' && e.target.type == 'radio'){
    var data = {
      deviceId:e.target.parentNode.children[2].children[1].innerText,
      // interTime: e.target.parentNode.children[3].children[1].children[0].value,
      Action:" Open"
    };
    localStorage.removeItem('bird_device');
    localStorage.setItem('bird_device','['+JSON.stringify(data)+']');
    location.hash = '{"data":['+JSON.stringify(data)+']}';
  }
}

aBirdManger[1].onclick = function(e){
  if(e.target.nodeName == 'INPUT' && e.target.type == 'checkbox'){
    var aChk = aBirdManger[1].querySelectorAll('ol input[type=checkbox]');
    var arr = [];
    for(var i=0;i<aChk.length;i++){
      if(aChk[i].checked){
        var data = {
          deviceId: aChk[i].parentNode.children[2].children[1].innerText,
          // interTime: aChk[i].parentNode.children[3].children[1].children[0].value,
          Action:" Open"
        };
        arr.push(data);
      }
    }
    location.hash = '{"data":'+JSON.stringify(arr)+'}';
    localStorage.removeItem('bird_device');
    localStorage.setItem('bird_device',JSON.stringify(arr));

  }
}

for(var i=0;i<checkAll.length;i++){
  checkAll[i].onclick = function(){

    var chk = this.parentNode.parentNode.parentNode.querySelectorAll('ol input[type=checkbox]');
    var bool = this.checked;
    for(var i=0;i<chk.length;i++){
      chk[i].checked = bool;
    }

    var aChk = aBirdManger[1].querySelectorAll('ol input[type=checkbox]');
    var arr = [];
    for(var i=0;i<aChk.length;i++){
      if(aChk[i].checked){
        var data = {
          deviceId: aChk[i].parentNode.children[2].children[1].innerText,
          // interTime: aChk[i].parentNode.children[3].children[1].children[0].value,
          Action:" Open"
        };
        arr.push(data);
      }
    }
    var dump = arr.length?arr:'';
    location.hash = '{"data":'+JSON.stringify(dump)+'}';
  }
}

for(var i=0;i<aBirdManger.length;i++){
  aBirdManger[i].classList.add('hide');
}

aBirdManger[menuIndex].classList.remove('hide');

window.addEventListener('storage',function(e){

  if(localStorage.getItem('socket_error')){
    Message(localStorage.getItem('socket_error'));
    localStorage.removeItem('socket_error');
  }

  for(var i=0;i<aBirdManger.length;i++){
    aBirdManger[i].classList.add('hide');
  }

  aBirdManger[localStorage.getItem('number')].classList.remove('hide');

  if(localStorage.getItem('number') == 2){

    updateDeviceList();

  }

  if(localStorage.getItem('number') == 1){
    document.querySelector('.check-text').classList.remove('hide');
    document.querySelector('.switch-btn').classList.remove('hide');
    var aChk = oBirdWrap.querySelectorAll('.bird-manger')[1].querySelectorAll('ol .bird-device');
    var groups = localStorage.getItem('groupList')!='undefined'?JSON.parse(localStorage.getItem('groupList')):[];

    for(var j=0;j<aChk.length;j++){
      aChk[j].children[0].checked = false;
    }

    if(groups && groups.length){
      for(var i=0;i<groups.length;i++){
        for(var j=0;j<aChk.length;j++){
          if(aChk[j].children[2].children[1].innerText == groups[i]){
            aChk[j].children[0].checked = true;
          }
        }
      }
    }
  }
  else {
    document.querySelector('.check-text').classList.add('hide');
    document.querySelector('.switch-btn').classList.add('hide');
  }
});

oCloseBtn.onclick = function(){
  oBirdWrap.classList.add('scale-out');
  location.hash = JSON.stringify({closeWindow:true});
}

var xhr = new XMLHttpRequest();
xhr.open('POST','/bird/get',true);
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4 && xhr.status == 200){

    var data = JSON.parse(xhr.responseText);
    createDeviceList(data.data);
    for(var i=0;i<aMenu.length;i++){
      updateTitleNum(aMenu[i])
    }
  }
}
xhr.send();

function createDeviceList(data){
  var sort = {
    "05":0,
    "10":1,
    "08":2,
    "07":3,
    "06":4
  };
  var ol = aBirdManger[0].querySelectorAll('ol');
  for(var i=0;i<data.length;i++){
    var tml = `<div class="bird-device">
                <input type="radio" name="myradio" />
                <div>
                  <span class="name">名称</span>
                  <span class="value">${data[i].devicename}</span>
                </div>
                <div>
                  <span class="name">编号</span>
                  <span class="value">${data[i].deviceId}</span>
                </div>
                <div class="hide">
                  <span class="name">持续时间</span>
                  <span class="value">
                    <input type="text" disabled readonly value="">
                    <span class="arrow-up"></span>
                    <span class="arrow-down"></span>
                    <span class="util">秒</span>
                  </span>
                </div>
              </div>`;
              //${data[i].time_interval || 0}

      var oLi = document.createElement('li');
      oLi.innerHTML = tml;
      var oOl = ol[sort[data[i].deviceType]];
      oOl && oOl.appendChild(oLi);
  }

  var muilteOl = aBirdManger[1].querySelectorAll('ol');
  for(var i=0;i<data.length;i++){
    var tml = `<div class="bird-device">
                <input type="checkbox" name="myradio" />
                <div>
                  <span class="name">名称</span>
                  <span class="value">${data[i].devicename}</span>
                </div>
                <div>
                  <span class="name">编号</span>
                  <span class="value">${data[i].deviceId}</span>
                </div>
                <div class="hide">
                  <span class="name">持续时间</span>
                  <span class="value">
                    <input type="text" disabled readonly value="">
                    <span class="arrow-up"></span>
                    <span class="arrow-down"></span>
                    <span class="util">秒</span>
                  </span>
                </div>
              </div>`;
              //${data[i].time_interval || 0}
      var oLi = document.createElement('li');
      oLi.innerHTML = tml;
      var oOl = muilteOl[sort[data[i].deviceType]];
      oOl && oOl.appendChild(oLi);
  }

  var allOl = aBirdManger[2].querySelectorAll('ol');
  for(var i=0;i<data.length;i++){
    var tml = `<div class="bird-device">
                <input type="checkbox" name="myradio" disabled checked/>
                <div>
                  <span class="name">名称</span>
                  <span class="value">${data[i].devicename}</span>
                </div>
                <div>
                  <span class="name">编号</span>
                  <span class="value">${data[i].deviceId}</span>
                </div>
                <div class="hide">
                  <span class="name">持续时间</span>
                  <span class="value">
                    <input type="text" unselectable="on" disabled readonly value="">
                    <span class="arrow-up"></span>
                    <span class="arrow-down"></span>
                    <span class="util">秒</span>
                  </span>
                </div>
              </div>`;
              //${data[i].time_interval || 0}
      var oLi = document.createElement('li');
      oLi.innerHTML = tml;
      var oOl = allOl[sort[data[i].deviceType]];
      oOl && oOl.appendChild(oLi);
  }

  // var oArrowUp = document.querySelectorAll('.arrow-up');
  // var oArrowDown = document.querySelectorAll('.arrow-down');
  // for(var i=0;i<oArrowUp.length;i++){
  //   oArrowUp[i].onclick = function(){
  //     var input = this.parentNode.children[0];
  //     var n = +input.value;
  //     n+=1;
  //     input.value = n;
  //     updateDeviceList();
  //     location.hash = JSON.stringify({
  //       deviceid:this.parentNode.parentNode.previousElementSibling.children[1].innerText,
  //       interTime:n
  //     });
  //   }
  //   oArrowDown[i].onclick = function(){
  //     var input = this.parentNode.children[0];
  //     var n = +input.value;
  //     n-=1;
  //     n = n<=0?0:n;
  //     input.value = n;
  //     updateDeviceList();
  //     location.hash = JSON.stringify({
  //       deviceid:this.parentNode.parentNode.previousElementSibling.children[1].innerText,
  //       interTime:n
  //     });
  //   }
  // }

}

function updateTitleNum(dom){
  dom.querySelector('.right').innerText  = dom.parentNode.querySelector('ol').children.length;
}

function updateDeviceList() {
  var aChk = aBirdManger[0].querySelectorAll('ol input[type=checkbox]');
  var arr = [];
  for(var i=0;i<aChk.length;i++){
    if(aChk[i].checked){
      var data = {
        deviceId: aChk[i].parentNode.children[2].children[1].innerText,
        // interTime: aChk[i].parentNode.children[3].children[1].children[0].value,
        Action:" Open"
      };
      arr.push(data);
    }
  }
  localStorage.removeItem('bird_device');
  localStorage.setItem('bird_device',JSON.stringify(arr));
}
