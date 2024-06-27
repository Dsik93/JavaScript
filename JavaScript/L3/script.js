let tracks = [];
let isRecording = false;
let currentTrackIndex = -1;
let startTime = 0;
let loopTimeout;

document.querySelectorAll('.drum-key').forEach(key => {
    key.addEventListener('click', () => {
        const audio = new Audio(key.dataset.sound);
        audio.play();
        if (isRecording) {
            recordSound(key.dataset.sound);
        }
    });
});

document.getElementById('record').addEventListener('click', () => {
    if (currentTrackIndex === -1) return; // no track selected
    isRecording = true;
    startTime = Date.now();
    tracks[currentTrackIndex] = []; // Clear the current track if re-recording
});

document.getElementById('stop').addEventListener('click', () => {
    isRecording = false;
});

document.getElementById('play').addEventListener('click', () => {
    playAllLooped();
});

document.getElementById('add-track').addEventListener('click', () => {
    tracks.push([]);
    currentTrackIndex = tracks.length - 1;
    console.log("Track added. Total tracks: " + tracks.length);
});

document.getElementById('remove-track').addEventListener('click', () => {
    if (tracks.length > 0) {
        tracks.pop();
        currentTrackIndex = tracks.length - 1;
        console.log("Track removed. Total tracks: " + tracks.length);
    }
});

function recordSound(sound) {
    const timeElapsed = Date.now() - startTime;
    tracks[currentTrackIndex].push({ sound, time: timeElapsed });
}

function playAllLooped() {
    clearInterval(loopTimeout);
    const trackLength = parseInt(document.getElementById('track-length').value);
    loopTimeout = setInterval(() => {
        tracks.forEach(track => {
            track.forEach(note => {
                setTimeout(() => {
                    const audio = new Audio(note.sound);
                    audio.play();
                }, note.time);
            });
        });
    }, trackLength);
}

