const boxes=document.querySelectorAll(".box")
let resultSample=["","","","","","","","",""]
const x="X"
const o="O"
let turn=x
const result=document.querySelector(".result")
const gameFinishText=document.querySelector("#gameFinishText")
const resetButton=document.querySelector("#resetButton")
const resultArray=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let person1=prompt("Please enter your name")
const hover=()=>{
    const removeHover=(box)=>{
        box.classList.remove("X-hover")
        box.classList.remove("O-hover")
    }
    boxes.forEach(removeHover)
const addHover=(box)=>{
    if (box.textContent===""){
        box.classList.add(`${turn}-hover`)
    }
}

    boxes.forEach(addHover)

}

const final=(txt)=>{
     let text="Draw"
     if(txt===person1){
        text=`winner is ${txt}`
     }else if (txt==="AI"){
        text=`${person1} is too stupid, AI wins`
     }
    result.classList.remove("invisble")
    result.classList.add("visble")
    gameFinishText.textContent=text

}

const resultCheck=()=>{
    for(let ele of resultArray){
        const sampleA=resultSample[ele[0]]
        const sampleB=resultSample[ele[1]]
        const sampleC=resultSample[ele[2]]
        if(sampleA===x&&sampleA===sampleB&&sampleA===sampleC){
            final(person1)

        }else if (sampleA===o&&sampleA===sampleB&&sampleA===sampleC){
            final("AI")

        }
    }
    const myFunc2=(box)=>{
      return  box!==""

    }
    if (resultSample.every(myFunc2)){
        final("")
   }


    }






   const aiMove=()=>{
// const cb=(ele)=>{
//         return ele===""
//     }
//     let newBoxes=resultSample.filter(cb)
    const boxesArray = Array.from(boxes)

    const emptyBoxes = boxesArray.filter((box)=> {
        return box.textContent === ''
    })

    if (emptyBoxes.length === 0) {
        return
    }

    const randomNum = Math.floor(Math.random() * emptyBoxes.length)
    const nextBox = emptyBoxes[randomNum]
    const index = parseInt(nextBox.dataset.index)
    nextBox.textContent = o
    resultSample[index] = o

    // console.log(newBoxes)
    // console.log(resultSample)

    // for(let i=Math.floor(Math.random()*newBoxes.length);i<newBoxes.length;i++){
    //     if(resultSample[i]==="")
    //     return (boxes[i].textContent=o)&&(resultSample[i]=o)
    // }
    // for(let i=Math.floor(Math.random()*9);i<boxes.length;i++){
    //     if(newBoxes.length===0){
    //        break
    //     }
    //     else if(boxes[i].textContent===""){
    //     return (boxes[i].textContent=o)&&(resultSample[i]=o)
    //     }else if ((boxes[i].textContent!=="")){
    //         return aiMove()
    //     }

    // }


   }


let interval
const clickBox=(event)=>{
    const box=event.target
    const boxNum=box.dataset.index
    if(result.classList.contains("visble")){
        return
    }
    if(box.textContent!=""){
      return
    }
    if(turn===x){

        box.textContent=x
        resultSample[boxNum]=x
        aiMove()
 clearInterval(interval);
      let count = 5;

       interval = setInterval(function(){
       document.getElementById('count').innerHTML=`${count} !!!!`;
        count--;
        if(result.classList.contains("visble")){
            clearInterval(interval)

        }


        else if (count===-1){
           clearInterval(interval)
       alert("You're out of time!");
        }
      }, 1000)
  }

    hover()
    resultCheck()
}

const myfunc1=(box)=>{
    box.addEventListener("click",clickBox)
}
boxes.forEach(myfunc1)




const resetGame=()=>{
    resultSample=["","","","","","","","",""];
    turn=x
    const myFunc3=(box)=>{
        box.textContent=""

    }
    boxes.forEach(myFunc3)
    hover()

    result.classList.remove("visble")
    result.classList.add("invisble")
    document.querySelector("#count").textContent="Timer"
}

resetButton.addEventListener("click",resetGame)
