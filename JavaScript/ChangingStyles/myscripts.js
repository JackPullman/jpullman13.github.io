let buttonFunction = function() {
    let buttonChoice = prompt('Hello or Goodbye?').toLowerCase();
    switch (buttonChoice.trim()){
        case 'hello':
            $('.hello').addClass('highlight');
            $('.goodbye').removeClass('highlight');
            break;
        case 'goodbye':
            $('.goodbye').addClass('highlight');
            $('.hello').removeClass('highlight');
            break;
        default:
            alert('Please enter valid input "Hello" or "Goodbye".');
    }
}
document.getElementById('thebutton').addEventListener('click', buttonFunction);
