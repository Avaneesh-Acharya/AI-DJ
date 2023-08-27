song=""
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
leftWrist_score=0
rightWrist_score=0
function preload() {
    song=loadSound("music.mp3")
}
function setup() {
    canvas=createCanvas(850, 600)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,  model_loaded)
    poseNet.on("pose", got_results)
}
function draw() 
    image(video, 0, 0, 850, 600)
    fill("blue")
    stroke("red")
    if (leftWrist_score>0.001) {
    circle( leftWristX, leftWristY, 20)
    n=Number(leftWristY)
    f=floor(n)
    volume=f/600
    document.getElementById("volume").innerHTML="Volume= "+volume
    song.setVolume(volume)
    fill("blue")
    stroke("red")
    if (rightWrist_score>0.001) {
    circle( rightWristX, rightWristY, 20)
    if (rightWristY>0 && rightWristY<=120) {
        document.getElementById("speed").innerHTML="Speed= 0.5x "
        song.rate(0.5)
    }
     else if (rightWristY>120 && rightWristY<=240) {
        document.getElementById("speed").innerHTML="Speed= 1.0x "
        song.rate(1)
    }
    else if (rightWristY>240 && rightWristY<=360) {
        document.getElementById("speed").innerHTML="Speed= 1.5x "
        song.rate(1.5)
    }
    else if (rightWristY>360 && rightWristY<=480) {
        document.getElementById("speed").innerHTML="Speed= 2.0x "
        song.rate(2)
    }
    else if (rightWristY>480 && rightWristY<=600) {
        document.getElementById("speed").innerHTML="Speed= 2.5x "
        song.rate(2.5)
    }
}}
function play1() {
    song.play()
    song.setVolume(1.0)
    song.rate(2.5)
}
function Stop() {
    song.stop()
}
function model_loaded() {
    console.log("poseNet is initialized")
}
function got_results(results) {
    if (results.length>0) {
       console.log(results)
       leftWrist_score=results[0].pose.keypoints[9].score
       rightWrist_score=results[0].pose.keypoints[10].score
       console.log("score"+leftWrist_score)
       leftWristX=results[0].pose.leftWrist.x
       leftWristY=results[0].pose.leftWrist.y
       console.log(leftWristX, leftWristY)
       rightWristX=results[0].pose.rightWrist.x
       rightWristY=results[0].pose.rightWrist.y
       console.log(rightWristX, rightWristY)
    }
}