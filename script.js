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
    [(24 * 60), (7 * 60), 0],

    [10080, 420, 7],
    // [0, 0, 0],
    [(2 * 60), (65), 0],
    [(2 * 60), (60 + 35), 0],
    [(2 * 60), (60 + 50), 0],

    [(4 * 60), 0, 0],
    [(4 * 60), 15, 0],
    [(4 * 60), 30, 0],
    [(4 * 60), 45, 0],
    [(4 * 60), 60, 0],
    [(4 * 60), 60 + 15, 0],
    [(4 * 60), 60 + 17, 0],
    [(4 * 60), 60 + 23, 0],
    [(4 * 60), 60 + 31, 0],
    [(4 * 60), 60 + 38, 0],
    [(4 * 60), 60 + 46, 0],
    [(4 * 60), 60 + 50, 0],
    [(4 * 60), 60 + 54, 0],
    [(4 * 60), 60 + 58, 0],

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

function UpdateSystemClock()
{
    var today, doc_str;

    today = GetTodaySeconds(UserTimeZone)

    doc_str = `${String(GetTimeHour(today)).padStart(2, '0')}h : `
    doc_str += `${String(GetTimeMinute(today)).padStart(2, '0')}m : `
    doc_str += `${String(GetTimeSeconds(today)).padStart(2, '0')}s `

    document.getElementById("clk-local").innerText = doc_str 

    today = GetTodaySeconds(SkyTimeZone)

    doc_str = `${String(GetTimeHour(today)).padStart(2, '0')}h : `
    doc_str += `${String(GetTimeMinute(today)).padStart(2, '0')}m : `
    doc_str += `${String(GetTimeSeconds(today)).padStart(2, '0')}s `

    document.getElementById("clk-global").innerText = doc_str 

    var next_event;

    for(var i = 0; i < 32; i++)
    {
        next_event = UpdateDocumentEvent(i)
        UpdateDocumentDiff(i, next_event)

        if((0 <= GetTodayWeekDay() < 2) || (GetTodayWeekDay() == 2 && GetTodaySeconds(SkyTimeZone) < (7 * 3600)))
            document.getElementById("clk-treehouse-weather-state").innerText = 'Clima: Chuvoso'
        else
            document.getElementById("clk-treehouse-weather-state").innerText = 'Clima: Ensolarado'
    }
}

function UpdateDocumentDiff(clockid, next_event)
{
    var element_diff;
    var day, hour, minute, second;
    var doc_str = '';
 
    element_diff  = EventsElementID[clockid][1]

    diff = GetEventDiff(EventsData[clockid][0] * 60, next_event, EventsData[clockid][2] * 60)

    day     = GetTimeDay(diff)
    hour    = GetTimeHour(diff)
    minute  = GetTimeMinute(diff)
    second  = GetTimeSeconds(diff)

    if(day > 0)
        doc_str += `${day} dia(s) `

    doc_str += `${String(hour).padStart(2, '0')}h : `
    doc_str += `${String(minute).padStart(2, '0')}m : `
    doc_str += `${String(second).padStart(2, '0')}s `

    document.getElementById(element_diff).innerText = doc_str 
}

function UpdateDocumentEvent(clockid)
{
    var element_event, next_event;
    var day, hour, minute;
    var doc_str = '';

    element_event = EventsElementID[clockid][0]
    
    next_event = GetNextEventTime(EventsData[clockid][0] * 60, EventsData[clockid][1] * 60)

    day     = GetTimeDay(next_event)
    hour    = GetTimeHour(next_event)
    minute  = GetTimeMinute(next_event)
    
    if(day == 0) 
    {   
        if(GetTodayMinutes(UserTimeZone) < (next_event / 60)) 
            doc_str = "Hoje\n"
        else
            doc_str = "Amanhã\n" 
    }

    else if(day == 1) 
        doc_str = "Amanhã\n"

    else
    {
        var date = new Date()
        date.setDate(date.getDate() + (day - 1))
        doc_str = `${StrWeek[date.getDay()]}\n`
    }

    doc_str += `${String(hour).padStart(2, '0')} h `
    doc_str += `${String(minute).padStart(2, '0')} m`

    document.getElementById(element_event).innerText = doc_str

    return next_event
}

function GetEventDiff(e_interval, next_event, e_weekday)
{
    var seconds = GetTodaySeconds(UserTimeZone)

    if(e_weekday)
        seconds += (GetTodayWeekDay()) * 86400

    return (e_interval - (seconds - next_event)) % e_interval
}

function GetNextEventTime(e_interval, initial_time)
{    
    var today_sec = GetTodaySeconds(0)
    
    var next_event = initial_time + e_interval;

    for(var i = initial_time; i <= today_sec + e_interval; i += e_interval)
        next_event = i
    
    next_event += (UserTimeZone * 3600)
    next_event = next_event > 0 ? next_event : 86400 + next_event
  
    return next_event
}

function GetUserTimeZone()
{
    const date = new Date(Date.now())
    return Math.floor(date.getTimezoneOffset() * (-1) / 60)
}

function GetTodaySeconds(gmt) 
{
    var date = GetUTCDate()
    var seconds = (date.getHours() + gmt) * 3600 + date.getMinutes() * 60 + date.getSeconds()
    seconds = seconds > 0 ? seconds : 86400 + seconds
    return seconds % 86400
}

function GetTodayHour(gmt) 
{
    var date = GetUTCDate()
    return (date.getHours() + gmt)
}

function GetTodayMinutes(gmt) 
{
    var date = GetUTCDate()
    return (date.getHours() + gmt) * 60 + date.getMinutes()
}
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

document.getElementById("had-local").innerText = `Horário Atual (GMT ${UserTimeZone}:00)`
document.getElementById("had-global").innerText = `Horário Servidor Sky (GMT ${SkyTimeZone}:00)`

UpdateSystemClock()
setInterval(UpdateSystemClock, 1000)