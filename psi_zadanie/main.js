var size = document.getElementById("size");
var color = document.getElementById("color");
var shape = document.getElementById("shape");
var taste = document.getElementById("taste");
var growth = document.getElementById("growth");
var seeds = document.getElementById("seeds");
var i = 0;

let fruits = [
    {"point": "0", "fruit": "Truskawka"},
    {"point": "0", "fruit": "Malina"},
    {"point": "0", "fruit": "Jabłko"},
    {"point": "0", "fruit": "Ogórek"},
    {"point": "0", "fruit": "Pomarańcza"},
    {"point": "0", "fruit": "Pomidor"},
    {"point": "0", "fruit": "Borówka"},
    {"point": "0", "fruit": "Arbuz"},
    {"point": "0", "fruit": "Ziemniak"},
    {"point": "0", "fruit": "Ananas"},
    {"point": "0", "fruit": "Gruszka"},
    {"point": "0", "fruit": "Mandarynka"},
    {"point": "0", "fruit": "Brzoskwinia"},
    {"point": "0", "fruit": "Śliwka"},
    {"point": "0", "fruit": "Cytryna"}
];

function addPoint(array) {
    fruits.forEach((item, index) => {
        array.forEach((item_array, index) => {
            if(item_array == item.fruit) {
                item.point++
            }
        })
    })
}

function calcSize() {
    switch(size.value) {
        case "small":
            addPoint(["Truskawka", "Malina", "Borówka"])
            break;
        case "medium":
            addPoint(["Jabłko", "Ogórek", "Pomarańcza", "Pomidor", "Ziemniak", "Gruszka", "Mandarynka", "Brzoskwinia", "Śliwka", "Cytryna"])
            break;
        case "big":
            addPoint(["Arbuz", "Ananas", "Ogórek"])
            break;
    }
}

function calcColor() {
    switch(color.value) {
        case "red":
            addPoint(["Truskawka", "Malina", "Jabłko", "Pomidor", "Arbuz", "Brzoskwinia"])
            break;
        case "green":
            addPoint(["Jabłko", "Ogórek", "Pomidor", "Arbuz", "Gruszka"])
            break;
        case "yellow":
            addPoint(["Jabłko", "Pomidor", "Ziemniak", "Ananas", "Brzoskwinia", "Cytryna"])
            break;
        case "orange":
            addPoint(["Pomarańcza", "Pomidor", "Mandarynka", "Brzoskwinia"])
            break;
        case "blue":
            addPoint(["Borówka", "Śliwka"])
            break;
        case "brown":
            addPoint(["Ziemniak", "Ananas"])
            break;
        case "violet":
            addPoint(["Borówka", "Śliwka"])
            break;
    }
}

function calcShape() {
    switch(shape.value) {
        case "long":
            addPoint(["Ogórek"])
            break;
        case "round":
            addPoint(["Jabłko", "Pomarańcza", "Pomidor", "Borówka", "Arbuz", "Mandarynka", "Brzoskwinia", "Śliwka", "Cytryna"])
            break;
        case "other":
            addPoint(["Truskawka", "Malina", "Pomidor", "Arbuz", "Ziemniak", "Ananas", "Gruszka", "Śliwka", "Cytryna"])
    }
}

function calcTaste() {
    switch(taste.value) {
        case "sweet":
            addPoint(["Truskawka", "Malina", "Jabłko", "Pomarańcza", "Pomidor", "Borówka", "Arbuz", "Ananas", "Gruszka", "Mandarynka", "Brzoskwinia", "Śliwka"])
            break;
        case "sour":
            addPoint(["Cytryna", "Malina", "Jabłko", "Pomarańcza", "Borówka", "Gruszka", "Mandarynka", "Śliwka"])
            break;
        case "other_taste":
            addPoint(["Ogórek", "Pomidor", "Ziemniak"])
    }
}

function calcGrowth() {
    switch(growth.value) {
        case "bush":
            addPoint(["Truskawka", "Malina", "Ogórek", "Borówka", "Pomidor", "Arbuz", "Cytryna"])
            break;
        case "underground":
            addPoint(["Ziemniak"])
            break;
        case "tree":
            addPoint(["Jabłko", "Pomarańcza", "Ananas", "Gruszka", "Mandarynka", "Brzoskwinia", "Śliwka", "Cytryna"])
    }
}

function getFruit() {
    i = 0;
    fruits.forEach((item, index) => {
        item.point = 0;
    })
    calcSize()
    calcColor()
    calcShape()
    calcTaste()
    calcGrowth()
    fruits.sort(function(a, b) {
        return b.point - a.point
    });
    document.getElementById("result").innerHTML = "Czy twój owoc to " + fruits[i].fruit + "? (" + ((fruits[i].point / 5) * 100).toFixed() + "%)";
    document.getElementById("nextbtn").style.display = "block";
}

function displayNext() {
    i++;
    if(i <= 14) {
        document.getElementById("result").innerHTML = "Czy twój owoc to " + fruits[i].fruit + "? (" + ((fruits[i].point / 5) * 100).toFixed() + "%)";
    }else {
        i = 0;
        document.getElementById("result").innerHTML = "Czy twój owoc to " + fruits[i].fruit + "? (" + ((fruits[i].point / 5) * 100).toFixed() + "%)";
    }
}