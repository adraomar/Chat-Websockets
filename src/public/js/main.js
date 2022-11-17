const chatContainer = document.getElementById("chatContainer");

const clientSocket = io();

clientSocket.on("srvMessage", (data) => {
    let messages = "";
    data.forEach(element => {
        messages += `<div class="card">
        <div class="card-header d-flex justify-content-between p-3">
            ${element.author}
        </div>
        <div class="card-body">
            <p class="card-text">${element.text}</p>
        </div>
    </div>`;
    });

    chatContainer.innerHTML = messages;
})

let user = "";

Swal.fire({
    title:"Bienvenido al Chat System",
    text:"Ingresa tu nombre",
    input:"text",
    allowOutsideClick:false
}).then((result) => {
    user = result.value;
    document.getElementById("username").innerHTML = `Estas conectado como: <strong>${user}</strong>`;
})

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = {
        author:user,
        text:document.getElementById("messageChat").value
    }
    //enviar nuevo mensaje
    clientSocket.emit("newMessage", message);
    document.getElementById("messageChat").value = "";
})