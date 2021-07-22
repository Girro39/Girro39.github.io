
let year_month = document.getElementById('year_month');
let previous_btn = document.getElementById('previous_btn');
let next_btn = document.getElementById('next_btn');
let today_btn =document.getElementById('today');
let tds = document.querySelectorAll('tbody td');

let today = new Date();//用來跟controller比較
let firstDate;//當月第一天
let controller = new Date();//依據電腦位置照，找出現在日期時間物件，拿來控制firstDay成某月第一天

window.onload=function(){
    init();    
}
today_btn.addEventListener('click',function(){
    controller = new Date();
    init();
});
previous_btn.addEventListener('click',previousMonth);
next_btn.addEventListener('click',nextMonth);

tds.forEach(item=>{
    item.setAttribute('data-toggle','modal');
    item.setAttribute('data-target','#exampleModal');
});

function init(){

    year_month.innerHTML = 
    `${controller.getFullYear()}/${controller.getMonth()+1}`;
    // debugger;
    firstDate = new Date(controller.getFullYear(),controller.getMonth(),1);
    firstDate.setDate(firstDate.getDate()-firstDate.getDay());
    tds.forEach(item=>{
        // debugger;
        // console.log(item);
        // console.log(controller);
        item.setAttribute('class','');
        if(firstDate.getMonth()!==controller.getMonth()){
            item.setAttribute('class','PNMonth');
        }
        item.innerHTML = firstDate.getDate();
        item.setAttribute('value',`${firstDate.getMonth()}`);
        
        if(item.getAttribute('value')==today.getMonth() && item.textContent==today.getDate()){
            let span=document.createElement('span');
            span.innerHTML = `today`;
            span.setAttribute('class','pl-5')
            item.append(span);
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


