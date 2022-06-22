const arr=["x","","x",
"x","","","x"]


const newArr=arr.filter((ele)=>ele==="")
console.log(newArr)
newArr[0]=""
console.log(arr.indexOf(newArr[0]))
