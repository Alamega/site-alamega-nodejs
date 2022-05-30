var p;
var q;
var d;
var mod;
var F;
var e;
var arr = [
  null,
  null,
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
];

console.log(arr.indexOf("Ш"));
console.log(arr.indexOf("У"));
console.log(arr.indexOf("М"));
console.log(arr.indexOf("А"));
console.log(arr.indexOf("Н"));

function GetKeys() {
  p = document.getElementById("p").value;
  q = document.getElementById("q").value;
  d = document.getElementById("d").value;
  let result = document.getElementById("result");
  if (!(p.length > 4 || q.length > 4 || d.length > 4)) {
    mod = p * q;
    F = (p - 1) * (q - 1);
    for (i = 0; i < F; i++) {
      if ((d * i) % F == 1) {
        e = i;
        break;
      }
    }
    result.innerHTML = "Открытый ключ = " + " {" + e + ", " + mod + "}<br>Закрытый ключ =" + " {" + d + ", " + mod + "}<br>";
  } else {
    result.innerHTML = "Значения p, q, Kc не должны быть больше 9999";
  }
}
