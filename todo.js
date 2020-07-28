const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    console.log('btn:', btn);
    const li = btn.parentNode;
    console.log('li:', li);
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){         //filter -> 함수에 대해 array를 조건에 따라 하나씩 비교하여 참인 것만 모아서 array 리턴
        console.log('toDo.id:', toDo.id,'li.id', li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "del";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo){ //forEach -> array의 각 item에 대한 처리
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();