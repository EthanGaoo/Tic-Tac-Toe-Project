const boxes = document.querySelectorAll(".box")

let resultSample = ["","","","","","","","",""]

const x = "X"

const o = "O"

let turn = x

const result = document.querySelector(".result")

const gameFinishText = document.querySelector("#gameFinishText")

const resetButton = document.querySelector("#resetButton")

const resultArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

let person1 = prompt("Please enter your name for Player-X")

let person2 = prompt("Please enter your name for Player-O")

const hover = () => {
    const removeHover = (box) => {
        box.classList.remove("X-hover")
        box.classList.remove("O-hover")
    }
    boxes.forEach(removeHover)

    const addHover = (box) => {
        if (box.textContent === ""){
        box.classList.add(`${turn}-hover`)
        }
    }

    boxes.forEach(addHover)

}

const final = (txt) => {
     let text = "Draw"
     if (txt !== ""){
        text = `winner is ${txt}`
        }
     result.classList.remove("invisble")
     result.classList.add("visble")
     gameFinishText.textContent = text

}

const resultCheck = () => {
    for (let ele of resultArray){
        const sampleA = resultSample[ele[0]]
        const sampleB = resultSample[ele[1]]
        const sampleC = resultSample[ele[2]]
        if(sampleA === x && sampleA === sampleB && sampleA === sampleC ){
            final(person1)
            return
        }
        else if (sampleA === o && sampleA === sampleB && sampleA === sampleC ){
            final(person2)
            return
        }
    }
    const myFunc2 = (box) => {
      return  box !== ""
    }
    if (resultSample.every(myFunc2)){
        final("")
    }
}

const clickBox = (event) => {
    const box = event.target
    const boxNum = box.dataset.index
    if (result.classList.contains("visble")){
        return
    }
    if (box.textContent != "" ){
      return
    }
    if (turn === x){
        box.textContent = x
        resultSample[boxNum] = x
    //    aiMove()
        let count = 5;
        let interval = setInterval( function () {
            document.getElementById('count').innerHTML = `${count} !!!!`
            count--;
            if (result.classList.contains("visble")){
             clearInterval(interval)
            }
            else if (turn === x){
              clearInterval(interval);
            }
            else if (count === -1){
              clearInterval(interval)
              alert("You're out of time!");
            }
        }, 1000)
        turn=o
    }
    else if ( turn === o){
        box.textContent = o
        resultSample[boxNum] = o
        if (turn === o){
            let count = 5;
            let interval = setInterval(function(){
                document.getElementById('count').innerHTML = `${count} !!!!`
                count--
                if (result.classList.contains("visble")){
                    clearInterval(interval)
                }
                else if (turn === o){
                    clearInterval(interval);
                }
                else if ( count === -1){
                    clearInterval(interval)
                    alert(`You are out of time`)
                }
            }, 1000)
        }
        turn=x
    }
    hover()
    resultCheck()
}

const myfunc1 = (box) => {
    box.addEventListener("click",clickBox)
}

boxes.forEach(myfunc1)

const resetGame = () => {
    resultSample = ["","","","","","","","",""];
    turn = x
    const myFunc3 = (box) => {
        box.textContent = ""
    }

    boxes.forEach(myFunc3)
    hover()
    result.classList.remove("visble")
    result.classList.add("invisble")
    // document.querySelector("#count").classList.remove("invisble")
    // document.querySelector("#count").classList.add("visble")
    document.querySelector("#count").textContent="Timer"
    // document.querySelector("#count").textContent="Timer"
}

resetButton.addEventListener("click",resetGame)
