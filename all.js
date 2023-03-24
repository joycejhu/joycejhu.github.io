const txt =document.querySelector(".txt");
const btnAdd = document.querySelector(".btn_add");


let data=[];

//新增
btnAdd.addEventListener("click",add);
function add(){
    let obj={
        content:txt.value,
        checked:""
    }
    if(txt.value.trim()==""){
        alert("請輸入代辦事項");
        return
    }else{
        data.unshift(obj);
        txt.value="";
    }
   switchList();

}

//渲染
const list =document.querySelector(".list");
function renderData(arr){
    let str="";
    arr.forEach((item,index)=>{
        str +=`<li data-num="${index}"><label class="checkbox" for=""><input type="checkbox" ${item.checked}/><span>${item.content}</span></label><a href="#" class="delete"></a></li>`
    })
    list.innerHTML=str;
}

//切換tab
let tabName= "all";
const tab=document.querySelector(".tab");
tab.addEventListener("click",function(e){
    tabName=e.target.dataset.tab;
    let tabToggle = document.querySelectorAll(".tab li");
    tabToggle.forEach(item=>item.classList.remove("active"));
    e.target.classList.add("active");
    switchList();
});

//delete & check


list.addEventListener("click",updateList);
function updateList(e){
    let num = e.target.closest("li").dataset.num;
    if(e.target.getAttribute("class")=="delete"){
        e.preventDefault();
        data.splice(num,1);
    }else {
        if(e.target.checked){
            data[num].checked="checked";
        }else{
            data[num].checked="";
        }
    }
    switchList();
}

//每個tab的清單
const notYetNum =document.querySelector(".notYetNum");
function switchList(){
    let currentData=[];
    if(tabName=="all"){
        currentData=data;
    }else if(tabName=="notYet"){
        currentData=data.filter(function(item){
            return item.checked=='';
        })
    }else if(tabName=="yet"){
        currentData=data.filter(function(item){
            return item.checked=='checked'
        })
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
    if(e.target.getAttribute("class")=="clean"){
        data=data.filter(function(item){
            return item.checked==''
        })
        switchList();
    }
})









 
