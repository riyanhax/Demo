(function (window, document, undefined) {

    if (window.Zoolon === undefined)
        window.Zoolon = {};

    var ws = null;
    var options = null;

    var DaemonClient = function (options) {

    };

    DaemonClient.prototype.connect = function (opt) {

        options = opt;
        connect();

    };
    DaemonClient.prototype.shiftView = function (id) {
        console.log(id)
        var cmd = cmds[id];
        console.log(id)
        //cmd.receiverName = "DaemonService";
        cmd.senderName = options.name;
        this.send(cmd);
    };


    DaemonClient.prototype.send = function (message) {
        console.log(message)
        send(message);

    };


    function connect() {


        ws = new WebSocket(options.url);

        ws.onopen = function (evt) {
            console.log("Connection open ...");
            Message_LogIn.SocketName = options.name;
            send(Message_LogIn);
        };

        ws.onmessage = function (evt) {
            console.log("Received Message: " + evt.data);

            if (options.onMessage) {
                options.onMessage(evt.data);
            }
        };

        ws.onclose = function (evt) {
            ws = null;
            connect()
            console.log("Connection closed.");
        };
    }

    function send(message) {

        message = JSON.stringify(message)
        if (ws) {
            ws.send(message);
        }
    }


    window.Zoolon.DaemonClient = DaemonClient;

    //----------------------------------------------------

    var Message_LogIn = {"messageType": "RegisterToDaemon", "SocketName": "", "SocketType": "Controller"};


    var cmds = {};

    cmds.Layout0 = {"receiverName":"Deamon-1","senderName":"web_1523342053532","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16McjlTfk8W","Layout":[{"WinId":"16McjlVzb9Z","X":0,"Y":0,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/01/index1/index.html"},"Type":"httpurl"},{"WinId":"16McjlYkwO4","X":0,"Y":1080,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/01/index2/index.html"},"Type":"httpurl"},{"WinId":"16Mcjm1h0sh","X":1920,"Y":0,"Width":3840,"Height":138,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/01/head/index.html"},"Type":"httpurl"},{"WinId":"16Mcjm47Gxm","X":1920,"Y":138,"Width":3840,"Height":2022,"Resource":{"Source":"local","Path":"D:\\Demo\\SVE_TEST\\SVEQt.exe"},"Type":"app"},{"WinId":"16Mcjm63Dnn","X":5760,"Y":0,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"D:\\Demo\\VideoGallery1\\VideoGallery.exe"},"Type":"app"},{"WinId":"16Mcjm952Kb","X":5760,"Y":1080,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/01/index3/index.html"},"Type":"httpurl"}]}}

    cmds.Layout10={"receiverName":"Deamon-1","senderName":"web_1523257163415","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16G6MzxaYfl","Layout":[{"WinId":"16G6MzCxnZZ","X":0,"Y":0,"Width":7680,"Height":2160,"Resource":{"Source":"local","Path":"D:\\SuccessCases\\DemoZoolon\\Bin\\ZoolonVisualGallery.exe"},"Type":"app"}]}}
    cmds.Layout11={"receiverName":"Deamon-1","senderName":"web_1523257163415","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16FHmkOrqBF","Layout":[{"WinId":"16FHmkVMPNr","X":3840,"Y":0,"Width":3840,"Height":2160,"Resource":{"Source":"local","Path":"http://192.168.0.235/centerShow/dataSource.html"},"Type":"httpurl"},{"WinId":"16FHmldjKnz","X":0,"Y":0,"Width":3840,"Height":2160,"Resource":{"Source":"local","Path":"http://192.168.0.235/sure/effects/apps/site/"},"Type":"httpurl"}]}}
    cmds.Layout12={"receiverName":"Deamon-1","senderName":"web_1523257163415","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16Gqq7rIdYQ","Layout":[{"WinId":"16Gqq7xKA9i","X":0,"Y":0,"Width":7680,"Height":2160,"Resource":{"Source":"local","Path":"D:\\minhang\\minhang-win32-x64\\minhang.exe"},"Type":"app"}]}}
    cmds.Layout13={"receiverName":"Deamon-1","senderName":"web_1523340073218","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16M45plxMSV","Layout":[{"WinId":"16M45pltZHt","X":0,"Y":0,"Width":1920,"Height":2160,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/02/index1/index.html"},"Type":"httpurl"},{"WinId":"16M45plt05T","X":5760,"Y":0,"Width":1920,"Height":2160,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/02/index2/index.html"},"Type":"httpurl"},{"WinId":"16M45plsQhY","X":1920,"Y":0,"Width":3840,"Height":2160,"Resource":{"Source":"local","Path":"D:\\Servers\\sjs2018\\驱鸟\\CreateAndLinkDLLProj.exe"},"Type":"app"}]}};
    cmds.Layout14={"receiverName":"Deamon-1","senderName":"web_1523345692821","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16GqvcqGLbl","Layout":[{"WinId":"16Gqvcw3yZ9","X":0,"Y":0,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/03/index1/index.html"},"Type":"httpurl"},{"WinId":"16GqvcJrAQ7","X":0,"Y":1080,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/03/index2/index.html"},"Type":"httpurl"},{"WinId":"16GqvcXC8Mc","X":1920,"Y":0,"Width":3840,"Height":2160,"Resource":{"Source":"local","Path":"D:\\Servers\\sjs2018\\煤矿\\CM.exe "},"Type":"app"},{"WinId":"16Gqvd9k6nM","X":5760,"Y":0,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/03/index3/index.html"},"Type":"httpurl"},{"WinId":"16GqvdkHitA","X":5760,"Y":1080,"Width":1920,"Height":1080,"Resource":{"Source":"local","Path":"http://127.0.0.1/Shijiazhuang2018/apps/zhihui/03/index4/index.html"},"Type":"httpurl"}]}}
    cmds.Layout16={"receiverName":"Deamon-1","senderName":"web_1523257919385","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"16FHf3kK831","Layout":[{"WinId":"16FHf3qhgAB","X":0,"Y":0,"Width":3840,"Height":2160,"Resource":{"Source":"local","Path":"http://192.168.0.235/ge/"},"Type":"httpurl"},{"WinId":"16FHf3Anugl","X":3840,"Y":0,"Width":3840,"Height":2160,"Resource":{"Source":"local","Path":"http://192.168.0.235/lhp/DataScreen/t3.html"},"Type":"httpurl"}]}}
    cmds.Layout17={"receiverName":"Deamon-1","senderName":"web_1523257919385","messageID":"123456","messageType":"","Service":"multiScreenCall","Action":"open","Arguments":{"LayoutId":"15nQxOI58Qu","Layout":[{"WinId":"15nQxOTGl9L","X":2126,"Y":64,"Width":3428,"Height":2032,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=6&scale=1.058"},"Type":"httpurl"},{"WinId":"15nQxPgxwPB","X":0,"Y":1080,"Width":1215,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=5&scale=0.563"},"Type":"httpurl"},{"WinId":"15nQxPSTSuR","X":1215,"Y":0,"Width":911,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=1&scale=0.563"},"Type":"httpurl"},{"WinId":"15nQxQp1RAG","X":1215,"Y":1080,"Width":911,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=2&scale=0.563"},"Type":"httpurl"},{"WinId":"15nQxQPLZZL","X":5554,"Y":0,"Width":911,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=3&scale=0.563"},"Type":"httpurl"},{"WinId":"15nQxReIF0H","X":6465,"Y":0,"Width":1215,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=0&scale=0.563"},"Type":"httpurl"},{"WinId":"15nQxRF3i4b","X":0,"Y":0,"Width":1215,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=0&scale=0.563"},"Type":"httpurl"},{"WinId":"15nQxS496m8","X":5554,"Y":1075,"Width":911,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/chart/index.html"},"Type":"httpurl"},{"WinId":"15nQxSk8tYj","X":6465,"Y":1080,"Width":1215,"Height":1080,"Resource":{"Source":"local","Path":"http://192.168.0.235/bfd/module.html?idx=4&scale=0.563"},"Type":"httpurl"}]}}
    
    
    
    cmds.Idle = {
        "receiverName": "Deamon-1",
        "senderName": "web_1521608087446",
        "messageID": "123456",
        "messageType": "",
        "Service": "multiScreenCall",
        "Action": "open",
        "Arguments": {
            "LayoutId": "14SDUIj4mc7",
            "Layout": [{
                "WinId": "14SDUIqpYPM",
                "X": 0,
                "Y": 0,
                "Width": 7680,
                "Height": 2160,
                "Resource": {"Source": "local", "Path": "http://127.0.0.1/Shijiazhuang2018/apps/idle/index.html"},
                "Type": "httpurl"
            }]
        }
    };


    cmds.IdleExe = {
    	"receiverName":"Deamon-1",
    	"senderName":"web_1523257163415",
    	"messageID":"123456",
    	"messageType":"",
    	"Service":"multiScreenCall",
    	"Action":"open",
    	"Arguments":{
    		"LayoutId":"16GrklIubRV",
    		"Layout":[{
    			"WinId":"16GrklRpQ5f",
    			"X":0,
    			"Y":0,
    			"Width":7680,
    			"Height":2160,
    			"Resource":{
    				"Source":"local",
    				"Path":"D:\\Servers\\SJZShow2018\\SJZShow2018.exe "
    			},
    			"Type":"app"
    		}]
    	}
    };
    /****
     *public function
     * **************/
    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function timestamp() {
        return new Date().getTime();
    }

}(window, document));