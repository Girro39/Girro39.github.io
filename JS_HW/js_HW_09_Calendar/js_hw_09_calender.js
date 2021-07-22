
const year_month_btn = document.getElementById('year_month_btn');
const previous_btn = document.getElementById('previous_btn');
const next_btn = document.getElementById('next_btn');
const return_btn =document.getElementById('return_btn');
const tds = document.querySelectorAll('tbody td');
const table = document.querySelector('table');
const today = new Date();//用來跟controller比較
let firstDate;//當月第一天
let controller = new Date();//依據電腦位置照，找出現在日期時間物件，拿來控制firstDay成某月第一天

window.onload=function(){
    init();
    showTimer();
}


table.addEventListener("mousewheel",(event)=>{
    if(event.deltaY > 0) nextMonth();
    if(event.deltaY < 0) previousMonth();
})

return_btn.addEventListener('click',function(){
    controller = new Date();
    init();
});
previous_btn.addEventListener('click',previousMonth);
next_btn.addEventListener('click',nextMonth);

function init(){
    year_month_btn.innerHTML =`${controller.getFullYear()}/${controller.getMonth()+1}`;
    firstDate = new Date(controller.getFullYear(),controller.getMonth(),1);
    firstDate.setDate(firstDate.getDate()-firstDate.getDay());
    tds.forEach(item=>{
        item.setAttribute('data-toggle','modal');
        item.setAttribute('data-target','#addItineraryModal');
            item.setAttribute('class','');
        if(firstDate.getMonth()!==controller.getMonth()){
            item.setAttribute('class','PNMonth');
        }
        item.innerHTML = firstDate.getDate();
        item.setAttribute('Year',`${firstDate.getFullYear()}`);
        item.setAttribute('Month',`${firstDate.getMonth()}`);
        item.setAttribute('Date',`${firstDate.getDate()}`)
        
        if(item.getAttribute('Year')==today.getFullYear() && item.getAttribute('Month')==today.getMonth() 
        && item.getAttribute('Date')==today.getDate())
        {
            let span=document.createElement('span');
            span.innerHTML = `today`;
            span.setAttribute('class','pl-5')
            item.append(span);
            item.setAttribute('class','today');
        }
        firstDate.setDate(firstDate.getDate()+1);
    });
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
    timer.innerHTML = now.toLocaleTimeString();
    setTimeout(showTimer,1000);
}


