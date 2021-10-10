/* eslint-env browser */

/* global Webex */

/* eslint-disable camelcase */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

// Declare some globals that we'll need throughout
let activeMeeting, webex;

let currentMediaStreams = [];
const statusElm = document.querySelector('#lblStatus');
const hdnmeetingId = document.querySelector('#hdnMeetingId');
const meetingStreamsLocalAudio = document.querySelector('#self-audio');
const meetingStreamsLocalVideo = document.querySelector('#self-view');
const meetingStreamsRemotelVideo = document.querySelector('#remote-view-video');
const meetingStreamsRemoteAudio = document.querySelector('#remote-view-audio');
const toggleSourcesMediaDirection = document.querySelectorAll('[name=ts-media-direction]');
const audioToggleIcon = document.querySelector('#iconAudio');
const videoToggleIcon = document.querySelector('#iconVideo');



function initWebex() {
    //console.log('Authentication#initWebex()');
    //statusElm.innerHTML = 'initializing...';
    //webex = window.webex = Webex.init({
    //    config: {
    //        logger: {
    //            level: 'debug'
    //        },
    //        meetings: {
    //            reconnection: {
    //                enabled: true
    //            }
    //        }
    //        // Any other sdk config we need
    //    },
    //    credentials: {
    //        access_token: document.getElementById('hdnToken').value
    //    }
    //});

    //webex.once('ready', () => {
    //    console.log('Authentication#initWebex() :: Webex Ready');
    //    statusElm.innerHTML = 'Saved - Webex Ready';
    //    register();
    //});

    
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndWVzdC11c2VyLTczNDkiLCJuYW1lIjoiR3Vlc3QgVXNlcidzIERpc3BsYXkgTmFtZSIsImlzcyI6IlkybHpZMjl6Y0dGeWF6b3ZMM1Z6TDA5U1IwRk9TVnBCVkVsUFRpOHdZemcwTVRsa09TMDBabVE0TFRRNFpXUXRZVGhqWVMweVl6RmpPREptTkRBMk5XWSIsImV4cCI6IjE2MDczNDU1NTMifQ.dfWTgcD5UWjf45mfVYL7-GqUwre9bOQhJ6RPmOkLF0k';
    webex = window.webex = Webex.init();
    webex.once(`ready`, function () {
        webex.authorization.requestAccessTokenFromJwt({ jwt: token })
            .then(() => {
                // the user is now authenticated with a guest token (JWT)
                // proceed with your app logic
                register();
            })
    });
}

function register() {
    console.log('Authentication#register()');
    statusElm.innerHTML = 'Registering...';
    webex.meetings.register()
        .then(() => {
            console.log('Authentication#register() :: successfully registered');
            statusElm.innerHTML = 'successfully registered..';
        })
        .catch((error) => {
            console.warn('Authentication#register() :: error registering', error);
            statusElm.innerHTML = 'Authentication register() :: error registering.';
        })
        .finally(() => {
            statusElm.innerHTML = webex.meetings.registered ?
                'Registered' :
                'Not Registered';
            createMeeting();
        });

    webex.meetings.on('meeting:added', (m) => {
        const { type } = m;
        if (type === 'INCOMING') {
            const newMeeting = m.meeting;
            answerMeeting();
            newMeeting.acknowledge(type);
        }
    });
}

function unregister() {
    console.log('Authentication#unregister()');
    statusElm.innerHTML = 'Unregistering...';

    webex.meetings.unregister()
        .then(() => {
            console.log('Authentication#register() :: successfully unregistered');
            statusElm.innerHTML = 'successfully unregistered';
        })
        .catch((error) => {
            console.warn('Authentication#register() :: error unregistering', error);
        })
        .finally(() => {
            statusElm.innerHTML = webex.meetings.regisered ?
                'Registered' :
                'Not Registered';
        });
}

function createMeeting() {
    webex.meetings.create(document.getElementById('invitee').value)
        .then((meeting) => {
            statusElm.innerHTML = `Create Meeting ID:${meeting.id}`;
            activeMeeting = meeting;
            hdnmeetingId.value = meeting.id;
            joinMeeting(meeting);
            //getMediaStreams();
        });
}

function getMediaStreams(mediaSettings = getMediaSettings(), audioVideoInputDevices = {}) {
    const meeting = getCurrentMeeting();
    statusElm.innerHTML = 'Get Media Streatm....';
    console.log('MeetingControls#getMediaStreams()');
    if (!meeting) {
        console.log('MeetingControls#getMediaStreams() :: no valid meeting object!');
        return Promise.reject(new Error('No valid meeting object.'));
    }

    // Get local media streams
    return meeting.getMediaStreams(mediaSettings, audioVideoInputDevices)
        .then(([localStream, localShare]) => {
            console.log('MeetingControls#getMediaStreams() :: Successfully got following streams', localStream, localShare);
            statusElm.innerHTML = 'Successfully get media streams';
            // Keep track of current stream in order to addMedia later.
            const [currLocalStream, currLocalShare] = currentMediaStreams;

            /*
             * In the event of updating only a particular stream, other streams return as undefined.
             * We default back to previous stream in this case.
             */
            currentMediaStreams = [localStream || currLocalStream, localShare || currLocalShare];

            return currentMediaStreams;
        })
        .then(([localStream]) => {
            if (localStream && mediaSettings.sendVideo) {
                meetingStreamsLocalVideo.srcObject = localStream;
            }
            joinMeeting(meeting);
            return { localStream };
        })
        .catch((error) => {
            console.log('MeetingControls#getMediaStreams() :: Error getting streams!');
            console.error();
            return Promise.reject(error);
        });
}
function getMediaSettings() {
    const settings = {};
    toggleSourcesMediaDirection.forEach((options) => {
        settings[options.value] = options.checked;
        if (options.sendShare && (isSafari || isiOS)) {
            // It's been observed that trying to setup a Screenshare at join along with the regular A/V streams
            // causes Safari to loose track of it's user gesture event due to getUserMedia & getDisplayMedia being called at the same time (through our internal setup)
            // It is recommended to join a meeting with A/V streams first and then call `meeting.shareScreen()` after joining the meeting successfully (on all browsers)
            settings[options.value] = false;
            console.warn('MeetingControsl#getMediaSettings() :: Please call `meeting.shareScreen()` after joining the meeting');
        }
    });
    return settings;
}

function joinMeeting(meeting) {
    return meeting.join().then(() => {
        return meeting.getSupportedDevices({
            sendAudio: true,
            sendVideo: true
        })
            .then(({ sendAudio, sendVideo }) => {
                const mediaSettings = {
                    receiveVideo: true,
                    receiveAudio: true,
                    receiveShare: false,
                    sendShare: false,
                    sendVideo,
                    sendAudio
                };

                return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
                    const [localStream, localShare] = mediaStreams;

                    meetingStreamsLocalVideo.srcObject = localStream;

                    meeting.addMedia({
                        localShare,
                        localStream,
                        mediaSettings
                    });

                    meeting.on('media:ready', (media) => {
                        // eslint-disable-next-line default-case
                        switch (media.type) {
                            case 'remoteVideo':
                                meetingStreamsRemotelVideo.srcObject = media.stream;
                                break;
                            case 'remoteAudio':
                                meetingStreamsRemoteAudio.srcObject = media.stream;
                                break;
                            //case 'remoteShare':
                            //    meetingStreamsRemoteShare.srcObject = media.stream;
                            //    break;
                            //case 'localShare':
                            //    meetingStreamsLocalShare.srcObject = media.stream;
                            //    break;
                        }


                    });
                });
            });
    });
}

//function joinMeeting(meetingId) {
//    const meeting = webex.meetings.getAllMeetings()[meetingId];

//    if (!meeting) {
//        throw new Error(`meeting ${meetingId} is invalid or no longer exists`);
//    }
//    const resourceId = webex.devicemanager._pairedDevice ?
//        webex.devicemanager._pairedDevice.identity.id :
//        undefined;

//    meeting.join({
//        pin: '',
//        moderator: false,
//        moveToResource: false,
//        resourceId
//    })
//        .then(() => {
//            statusElm.innerHTML = meeting.destination ||
//                meeting.sipUri ||
//                meeting.id;

//            addMedia();
//        });
//}

function leaveMeeting() {
    const meetingI = getCurrentMeeting();
    var meetingId = meetingI.id;
    if (!meetingId) {
        return;
    }

    const meeting = webex.meetings.getAllMeetings()[meetingId];

    if (!meeting) {
        throw new Error(`meeting ${meetingId} is invalid or no longer exists`);
    }

    meeting.leave()
        .then(() => {
            statusElm.innerHTML = 'Not currently in a meeting...Call has been ended';
            unregister();
        });
}

function getCurrentMeeting() {
    const meetings = webex.meetings.getAllMeetings();

    return meetings[Object.keys(meetings)[0]];
}

function answerMeeting() {
    const meeting = getCurrentMeeting();

    if (meeting) {
        meeting.join().then(() => {
            meeting.acknowledge('ANSWER', false);
        });
    }
}

function rejectMeeting() {
    const meeting = getCurrentMeeting();

    if (meeting) {
        meeting.decline('BUSY');
    }
}

function addMedia() {
    const meeting = getCurrentMeeting();
    const [localStream, localShare] = currentMediaStreams;

    console.log('MeetingStreams#addMedia()');
    statusElm.innerHTML = 'Meeting Streams Add Media';
    if (!meeting) {
        console.log('MeetingStreams#addMedia() :: no valid meeting object!');
    }

    meeting.addMedia({
        localShare,
        localStream,
        mediaSettings: getMediaSettings()
    }).then(() => {
        console.log('MeetingStreams#addMedia() :: successfully added media!');
        statusElm.innerHTML = 'Successfully added media ....';
        statusElm.innerHTML = 'Call has been connected successfully, Waiting please for share video and audio..... ';
    }).catch((error) => {
        console.log('MeetingStreams#addMedia() :: Error adding media!');
        console.error(error);
    });

    // Wait for media in order to show video/share
    meeting.on('media:ready', (media) => {
        // eslint-disable-next-line default-case
        switch (media.type) {
            case 'remoteVideo':
                meetingStreamsRemotelVideo.srcObject = media.stream;
                break;
            case 'remoteAudio':
                meetingStreamsRemoteAudio.srcObject = media.stream;
                break;
            //case 'remoteShare':
            //    meetingStreamsRemoteShare.srcObject = media.stream;
            //    break;
            //case 'localShare':
            //    meetingStreamsLocalShare.srcObject = media.stream;
            //    break;
        }


    });
}

function toggleSendAudio() {

    const meeting = getCurrentMeeting();

    const handleError = (error) => {
        statusElm.innerHTML = 'Error! See console for details.';
        console.log('MeetingControls#toggleSendAudio() :: Error toggling audio!');
        console.error(error);
    };

    console.log('MeetingControls#toggleSendAudio()');
    if (!meeting) {
        console.log('MeetingControls#toggleSendAudio() :: no valid meeting object!');
        return;
    }

    if (meeting.isAudioMuted()) {
        meeting.unmuteAudio()
            .then(() => {
                statusElm.innerHTML = 'Toggled audio on!  Successfully unmuted audio!';
                console.log('MeetingControls#toggleSendAudio() :: Successfully unmuted audio!');
                document.getElementById('iconAudioActive').setAttribute('style', 'display:none');
                document.getElementById('iconAudioInActive').removeAttribute('style');
            })
            .catch(handleError);
    }
    else {
        meeting.muteAudio()
            .then(() => {
                statusElm.innerHTML = 'Toggled audio on!  Successfully muted audio!';
                console.log('MeetingControls#toggleSendAudio() :: Successfully muted audio!');
                document.getElementById('iconAudioActive').removeAttribute('style');
                document.getElementById('iconAudioInActive').setAttribute('style', 'display:none');
            })
            .catch(handleError);
    }
}

function toggleSendVideo() {
    const meeting = getCurrentMeeting();

    const handleError = (error) => {
        statusElm.innerHTML = 'Error! See console for details.';
        console.log('MeetingControls#toggleSendVideo() :: Error toggling video!');
        console.error(error);
    };

    console.log('MeetingControls#toggleSendVideo()');
    if (!meeting) {
        console.log('MeetingControls#toggleSendVideo() :: no valid meeting object!');
        return;
    }

    if (meeting.isVideoMuted()) {
        meeting.unmuteVideo()
            .then(() => {
                statusElm.innerHTML = 'Toggled video on!   Successfully share video!';
                console.log('MeetingControls#toggleSendVideo() :: Successfully unmuted video!');
                document.getElementById('iconVideoActive').setAttribute('style', 'display:none');
                document.getElementById('iconVideoInActive').removeAttribute('style');
            })
            .catch(handleError);
    }
    else {
        meeting.muteVideo()
            .then(() => {
                statusElm.innerHTML = 'Toggled video off!   Successfully stop sharing video!';
                console.log('MeetingControls#toggleSendVideo() :: Successfully muted video!');
                document.getElementById('iconVideoInActive').setAttribute('style', 'display:none');
                document.getElementById('iconVideoActive').removeAttribute('style');
            })
            .catch(handleError);
    }
}


















