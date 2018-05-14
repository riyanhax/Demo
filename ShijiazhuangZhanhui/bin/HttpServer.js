const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


exports.start = function (port, documentRoot) {

    const server = http.createServer(function (request, response) {


        var pathname = url.parse(request.url).pathname;

        if (pathname.indexOf("/socket.io/") > 0) {
            return;
        }

        //console.log(pathname)

        if (pathname.indexOf("app:") >= 0) {
            var result = handleApp({
                pathname: pathname,
                request: request,
                response: response
            });

            if (result) {
                return;
            }
        }

        //  console.log(pathname);
        if (pathname === "/") {
            pathname += "/index.html";
        }
        else if (pathname.indexOf(".") < 0) {
            pathname += "/index.html";
        }

        var realPath = documentRoot + pathname;
        // console.log(realPath);

        if (!fs.existsSync(realPath)) {
            var pattern = "/webapps/";
            var index = realPath.indexOf(pattern);
            var left = realPath.substr(0, index) + pattern;
            var right = realPath.substr(index + pattern.length);
            realPath = left + "root/" + right;
        }

        var ext = path.extname(pathname);
        ext = ext ? ext.slice(1) : 'unknown';
        ext = ext.toLowerCase();
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server. " + realPath);
                response.end();
            } else {

                if (ext === "html" || ext === "htm") {

                    var host = request.headers.host + "";
                    var ip = host.split(":")[0];


                    fs.readFile(realPath, "UTF8", function (err, file) {
                        if (err) {
                            response.writeHead(500, {
                                'Content-Type': 'text/plain'
                            });
                            console.log(err, realPath, pathname);
                            response.write("err", "UTF8");
                            response.end();
                        } else {
                            file = file.replace("{$host}", host);
                            file = file.replace("{$hostIP}", ip);
                            var contentType = mimes[ext] || "text/plain";
                            response.writeHead(200, {
                                'Content-Type': contentType
                            });
                            response.write(file, "UTF8");
                            response.end();
                        }
                    });
                }
                else {
                    fs.readFile(realPath, "binary", function (err, file) {
                        if (err) {
                            response.writeHead(500, {
                                'Content-Type': 'text/plain'
                            });
                            console.log(err, realPath, pathname);
                            response.write("err", "UTF8");
                            response.end();
                        } else {
                            var contentType = mimes[ext] || "text/plain";
                            response.writeHead(200, {
                                'Content-Type': contentType
                            });
                            response.write(file, "binary");
                            response.end();
                        }
                    });
                }


            }
        });
    });
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);


    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;


        switch (error.code) {
           
            default:
                throw error;
        }
    }


    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }

    return server;
}


var mimes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

function handleApp(args) {
    var pathname = args.pathname;
    var appName = args.pathname;
    var request = args.request;
    var response = args.response;


    var host = request.headers.host + "";
    var ip = host.split(":")[0];


    var leftStr = appName.substr(0, appName.indexOf("app:"));
    appName = appName.replace(leftStr + "app:", "");
    appName = appName.substr(0, appName.indexOf("/"));

    pathname = pathname.replace("/app:" + appName, "");


    var app = global.apps[appName];

    if (app) {
        var stream = app.stream;
        if (app.type === "text") {
            stream = stream.replace("{$host}", host);
            stream = stream.replace("{$hostIP}", ip);

            response.writeHead(200, {
                'Content-Type': "text/html"
            });
            response.write(stream, "UTF8");
            response.end();

            return true;
        }
        else if (app.type === "zpk") {

            var stream = app.stream;
            var files = stream.files;

            if (pathname === "/") {
                pathname += "index.html";
            }

            pathname = pathname.substr(1, pathname.length);

            console.log(pathname);

            var zipFile = stream.file(pathname);

            if (zipFile === null) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server. ");
                response.end();
            }
            else {
                var ext = path.extname(pathname);
                ext = ext ? ext.slice(1) : 'unknown';
                ext = ext.toLowerCase();

                if (ext === "html" || ext === "htm") {

                    zipFile.async("string").then(function (file) {
                        file = file.replace("{$host}", host);
                        file = file.replace("{$hostIP}", ip);

                        var window = new JSDom(file).window;
                        $ = require("libs")(window);
                        var $els = $("script");
                        $("<script>if (typeof module === 'object') {" +
                            "window.module = module;" +
                            "module = undefined;" +
                            "}</script>").insertBefore($els[0]);

                        $("<script>if (window.module) module = window.module;</script>").insertAfter($els[$els.length - 1]);

                        var contentType = mimes[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });

                        console.log(window)
                        response.write($("html").html(), "UTF8");
                        response.end();
                    });
                }
                else {
                    zipFile.async("arraybuffer").then(function (file) {

                        var contentType = mimes[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(new Buffer(file), "binary");
                        response.end();

                    });
                }
            }

            return true;
        }
    }


    return false;
}