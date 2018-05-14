(function (window, document, undefined) {

    if (window.Zoolon === undefined)
        window.Zoolon = {};


    var AnimatePlayer = function (options) {

        var opts = null;
        var frames = null;
        var $canvas = null;
        var $container = null;
        var ctx = null;
        var isPlay = false;
        var currIndex = 0;
        var ctxMem = null;
        var width = null;
        var height = null;
        var time = timestamp();

        opts = options;
        frames = options.frames;

        for (var i = 0; i < frames.length; i++) {
            var frame = frames[i];
            var img = new Image();
            img.src = frame;
            frames[i] = img;

        }

        $container = options.container;
        width = $container.width();
        height = $container.height();
        $canvas = $("<canvas></canvas>");
        $canvas.prop("width", width);
        $canvas.prop("height", height);
        $container.append($canvas);

        var backCanvas = document.createElement('canvas');
        backCanvas.width = width;
        backCanvas.height = $container.height();
        ctxMem = backCanvas.getContext('2d');

        ctx = $canvas.get(0).getContext("2d");

        animate();


        this.show = function () {


        };
        this.hide = function (id) {

            this.pause();
            $container.hide();

        };


        this.play = function (message) {
            currIndex = 0;
            $container.show();
            isPlay = true;
        };


        this.pause = function (message) {
            currIndex = 0;
            isPlay = false;
        };

        function animate() {


            requestAnimationFrame(animate);

            var t = timestamp();
            var d = t - time;

            if (d < (1000 / 15)) {
                //   console.log(d)
                return;
            }


            time = t;

            if (isPlay) {
                var frame = frames[currIndex];

                if (frame) {
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(frame, 0, 0);
                    currIndex++;
                }
                //var img = new Image();
                //img.src = frame;
                //ctxMem.drawImage(img, 0, 0);

                //   ctx.putImageData(ctxMem.getImageData(0, 0, $container.width(), $container.height()), 0, 0);


                if (currIndex >= frames.length) {
                    if (opts.loop) {
                        currIndex = 0;
                    }
                    else if (opts.onEnd) {
                        opts.onEnd();
                    }

                }

            }


        }
    };


    window.Zoolon.AnimatePlayer = AnimatePlayer;

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