let img = document.getElementById("batsmanImage");
let hit = false;
let playongoing = false;
let flag = false;

document.getElementById("Swing").addEventListener("click",()=>{
   
    if(!playongoing)return;

    hit = true;
    if(img.classList.contains("batHold")){
        img.src = "./images/batSwing.png";
        img.classList.remove("batHold");
    }
    else{
        img.src = "./images/batHold.png";
        img.classList.add("batHold");
    }

})

let ballStop = true;

function startgame(){
    if(!ballStop)return;

    ballStop = false;
    img.src = "./images/batHold.png";
    img.classList.add("batHold");
    hit = false;
    flag = false;
   let bowler = document.getElementById("bowlerImage");
    let random = 700+Math.floor( Math.random()*1000)+1;
   setTimeout(()=>{
    bowler.src = "./images/bowlerSwing.png";
    setTimeout(()=>{
        playongoing = true;
        bowler.src = "./images/bowlerRelease.png";
        ballthrown();
    },500)
    },random)
}

let rand;
function ballthrown(){
    let ball = document.getElementById("ball");
    ball.classList.remove("hidden");
    
    
    let top = 50;
    let right = 70;
    rand = Math.floor(Math.random()*3)+1;
    moveball(top,right)
}

let i =0;


function moveball(top,right){
    ball.style.top = `${top}px`;
    ball.style.right = `${right}px`;
    

    if(hit){
        if(!flag){
            hitinbat(top);
            flag = true;
        }
        
        setTimeout(()=>{
            top--;
           
            if(rand == 1){
                right++;
            }
            if(rand==2){
                right--;
            }
            else{
                right=50;
            }

            if(top< -100){
                ball.classList.add("hidden");
                hit  =false;
                ballStop = true;
                return;
            }
            moveball(top,right);
        },1)
    }
    else if(top<400){
        setTimeout(()=>{
            top++;
            moveball(top,right);
        },1)
    }
    else{
        updateScore(0);
        ballStop=true;
        ball.classList.add("hidden");
    }
}

let currentScore = 0;
let totalScore = 0;

function hitinbat(top){
    if(top<320){
        currentScore = 0
        updateScore(currentScore);
        return false;
    }
    else if(top<330){
        
        currentScore = 1;
        updateScore(currentScore);

        return true;
    }
    else if(top<340){
        currentScore = 4;
        updateScore(currentScore);
        return true;
    }
    else if(top<350){
        currentScore = 6;
        updateScore(currentScore);
        return true;
    }
    else if(top<360){
        currentScore = 2;
        updateScore(currentScore);
        return true;
    }
    else if(top<370){
        currentScore = 1;
        updateScore(currentScore);
        return true;
    }
    else if(top<390){
        currentScore = 1;
        updateScore(currentScore);
        return true;
    }
    else{
        currentScore = 0;
        updateScore(currentScore);
        return false;
    }

}


function updateScore(x){
    
    if (currentScore == 0){
        showCurrentScore("OUT");
        ballStop=true;
        return;
    }
    showCurrentScore(x)


    totalScore = document.getElementById("totalScore")

    let current = parseInt(totalScore.innerText);

    totalScore.innerText = current+x;
    document.getElementById("startgame").disabled = false;
}

function showCurrentScore(x){
    let body = document.getElementsByTagName("body")[0];

    let div = document.createElement("div");

    div.classList.add("text-7xl","font-bold","absolute","top-0","left-10","text-white")
    div.innerHTML = x;

    body.appendChild(div);

    setTimeout(()=>{
        body.removeChild(div);
    },700)
}
