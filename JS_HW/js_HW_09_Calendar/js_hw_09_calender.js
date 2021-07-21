let dateObj_current = new Date();//依據電腦位置照，找出現在日期時間物件
//#region 
// console.log(dateObj_current instanceof Object);////是物件
// console.log(dateObj_current);
// console.log(current_year);
// console.log(current_month);
// console.log(current_date);
// console.log(current_day);
//#endregion
let year_month = document.getElementById('year_month');
let previous_btn = document.getElementById('previous_btn');
let next_btn = document.getElementById('next_btn');
let today_btn =document.getElementById('today');
let tds = document.querySelectorAll('tbody td');
window.onload=function(){
    init();
    today_btn.addEventListener('click',function(){
        init();
    });

}
let firstDate;
function init(){
    year_month.innerHTML = 
        `${dateObj_current.getFullYear()}年${dateObj_current.getMonth()+1}月`;
    firstDate = new Date(dateObj_current.getFullYear(),dateObj_current.getMonth(),1);
    // debugger;
    firstDate.setDate(firstDate.getDate()-firstDate.getDay());
    tds.forEach(item=>{
        // debugger;
        item.setAttribute('class','');
        if(firstDate.getMonth()!==dateObj_current.getMonth()){
            item.setAttribute('class','PNMonth');
        }
        item.innerHTML = firstDate.getDate();
        firstDate.setDate(firstDate.getDate()+1);
    });
}

function previousMonth(){
    dateObj_current.setMonth(dateObj_current.getMonth()-1);
    console.log(dateObj_current.getMonth());
    init();
}

function nextMonth(){
    dateObj_current.setMonth(dateObj_current.getMonth()+1);
    console.log(dateObj_current.getMonth());
    init();
}
previous_btn.addEventListener('click',previousMonth);
next_btn.addEventListener('click',nextMonth);


