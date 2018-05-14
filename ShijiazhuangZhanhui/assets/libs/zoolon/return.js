$(document).ready(function () {

    daemonClient = new Zoolon.DaemonClient();

    daemonClient.connect({
        url: "ws://127.0.0.1:5678",
        name: "demoScreen" + Math.random(),
        onMessage: onDaemonMessage
    });


    var $div = $("<div style='width: 200px;height: 200px;position: absolute;z-index: 999999;left: 0;top: 0'></div>");

    $("body").append($div);

    $div.click(function () {
        daemonClient.shiftView("Idle");
    });
});

function onDaemonMessage(message) {
    console.log(message);
}
