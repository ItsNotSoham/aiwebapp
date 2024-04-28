function setup() {
    c1=createCanvas(500,500)
    c1.center()
    v1=createCapture(VIDEO)
    v1.hide()
    mymodel=ml5.poseNet(v1,modelLoaded())
    mymodel.on('pose',gotPoses)
}

function modelLoaded(){
    console.log("Model loaded :)")
}
lwx=0
lwy=0
rwx=0
rwy=0
kprw=0
kplw=0

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        lwx=results[0].pose.leftWrist.x
        lwy=results[0].pose.leftWrist.y 
        rwx=results[0].pose.rightWrist.x
        rwy=results[0].pose.rightWrist.y
        kprw=results[0].pose.keypoints[10].score
        kplw=results[0].pose.keypoints[9].score
        console.log("x position of my left wrist is",lwx)
        console.log("y position of my left wrist is",lwy)
        console.log("x position of my right wrist is",rwx)
        console.log("y position of my right wrist is",rwy)
        
    }


}

function draw() {
    image (v1,0,0,500,500)
    fill("red")
    if(kprw>0.2){
        circle(rwx,rwy,30)
        if(rwy>0 && rwy<=100){
            song.rate(0.5)
            document.getElementById("SPEED").innerHTML="Speed=0.5x"
        }
        else if(rwy>100 && rwy<=200){
            song.rate(1)
            document.getElementById("SPEED").innerHTML="Speed=1x"
        }
        else if(rwy>200 && rwy<=300){
            song.rate(1.5)
            document.getElementById("SPEED").innerHTML="Speed=1.5x"
        }
        
        else if(rwy>300 && rwy<=400){
            song.rate(2)
            document.getElementById("SPEED").innerHTML="Speed=2x"
        }
        
        else if(rwy>400 && rwy<=500){
            song.rate(2.5)
            document.getElementById("SPEED").innerHTML="Speed=2.5x"
        }    
    }
    if(kplw>0.2){
        circle(lwx,lwy,30)
        if(lwy>0 && lwy<=100){
            song.setVolume(0.2)
            document.getElementById("VOLUME").innerHTML="Volume=0.2x"
        }
        else if(lwy>100 && lwy<=200){
            song.setVolume(0.4)
            document.getElementById("VOLUME").innerHTML="Volume=0.4x"
        }
        else if(lwy>200 && lwy<=300){
            song.setVolume(0.6)
            document.getElementById("VOLUME").innerHTML="Volume=0.6x"
        }
        else if(lwy>300 && lwy<=400){
            song.setVolume(0.8)
            document.getElementById("VOLUME").innerHTML="Volume=0.8x"
        }
        else if(lwy>400 && lwy<=500){
            song.setVolume(1)
            document.getElementById("VOLUME").innerHTML="Volume=1x"
        }





    }





}
song=""
function preload(){
    song=loadSound("music.mp3")
}
function playmusic(){
    song.play()
    song.setVolume(0.5)
    song.rate(1)
}