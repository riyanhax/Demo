var oArrowUp = document.querySelectorAll('.arrow-up');
var oArrowDown = document.querySelectorAll('.arrow-down');
var oClose = document.getElementById('close-btn');
var setWrap = document.getElementById('setting-wrap');
var confirm = document.getElementById('confirm');
var cancel = document.getElementById('cancel');
var keys = [];

var xhr = new XMLHttpRequest();
xhr.open('POST','/setting/get',true);
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4 && xhr.status == 200){
    var res = JSON.parse(xhr.responseText);
    var data = res.data[0];
    for(var key in data){
      var obj = document.querySelector('.'+key);
      if(obj){
        obj.value = data[key];
        keys.push(key);
      }
    }
  }
}
xhr.send();

confirm.onclick = function(){
  setWrap.classList.add('scale-out');
  setTimeout(function(){
    location.hash = JSON.stringify({setting:true});
  },300);
  var obj = {};
  for(var i=0;i<keys.length;i++){
    obj[keys[i]] = document.querySelector('.'+keys[i]).value;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/setting/update',true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var res = JSON.parse(xhr.responseText)[0];

    }
  }
  xhr.send(sendData(obj));
}
oClose.onclick = cancel.onclick = function(){
  setWrap.classList.add('scale-out');
  setTimeout(function(){
    location.hash = JSON.stringify({closeWindow:true});
  },300)
}

for(var i=0;i<oArrowUp.length;i++){
  oArrowUp[i].onclick = function(){
    var num = +this.parentNode.getElementsByTagName('input')[0].value || 0;
    num += 1;
    this.parentNode.getElementsByTagName('input')[0].value = num.toFixed(1);
  }
  oArrowDown[i].onclick = function(){
    var num = +this.parentNode.getElementsByTagName('input')[0].value || 0;
    num -= 1;
    this.parentNode.getElementsByTagName('input')[0].value = num.toFixed(1);
  }
}

function sendData(data){
  var str = '';
  for(var key in data){
    str += key+'='+data[key]+'&';
  }
  return str;
}
