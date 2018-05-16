var oUserManger = document.getElementById('userManger');
var addUserBtn = document.getElementsByClassName('base')[0];
var closeBtn = document.getElementById('close-btn');
var oEditBtn = oUserManger.querySelectorAll('.btn-edit');

if(localStorage.getItem('auth')){

    if(localStorage.getItem('auth') != 1){
      addUserBtn.parentNode.removeChild(addUserBtn);
    }

  //根据权限获取用户列表
  ajax('post','/users/get',{auth:localStorage.getItem('auth'),user:localStorage.getItem('user')},function(res){

    var data = res.data;
    var end = data.length;
    for(var i=0;i<end;i++){
      var newData = {
        username:data[i].username,
        password:data[i].userpassword,
        userid:data[i].userid
      }
      createNewUser(newData);
    }
    //oUserManger.children[2].children[1].className='active';

  });

  oUserManger.children[2].addEventListener('click',function(e){
    var target = null;
    var saveTarget = null;
    if(e.target.parentNode.nodeName == 'LI'){
      saveTarget = target = e.target.parentNode;
    }else if(e.target.parentNode.parentNode.nodeName == 'LI'){
      target = e.target.parentNode.parentNode;
      if(e.target.nodeName != 'INPUT'){
        saveTarget = target;
      }
    }else if (e.target.nodeName == 'LI') {
      saveTarget = target = e.target;
    }

    if(e.target.nodeName == 'LI' || e.target.nodeName == 'UL'){
      var lastActive = oUserManger.querySelectorAll('.active')[0];
      if(lastActive){
        lastActive.querySelector('.btn-save').click();
        var lastInput = lastActive.getElementsByTagName('input');
        for(var i=0;i<lastInput.length;i++){
          lastInput[i].setAttribute('readonly',true);
        }

      }
    }

    if(saveTarget && saveTarget.className != 'base'){
      var lastActive = oUserManger.querySelectorAll('.active')[0];
      lastActive && lastActive.querySelector('.btn-save').click();
    }

    if(target && target.className != 'base'){
      var aLi = oUserManger.children[2].getElementsByTagName('li');
      for(var i=0;i<aLi.length;i++){
        if(aLi[i].className!='base'){
          aLi[i].className = '';
        }
      }
      target.className = 'active';

    }


    //编辑按钮点击
    if(e.target.className === 'btn-edit'){
        e.target.classList.add('hide');
        e.target.parentNode.querySelector('.btn-save').classList.remove('hide');
        var aInput = e.target.parentNode.getElementsByTagName('input');
        sessionStorage.setItem('oldUserId',aInput[1].value)
        for(var i=0;i<aInput.length;i++){
          aInput[i].removeAttribute('readonly');
        }
        aInput[0].focus();
        e.target.parentNode.children[5].style.display = 'block';
        e.target.parentNode.children[4].classList.remove('noborder');
    }


    //删除按钮点击
    if(e.target.className === 'btn-remove'){
      Message('是否删除此用户').then(function(res){
        if(res){
          ajax('post','/users/remove',{userid:e.target.parentNode.querySelector('.userid').value},function(){
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            oUserManger.children[2].children[1].className='active';
          });
        }
      })


    }


    //保存按钮点击
    if(e.target.className === 'btn-save'){
      var aInput = e.target.parentNode.getElementsByTagName('input');
      if(aInput[2].value !== aInput[3].value){
        if(e.x>0){
          Message('两次密码不一致');
        }
        return;
      }
      e.target.classList.add('hide');
      e.target.parentNode.querySelector('.btn-edit').classList.remove('hide');

      for(var i=0;i<aInput.length;i++){
        aInput[i].setAttribute('readonly',true);
      }
      var obj = e.target.parentNode;
      var isAdd = obj.newUser
      if(isAdd){
        var password = window.btoa(aInput[2].value);
        ajax('post','/users/add',{userid:aInput[1].value,username:aInput[0].value,password:password},function(res){
          obj.newUser = false;
        });
      }else{
        var password = window.btoa(aInput[2].value);
        var data = {userid:aInput[1].value,username:aInput[0].value,password:password,oldid:sessionStorage.getItem('oldUserId')};
        ajax('post','/users/update',data,function(res){
          obj.children[5].style.display = 'none';
          obj.children[4].classList.add('noborder');
        });
      }

    }


  },false);

  //添加用户按钮
  addUserBtn.onclick = function(){
    var oLastActive = document.querySelector('.active');
    createNewUser();
    if(oLastActive){
      oLastActive.querySelector('.btn-save').click();
    }
    oLastActive && oLastActive.classList.remove('active');
    oUserManger.children[2].children[1].className='active';
    oUserManger.children[2].children[1].newUser = true;
  }

  //关闭按钮
  closeBtn.onclick = function(){
    oUserManger.classList.add('fade');
    setTimeout(function(){
      location.hash = JSON.stringify({closeWindow:true});
    },300);
  }

  //简单封装ajax
  function ajax(method,url,data,success,error){

    var xhr = new XMLHttpRequest();
    xhr.open(method.toUpperCase(),url,true);

    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status==200){
        var res = JSON.parse(xhr.responseText);
        if(res.code == 200){
          success && success(res);
        }else {
          error && error();
        }

      }
    }
    xhr.send(formatJson(data));
  }

  function formatJson(data){
    var str = '';
    for(var key in data){
      var tmp = key+'='+data[key]+'&';
      str += tmp;
    }

    return str;
  }

  //  创建用户列表函数
  function createNewUser(data){
    if(!data){
      data = {
        username:'',
        password:'',
        userid:''
      }
    }
    data.password = window.atob(data.password);
    var oLi = document.createElement('li');
    var tml = `<div class="head-pic"></div>
                <div class="hr"></div>
                <div class="user-info">
                    <div class="name">姓名</div>
                    <input type="text" value="${data.username}" class="username" readonly>
                </div>
                <div class="user-info">
                    <div class="name">账号</div>
                    <input type="text" value="${data.userid}" class="userid" readonly>
                </div>
                <div class="user-info noborder">
                    <div class="name">密码</div>
                    <input type="password" value="${data.password}" class="password" readonly>
                </div>
                <div class="user-info noborder" style="display:none;">
                    <div class="name">确认密码</div>
                    <input type="password" value="" readonly>
                </div>
                <div class="btn-edit"></div>
                <div class="btn-remove"></div>
                <div class="btn-save hide"></div>`;

      oLi.innerHTML = tml;
      var insertDom = oUserManger.children[2].children[1];
      if(data.userid == 'admin'){
        oLi.removeChild(oLi.querySelector('.btn-remove'));
      }
      if(insertDom){
        oUserManger.children[2].insertBefore(oLi,insertDom);
      }else{
        oUserManger.children[2].appendChild(oLi);
      }
  }
}
