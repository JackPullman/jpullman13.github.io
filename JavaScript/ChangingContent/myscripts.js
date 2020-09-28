let buttonFunction = function() {
    let buttonChoice = prompt('Hello or Goodbye?').toLowerCase();
    switch (buttonChoice.trim()){
        case 'hello':
            var helloElements = document.getElementsByClassName('hello');
            for (var i = 0; i < helloElements.length; i++) {
                var currentHelloElemValue = helloElements[i].getAttribute('value').substring(13);
                helloElements[i].setAttribute('value', 'Hello Number ' + (currentHelloElemValue * 2))
            }
        case 'goodbye':
            var byeElements = document.getElementsByClassName('goodbye');
            for (var i = 0; i < byeElements.length; i++) {
                var currentByeElemValue = byeElements[i].getAttribute('value').substring(15);
                byeElements[i].setAttribute('value', 'Goodbye Number ' + (currentByeElemValue * 2))
            }
        default:
            alert('Please enter valid input "Hello" or "Goodbye".');
    }
}
document.getElementById('thebutton').addEventListener('click', buttonFunction);
