const txt =document.querySelector(".txt");
const btnAdd = document.querySelector(".btn_add");

let data=[];

//資料暫存
function tempSaveData(){
    localStorage.setItem("todoList",JSON.stringify(data));
}

//新增
btnAdd.addEventListener("click",add);
function add(){
    //把新增的事項建立成物件，之後再新增到data陣列中
    let obj={
        content:txt.value,
        checked:""
    }
    //若輸入欄位為空白，則跳出警告視窗，輸入欄位有值，就新增物件到陣列中
    if(txt.value.trim()==""){
        alert("請輸入代辦事項");
        return;
    }else{
        data.unshift(obj);
        txt.value="";
    }
    tab.innerHTML=` <li data-tab="all" class="active">全部</li><li data-tab="notYet">待完成</li><li data-tab="yet">已完成</li>`;
    tabName= "all";
    switchList();
    tempSaveData();
}

//渲染
//將新增的資料呈現在list上
const list =document.querySelector(".list");
function renderData(arr){
    let str="";
    arr.forEach((item,index)=>{
        str +=`<li data-num="${index}"><label class="checkbox" for=""><input type="checkbox" ${item.checked}/><span>${item.content}</span></label><a href="#" class="delete"></a></li>`
    })
    list.innerHTML=str;
}

//判斷當下按到哪一個tab，併賦予active屬性值到class屬性
let tabName= "all"; //預設初始tab為全部
const tab=document.querySelector(".tab");
tab.addEventListener("click",function(e){
    tabName=e.target.dataset.tab; //判斷現在按到的是哪一個tab
    let tabToggle = document.querySelectorAll(".tab li"); //抓取有關tab <li></li>那一段程式
    tabToggle.forEach(item=>item.classList.remove("active"));//把 class有active屬性值的先移除
    e.target.classList.add("active");//把active屬性值新增到點擊到的tab之class屬性
    switchList();
});

//刪除以及檢查是否已完成
list.addEventListener("click",updateList);
function updateList(e){
    let num = e.target.closest("li").dataset.num; //找出點擊當下最相近的li所賦予的data-num內的屬性值
    if(e.target.getAttribute("class")=="delete"){   //判斷是不是點擊到delete
        e.preventDefault();  //因為delete屬性是建立在a元素裡，所以先解除掉a元素的預設動作
        data.splice(num,1);  //抓取到點擊的那一件事項並刪除
    }else {
        if(e.target.checked){    //判斷點擊事件checked狀態是不是true，如果是就新增該物件狀態checked為checked，反之
            data[num].checked="checked"; 
        }else{
            data[num].checked="";
        }
    }
    switchList();
    tempSaveData();
}

//依照當下按到的tab，去呈現符合tab狀態的list
const notYetNum =document.querySelector(".notYetNum");
function switchList(){ 
    let currentData=[]; //宣告一個新的空陣列currentData
    if(tabName=="all"){ //點擊到全部，則currentData等於data
        currentData=data; 
    }else if(tabName=="notYet"){ //點擊到待完成，則currentData為data去篩選物件狀態checked為‘’的陣列
        currentData=data.filter((item)=>{return item.checked==''});
    }else if(tabName=="yet"){ //點擊到已完成，則currentData為data去篩選物件狀態checked為checked的陣列
        currentData=data.filter((item)=>{return item.checked=='checked'});
    }
    renderData(currentData);

    //計算待完成項目
    let i=0;
    data.forEach(function(item){
        if(item.checked==""){
            i++;
        }
    })
    notYetNum.textContent=i;
}

//清除完成項目
const listFooter=document.querySelector(".list_footer");
listFooter.addEventListener("click",function(e){
    //若點擊到class屬性值為clean，則進行data篩選，將物件checked狀態為''的return回data陣列，則得到的data就會是未完成的物件則成的陣列
    if(e.target.getAttribute("class")=="clean"){ 
        data=data.filter(function(item){
            return item.checked==''
        })
        switchList();
        tempSaveData(); 
    }
})