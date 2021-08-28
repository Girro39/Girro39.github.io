//g象徵get
function $g(selector){
    let nodelist = document.querySelectorAll(selector);

    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

//c象徵create
function $c(element){
    return document.createElement(element);
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