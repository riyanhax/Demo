//var electron = window.require ? require('electron') : null;
//var ipc = electron ? electron.ipcRenderer : null;

var vList = ['./videos/公安.mp4', './videos/机场.mp4', './videos/能源.mp4'];
var cList = [
    "实现以三维为基础的监控资源有序管控和指挥调度，有效管理城市范围内海量离散视频；以事件目标为驱动，宏观与细节有机结合；以真实三维场景为背景灵活操作，不必死记硬背监控点位，一线人员轻松上手，提高指挥调度能力、现场处置能力和综合监管能力。",
    "构建低空安全态势监测系统来实现安全管控以及调度管理工作的直观可视化，对机场飞鸟监测、无人机监测、全天候远距离跟踪监控系统，能够为空管人员提供及时、准确、全面的机场管理信息，从而有效避免飞行安全事故发生。",
    "将复杂生产环境下的多维信息进行有效的可视化整合，对复杂生产环境进行三维全真数字化重建，关键设备、关键点传感器信息三维空间融合展示，异常状况实时分析联动报警，实时掌控重要设备与节点运行状况，以三维可视化助力高效常态管控与精准应急指挥。"
];
var vLen = vList.length;
var curr = null;
var $video = null;
var currentHolder = null;
var timeout = null;
var daemonClient = null;
var animatePlayers = {};

$(document).ready(function () {

    $video = $("#videobg");

    daemonClient = new Zoolon.DaemonClient();

    daemonClient.connect({
        url: "ws://127.0.0.1:1234",
        name: "idleScreen",
        onMessage: onDaemonMessage
    });


    animatePlayers.cityLeft = new Zoolon.AnimatePlayer({
        container: $(".animate.cityLeft.normal"),
        frames: frames.cityLeft,
        loop: false,
        onEnd: function () {
            animatePlayers.cityLeft.hide();
            animatePlayers.cityLeftLoop.play();
            animatePlayers.cityRight.play();
        }
    });

    animatePlayers.cityLeftLoop = new Zoolon.AnimatePlayer({
        container: $(".animate.cityLeft.loop"),
        frames: frames.cityLeftLoop,
        loop: true
    });

    animatePlayers.cityRight = new Zoolon.AnimatePlayer({
        container: $(".animate.cityRight.normal"),
        frames: frames.cityRight,
        loop: false,
        onEnd: function () {
            //  console.log(11)
            animatePlayers.cityRight.hide();
            animatePlayers.cityRightLoop.play();
        }
    });
    animatePlayers.cityRightLoop = new Zoolon.AnimatePlayer({
        container: $(".animate.cityRight.loop"),
        frames: frames.cityRightLoop,
        loop: true
    });

    showVideo();

});


function onDaemonMessage(message) {
    console.log(message);
}

function showVideo() {


    playIndex(0);


    $video.on("ended", function () {

        if (currentHolder !== null) {
            playIndex(currentHolder);
        }
        else {
            playNext();
        }
    });

    $(".button").mousedown(function () {
        $(this).css("opacity", 0.4);
    });
    $(".button").mouseup(function () {
        $(this).css("opacity", 1);
    });

    $(".button").click(function () {

        var index = $(this).data("index");
        playIndex(index);

        open(index)
        //var cmd = {
        //   show: $(this).data("index")
        //}

        //ipc.send("message", cmd);


    });

    $(".button").mouseover(function () {

        var index = $(this).data("index");
        if (timeout === null) {
            timeout = setTimeout(function () {
                currentHolder = index;
                playIndex(currentHolder);
                timeout = null;
            }, 1000);
        }


    });

    $(".button").mouseout(function () {
        currentHolder = null;

        if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
        }

    });

}

function open(index) {
    daemonClient.shiftView("Layout" + index);
}

function playIndex(index, force) {
    $video.prop("src", vList[index]);
    $video.trigger("play");

    for (var p in animatePlayers) {
        var animatePlayer = animatePlayers[p];

        animatePlayer.hide();
    }


    if (curr !== index || force) {
        curr = index;

        $(".header").removeClass("v0 v1 v2");
        $(".header").addClass("v" + index);

        $(".header .desc").fadeOut(200, function () {
            $(".header .content").html(cList[index]);
            $(".button").removeClass("selected");
            $(".button.b" + index).addClass("selected");

            $(".header .desc").fadeIn(200);
        });


        if (index === 0) {
            animatePlayers.cityLeft.play();
        }


    }


}

function playNext() {

    curr++;

    if (curr >= vLen) {
        curr = 0;
    }

    playIndex(curr, true);
}