document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("perfumeForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {

e.preventDefault();

const age =
document.getElementById("age").value || 100;

const gender =
document.getElementById("gender").value;

const occasion =
document.getElementById("occasion").value;

const formatSelect =
document.getElementById("format");

const formatText =
formatSelect.options[
formatSelect.selectedIndex
].text;

const pricePerMl =
Number(formatSelect.value);

const volume =
Number(
document.getElementById("volume").value
);

const totalPrice =
pricePerMl * volume;

let delivery = "";
let deliveryClass = "";

if (totalPrice >= 3000) {

delivery = "Бесплатно";
deliveryClass = "free";

} else {

delivery = "По тарифу";
deliveryClass = "paid";

}

const notes =
[
...document.querySelectorAll(
"#notesBlock input:checked"
)
].map(item => item.value);

const characters =
[
...document.querySelectorAll(
"#characterBlock input:checked"
)
].map(item => item.value);

const notesText =
notes.length > 0
? notes.join(", ")
: "Не выбраны";

const charactersText =
characters.length > 0
? characters.join(", ")
: "Не выбраны";

const telegramMessage = `Привет)

Вот мой заказ:

Возраст: ${age}

Для кого:
${gender}

Куда/Когда:
${occasion}

Формат:
${formatText}

Объём:
${volume} мл

Ноты:
${notesText}

Характер:
${charactersText}

Стоимость:
${totalPrice} ₽

Доставка:
${delivery}
`;

const telegramLink =
https://t.me/aromatoud?text=${encodeURIComponent(telegramMessage)};

result.innerHTML = `

<div class="result-card">

<h2>
Проверьте заказ
</h2>

<div class="summary-box">

<div class="summary-title">
Основная информация
</div>


<p>
<strong>Возраст:</strong>
${age}
</p>


<p>
<strong>Для кого:</strong>
${gender}
</p>


<p>
<strong>Куда/Когда:</strong>
${occasion}
</p>


<p>
<strong>Формат:</strong>
${formatText}
</p>


<p>
<strong>Объём:</strong>
${volume} мл
</p>


</div>

<div class="summary-box">

<div class="summary-title">
Выбранные ноты
</div>


<p>
${notesText}
</p>


</div>

<div class="summary-box">

<div class="summary-title">
Характер аромата
</div>


<p>
${charactersText}
</p>


</div>

<div class="price">
${totalPrice.toLocaleString()} ₽
</div>


<div class="delivery ${deliveryClass}">
🚚 Доставка: ${delivery}
</div>


<label class="confirm-check">

<input
type="checkbox"
id="confirmOrder"
>

Я проверил данные заказа

</label>


<a
href="${telegramLink}"
target="_blank"
id="telegramBtn"
class="order-btn hidden"
>
ОФОРМИТЬ ЗАКАЗ
</a>

</div>

`;

const confirmOrder =
document.getElementById("confirmOrder");

const telegramBtn =
document.getElementById("telegramBtn");

confirmOrder.addEventListener(
"change",
function () {

if (this.checked) {

telegramBtn.classList.remove(
"hidden"
);

} else {

telegramBtn.classList.add(
"hidden"
);

}

}
);
localStorage.setItem(
"blackoud_age",
age
);

localStorage.setItem(
"blackoud_gender",
gender
);

localStorage.setItem(
"blackoud_occasion",
occasion
);

localStorage.setItem(
"blackoud_volume",
volume
);

localStorage.setItem(
"blackoud_format",
formatText
);

});

const savedAge =
localStorage.getItem(
"blackoud_age"
);

const savedGender =
localStorage.getItem(
"blackoud_gender"
);

const savedOccasion =
localStorage.getItem(
"blackoud_occasion"
);

const savedVolume =
localStorage.getItem(
"blackoud_volume"
);

if (savedAge) {
document.getElementById(
"age"
).value = savedAge;
}

if (savedGender) {
document.getElementById(
"gender"
).value = savedGender;
}

if (savedOccasion) {
document.getElementById(
"occasion"
).value = savedOccasion;
}

if (savedVolume) {
document.getElementById(
"volume"
).value = savedVolume;
}

});
