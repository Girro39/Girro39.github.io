let history = document.getElementById('history');
let current = document.getElementById('current');
let numbers = document.querySelectorAll('[btnnum]');
let del = document.querySelector('[del]');
let clr = document.querySelector('[clr]');
let percent = document.querySelector('[percent]');
let plus = document.querySelector('[plus]');
let less = document.querySelector('[less]');
let multiply = document.querySelector('[multiply]');
let except = document.querySelector('[except]');
let equal = document.querySelector('[equal]');
let currentNum = 0;
let historyNum = 0;
let answer;
let operate;
numbers.forEach((item) => {
    item.addEventListener('click', function () {
        currentDisplay(item.innerHTML);
    });
});
function currentDisplay(number){
    if(current.textContent === '0') current.textContent='';
    current.textContent += number;
    currentNum = parseFloat(current.textContent);
    // historyNum = parseFloat(current.textContent);
    //只能有一個小數點怎辦?
}
clr.addEventListener('click', function () {
    //恢復一開始數值
    //清除歷史紀錄
    current.textContent = '0';  
    history.textContent = '';
    currentNum = '';
    historyNum = '';
    answer = '';
    // console.log(currentNum);
    // console.log(historyNum);
    // console.log(current.textContent);
    // console.log(history.textContent);
});
del.addEventListener('click', function () {
    //倒退一個數字

});
equal.addEventListener('click',function(){
    //做計算動作
    //按+-*/=把數字放上history
});
percent.addEventListener('click',function(){
    current.textContent = current.textContent/100;
});
multiply.addEventListener('click',function(){
    historyDisplay(multiply.textContent);
});
plus.addEventListener('click',function(){
    historyDisplay(plus.textContent);
    console.log(answer);
});
less.addEventListener('click',function(){
    historyDisplay(less.textContent);
});
except.addEventListener('click',function(){
    historyDisplay(except.textContent);
});
function calculate(operation){
    switch(operation){
        case'+':
            if(history.textContent!=='' && current.textContent!=='' ){
                answer= historyNum+currentNum;
                answer = parseFloat(current.textContent);

                if(answer){
                    history.textContent = answer + operation;
                    current.textContent = answer+currentNum;
                } 
            }
            break;
        case'-':
        if(history.textContent!=='' && current.textContent!=='' ){
            answer = historyNum-currentNum;}
        break;
        case'×':
        if(history.textContent!=='' && current.textContent!=='' ){
            answer = historyNum*currentNum;}
            break;
        case'÷':
        if(history.textContent!=='' && current.textContent!=='' ){
            answer = historyNum/currentNum;}
            break;
    }
}
function historyDisplay(operation){
    while(!current.textContent.includes(operation) 
    && !history.textContent.includes(operation)){
        current.textContent = '';
        operate = operation;
        history.textContent = currentNum + operate;
        historyNum = currentNum;
        // console.log(currentNum);
        // console.log(historyNum);
        }
        calculate(operation);
}