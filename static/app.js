let $btn = $("#sButton")
let $guesslist = $("#guessUl")
let $guessform = $("#wordsubmit")
let $guessword = $("#guessword")
let $messages = $("#wordresponse")
let $scoreboard = $("#scoreboard")


//make the guess-list prettier and have it indicate what's a word and what isn't
//make a flash messages space at the top that resets every time we run checkWord


setTimeout(endGame,60000)

async function endGame(){
    let currscore = $scoreboard.text()
    let response = await axios.post("http://localhost:5000/endgame/"+currscore)
    alert("Game over!")
    $guessform.remove()
}

$btn.on("click",checkWord)

async function checkWord(e){
    e.preventDefault()
    $messages.text("")
    let guessVal = $guessword.val()
    let response = await axios.post("http://localhost:5000/checkword/"+guessVal) //seeing what comes back
    let respLiteral = response.data.result
    let respScore = response.data.score
    console.log(guessVal)
    console.log(response.data)
    $messages.text(`${guessVal}: ${respLiteral}`)
    $guessword.val("")
    $scoreboard.text(respScore)
    if (respLiteral === "already-guessed" || respLiteral === "not-on-board" || respLiteral === "not-word"){
        return
    }
    else {
        $messages.text(`${guessVal}: ${respLiteral}`)
        $guesslist.append(`<li>${guessVal}</li>`)
    } 
}


/*
async function checkWord(id,cVal){
    console.log(word)
    let response = await axios.get("/checkword?word="+id) //returning 1 category object
    //right here we need to stop if there's less than 5 clues
    let allClues = response.data.clues //store all the clues in an array
    // console.log(response)
    // generate 5 random clues
    let cluesTotal = response.data.clues.length //store how many clues there are
    let clueVals = ranArray(cluesTotal) //array of 5 random numbers within the length of how many clues there are
    // console.log(cluesTotal)
    // console.log(clueVals)
    let jCat = {}
    jCat["catname"+cVal] = (response.data.title).toUpperCase()
    for(let i=0;i<5;i++){
        let cIndex = clueVals[i]
        let tClue = allClues[cIndex]
        console.log(tClue)
        let cKey = `c-${cVal}-${i}`
        try{let uClue = new Clue(cKey,tClue.question,tClue.answer)
        let qname = "q"+cVal+i
        jCat[qname] = uClue}
        catch{let uClue = new Clue(cKey,"[question missing]","n/a")
        let qname = "q"+cVal+i
        jCat[qname] = uClue}
    }
    // console.log(jCat) //return 5 category names and 5 clues from each category, sort by value
    return jCat
}
*/