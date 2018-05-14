var fs = require("fs")
var path = require("path")

var root = path.join(__dirname)


var animate = {};
var curr = null;

var skip = 0;

readDirSync(root)

function readDirSync(path) {
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            // console.log("dir: " + ele)

            curr = [];
            animate[ele] = curr;
            readDirSync(path + "/" + ele);
        } else {

            var imageBuf = fs.readFileSync(path + "/" + ele);
            if (curr && skip === 0) {


                curr.push("data:image/png;base64," + imageBuf.toString("base64"))
                // curr.push(path + "/"+ele);
            }
            else if (ele === "3.png") {
                animate.flag = imageBuf.toString("base64");
            }

            if (skip !== 2) {
                skip++;
            }
            else {
                skip = 0;
            }
            //console.log("file: " + ele)
        }
    })
}

fs.writeFileSync(root + "/animate.js", "var frames=" + JSON.stringify(animate) + ";");

//console.log(animate)
