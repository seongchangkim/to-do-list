const toDoList = document.querySelector(".to-do-list");
const btn = document.querySelector(".to-do-btn");
let temporToDo = []; 

const lDate = new Date();

const year = lDate.getFullYear();
const month = lDate.getMonth()+1;
const day = lDate.getDate();

const date = `${year}-${String(month).padStart(2,'0')}-${day}`;
const saveData = localStorage.getItem(date);

setInterval(() => {
    const fullDayArr = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ];
    
    const lDate = new Date();
    
    const year = lDate.getFullYear();
    const month = lDate.getMonth();
    const day = lDate.getDate();
    const fullDay = fullDayArr[lDate.getDay()];

    const hours = lDate.getHours() > 12 ? String(lDate.getHours()-12) : String(lDate.getHours());
    const minutes = String(lDate.getMinutes());
    const seconds = String(lDate.getSeconds());
    const ampm = lDate.getHours() >= 12 ? '오후' : '오전';

    const clock = document.querySelector('#clock');

    clock.innerHTML = `
        <div>
            ${year}년 ${month+1}월 ${day}일 ${fullDay} ${ampm} ${hours.padStart(2,'0').padEnd(3,'시')} ${minutes.padStart(2,'0').padEnd(3,'분')} ${seconds.padStart(2,'0').padEnd(3,'초')}
        </div>
    `
}, 1000);

const addToDo = () => {
    const toDoInput = document.querySelector('#to-do');
    
    if(toDoInput.value === ''){
        alert("한 일을 입력하세요!");
        return;
    }

    for(let toDo of temporToDo){
        if(toDo.toDo === toDoInput.value){
            alert("같은 한 일을 추가할 수 없습니다!");
            return;
        }
    }
    
    const toDoInfo = {
        toDo : toDoInput.value,
        date : Date.now()
    }
    
    temporToDo.push(toDoInfo);
    localStorage.setItem(date, JSON.stringify(temporToDo));
    loadToDoList([toDoInfo]);
    toDoInput.value = "";
}

const removeToDo = (event) => {
    const li = event.target.parentNode;
    li.remove();
    
    temporToDo = temporToDo.filter(toDo => toDo.date !== parseInt(li.id));

    localStorage.setItem(date, JSON.stringify(temporToDo));
}

const loadToDoList = (arr) => {  

    arr.forEach((data) => {
        toDoList.innerHTML += `
            <div class="to-do-list-item" id="${data.date}">
                <div class="to-do-list-content">
                    ${data.toDo}
                </div>
                <div class="to-do-list-remove">X</div>
            </div>
        `
    });

    const toDoListRemoveList = document.querySelectorAll('.to-do-list-remove');
    
    if(toDoListRemoveList !== []){
        for(let toDoListRemove of toDoListRemoveList){
            toDoListRemove.addEventListener("click", removeToDo);
        }
    }
    
}

if(saveData !== null){
    temporToDo = JSON.parse(saveData);
    loadToDoList(temporToDo);
}

btn.addEventListener("click", addToDo);