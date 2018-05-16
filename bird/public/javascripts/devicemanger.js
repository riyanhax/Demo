var oAddBtn = document.querySelectorAll('.addBtn');
var oDeviceWrap = document.getElementById('device-wrap');
var oDeviceTml = document.getElementById('device-tml');
var deviceList = oDeviceWrap.children[2].children;
var oCloseBtn = document.getElementById('close-btn');
var sort = {
  "05":0,
  "10":1,
  "08":2,
  "07":3,
  "06":4
};
var tab = ['05','10','08','07','06'];
var deviceTypes = ['煤气炮','移动式太阳能声波驱鸟','全向声波驱鸟器','定向声波驱鸟器','声音驱鸟系统'];
var oldId = '';
var hashData = {closeWindow:true,newDevice:[]};
var isAdd = false;

for(var i=0;i<oAddBtn.length;i++){

  oAddBtn[i].nextElementSibling.setAttribute('tabindex',i);

  (function(index){
    oAddBtn[index].onclick = function(){

      var oLi = document.createElement('li');
      oLi.innerHTML = oDeviceTml.innerHTML;
      var insertDom = this.parentNode.getElementsByTagName('ol')[0].children[0];
      this.parentNode.getElementsByTagName('ol')[0].insertBefore(oLi,insertDom);
      oLi.querySelector('.btn-edit').style.display = 'none';
      oLi.querySelector('.btn-save').style.display = 'block';
      var input = this.parentNode.getElementsByTagName('ol')[0].children[0].getElementsByTagName('input')[0];
      var input2 = this.parentNode.getElementsByTagName('ol')[0].children[0].getElementsByTagName('input')[1];
      var aInput = this.parentNode.getElementsByTagName('input');
      for(var i=0;i<aInput.length;i++){
        aInput[i].setAttribute('readonly',true);
      }

      input.removeAttribute('readonly');
      input2.removeAttribute('readonly');
      input.value = '';
      input.focus();
      updateTitleNum(this.parentNode);
      isAdd = true;

    }
  })(i);

}

oDeviceWrap.children[2].onclick = function(e){
  if(e.target.className === 'btn-remove'){
    var removeDom = e.target.parentNode;
    var parent = e.target.parentNode.parentNode;

    var removeid = removeDom.querySelector('.device-id input').value;
    ajax('post','/device/remove',{deviceId:removeid},function(res){
      parent.removeChild(removeDom);
      updateTitleNum(parent.parentNode);
    });

  }
  if(e.target.className === 'btn-edit'){
    var editdom = e.target.parentNode.getElementsByTagName('input');
    e.target.style.display = 'none';
    e.target.parentNode.querySelector('.btn-save').style.display = 'block';
    editdom[0].removeAttribute('readonly');
    editdom[1].removeAttribute('readonly');
    editdom[0].focus();
    oldId = editdom[1].value;

  }

  if(e.target.className === 'btn-save'){
    var editdom = e.target.parentNode.getElementsByTagName('input');
    e.target.style.display = 'none';
    e.target.parentNode.querySelector('.btn-edit').style.display = 'block';
    editdom[0].setAttribute('readonly',true);
    editdom[1].setAttribute('readonly',true);
    var tabIndex = e.target.parentNode.parentNode.getAttribute('tabIndex');
    ajax('post','/device/add',{devicename:editdom[0].value,deviceId:editdom[1].value,deviceType:tab[tabIndex],oldId:oldId},function(res){
        if(isAdd){
          hashData.newDevice.push({
            devicename:editdom[0].value,
            deviceid:editdom[1].value,
            devicetype:deviceTypes[tabIndex]
          });
        }
    });
    oldId = '';
  }
}

function updateTitleNum(dom){
  dom.querySelector('.title .right').innerText  = dom.querySelector('ol').children.length;
}

oCloseBtn.onclick = function(){
  oDeviceWrap.classList.add('scale-out');
  location.hash = JSON.stringify(hashData);
}

ajax('post','/device/get',{},function(res){

    var data = res.data;
    for(var i=0;i<data.length;i++){
      var tml = `<div class="device-name">
                  <span>名称</span>
                  <input type="text" value="${data[i].devicename}" readonly>
                </div>
                <div class="device-id">
                  <span>编号</span>
                  <input type="text" value="${data[i].deviceId}" readonly>
                </div>
                <div class="btn-edit"></div>
                <div class="btn-remove"></div>
                <div class="btn-save"></div>`;

      var oLi = document.createElement('li');
      oLi.innerHTML = tml;
      var obj = deviceList[sort[data[i].deviceType]];

      obj && obj.querySelector('ol').appendChild(oLi);
    }

    for(var i=0;i<deviceList.length;i++){
      updateTitleNum(deviceList[i])
    }

});

function ajax(method,url,data,success,error){
  var xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(),url,true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var res = JSON.parse(xhr.responseText);
      success && success(res)
    }else{
      error && error();
    }
  }
  xhr.send(formatData(data));

}

function formatData(data){
  var str = '';
  for(var key in data){
    str += key+'='+data[key]+'&'
  }

  return str;
}
