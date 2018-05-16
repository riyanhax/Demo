var oLogin = document.getElementById('login');
var oForm = document.getElementById('form');
var oExit = document.querySelector('.off');
oLogin.onclick = function(){
  if(!(oForm.username.value && oForm.password.value)){
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/login',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status==200){
      var res = JSON.parse(xhr.responseText);
      if(res.code == 200){
        location.hash= JSON.stringify({userName:res.user});
        localStorage.removeItem('userName');
        localStorage.setItem('userName', res.user);
        localStorage.setItem('auth', res.auth);
        localStorage.setItem('user', res.user);
      }else {
        Message(res.error)
      }

    }
  }
  xhr.send('username='+oForm.username.value+'&password='+oForm.password.value);
}

oExit.onclick = function(){
  location.hash = JSON.stringify({exit:true});
}
