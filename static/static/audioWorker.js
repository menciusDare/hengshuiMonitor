"use strict";

function receiveMessage(a) {
    var b = a.data;
    switch (b.type) {
        case"sdpInfo":
            sdpInfo = b.data.sdpInfo;
            var c = b.data.aacCodecInfo;
            setAudioRtpSession(sdpInfo, c);
            break;
        case"MediaData":
            var d = b.data.rtspInterleave[1];
            if ("undefined" != typeof audioRtpSessionsArray[d]) {
                var e = b.data,
                    f = audioRtpSessionsArray[d].parseRTPData(e.rtspInterleave, e.payload, isBackupCommand, b.info);
                null !== f && "undefined" != typeof f && null !== f.streamData && "undefined" != typeof f.streamData && (f.streamData = null), sendMessage("render", f)
            }
    }
}

function setAudioRtpSession(a, b) {
    for (var c = a, d = 0; d < a.length; d++) if (-1 === c[d].trackID.search("trackID=t")) {
        switch (rtpSession = null, c[d].codecName) {
            case"G.711A":
            case"G.711Mu":
                rtpSession = new G711Session(c[d].codecName), rtpSession.setCodecInfo(c[d]);
                break;
            case"G.726-16":
            case"G.726-24":
            case"G.726-32":
            case"G.726-40":
                var e = parseInt(c[d].codecName.substr(6, 2));
                debug.log(e), rtpSession = new G726Session(e);
                break;
            case"mpeg4-generic":
                rtpSession = new AACSession, debug.log("aacCodecInfo:  " + JSON.stringify(b)), rtpSession.setCodecInfo(b)
        }
        var f = c[d].RtpInterlevedID;
        if (audioRtpSessionsArray[f] = rtpSession, null != rtpSession) return
    }
}

function sendMessage(a, b) {
    var c = {
        type: a,
        codec: b.codec,
        data: b.bufferData,
        rtpTimeStamp: b.rtpTimeStamp,
        samplingRate: b.samplingRate || 8e3
    };
    if ("render" === a) postMessage(c, [b.bufferData.buffer]); else if ("backup" === a) {
        var d = {type: a, data: b};
        postMessage(d)
    } else postMessage(c)
}

importScripts("./public.js", "./g711Session.js", "./g726Session.js", "./aacSession.js", "./Decode/audioDecoderG711.js", "./Decode/audioDecoderG726x.js"), addEventListener("message", receiveMessage, !1);
var audioRtpSessionsArray = [], sdpInfo = null, rtpSession = null, isBackupCommand = !1;