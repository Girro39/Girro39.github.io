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
        btn_Remove.disabled = true;
        btn_LessOne.disabled = true;


        //#region 設定Functions
        //新增全部 function
        function plusAll() {
            for (let i = 1; i < 899; i++) {
                let fileName = i.toString().padStart(3, '0');
                let pathFile = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
                
                
                let img = document.createElement('img');
                img.setAttribute("src", pathFile);
                container.appendChild(img);
            }
        }
        
        //+1 function
        function plusOne() {
            let lastImg_lenth = document.getElementsByTagName('img').length;
            lastImg_lenth++;
            console.log(lastImg_lenth);
            let fileName = lastImg_lenth.toString().padStart(3, '0'); //00i
            let pathFile = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
            let img = document.createElement('img');
            img.setAttribute("src", pathFile);
            container.appendChild(img);
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
            let lastImg_lenth = document.getElementsByTagName('img').length;
            if (lastImg_lenth < 899) {
                lastImg_lenth++;
                plusOne();
            }
        });

        //-1 button

        btn_LessOne.addEventListener('click', function (event) {
            let lastImg_lenth = document.getElementsByTagName('img').length;
            console.log(lastImg_lenth);
            if (lastImg_lenth >= 1) {
                let lastImg = document.querySelectorAll('img')[lastImg_lenth - 1];
                container.removeChild(lastImg);
            }
            else if(lastImg_lenth < 1){
                btn_LessOne.disabled = true;
            }
            
        });

        //setInterval button
        btn_SetInerval.addEventListener('click', function (event) {
            setintervalId = setInterval(plusOne,500);
        })


        //Stop_SetInterval button

        btn_Stop_SetInterval.addEventListener('click',function(event){
            clearInterval(setintervalId);
        })

        //點圖片消失 button
        // const img_clear = document.getElementById('remove');
        // img_clear.addEventListener('click', function (event) {
        // })

        //#endregion


