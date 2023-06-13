const colorPickerBtn = document.querySelector("#color-picker");
const colorList= document.querySelector(".all-colors");
const clearALL= document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]" );

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerHTML = "Copied";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000)
}

const showColors = () =>{
    if (!pickedColors.length) retuns;
    colorList.innerHTML = pickedColors.map(color =>
        `
                <li class="color">
                    <span class="rect" style="background: ${color}; border: 1px solid black"></span>
                    <span class="value" data-color="${color}">${color}</span>
                </li>
        `
        ).join("");

        document.querySelectorAll(".color").forEach(li => {
            li.addEventListener ("click", e => copyColor(e.currentTarget.lastElementChild))
        });
}

const activateEyeDropper = async () =>{
    document.body.style.display = "none"
   setTimeout(async () => {
        try {
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            document.body.style.display = "block"
            navigator.clipboard.writeText(sRGBHex);

            if (!pickedColors.includes(sRGBHex))
            {
                pickedColors.push(sRGBHex);
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
            }
            document.querySelector(".picked-colors").classList.remove("hide");
            showColors();
        }
        catch (error)
        {
            console.log(error)
        }
   }, 10);
}


const clearAllColors = async () =>{
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
    showColors();
}

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearALL.addEventListener("click", clearAllColors);