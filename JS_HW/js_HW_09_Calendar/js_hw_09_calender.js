
const year_month_btn = document.getElementById('year_month_btn');
const previous_btn = document.getElementById('previous_btn');
const next_btn = document.getElementById('next_btn');
const return_btn =document.getElementById('return_btn');
const tbody = document.querySelector('tbody');
const table = document.querySelector('table');
const addmodalCurrentDate = document.getElementById('addmodalCurrentDate');
const DeleteEditModal = document.getElementById('DeleteEditModal');
const addItineraryModal = document.getElementById('addItineraryModal');
let _Ititle = document.getElementById('Ititle');
let _Icontent = document.getElementById('Icontent');
let _Icolor = document.getElementById('Icolor');
let input = document.querySelectorAll('input');
const SAVE = document.getElementById('SAVE');
const today = new Date();
let tr;
let td;
//用來跟controller比較
let firstDate;
//當月第一天
let controller = new Date();
//依據電腦位置照，找出現在日期時間物件，拿來控制firstDay成某月第一天

window.onload=function(){
    init();
    showTimer();
}
table.addEventListener("mousewheel",turnMouseEvent);
return_btn.addEventListener('click',returnCurrentMonth);
previous_btn.addEventListener('click',previousMonth);
next_btn.addEventListener('click',nextMonth);
SAVE.addEventListener('click',saveItinerary);

function init(){
    tbody.innerHTML ='';
    //判斷幾列
    //當月第一天禮拜幾+這個月幾天  / 7 無條件進位 = 列數
    firstDate = new Date(controller.getFullYear(),
    controller.getMonth(),1);

    let daysInCurrentMonth = new Date(firstDate.getFullYear(), 
    firstDate.getMonth()+1,0);
    let _r = Math.ceil(
                        (firstDate.getDay()+daysInCurrentMonth.getDate())/7
                    );
    //做表格迴圈術 
    for(let i = 1;i <= _r; i++){ 
        tr = document.createElement('tr');
        for(let j = 0;j<=6;j++){
            td = document.createElement('td');
            tr.append(td);
        }
        tbody.append(tr);
    }

    const tds = document.querySelectorAll('tbody td');
    year_month_btn.innerHTML =`${controller.getFullYear()}/
    ${controller.getMonth()+1}`;
    firstDate.setDate(firstDate.getDate()-firstDate.getDay());
    tds.forEach(td=>{
        setTdsAttribute(td);
        findTodayTd(td);
        firstDate.setDate(firstDate.getDate()+1);
        td.addEventListener('click',function(){
            if(td.getAttribute('class')===null||td.getAttribute('class')=='today'){    
                td.setAttribute('data-toggle','modal');
                td.setAttribute('data-target','#addItineraryModal');
            }
            _Ititle.value='';
            _Icontent.value='';
            _Icolor.value='';
            addmodalCurrentDate.innerHTML = 
            `${td.getAttribute('Year')}/${parseInt(td.getAttribute('Month'))+1}/${td.getAttribute('Date')}`; 
        });
        let Itineraries = JSON.parse(localStorage.getItem(`${td.getAttribute('Year')}/${parseInt(td.getAttribute('Month'))+1}/${td.getAttribute('Date')}`));

        if(Itineraries!==null){
            Itineraries.forEach(Itinerary=>{
                let div = document.createElement('div');
                div.style.backgroundColor = Itinerary.Color;
                div.setAttribute('class','btn event_btn');
                div.innerHTML = Itinerary.Title;
                td.appendChild(div); 
            });
        }
        let event_btns = document.querySelectorAll('.event_btn');
        event_btns.forEach(event_btn=>{
            event_btn.addEventListener('click',function(e){
                if(event_btn.attributes.class.value === 'btn event_btn'){
                    td.removeAttribute('data-target');
                    event_btn.setAttribute('data-toggle','modal');
                    event_btn.setAttribute('data-target','#DeleteEditModal');
                }
            });
        });
    });

}

function returnCurrentMonth(){
    controller = new Date();
    init();
}

function previousMonth(){
    controller.setMonth(controller.getMonth()-1);
    init();

}

function nextMonth(){
    controller.setMonth(controller.getMonth()+1);
    init();

}

function showTimer(){
    let timer = document.getElementById('timer');
    let now = new Date();
    timer.innerHTML = `${now.toLocaleDateString()}<span>${now.toLocaleTimeString()}</span>`;
    setTimeout(showTimer,1000);
}

function setTdsAttribute(eachTd){
    eachTd.removeAttribute('class');
    eachTd.innerHTML = firstDate.getDate();
    eachTd.setAttribute('Year',`${firstDate.getFullYear()}`);
    eachTd.setAttribute('Month',`${firstDate.getMonth()}`);
    eachTd.setAttribute('Date',`${firstDate.getDate()}`);
    eachTd.setAttribute('YMD',`${firstDate.getFullYear()}/${firstDate.getMonth()+1}/${firstDate.getDate()}`)
    if(firstDate.getMonth()!==controller.getMonth()){
        eachTd.setAttribute('class','PNMonth');
    }

}

function findTodayTd(eachTd){
    if(eachTd.getAttribute('Year')==today.getFullYear() 
    && eachTd.getAttribute('Month')==today.getMonth()
    && eachTd.getAttribute('Date')==today.getDate())
    {
        let span=document.createElement('span');
        span.innerHTML = `today`;
        span.setAttribute('class','pl-5')
        eachTd.append(span);
        eachTd.setAttribute('class','today');
    }
}

function turnMouseEvent(event){
    if(event.deltaY > 0) nextMonth();
    if(event.deltaY < 0) previousMonth();
}


function saveItinerary(){
    SAVE.removeAttribute('data-dismiss');
    let Idate = addmodalCurrentDate.textContent;
    let Ititle = _Ititle.value;
    let Icontent = _Icontent.value;
    let Icolor = _Icolor.value;
    let todoObj = {
        Title:Ititle,
        Content:Icontent,
        Color:Icolor
    };
    let todoList = [];
    if(Ititle&&Icontent){
        if(localStorage.getItem(Idate) === null){
            todoList.push(todoObj);
            SAVE.setAttribute('data-dismiss','modal');
        }else{
            todoList = JSON.parse(localStorage.getItem(Idate));
            todoList.push(todoObj);
            SAVE.setAttribute('data-dismiss','modal');
        }
        localStorage.setItem(Idate,JSON.stringify(todoList));

        init();
    }else{
        alert('標題內容都要輸入');
    }

}

