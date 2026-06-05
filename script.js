let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value.trim()=="") return;

    tasks.push({
        text:input.value,
        completed:false
    });

    input.value="";
    save();
    render();
}

function render(){

    let list = document.getElementById("taskList");
    list.innerHTML="";

    let completed = 0;

    tasks.forEach((t,i)=>{

        if(t.completed) completed++;

        let li = document.createElement("li");

        li.innerHTML=`
            <span class="${t.completed?'completed':''}">
                ${t.text}
            </span>

            <div>
                <button onclick="done(${i})">✔</button>
                <button onclick="del(${i})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("count").innerText =
        `Tasks: ${tasks.length}`;

    let percent = tasks.length? (completed/tasks.length)*100 : 0;
    document.getElementById("progress").style.width = percent + "%";
}

function done(i){

    tasks[i].completed = !tasks[i].completed;

    confetti({
        particleCount: 80,
        spread: 70
    });

    save();
    render();
}

function del(i){
    tasks.splice(i,1);
    save();
    render();
}

function toggleMode(){
    document.body.classList.toggle("dark");
}

 if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

render();