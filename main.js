Webcam.set({width: 350, height: 300, image_format: 'png', png_quality: 90});

var cameraVideo=document.querySelector('.camera');
var snapshotContainerDiv=document.querySelector('.snapshot_container');
var resultingHandGestureP=document.querySelector('.resulting_hand_gesture');
var accuracyP=document.querySelector('.accuracy');

Webcam.attach('.camera');

function takeSnapshot(){
    Webcam.snap(function(dataURIStr){
        snapshotContainerDiv.innerHTML='<img class="captured_img" src="'+dataURIStr+'"/>';
    });
};

console.log('ML5 Version:', ml5.version);

function onModelLoaded(){
    console.log('Model Loaded!');
}

var newImgClassifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KvaaeEbaM/model.json', onModelLoaded);

function displayResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        resultingHandGestureP.innerText='Result: '+results[0].label;
        accuracyP.innerText='Accuracy: '+results[0].confidence.toFixed(3);
    }
}

function checkHandGesture(){
    var capturedImg=document.querySelector('.captured_img');

    newImgClassifier.classify(capturedImg, displayResults);
}
 
