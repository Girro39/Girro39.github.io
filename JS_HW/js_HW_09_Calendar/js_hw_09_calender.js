
const year_month_btn = document.getElementById('year_month_btn');
const previous_btn = document.getElementById('previous_btn');
const next_btn = document.getElementById('next_btn');
const return_btn =document.getElementById('return_btn');
const tbody = document.querySelector('tbody');
const table = document.querySelector('table');
const modalCurrentDate = document.getElementById('modalCurrentDate');
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
        
            modalCurrentDate.innerHTML = 
            `${td.getAttribute('Year')}/${parseInt(td.getAttribute('Month'))+1}/${td.getAttribute('Date')}`; 
        });

        let gi = localStorage.getItem(`${td.getAttribute('Year')}/${parseInt(td.getAttribute('Month'))+1}/${td.getAttribute('Date')}`);

        let li = document.createElement('li');
        if(gi!==null){
            input.forEach(item=>{
                item.value='';
            });
            console.log(gi);
            // console.log(JSON.parse(gi)[0].Title);
            li.innerHTML = JSON.parse(gi)[0].Title;
            li.style.backgroundColor = JSON.parse(gi)[0].Color;
            li.style.color = '#fff';
            li.style.textAlign = 'center';
            td.appendChild(li); 
        }

        // li.append(Ititle);
        // li.style.backgroundColor=Icolor;
        // let tds = Array.from(document.querySelectorAll('tbody td'));
        // if(localStorage.getItem()!=null){
        //     td.appendChild(li);
        // }
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

    let Idate = modalCurrentDate.textContent;
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
        todoList.push(todoObj);
        localStorage.setItem(Idate,JSON.stringify(todoList));
        SAVE.setAttribute('data-dismiss','modal');
    }else if(!Ititle||!Icontent){
        alert('請輸入完整');
    }

    init();
}
