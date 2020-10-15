const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =  document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsModeBtn");
const saveBtn = document.getElementById("jsSaveBtn");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function  startPainting() {
    painting = true;
}


const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const value = event.target.value;
    ctx.lineWidth = value;
}

function handleModeClick(){
    if(filling === true) {
        filling = false;
        modeBtn.innerText = "Fill";     
        canvas.addEventListener("mousemove", onMouseMove);
    }else{
        filling = true;
        modeBtn.innerText = "Paint";
        canvas.removeEventListener("mousemove", onMouseMove);
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleRC(event) {
    event.preventDefault(); 

}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png", 1);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS [🎨]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRC);
}

if(colors){
    Array.from(colors).forEach(item => item.addEventListener("click",handleColorClick));
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(modeBtn){
    modeBtn.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click" , handleSaveClick);
}