let $btn = $("#sButton")
let $guesslist = $("#guesslist")
let $guessform = $("#wordsubmit")
let $guessword = $("#guessword")


// THEN create a bigger function that spits it into a POST request without changing the page
// SOMETHING WE ARE SENDING ISNT WORKING
// what returns should be the response and maybe spit that into the console
//

$btn.on("click",checkWord)

async function checkWord(e){
    e.preventDefault()
    let guessVal = $guessword.val()
    console.log(guessVal)
    let response = await axios.post("http://localhost:5000/checkword/"+guessVal) //seeing what comes back
    console.log(response)
    console.log(guessVal)
    // $guessword.val("")
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