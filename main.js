//https://teachablemachine.withgoogle.com/models/6e9pwfvfP/model.json

prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
};

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6e9pwfvfP/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!')
}


function speak() {
    var synth = window.speechSynthesis;
    speakData = "The gesture is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        document.getElementById("result_gesture_name").innerHTML = results[0].label;

        prediction = results[0].label;
        speak();

        if (results[0].label == "Best") {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
    }
}