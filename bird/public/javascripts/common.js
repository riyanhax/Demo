document.body.onselectstart = function () {
    return false;
}
document.body.oncontextmenu = function () {
    return false;
}
var oWrap = document.querySelector('.wrap') 
            || document.querySelector('#form') 
            || document.querySelector('.bottom-btn') 
            || document.querySelector('.bird-wrap') 
            || document.querySelector('.divice-wrap') 
            || document.querySelector('.setting-wrap') 
            || document.querySelector('.warn-wrap') 
            || document.querySelector('.status-wrap');
oWrap.style.transform = 'scale('+parseInt(location.search.substr(1))+')';

function Message(){
  return new Pop(arguments);
}

function Pop(msg){
  var _this = this;
  var removeDom = function (_this) {
    _this.alertDom.classList.add('popfadeOut');
    _this.popDom.classList.add('popfadeOut');
    _this.popDom.addEventListener('animationend',function(){
      document.body.removeChild(_this.insertdom);
    });
  }

  var p = new Promise(function(resolve){
    var tml = `<div class="pop">
                <div class="alert">
                  <div class="title"></div>
                  <div class="content">${msg[0]}</div>
                  <div class="close">
                    <img src="../images/close.png" alt="">
                  </div>
                  <div class="foot">
                    <div class="cancel">取消</div>
                    <div class="confirm">确认</div>
                  </div>
                </div>
              </div>`;
    _this.insertdom = document.createElement('div');
    _this.insertdom.innerHTML = tml;
    document.body.appendChild(_this.insertdom);
    _this.popDom = _this.insertdom.children[0];
    _this.alertDom  = _this.insertdom.children[0].children[0];

    _this.insertdom.querySelector('.cancel').onclick = function(){
      removeDom(_this);
      resolve(false);
    }
    _this.insertdom.querySelector('.confirm').onclick = function(){
      removeDom(_this);
      resolve(true);
    }
    _this.insertdom.querySelector('.close').onclick = function(){
      removeDom(_this);
      resolve(false);
    }
  });

  return p;
}
