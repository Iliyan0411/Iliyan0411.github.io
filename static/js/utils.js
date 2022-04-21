function getAlphabet() {
    const alpha = Array.from(Array(26)).map(function (e, i) {
        return i + 65;
    });
    return alpha.map(function (x) {
        return String.fromCharCode(x);
    });
}


const alphabets = getAlphabet();
for(let i in alphabets){
    document.getElementById("buttons").innerHTML +=
        `<button class="btn btn-secondary" value="${alphabets[i]}">${alphabets[i]}</button>&ensp;`;

    if(i == 12){
        document.getElementById("buttons").innerHTML += "<br><br>";
    }
}

document.getElementById("buttons").innerHTML += "<br>".repeat(3);
