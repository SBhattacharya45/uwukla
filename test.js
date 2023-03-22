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

var userImageLink ="https://images.pexels.com/photos/4328739/pexels-photo-4328739.jpeg";
var downloadSize = 40430990;
var downloadImgSrc = new Image();

function InitiateSpeedDetection() {
    document.getElementById("again-btn").disabled = true;
    ShowProgressMessage("Measuwing...<br><img class='bongo-gif' src='./assets/bongo.gif' alt='mew'>");
    var time_start, end_time;
    downloadImgSrc.onload = function () {
        end_time = new Date().getTime();
        displaySpeed();
    };
    time_start = new Date().getTime();
    var cacheBuster = "?nnn=" + time_start;
    downloadImgSrc.src = userImageLink + cacheBuster;

    function displaySpeed() {
        var timeDuration = (end_time - time_start) / 1000;
        var loadedBits = downloadSize * 8;
        var bps = (loadedBits / timeDuration).toFixed(2);
        var speedInKbps = (bps / 1024).toFixed(2);
        var speedInMbps = (speedInKbps / 1024).toFixed(2);
        ShowProgressMessage([
            "Youw intewnet<br>speed iws<br><div class='speed'>" + Math.round(speedInMbps) + "&nbsp;Mbps</div>"
            // "Youw intewnet<br>speed iws<br><div class='speed'>UwU&nbsp;Mbps</div>"
        ]);
        document.getElementById("again-btn").disabled = false;
    }
}  

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}