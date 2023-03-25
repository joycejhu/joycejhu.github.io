let data=[];

//串接axios
function getData(){
    axios.get('https://hexschool.github.io/js-filter-data/data.json')
        .then(function(res){
            data=res.data;
        })
}
getData();

//渲染
//將資料呈現在list上
const showList=document.querySelector(".showList");
function renderData(arr){
    let str="";
    arr.forEach(function(item){
        str+=`<tr>
        <td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>`
    });
    showList.innerHTML=str;
}

//根據切換蔬果、水果、花卉按鈕，顯示對應資料
const typeName = document.getElementById("typeName");
let showData=[]; //宣告一個空陣列showData
typeName.addEventListener("click",function(e){
    let tag=e.target.dataset.type; //宣告一個變數tag為按鈕的種類代碼
    //篩選data陣列內物件種類代碼，與tag相符的組成showData陣列
    if(tag=="N04"){
        showData=data.filter(item=> item.種類代碼=='N04');  
    }else if(tag=="N05"){
        showData=data.filter(item=> item.種類代碼=='N05');
    }else if(tag=="N06"){
        showData=data.filter(item=> item.種類代碼=='N06');
    }
    chooseOpt(showData);
    upDown(showData);
})

//搜尋功能
const send=document.getElementById("send");
const dataList = document.getElementById("dataList");
send.addEventListener("click",function(e){
    let txt = document.getElementById("crop");   
    if(txt.value.trim()==""){ //若輸入空字串，則會跳出警告視窗，離開if else判斷式
        alert("請輸入作物名稱");
        return;
    }else{
        //宣告resultData為data篩選含有搜尋作物名稱物件後的新陣列
        let resultData = data.filter(function(item){ 
            let itemName= new String(item.作物名稱); 
            return itemName.includes(txt.value); 
        });
        //如果resultData的陣列長度為0，表示data內沒有找到符合的物件可以組成新陣列，則顯示查詢不到的示意文字
        if(resultData.length==0){
            showList.innerHTML=` <tr>
            <td colspan="7" class="text-center p-3" id="dataList">痾～查詢不到有關「${txt.value}」的資訊(ㆆᴗㆆ)</td>
          </tr>`;
          return;
        }else{
            chooseOpt(resultData);
            upDown(resultData);
        }
    }  
    txt.value="";  //清空搜尋欄位
})

//下拉式選單判斷
let optData=[]; 
const selectList=document.getElementById("js-select");
function chooseOpt(arr){
    renderData(arr);
    selectList.addEventListener("change",function(e){
        let currentOpt= e.target.value;  //宣告currentOpt為點擊到的value值
        //依據點擊到的value值，將傳入的陣列進行sort排序，組成新的optData陣列
        if(currentOpt=="topPri"){
         optData=arr.sort((a,b)=>{return b.上價 - a.上價});
        }else if(currentOpt == "midPri"){
         optData=arr.sort((a,b)=>{return b.中價 - a.中價});
        }else if(currentOpt == "downPri"){
         optData=arr.sort((a,b)=>{return b.下價 - a.下價});
        }else if(currentOpt == "avgPri"){
         optData=arr.sort((a,b)=>{return b.平均價 - a.平均價});
         }else if(currentOpt == "salesAmount"){
         optData=arr.sort((a,b)=>{return b.交易量 - a.交易量});
         }
        renderData(optData);
    });
}  

//上下按鈕判斷
let upDownData=[];
const upAndDown =document.getElementById("up_and_down");
function upDown(arr){
    renderData(arr);
    upAndDown.addEventListener("click",function(e){
        let value= e.target.dataset.price; //宣告value為點擊到的項目的data-price值
        //根據點擊到的是up或是down，將傳入的陣列做出相對應的篩選，組成新的陣列upDownData
        if(value=="上價"){
            if(e.target.dataset.sort=="up"){
                upDownData=arr.sort((a,b)=>{return a.上價 - b.上價});
            }else if(e.target.dataset.sort=="down"){
                upDownData=arr.sort((a,b)=>{return b.上價 - a.上價});
            }
        }else if(value=="中價"){
            if(e.target.dataset.sort=="up"){
                upDownData=arr.sort((a,b)=>{return a.中價 - b.中價});
            }else if(e.target.dataset.sort=="down"){
                upDownData=arr.sort((a,b)=>{return b.中價 - a.中價});
            }
        }else if(value=="下價"){
            if(e.target.dataset.sort=="up"){
                upDownData=arr.sort((a,b)=>{return a.下價 - b.下價});
            }else if(e.target.dataset.sort=="down"){
                upDownData=arr.sort((a,b)=>{return b.下價 - a.下價});
            }
        }else if(value=="平均價"){
            if(e.target.dataset.sort=="up"){
                upDownData=arr.sort((a,b)=>{return a.平均價 - b.平均價});
            }else if(e.target.dataset.sort=="down"){
                upDownData=arr.sort((a,b)=>{return b.平均價 - a.平均價});
            }
        }else if(value=="交易量"){
            if(e.target.dataset.sort=="up"){
                upDownData=arr.sort((a,b)=>{return a.交易量 - b.交易量});
            }else if(e.target.dataset.sort=="down"){
                upDownData=arr.sort((a,b)=>{return b.交易量 - a.交易量});
            }
        }
       renderData(upDownData);
    });
}




