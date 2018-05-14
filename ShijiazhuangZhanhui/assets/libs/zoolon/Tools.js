var electron = window.require ? require('electron') : null;
var ipc = electron ? electron.ipcRenderer : null;

var Tools = function () {
};


Tools.s2Args = {
    topicId: 54215251,
    categoryId: 100000,
    langId: 200001,
};

Tools.fitScreen = function (width, height) {

    var w = $(window).width();
    var h = $(window).height();
    var scaleX = w / width;
    var scaleY = h / height;

//    console.log(scaleX, scaleY)

    $("body>.container").css("transform", "scale(" + scaleX + "," + scaleY + ")");


};


Tools.sendMessage = function (message, target, channel) {
    target = target !== undefined ? target : "all";
    channel = channel !== undefined ? channel : "message";

    if (ipc) {
        var cmd = {
            target: target,
            message: message
        }
        var result = ipc.sendSync(channel, cmd);

        return result;
    }

    return null;
};

//异步刷新数据时讲接收到的数据发送到 electron > message.js 缓存
Tools.refreshData = function (message) {
    // channel = channel !== undefined ? channel : ;
    if (ipc) {
        var cmd = {
            message: message
        }
        console.log(cmd);

        var result = ipc.sendSync("refreshData", cmd);
        return result;
    }
    return null;
};


Tools.ready = function (target, index) {

    if (target === undefined) {
        target = 15;
    }

    Tools.sendMessage({type: "ready", args: index}, target);
};

Tools.currentLang = null;

Tools.loadText = function (langId, base) {

    langId = langId ? langId : Config.lang;

    var url = Config.dataURL.langBase + "/" + langId + ".json";

    $.getJSON(url, function (data) {
        Tools.currentLang = data;
        for (var key in data) {

            $("*[lang='" + key + "']").html(data[key]);
        }
    });
};

Tools.getText = function (id) {
    return Tools.currentLang[id];
}

Tools.preZero = function (value, max) {
    var count = max - (value + "").length;

    var result = "";
    for (var i = 0; i < count; i++) {
        result += "0";
    }

    return result + "" + value;

}


$.fn.extend({
    animateCss: function (animationName, onEnd) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        var $self = $(this);
        $(this).show();
        var clazz = 'animated ' + animationName;

        $(this).addClass(clazz).one(animationEnd, function () {

            $self.removeClass(clazz);

            if (animationName.indexOf("Out") > 0) {
                $self.hide();
            }

            if (onEnd) {
                onEnd($self);
            }

            return false;
        });
    }
});