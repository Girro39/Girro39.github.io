//g象徵get
function $g(selector){
    let nodelist = document.querySelectorAll(selector);

    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

//c象徵create
function $c(element,attribute){
    let ele = document.createElement(element);
    // element.setAttribute('class')
    return ele;
}


function $cc(parent,childElement,childInnertext){
    let child =document.createElement(childElement);
    child.innerText =childInnertext;
    parent.appendChild(child);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


export{$g , $c , $cc ,getRandom}