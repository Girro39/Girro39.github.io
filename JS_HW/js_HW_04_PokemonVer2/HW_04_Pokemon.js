        //#region 宣告
        let container = document.getElementById("container");
        let lastImg_lenth;
        let setintervalId;
        const btn_AddAll = document.querySelector(".row .btn_col:nth-of-type(1) button");
        const btn_AddOne = document.querySelector(".row .btn_col:nth-of-type(2) button");
        const btn_LessOne = document.querySelector(".row .btn_col:nth-of-type(3) button");
        const btn_SetInerval = document.querySelector(".row .btn_col:nth-of-type(4) button");
        const btn_Stop_SetInterval = document.querySelector(".row .btn_col:nth-of-type(5) button")
        const btn_Remove = document.querySelector(".row .btn_col:nth-of-type(6) button");
        const click_Img = document.getElementsByTagName('img');
        btn_Remove.disabled = true;
        btn_LessOne.disabled = true;


        //#region 設定Functions
        //新增全部 function


        function plusAll() {
            for (let lastImg_lenth = 1; lastImg_lenth < 899; lastImg_lenth++) {
                let fileName = lastImg_lenth.toString().padStart(3, '0');
                let pathFile = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
                
                
                let img = document.createElement('img');
                img.setAttribute("src", pathFile);
                container.appendChild(img);
            }
        }
        
        //+1 function
        function plusOne() {
            let lastImg_lenth = document.getElementsByTagName('img').length;

            if(lastImg_lenth < 899){
                lastImg_lenth++;
                // console.log(lastImg_lenth);
                let fileName = lastImg_lenth.toString().padStart(3, '0'); 
                let pathFile = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
                let img = document.createElement('img');
                img.setAttribute("src", pathFile);
                container.appendChild(img);    
            }
        }

        function lessOne(){
            let lastImg_lenth = document.getElementsByTagName('img').length;
            if(lastImg_lenth < 899){
                let lastImg = document.querySelectorAll('img')[lastImg_lenth - 1];
                container.removeChild(lastImg);
            }
            else if(lastImg_lenth ==0){
                btn_LessOne.disabled = true;
            }
        }

        //#endregion


        //#region Buttons註冊事件
        
        //新增全部 button
        btn_AddAll.addEventListener("click", function (event) {
            plusAll();
            btn_Remove.disabled = false;
            btn_AddOne.disabled = true;
            btn_LessOne.disabled = false;
        })


        //移除全部 button
        btn_Remove.addEventListener('click', function (event) {
            container.innerHTML = "";
            btn_AddOne.disabled = false;
            btn_LessOne.disabled = true;
            btn_Remove.disabled = true;
        })



        //+1 button
        btn_AddOne.addEventListener('click', function (event) {
            btn_Remove.disabled = false;
            btn_LessOne.disabled = false;
            plusOne();
        });

        //-1 button

        btn_LessOne.addEventListener('click', function (event) {
            btn_AddOne.disabled = false;
            lessOne();
        });

        //setInterval button
        btn_SetInerval.addEventListener('click', function (event) {
            setintervalId = setInterval(plusOne,500);
        })


        //Stop_SetInterval button

        btn_Stop_SetInterval.addEventListener('click',function(event){
            clearInterval(setintervalId);
        })

        //#endregion


        // click_Img.addEventListener('click',function(event){
        //     alert('hhh');
        //     // click_Img.remove();
        // })
