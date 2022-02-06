const opt = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
//     //body: JSON.stringify(data)
}

async function getData() {
    const response = await fetch('/trash', opt);
    const data =  await response.json();
    data.forEach(element => {
        document.getElementById(`barTrash${element.unit}/plastic`).setAttribute("style", `width: ${element.plastic}%;`);
        document.getElementById(`barTrash${element.unit}/metal`).setAttribute("style", `width: ${element.metal}%;`);
        document.getElementById(`barTrash${element.unit}/paper`).setAttribute("style", `width: ${element.paper}%;`);
        document.getElementById(`barTrash${element.unit}/others`).setAttribute("style", `width: ${element.others}%;`);
        (element.plastic < 75) ? document.getElementById(`textTrash${element.unit}/plastic`).innerHTML = "" : document.getElementById(`textTrash${element.unit}/plastic`).innerHTML = "FULL";
        (element.metal < 75) ? document.getElementById(`textTrash${element.unit}/metal`).innerHTML = "" : document.getElementById(`textTrash${element.unit}/metal`).innerHTML = "FULL";
        (element.paper < 75) ? document.getElementById(`textTrash${element.unit}/paper`).innerHTML = "" : document.getElementById(`textTrash${element.unit}/paper`).innerHTML = "FULL";
        (element.others < 75) ? document.getElementById(`textTrash${element.unit}/others`).innerHTML = "" : document.getElementById(`textTrash${element.unit}/others`).innerHTML = "FULL";
    });
}

getData();

setInterval(getData,1000);