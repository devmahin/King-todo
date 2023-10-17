const input = document.querySelector(".input")
const btnAdd = document.querySelector(".btns")
const addVal = btnAdd.innerText
const todoBody = document.querySelector(".todoBody")
let localArray =[]
let edit_val = null;



let localGet = localStorage.getItem("user")
if(localGet != null){
localArray = JSON.parse(localGet)
}


display()
btnAdd.onclick = () => {
  let inputVal = input.value;

if(edit_val != null){
  // edit
  localArray.splice(edit_val,1,{"name" : inputVal})
  edit_val = null
}else{
  // insert
  localArray.push({"name": inputVal})
}


saveData(localArray)
input.value =""
btnAdd.innerHTML = addVal
}



function display(){
  let html= "";
 localArray.forEach((value,index) => {
  html+= `<tr>
  <th scope="row">${index+1}</th>
  <td>${value.name}</td>
  <th scope="col"><i class="fs-5 me-5 ri-file-text-line" onclick="editFun(${index})"></i> <i class="fs-5 ri-delete-bin-fill" onclick="deleteFun(${index})"></i>
  </tr>
`
 })
 todoBody.innerHTML = html
}



// savelocal
function saveData (array){
  let stores = localStorage.setItem("user", JSON.stringify(array))
  display()
}





// editTodo
function editFun(index){
  edit_val = index
  input.value = localArray[index].name
  btnAdd.innerText = "Add Btn"

}



// delete
function deleteFun (i){
  localArray.splice(i,1)
  saveData(localArray)
}









// scarch
const search = document.querySelector(".search")
const todoBodyTr = document.querySelectorAll(".todoBody tr")
search.addEventListener("input", (e) => {
  let ser = e.target.value.toLocaleLowerCase()
  todoBody.innerHTML = ""
  todoBodyTr.forEach(value => {
    let todovalue = value.querySelectorAll("td")
    if(todovalue[0].innerText.toLocaleLowerCase().indexOf(ser) > -1){
      todoBody.appendChild(value)
    }
  })
  if(todoBody.innerHTML === ""){
    todoBody.innerHTML = "Search is not found"
  }
})