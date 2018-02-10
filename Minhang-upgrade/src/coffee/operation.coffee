class Calendar
    constructor: (obj) ->
        @oDate     = new Date()
        @initYear  = @oDate.getFullYear()
        @initMonth = @oDate.getMonth()
        @dom       = obj
        @x         = @dom.offset().left
        @y         = @dom.offset().top+@dom.height()+10
        @renderHtml()
        @dateEvent()
        @monthEvent()


    dateEvent:  ->
        @calendar.find '.date-num'
                .on 'click', ->
                    @renderSelectedVal()
                    @remove()

    renderSelectedVal: ->
        @dom.val @getYear()+''+@getMonth()

    monthEvent:  ->
        @calendar.on 'click', (e) ->
            e.stopPropagation()

        @calendar.find '.prev'
                .on 'click', (e) ->
                    @initMonth--;
                    if @initMonth is -1
                        @initMonth = 11;
                        @setYear(--@initYear)
                    
                    @setMonth @initMonth
                    @renderYear()
                    @renderDates()
                    @renderSelectedVal()
                    e.stopPropagation()

        @calendar.find '.next'
                .on 'click', (e) ->
                    @initMonth++;;
                    if @initMonth > 11
                        @initMonth = 0;
                        @setYear(++@initYear)

                    @setMonth(@initMonth)
                    @renderYear()
                    @renderDates()
                    @renderSelectedVal()
                    e.stopPropagation()

    setMonth: (month) ->
        @oDate.setMonth(month)

    setYear: (year) ->
        @oDate.setYear(year)

    getMonth: ->
        return toDub @oDate.getMonth()+1

    getYear: ->
        return @oDate.getFullYear()

    getDate: ->
        return toDub @oDate.getDate()

    setDate = (date) ->
        @oDate.setDate(date)


    resetDate: -> 
        delete @oDate;
        oDate = new Date();
        @oDate = oDate;

    renderDates: ->
        @setDate 1
        weeks = @getWeek()
        oDate = new Date(@initYear,@initMonth,0)
        dates = oDate.getDate()
        oDate = null;
        @calendar.find '.date' 
                .empty()
        
        for num in [0..weeks]
            ospan = $('<span></span>')
            ospan.appendTo(@calendar.find('.date'))

        for i in [0..dates]
            ospan = $('<span class="date-num">'+(i+1)+'</span>')
            ospan.appendTo(@calendar.find('.date'))

        @dateEvent()

    renderYear: ->
        @calendar.find('.year span').text(@getYear()+'年'+@getMonth()+'月')

    getWeek: ->
        @oDate.getDay()

    remove: ->
        @dom.removeClass 'open'
        @calendar.remove()
        delete @

    renderHtml: ->
        str = """
                <div class='calendar'>
                    <div class='year'>
                        <a href='javascript:;' class='prev'>上一月</a>
                        <span></span>
                        <a href='javascript:;' class='next'>下一月</a>
                    </div>
                    <div class='week'>
                        <span>日</span>
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>
                    </div>
                    <div class='date'></div>
                </div>
                """
        oCalendar = $(str);
        oCalendar.css left:@x+'px', top:@y+'px'
        @calendar = oCalendar;
        @renderYear()
        @renderDates()
        oCalendar.appendTo($('body'))
        @resetDate()
        return

toDub = (n) ->
    if n<10 then '0'+n else ''+n

oC = null;

$(document).on 'click', (e) ->
    if oC
        oC.renderSelectedVal()
        oC.remove()
    return

$('input').on 'click', (e) ->
    if oC
        oC.renderSelectedVal()
        oC.remove()

    if !$(this).hasClass('open')
        oC = new Calendar($(this))

    $(this).addClass('open')
    e.stopPropagation()
    return

SERVER = null;
$.get('/ipconfig.json').done (res) ->
    SERVER = JSON.parse res
    return

$('button').on 'click', ->
    type = $(this).data 'type'
    $.post('http://'+SERVER.ip+':'+SERVER.port+'/update-static-data',{
        type:type,
        begin:$('input:eq(0)').val(),
        end:$('input:eq(1)').val()
    }).done (res) ->
        console.log(res)
        return
    return
