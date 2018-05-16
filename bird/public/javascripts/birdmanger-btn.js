var oStartBtn = document.getElementById('start-btn');
var oSwitchBox = document.getElementById('switch-box');
var oSwitchBtn = document.getElementById('switch-btn');
var aMenu = document.querySelector('.handle-menu ul').children;
var group = document.querySelectorAll('.addgroup ul')[0];
var tml = `<input type="text" value="新添加组" disabled>
            <div class="btn">
              <img src="../images/user-edit.png" alt="" class="group-edit" >
              <img src="../images/user-save.png" alt="" class="group-save" >
              <img src="../images/user-remove.png" alt="" class="group-remove" >
              <img src="../images/cancle.png" alt="" class="group-cancel" >
            </div>`;
var groupData = null;
var isAdd = false;
var deviceList;

function getDeviceList(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/bird/get',true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var data = JSON.parse(xhr.responseText);
      deviceList = data.data;
    }
  }
  xhr.send();
}

getDeviceList();
getGroups();
function getGroups(){

  var xhr = new XMLHttpRequest();
  xhr.open('POST','/bird/getGroup',true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var res = JSON.parse(xhr.responseText);
      groupData = res.data;
      for(var key in groupData){
        var oLi = document.createElement('li');
        oLi.innerHTML = tml;
        oLi.children[0].value = key;
        group.appendChild(oLi);
      }
      handleClick();
    }
  }
  xhr.send();
}

function handleClick(){

  var groupLi = group.querySelectorAll('li');
  for(var i=0;i<groupLi.length;i++){
    groupLi[i].onclick = function(e){
      if(this.parentNode.getAttribute('disabled') == null){
        var old = group.querySelector('.active');


        if(old && this !== old){
          old.classList.remove('active');
          old.querySelector('.group-edit').classList.remove('inline');
          old.querySelector('.group-remove').classList.remove('inline');
          old.querySelector('.group-save').classList.remove('inline');
          old.querySelector('.group-cancel').classList.remove('inline');
          old.children[0].setAttribute('disabled',true)
        }

        if(this.className !== 'base'){
          if(this !== old){
            this.classList.add('active');
            this.querySelector('.group-edit').classList.add('inline');
            this.querySelector('.group-remove').classList.add('inline');
            localStorage.removeItem('groupList');
            localStorage.removeItem('bird_device');
            var list = groupData[this.children[0].value];
            var tmp  = [];
            for(var i=0;i<list.length;i++){
              for(var j=0;j<deviceList.length;j++){
                if(deviceList[j].deviceId == list[i]){
                  tmp.push(deviceList[j]);
                }
              }
            }
            localStorage.setItem('bird_device',JSON.stringify(tmp));
            localStorage.setItem('groupList',JSON.stringify(list));
          }
        }else{
          groupAdd();
        }

        if(e.target.classList.contains('group-edit')){
          groupEdit(e.target);
        }

        if(e.target.classList.contains('group-remove')){
            groupRemove(e.target);
        }

        if(e.target.classList.contains('group-save')){
            groupSave(e.target);
            localStorage.removeItem('groupList');
            localStorage.setItem('groupList',JSON.stringify(groupData[this.children[0].value]));
        }

        // if(e.target.classList.contains('group-cancel')){
        //   groupCancel();
        // }

      }
    }
  }

}

var oldName = '';
var newItem = null;

//编辑组的功能
function groupEdit(obj){
  obj.classList.remove('inline');
  obj.parentNode.querySelector('.group-save').classList.add('inline');
  obj.parentNode.querySelector('.group-remove').classList.remove('inline');
  obj.parentNode.querySelector('.group-cancel').classList.add('inline');
  obj.parentNode.parentNode.children[0].removeAttribute('disabled');
  obj.parentNode.parentNode.children[0].focus();
  oldName = obj.parentNode.parentNode.children[0].value;
}

//删除租的功能
function groupRemove(obj){
  obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);

  var xhr = new XMLHttpRequest();
  xhr.open('POST','/bird/removeGroup',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var res = JSON.parse(xhr.responseText);
      localStorage.removeItem('groupList');
      localStorage.setItem('groupList','[]');
    }
  }
  xhr.send('userName='+localStorage.userName+'&groupid='+obj.parentNode.parentNode.children[0].value);
}

//保存租的功能
function groupSave(obj){
  obj.classList.remove('inline');
  obj.parentNode.querySelector('.group-edit').classList.add('inline');
  obj.parentNode.querySelector('.group-remove').classList.add('inline');
  obj.parentNode.querySelector('.group-cancel').classList.remove('inline');
  obj.parentNode.parentNode.children[0].setAttribute('disabled',true);

  var xhr = new XMLHttpRequest();
  xhr.open('POST','/bird/updateGroup',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var res = JSON.parse(xhr.responseText);
    }
  }

  xhr.send('oldName='+oldName+'&newName='+obj.parentNode.parentNode.children[0].value+'&userName='+localStorage.userName+'&groupid='+(newItem?newItem.children[0].value:"")+'&devices='+localStorage.getItem('bird_device'));

  var tmp = [];
  var groups = JSON.parse(localStorage.getItem('bird_device'));

  for(var i=0;i<groups.length;i++){
    tmp.push(groups[i].deviceId);
  }
  var name = obj.parentNode.parentNode.children[0].value;
  groupData[name] = tmp;

}

//添加租的功能
function groupAdd(){
  var aLi = group.children;
  var oLi = document.createElement('li');
  for(var i=0;i<aLi.length;i++){
    aLi[i].classList.remove('active');
  }
  oLi.innerHTML = tml;
  oLi.className = 'active';
  oLi.querySelector('.group-save').classList.add('inline');
  oLi.querySelector('.group-cancel').classList.add('inline');
  oLi.children[0].removeAttribute('disabled');
  group.insertBefore(oLi,group.children[1]);
  oLi.children[0].focus();
  newItem = oLi;
  localStorage.removeItem('groupList');
  localStorage.setItem('groupList','[]');
  isAdd = true;
  handleClick();
}

//取消编组
function groupCancel(){

}

//var oIntervalTime = document.querySelector('.intervalTime');
var menuActive = ['single','group','all'];
for(var i=0;i<aMenu.length;i++){
  (function(i){
    var index = i;
    aMenu[i].onclick = function(){
      var tmp = {
        drivebirds:menuActive[index]
      }
      location.hash = JSON.stringify(tmp);
      localStorage.removeItem('groupList');
      localStorage.setItem('groupList','[]');
      if(index == 1){
        group.removeAttribute('disabled');
      }else{
        group.setAttribute('disabled',true);
        var oActive = group.querySelector('.active');
        oActive && oActive.classList.remove('active');
        var groupLi = group.querySelectorAll('li .btn img');
        for(var i=0;i<groupLi.length;i++){
          groupLi[i].classList.remove('inline')
        }
      }
      localStorage.removeItem('bird_device');
      localStorage.setItem('bird_device','[]');
      localStorage.removeItem('number');
      localStorage.setItem('number', index);
      for(var i=0;i<aMenu.length;i++){
        aMenu[i].classList.remove('active');
      }
      this.classList.add('active');
      // if(index == 2){
      //   oIntervalTime.classList.remove('hide')
      // }else{
      //   oIntervalTime.classList.add('hide')
      // }
    }
  })(i)
}

oSwitchBtn.onclick = function(){
  oSwitchBox.checked = !oSwitchBox.checked;
}

// var oConfirm = document.querySelector('.confirm-btn');
// var totalTime = '';
// oConfirm.onclick = function(){
//   totalTime = this.parentNode.querySelector('input').value;
// };
oStartBtn.onclick = function(){

  if(oSwitchBox.checked){
    oSwitchBox.checked = false;
    var bird = JSON.parse(localStorage.getItem('bird_device'));
    //location.hash = JSON.stringify(bird);
    // if(localStorage.getItem('number') == 2 ){
    //   location.hash = JSON.stringify({drivebirds:true,time:oIntervalTime.children[1].children[0].value});
    // }else{
      location.hash = JSON.stringify({drivebirds:true});
    // }


    // var xhr = new XMLHttpRequest();
    // xhr.open('POST','/device/updateTime',true);
    // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    // xhr.onreadystatechange = function(){
    //   if(xhr.readyState == 4 && xhr.status == 200){
    //     var res = JSON.parse(xhr.responseText);
    //     groupData = res.data;
    //     for(var key in groupData){
    //       var oLi = document.createElement('li');
    //       oLi.innerHTML = tml;
    //       oLi.children[0].value = key;
    //       group.appendChild(oLi);
    //     }
    //   }
    // }
    // xhr.send('data='+JSON.stringify(bird));

    var socket = new WebSocket('ws://192.168.1.201:1234');

    socket.onopen = function(){
      for(var i=0;i<bird.length;i++){
        bird[i].User = localStorage.userName;
        // if(totalTime !== ''){
        //   console.log(totalTime)
        //   bird[i].Time = totalTime;
        // }

        socket.send(JSON.stringify(bird[i]));
      }
      localStorage.removeItem('socket_error');
      // totalTime  = '';
    }

    socket.onmessage = function(msg){

    }

    socket.onclose = function(){
      localStorage.removeItem('socket_error');
      localStorage.setItem('socket_error','驱鸟系统已关闭！')
    }

  }

}

// var oArrowUp = document.querySelectorAll('.arrow-up');
// var oArrowDown = document.querySelectorAll('.arrow-down');
// for(var i=0;i<oArrowUp.length;i++){
//   oArrowUp[i].onclick = function(){
//     var input = this.parentNode.children[0];
//     var n = +input.value;
//     n+=1;
//     input.value = n;
//   }
//   oArrowDown[i].onclick = function(){
//     var input = this.parentNode.children[0];
//     var n = +input.value;
//     n-=1;
//     input.value = n;
//   }
// }
