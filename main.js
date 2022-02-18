let game={
    words:[
        //'aiueokakikukeko',
        'dainijisekaitaisen',
        //'a',
        // 'yellow',
        // 'green',
    ],
    cuntbox:0,
    run:false,
    misscunt:0,
    henka:false,
    myPoint:100,
    currentWord:'',
    matchedIndex:0,
    startTime: null,
    isPlaying: false,
    bgmSound:document.getElementById('dance'),
    punchSound:document.getElementById('punch'),
    mainArea: document.getElementById('main'),
    resultArea: document.getElementById('result'),
    ninjaAred:document.getElementById('ninja'),
    enemyArea:document.getElementById('enemy'),
    buttonArea:document.getElementById('button'),
    start:function(){
        game.isPlaying=true;
        game.startTime=Date.now();
        game.setWord();
    },
    setWord:function(){
        game.currentWord=game.words.shift()||'';
        game.matchedIndex=0;
        game.displayWord();
    },
    displayWord:function(){
        game.ninjaAred.src="https://4.bp.blogspot.com/-j2P94mM1xIM/W8BOZ8tNuYI/AAAAAAABPY0/Pltadimikvs7dJTZ90kh4J9vuNUvprRBgCLcBGAs/s400/ninja_fukiya.png";
        game.enemyArea.src="https://1.bp.blogspot.com/-OnbnkHL2aM0/XobTDSKO3dI/AAAAAAABYEA/005kYGn41c47vfNDtcqucISdcGcoVSNsACNcBGAsYHQ/s400/edo_syounin_bad.png";
        game.mainArea.innerText='_'.repeat(game.matchedIndex)+game.currentWord.substring(game.matchedIndex);
    },
    isFinished:function(){
        return game.words.length===0;
    },
    displayResult:function(){
        const currentTime=Date.now();
        const elapsedTime=formattedSeconds(currentTime-game.startTime);
        let  prise=null;
        if(5<=elapsedTime && elapsedTime<=12){
             prise="素晴らしいです！";
            // prise 使える
        }else if(elapsedTime<5){
             prise="とても素晴らしいです！";
        }else{
             prise="もうちょっと速く！";
        };
        //prise ここで使えない

        game.resultArea.innerText=`${elapsedTime}秒かかりました。${prise} \n${this.myPoint}点です。\n もう一度プレイする場合にはブラウザをリロードしてください。`;
        // game.resultArea.innerText=<p>`${elapsedTime}秒かかりました。${prise}`</p> \n`<p>${this.myPoint}点です。</p> \n <p>もう一度プレイする場合にはブラウザをリロードしてください。</p>`;

        game.isPlaying=false;
    
    },
}

// utils
function formattedSeconds(ms){
    return (ms/1000).toFixed(2);
}

game.buttonArea.onclick=()=>{
    if(game.isPlaying===false){
        document.getElementById('screen').style.display="none";
        game.bgmSound.play();
        game.start();

    }
}

// let button=document.getElementById('button');
document.onkeydown = (e) => {
    if (e.key !== game.currentWord[game.matchedIndex]) {
        game.misscunt++;
        game.myPoint--;
        return;
    } else if (game.myPoint < 100) {
        game.myPoint++;
    };
    // アニメーション実行の待機列
    game.cuntbox++;
    
    game.matchedIndex++;
    game.displayWord();
    if (game.matchedIndex === game.currentWord.length) {
        if (game.isFinished()) {
            // function gamenidou(){
            //     $("#splash").delay(1200).fadeOut('slow');
            //     $
            // }
            game.displayResult();
        }
        game.setWord();
    }
};

const activate = () => {
    if (game.run === true) {
        return;
    }
    if (game.cuntbox > 0) {
         game.punchSound.play();
        game.enemyArea.className = "shouninnAfter";
        game.run = true;
        game.cuntbox--;
        const operation = () => {
            game.enemyArea.className = "shouninn";
            game.punchSound.pause();
            game.run = false;
        };
        setTimeout(operation, 100);
    }
};
setInterval(activate, 10);

const shinobi=()=>{
    if(game.henka===true){
        return;
    }
    if(game.misscunt>0){
        game.ninjaAred.className="sinobiAfter";
        game.henka=true;
        game.misscunt--;
        const shuriken=()=>{
            game.ninjaAred.className="sinobi";
            game.henka=false;
        };
        setTimeout(shuriken,2000);
    }
};
setInterval(shinobi,10);
             

