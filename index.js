var numSoundFiles = 0

// plays given sound file
function playSound(sf) {
    sf.load()
    sf.play()
}

// plays all sounds at once
function playAll() {
    for (let i = 1; i <= numSoundFiles; ++i) {
        let s = document.getElementById("sound"+i)
        if (s != null)
            playSound(s)
        else
            break
    }
}

// resets all currently playing sounds
function stopAll() {
    for (let i = 1; i <= numSoundFiles; ++i) {
        let s = document.getElementById("sound"+i)
        if (s != null) {
            // if sound is currently playing
            if (!s.paused || s.currentTime) 
                s.load()
        } 
        else
            break
    }
}

function insertButtonsByName(bd, name) {
    const audioList = document.querySelectorAll("audio")
    audioList.forEach(ele => {
        let snum = ele.id[ele.id.length-1]
        let sname = ele.lastElementChild.src.substr(ele.lastElementChild.src.lastIndexOf("/")+1)
        sname = sname.substr(0, sname.lastIndexOf(".mp3"))
        if (sname.startsWith(name)) {
            sname = sname.substr(name.length)
            bd.innerHTML += "<button id=\"button" + snum + "\" onclick=\"playSound(sound" + snum + ")\">" + sname + "</button>\n"
            numSoundFiles += 1
        }
    })
}

// creates buttons for each audio component
function createButtons() {
    console.log("initializing...")
    bd = document.getElementById("bodyDiv")
    bd.innerHTML = ""
    bd.innerHTML += "<h1>The Dykler Himself - Brother Tai</h1>"
    insertButtonsByName(bd, "myk")
    bd.innerHTML += "<h1>Tree Climber Supreme - Krabbles</h1>"
    insertButtonsByName(bd, "karbles")
    bd.innerHTML += "<h1>Web Developer Hack - Mauron</h1>"
    insertButtonsByName(bd, "masa")
    bd.innerHTML += "<h1>Random Garbage</h1>"
    insertButtonsByName(bd, "misc")
    bd.innerHTML += "<h1>Are you insane?</h1>\n" +
        "<button id=\"buttonAll\" onclick=\"playAll()\">Play. Them. All.</button>\n" + 
        "<h1>MAKE IT STOP</h1>\n" +
        "<button id=\"buttonStop\" onclick=\"stopAll()\">Mute</button>\n" +
        "<br><br><br><br><br>\n"
}