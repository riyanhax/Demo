oVideo = document.getElementById('video')
oVideo.volume = 0.5

ticker = new PIXI.ticker.Ticker()
app = new PIXI.Application(window.innerWidth, window.innerHeight, {transparent: true})
$(app.view).appendTo($('.welcome-words'))

welcomeWords = null

socket = new WebSocket 'ws://127.0.0.1:8888'
socket.onopen = ->
    socket.onmessage = (msg) ->
        data = JSON.parse msg.data
        key = data.main;
        switch key

            when 'welcomeText_confirm'
                welcomeWords.text = data.value
                return

            when 'welcomeStyle_1'
                $('.welcome-words').removeClass('style2').addClass('style1')
                welcomeWords.style.fill = '#ff0'
                return

            when 'welcomeStyle_2'
                $('.welcome-words').removeClass('style1').addClass('style2')
                welcomeWords.style.fill = '#fff'
                return

            when 'video_on'
                oVideo.currentTime = 0
                oVideo.play()
                $('#video').show()
                $('.welcome-words').hide()
                return

            when 'video_off'
                oVideo.pause()
                return

            when 'video_play'
                oVideo.play()
                return
 
            when 'video_pause'
                oVideo.pause()
                return

            when 'video_volume'
                oVideo.volume = data.value/100
                return

            when 'welcome_on'
                $('.welcome-words').css 'display','flex'
                $('#video').hide()
                return



classes = ['style1','style2']
SERVER = require("#{__dirname}/ipconfig.json");

$.get "http://#{ SERVER.ip }:#{ SERVER.port }/get_welcomewords"
 .done (res) ->
    data = JSON.parse(res).data
    
    textColor = if data[0].style*1 is 0 then "#ff0" else "#fff"
    welcomeWords = new PIXI.Text(data[0].content,{
        fontFamily: "Microsoft YaHei",
        fontSize:"240px",
        fontWeight: 'bold',
        fill:textColor,
        align: 'center'
    })
    welcomeWords.x = app.screen.width
    welcomeWords.y = (app.screen.height - welcomeWords.height)/2
    welcomeWords.anchor.x = 0
    
    app.stage.addChild(welcomeWords)
    tickWelcomeWords()

    $('.welcome-words').addClass(classes[data[0].style])
    return

tickWelcomeWords = () ->
    ticker.stop()
    ticker.add (deltaTime) -> 
        welcomeWords.anchor.x += (0.002.toFixed(3)*1)
        scale = parseFloat(app.screen.width/welcomeWords.width)+1
        if welcomeWords.anchor.x >= scale
            welcomeWords.anchor.x = 0
    ticker.start()
        