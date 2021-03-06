const reconnectTimeout = 2000;
const host="test.mosquitto.org";
const port=8081;
// const host="mqtt:broker.hivemq.com";
// const port=80;
// const host="mqtt:broker.mqttdashboard.com";
// const port=8000;

const mqtt = new Paho.MQTT.Client(host, port, "iotweb");

console.log("connecting to " + host + " " + port);
let options = {
    useSSL:true,
    timeout: 3,
    onSuccess: onConnect,
    onFailure: onFailure
};
mqtt.onMessageArrived = onMessageArrived;
mqtt.connect(options); //connect

function onConnect() {
    console.log("onConnected");

    mqtt.subscribe("TrashA/plastic");
    mqtt.subscribe("TrashA/metal");
    mqtt.subscribe("TrashA/paper");
    mqtt.subscribe("TrashA/others");
    mqtt.subscribe("TrashB/plastic");
    mqtt.subscribe("TrashB/metal");
    mqtt.subscribe("TrashB/paper");
    mqtt.subscribe("TrashB/others");    

    //test my pub
    // const message = new Paho.MQTT.Message("60");
    // message.retained = true;
    // message.destinationName = "TrashA/others";
    // mqtt.send(message);
}

function onFailure() {
    console.log("Connection to Host: " + host + " Failed");
    setTimeout(MQTTreconnect, reconnectTimeout);
    document.getElementById(`barTrashA/plastic`).setAttribute("style", `width: 15%;`)
    document.getElementById(`barTrashA/metal`).setAttribute("style", `width: 10%;`)
    document.getElementById(`barTrashA/paper`).setAttribute("style", `width: 20%;`)
    document.getElementById(`barTrashA/others`).setAttribute("style", `width: 15%;`)
    document.getElementById(`barTrashB/plastic`).setAttribute("style", `width: 10%;`)
    document.getElementById(`barTrashB/metal`).setAttribute("style", `width: 15%;`)
    document.getElementById(`barTrashB/paper`).setAttribute("style", `width: 10%;`)
    document.getElementById(`barTrashB/others`).setAttribute("style", `width: 20%;`)    
}

function onMessageArrived(message) {
    let msg_in = message.payloadString;
    
    console.log(message.destinationName)
    console.log('message in: '+ msg_in);


    let bar = document.getElementById(`bar${message.destinationName}`);
    bar.setAttribute("style", `width: ${msg_in}%;`)
    if (msg_in < 75 ) {
        document.getElementById(`text${message.destinationName}`).innerHTML = ""
    } else {
        document.getElementById(`text${message.destinationName}`).innerHTML = "FULL"
    }
}

function MQTTreconnect() {
    console.log("connecting to " + host + " " + port);
    const mqtt = new Paho.MQTT.Client(host, port, "iottrash");
    var options = {
      useSSL:true,
      timeout: 3,
      onSuccess: onConnect,
      onFailure: onFailure
    };
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options); //connect
  }
