const boxes = document.querySelectorAll(".box")

let resultSample = ["","","","","","","","","","","","","","","","","","","","","","","","",""]

const x = "X"

const o = "O"

let turn = x

const result = document.querySelector(".result")

const gameFinishText = document.querySelector("#gameFinishText")

const resetButton = document.querySelector("#resetButton")

const resultArray = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],[0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],[0,6,12,18,24],[4,8,12,16,20]]

let person1 = prompt("Please enter your name")

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
    let text = "Draw!!!"
    if(txt === person1){
        text = `winner is ${person1}`
    }
    else if (txt === "AI"){
        text = `AI wins!!!!`
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
        const sampleD = resultSample[ele[3]]
        const sampleE = resultSample[ele[4]]
        if(sampleA === x && sampleA === sampleB && sampleA === sampleC && sampleA === sampleD && sampleA === sampleE ){
            final(person1)

        }
        else if (sampleA === o && sampleA === sampleB && sampleA === sampleC && sampleA === sampleD && sampleA === sampleE ){
            final("AI")
        }
    }

    const myFunc2 = (box) => {
      return  box !== ""
    }
    if (resultSample.every(myFunc2)){
        final("")
    }
// console.log(resultSample)
// console.log(resultSample.every(myFunc2))
}

const aiMove = () => {
   const newBoxes = Array.from(boxes)
   const emptyBoxes = newBoxes.filter((ele) => {return ele.textContent === ""})
   if (emptyBoxes.length === 0){
    return
   }
// console.log(nextBox)
   const randomNum = Math.floor((Math.random()*emptyBoxes.length))
   const nextBox = emptyBoxes[randomNum]
   const index = parseInt(emptyBoxes[randomNum].dataset.index)
   nextBox.textContent = o
   resultSample[index] = o
}

let interval

const clickBox = (event) => {
    const box = event.target
    const boxNum = box.dataset.index
    if (result.classList.contains("visble")){
      return
    }
    if (box.textContent != ""){
      return
    }
    if (turn === x){
        box.textContent = x
        resultSample[boxNum] = x
        aiMove()
        clearInterval(interval)
        let count = 5
        interval = setInterval(function () {
            document.getElementById('count').innerHTML = `${count} !!!!`
            count--
            if (result.classList.contains("visble")){
                clearInterval(interval)
            }
            else if (count === -1){
                clearInterval(interval)
                alert("You're out of time!")
                gameFinishText.textContent=`${person1} lost`
                result.classList.remove("invisble")
                result.classList.remove("visble")
            }
        }, 1000)
    }
    //     turn=o
    // }else if(turn===o){
    //     box.textContent=o
    //     resultSample[boxNum]=o
    //     turn=x
    // }
    hover()
    resultCheck()
}

const myfunc1 = (box) => {
    box.addEventListener("click",clickBox)
}

boxes.forEach(myfunc1)



const resetGame = () => {
    resultSample = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
    turn = x
    const myFunc3 = (box) => {
        box.textContent = ""
    }
    boxes.forEach(myFunc3)
    hover()
    result.classList.remove("visble")
    result.classList.add("invisble")
    document.querySelector("#count").textContent="Timer"
}

resetButton.addEventListener("click",resetGame)
