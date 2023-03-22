var imageAddr = "https://images.pexels.com/photos/4328739/pexels-photo-4328739.jpeg"; 
var downloadSize = 11984146; 

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    document.getElementById("again-btn").disabled = true;
    ShowProgressMessage("Measuwing...<br><img class='bongo-gif' src='./assets/bongo.gif' alt='mew'>");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
        document.getElementById("again-btn").disabled = false;
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Error Measuring");
        document.getElementById("again-btn").disabled = false;
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage([
            "Youw intewnet<br>speed iws<br><div class='speed'>" + Math.round(speedMbps) + "&nbsp;Mbps</div>"
        ]);
    }
}