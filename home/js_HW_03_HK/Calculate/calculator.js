let historyText = document.getElementById('history');
let currentText = document.getElementById('current');

let numbers = document.querySelectorAll('[btnnum]');
let operations = document.querySelectorAll('[operation]');
let del = document.querySelector('[del]');
let clr = document.querySelector('[clr]');
let percent = document.querySelector('[percent]');
let equal = document.querySelector('[equal]');
let currentNum ='';
let historyNum ='';
let answer;
let operate;
//數字0-9 . 按鈕 個別創造click監聽事件
numbers.forEach((item) => {
    item.addEventListener('click', function () {
        //顯示到目前
        appendNumber(item.textContent);
        numDisplay();
    });
});
//+-*/按鈕 個別創造click監聽事件
operations.forEach((item)=>{
    item.addEventListener('click',function(){
        console.log(item.textContent);
        chooseOperation(item.textContent);
        numDisplay();
    });
});
function appendNumber(number){
    if(number === '.' && currentText.innerHTML.includes('.')) return;
    currentNum =currentNum.toString()+ number.toString();
}
function numDisplay(){
    currentText.textContent = currentNum;
    if(operate !== undefined){
        historyText.textContent = `${historyNum} ${operate}`;
    }
    
}
function chooseOperation(operation){
    if(currentNum ==='') return;
    else if(historyNum !=='') calculate();
    operate = operation;
    historyNum = currentNum ;
    currentNum = '';
}

clr.addEventListener('click', function () {
    //恢復一開始數值
    //清除歷史紀錄
    clearAll();
    numDisplay();
});
del.addEventListener('click', function () {
    //倒退一個數字
    deleteOne();
    console.log(currentNum);
    numDisplay();
});
equal.addEventListener('click',function(){
    calculate();
    numDisplay();
});
percent.addEventListener('click',function(){
    
});
function calculate(){
    const his = parseFloat(historyNum);
    const curr = parseFloat(currentNum);
    if(isNaN(his)||isNaN(curr)) return;
    switch(operate){
        case'+':
            answer = his + curr;
            break;
        case'-':
            answer = his - curr;
            break;
        case'×':
            answer = his * curr;
            break;
        case'÷':
            answer = his / curr;
            break;
    }
    currentNum = answer.toString();
    historyNum = '';
    operate = '';
}

function clearAll(){
    currentNum ='';
    historyNum ='';
    operate ='';
}

function deleteOne(){
    currentNum = currentNum.toString().slice(0,-1);
}
