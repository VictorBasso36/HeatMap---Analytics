var containerRef;
var heatmapRef;

function handleMouseMove(event) {
    sendDataToEndpoint({
        x: event.clientX,
        y: event.clientY,
        value: 1,
    });
}

function handleClick(event) {
    sendDataToEndpoint({
        x: event.clientX,
        y: event.clientY,
        value: 100,
    });
}

function handleTouchStart(event) {
    sendDataToEndpoint({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        value: 1,
    });
}

function handleTouchMove(event) {
    sendDataToEndpoint({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        value: 1,
    });
}

function handleTouchEnd(event) {
    sendDataToEndpoint({
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
        value: 100,
    });
}

function sendDataToEndpoint(data) {
    console.log(data)
    var endpoint = 'YOUR_ENDPOINT_URL'; // Substitua pela URL do seu endpoint
    var http = new XMLHttpRequest();
    http.open('POST', endpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(data));
}

window.onload = function() {
    containerRef = document.body;
    heatmapRef = h337.create({
        container: containerRef,
        maxOpacity: .6,
        radius: 50,
        blur: .90,
        backgroundColor: 'transparent',
        gradient: {
            .3: 'blue',
            .65: 'lime',
            1: 'red'
        }
    });

    containerRef.addEventListener('mousemove', handleMouseMove);
    containerRef.addEventListener('click', handleClick);
    containerRef.addEventListener('touchstart', handleTouchStart);
    containerRef.addEventListener('touchmove', handleTouchMove);
    containerRef.addEventListener('touchend', handleTouchEnd);
}
