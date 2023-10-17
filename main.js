var SpeechRecognition = window.webkitSpeechRecognition;
var recogniton = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML="";
    recogniton.start();
}

recogniton.onresult = function (event){
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML=content;
    if(content=="selfie") {
        speak();
    }  
}

function take_snapshot() {
    console.log(img_id);

    Webcam.snap(function(data_uri) {
        if(img_id=="selfie1"){
            document.getElementById("result1").innerHTML = '<img id="selfie1" src="'+data_uri+'"/>';
        }
        if(img_id=="selfie2"){
            document.getElementById("result2").innerHTML = '<img id="selfie2" src="'+data_uri+'"/>';
        }
        if(img_id=="selfie3"){
            document.getElementById("result3").innerHTML = '<img id="selfie3" src="'+data_uri+'"/>';
        }
    });
}
function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "taking you selfie in 5 seconds"
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
}
setTimeout(function(){
    img_id = "selfie1";
    take_snapshot();
    speak_data = "Taking your next selfie in 10 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

},5000);

setTimeout(function(){
    img_id = "selfie1";
    take_snapshot();
    speak_data = "Taking your next selfie in 10 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    
},5000);

setTimeout(function(){
    img_id = "selfie1";
    take_snapshot();
    speak_data = "Taking your next selfie in 10 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    
},5000);

function save() {
    link=document.getElementById("link");
    img = document.getElementById("selfie_image").scroll;
    link.href=img;
    link.click();
}

Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:90
});

var camera = document.getElementById("camera");

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version: '+ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X8-9vMYP9/model.json',modelLoaded);

function modelLoaded() {
    console.log("model is loaded!")
}

function check() {
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,results) {
if(error){
    console.error(error)
}
else{
    console.log(results)
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
}
}