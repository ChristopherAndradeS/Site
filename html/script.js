const EventsElementID = 
[
    ["clk-reset-diary-event"        , "clk-reset-diary-diff"],
    ["clk-reset-week-event"         , "clk-reset-week-diff"],
    // ["clk-reset-season-event"    , "clk-reset-season-diff"],
    ["clk-geyser-event"             , "clk-geyser-diff"],
    ["clk-grandma-event"            , "clk-grandma-diff"],
    ["clk-turtle-event"             , "clk-turtle-diff"],
    ["clk-aurora-pre1-event"        , "clk-aurora-pre1-diff"],
    ["clk-aurora-pre2-event"        , "clk-aurora-pre2-diff"],
    ["clk-aurora-pre3-event"        , "clk-aurora-pre3-diff"],
    ["clk-aurora-pre4-event"        , "clk-aurora-pre4-diff"],
    ["clk-aurora-pre5-event"        , "clk-aurora-pre5-diff"],
    ["clk-aurora-music1-event"      , "clk-aurora-music1-diff"],
    ["clk-aurora-music2-event"      , "clk-aurora-music2-diff"],
    ["clk-aurora-music3-event"      , "clk-aurora-music3-diff"],
    ["clk-aurora-music4-event"      , "clk-aurora-music4-diff"],
    ["clk-aurora-music5-event"      , "clk-aurora-music5-diff"],
    ["clk-aurora-music6-event"      , "clk-aurora-music6-diff"],
    ["clk-aurora-music7-event"      , "clk-aurora-music7-diff"],
    ["clk-aurora-music8-event"      , "clk-aurora-music8-diff"],
    ["clk-aurora-music9-event"      , "clk-aurora-music9-diff"],
    ["clk-aviary-morning-event"     , "clk-aviary-morning-diff"],
    ["clk-aviary-fog-event"         , "clk-aviary-fog-diff"],
    ["clk-aviary-day-event"         , "clk-aviary-day-diff"],
    ["clk-aviary-evening-event"     , "clk-aviary-evening-diff"],
    ["clk-aviary-night-event"       , "clk-aviary-night-diff"],
    ["clk-passage-mission2-event"   , "clk-passage-mission2-diff"],
    ["clk-passage-mission3-event"   , "clk-passage-mission3-diff"],
    ["clk-passage-mission4-event"   , "clk-passage-mission4-diff"],
    ["clk-passage-mission5-event"   , "clk-passage-mission5-diff"],
    ["clk-nest-mission-event"       , "clk-nest-mission-diff"],
    ["clk-treehouse-weather-event"  , "clk-treehouse-weather-diff"],
    ["clk-secret-fairy-event"       , "clk-secret-fairy-diff"],
    ["clk-secret-rainbow-event"     , "clk-secret-rainbow-diff"],

];


const EventsData = 
[
    // Intervalo | Tempo inicial | WeekDay (min)
    [1440, 420, 0],
    [10080, 420, 7],
    // [0, 0, 0],
    [120, 65, 0],
    [120, 95, 0],
    [120, 110, 0],
    [480, 480, 0],
    [480, 495, 0],
    [480, 510, 0],
    [480, 525, 0],
    [480, 540, 0],
    [480, 540 + 15, 0],
    [480, 540 + 17, 0],
    [480, 540 + 23, 0],
    [480, 540 + 31, 0],
    [480, 540 + 38, 0],
    [480, 540 + 46, 0],
    [480, 540 + 50, 0],
    [480, 540 + 54, 0],
    [480, 540 + 58, 0],
    [60, 0, 0],
    [60, 10, 0],
    [60, 15, 0],
    [60, 40, 0],
    [60, 50, 0],
    [15, 0, 0],
    [15, 0, 0],
    [15, 0, 0],
    [15, 0, 0],
    [60, 40, 0],
    [5760, 420, 7],
    [60, 50, 0],
    [60, 0, 0],
];

const StrWeek = [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" ];

const SkyTimeZone = (-7)

const UserTimeZone = GetUserTimeZone()

function GetUserTimeZone()
{
    const date = new Date(Date.now())
    return Math.floor(date.getTimezoneOffset() * (-1) / 60)
}

function GetTodaySeconds() {
    return (Math.floor(new Date().getTime() / 1000) % 86400)}

function GetTodayMinutes() {
    return Math.floor(GetTodaySeconds() / 60)}

function GetTodayWeekDay() {
    return new Date().getDay() }

function GetTimeDay(time){
    return Math.floor(time / (3600 * 24)) }

function GetTimeHour(time){
    return Math.floor(time % 86400 / 3600) }

function GetTimeMinute(time) {
    return Math.floor(time % 3600 / 60) }

function GetTimeSeconds(time) { 
    return Math.floor(time % 3600 % 60) }
    
function GetUTCDate()
{
    var date = new Date(Date.now())
    date.setHours(date.getHours() - GetUserTimeZone())
    return date
}

function UpdateSystemClock()
{
    var next_event_time = 0;
    var date = GetUTCDate()

    var day, hour, min, sec;

    date.setHours(date.getHours() + UserTimeZone)

    hour = date.getHours()
    min  = date.getMinutes()
    sec  = date.getSeconds() 

    hour = String(hour).padStart(2, '0')
    min  = String(min).padStart(2, '0')
    sec  = String(sec).padStart(2, '0')

    document.getElementById("clk-local").innerText = `${hour}:${min}:${sec}`

    date.setHours(date.getHours() - UserTimeZone + SkyTimeZone)

    hour = date.getHours()
    hour = String(hour).padStart(2, '0')

    document.getElementById("clk-global").innerText = `${hour}:${min}:${sec}`

    date.setHours(date.getHours() - SkyTimeZone)

    for(var i = 0; i < 32; i++)
    {
        var element_event = EventsElementID[i][0]
        var element_diff  = EventsElementID[i][1]

        var e_interval    = (EventsData[i][0]) * 60
        var e_init_time   = (EventsData[i][1]) * 60
        var e_weekday    = EventsData[i][2]

        var next_event_time = GetNextEventTime(e_interval, e_init_time)

        hour = GetTimeHour(next_event_time) + UserTimeZone
        min  = GetTimeMinute(next_event_time)
    
        hour = String(hour).padStart(2, '0')
        min  = String(min).padStart(2, '0')
    
        var diff = GetEventDiff(e_interval, e_weekday, next_event_time)

        if(e_weekday)
        {
            tmp_date = new Date(Date.now() + (diff * 1000))

            day = tmp_date.getDay()
            day = String("Próximo(a) " + StrWeek[day] + "\n")

            if(GetTodayWeekDay() - day == 1)
                day = "Amanhã\n"
            if(GetTodayWeekDay() - day == 0)
                day = "Hoje\n"

            document.getElementById(element_event).innerText = `${day} ${hour}h ${min}m`
        }

        else
        {
            day = GetTimeDay(diff)

            if(day == 1)
                document.getElementById(element_event).innerText = `Amanhã\n${hour}h ${min}m`

            else if(day == 0)
                document.getElementById(element_event).innerText = `Hoje\n${hour}h ${min}m`
        }

        day = GetTimeDay(diff)
        hour = GetTimeHour(diff) 
        min  = GetTimeMinute(diff)
        sec  = GetTimeSeconds(diff)

        day = String(day).padStart(2, '0')
        hour = String(hour).padStart(2, '0')
        min  = String(min).padStart(2, '0')
        sec  = String(sec).padStart(2, '0')

        if(day != 0)
            document.getElementById(element_diff).innerText  = `${day} dia(s) ${hour}:${min}:${sec}`
        else
            document.getElementById(element_diff).innerText  = `${hour}:${min}:${sec}`
    
        switch(i)
        {
            case 29:
            {
                var str;
                
                var weekday = date.getDay()
            
                str = 0 <= weekday <= 3 ? "Clima Atual: Chuvoso" : "Clima Atual: Ensolarado"
                document.getElementById("clk-treehouse-weather-state").innerText = str
                
                str = "Mudanças de clima:\n" + document.getElementById(EventsElementID[i][0]).innerText
                document.getElementById(EventsElementID[i][0]).innerText = str
            }
        }
    }
}

function GetEventDiff(e_interval, e_weekday, next_event_time)
{
    var diff, seconds;

    seconds = GetTodaySeconds()

    if(e_weekday)
    {
        seconds += (GetTodayWeekDay()) * 86400
    }

    diff = (e_interval - (seconds - next_event_time)) % e_interval

    return diff
}

function GetNextEventTime(e_interval, e_init_time)
{    
    today_sec = GetTodaySeconds() 
    
    var i = e_init_time

    while(i <= today_sec)
        i += e_interval
    
    return i
}

document.getElementById("had-local").innerText = `Horário Atual (GMT ${UserTimeZone}:00)`
document.getElementById("had-global").innerText = `Horário Servidor Sky (GMT ${SkyTimeZone}:00)`

UpdateSystemClock()
setInterval(UpdateSystemClock, 1000)