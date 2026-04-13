let dragged = null;

const checkBtn = document.getElementById("checkBtn");

/* Activar drag */
function initDrag(){

    document.querySelectorAll(".draggable").forEach(item => {

        item.addEventListener("dragstart", () => {
            dragged = item;
        });

    });

}

initDrag();

/* Dropzones */
document.querySelectorAll(".dropzone").forEach(zone => {

    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", () => {

        const span = zone.querySelector("span");

        if(span.children.length > 0) return;

        span.innerHTML = "";
        span.appendChild(dragged);

        checkCompletion();

    });

});

/* Habilitar botón */
function checkCompletion(){

    const total = document.querySelectorAll(".dropzone span .draggable").length;
    checkBtn.disabled = total !== 3;

}

/* Validar */
function checkAnswers(){

    const result = document.getElementById("result");

    let correct = 0;

    document.querySelectorAll(".dropzone").forEach(zone => {

        const value = zone.querySelector(".draggable")?.dataset.value;
        const expected = zone.dataset.correct;

        zone.classList.remove("correct","incorrect");

        if(value === expected){
            zone.classList.add("correct");
            correct++;
        }else{
            zone.classList.add("incorrect");
        }

    });

    result.className = "result-message";

    if(correct === 3){   // cambia según cantidad total
        result.innerHTML = "✔ ¡EXCELENTE!";
        result.classList.add("result-success");
    }else{
        result.innerHTML = "✖ VUELVE A INTENTARLO";
        result.classList.add("result-error");
    }
}

/* Reiniciar */
function resetGame(){

    const bank = document.getElementById("wordBank");
    const result = document.getElementById("result");

    document.querySelectorAll(".draggable").forEach(item => {
        bank.appendChild(item);
    });

    document.querySelectorAll(".dropzone").forEach(zone => {
        zone.classList.remove("correct","incorrect");
    });

    result.className = "result-box hidden";
    result.textContent = "";

    bank.classList.remove("hidden");

    checkBtn.disabled = true;

    initDrag();
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").className = "result-message";
}