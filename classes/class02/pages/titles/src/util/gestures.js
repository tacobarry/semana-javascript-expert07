const { GestureDescription, Finger, FingerCurl } = window.fp;
  
const ScrollDownGesture = new GestureDescription('scroll_down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll_up'); // 🖐
const RockAndRollGesture = new GestureDescription('rock_and_roll'); // :the_horns: 🤘
  
// Scroll Down
// -----------------------------------------------------------------------------
  
// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


// Scroll Up
// -----------------------------------------------------------------------------
  
// no finger should be curled
for(let finger of Finger.all) {
    ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}


// Rock And Roll
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
RockAndRollGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RockAndRollGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

for(let finger of [Finger.Index, Finger.Pinky]) {
    RockAndRollGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}
// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    RockAndRollGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    RockAndRollGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


const knownGestures = [
    ScrollDownGesture,
    ScrollUpGesture,
    RockAndRollGesture
]

const gesturesStrings = {
    scroll_down: '🖐',
    scroll_up: '✊️',
    rock_and_roll: '🤘'
}

export {
    knownGestures,
    gesturesStrings
}