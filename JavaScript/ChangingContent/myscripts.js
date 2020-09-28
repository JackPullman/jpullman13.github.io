let buttonFunction = function() {
    let buttonChoice = prompt('Hello or Goodbye?').toLowerCase();
    switch (buttonChoice.trim()){
        case 'hello':
            var helloElements = document.getElementsByClassName('hello');
            for (var i = 0; i < helloElements.length; i++) {
                var currentHelloElemValue = helloElements[i].textContent.substring(13);
                helloElements[i].textContent = 'Hello Number ' + (currentHelloElemValue * 2);
            }
            break;
        case 'goodbye':
            var byeElements = document.getElementsByClassName('goodbye');
            for (var i = 0; i < byeElements.length; i++) {
                var currentByeElemValue = byeElements[i].textContent.substring(15);
                byeElements[i].textContent = 'Goodbye Number ' + (currentByeElemValue * 2);
            }
            break;
        default:
            alert('Please enter valid input "Hello" or "Goodbye".');
    }
}
document.getElementById('thebutton').addEventListener('click', buttonFunction);
