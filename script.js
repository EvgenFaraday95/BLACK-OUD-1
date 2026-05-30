document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("perfumeForm");
const result = document.getElementById("result");

const confirmOrder = document.getElementById("confirmOrder");
const telegramBtn = document.getElementById("telegramBtn");

form.addEventListener("submit", (e) => {

    e.preventDefault();
    e.stopPropagation();

    const age =
        document.getElementById("age").value || 100;

    const gender =
        document.getElementById("gender").value;

    const occasion =
        document.getElementById("occasion").value;

    const format =
        document.getElementById("format");

    const formatText =
        format.options[format.selectedIndex].text;

    const pricePerMl =
        Number(format.value);

    const volume =
        Number(document.getElementById("volume").value);

    const notes =
        [...document.querySelectorAll("#notesBlock input:checked")]
            .map(item => item.value)
            .join(", ") || "Не выбраны";

    const characters =
        [...document.querySelectorAll("#characterBlock input:checked")]
            .map(item => item.value)
            .join(", ") || "Не выбраны";

    const totalPrice =
        pricePerMl * volume;

    const delivery =
        totalPrice >= 3000
            ? "Бесплатно"
            : "По тарифу";

    document.getElementById("r_age").textContent = age;
    document.getElementById("r_gender").textContent = gender;
    document.getElementById("r_occasion").textContent = occasion;
    document.getElementById("r_format").textContent = formatText;
    document.getElementById("r_volume").textContent = volume + " мл";
    document.getElementById("r_notes").textContent = notes;
    document.getElementById("r_characters").textContent = characters;
    document.getElementById("r_price").textContent =
        totalPrice.toLocaleString() + " ₽";
    document.getElementById("r_delivery").textContent =
        "🚚 Доставка: " + delivery;

    result.classList.remove("hidden");

    confirmOrder.checked = false;
    telegramBtn.classList.add("hidden");

    const telegramMessage =
`Привет!

Вот мой заказ:

Возраст: ${age}
Для кого: ${gender}
Куда/Когда: ${occasion}

Формат: ${formatText}
Объём: ${volume} мл

Ноты:
${notes}

Характер:
${characters}

Стоимость:
${totalPrice} ₽

Доставка:
${delivery}`;

    telegramBtn.dataset.message = telegramMessage;

    localStorage.setItem("blackoud_age", age);
    localStorage.setItem("blackoud_gender", gender);
    localStorage.setItem("blackoud_occasion", occasion);
    localStorage.setItem("blackoud_volume", volume);
    localStorage.setItem("blackoud_format", format.value);
});

confirmOrder.addEventListener("change", () => {

    if (confirmOrder.checked) {
        telegramBtn.classList.remove("hidden");
    } else {
        telegramBtn.classList.add("hidden");
    }

});

telegramBtn.addEventListener("click", (e) => {

    e.preventDefault();

    if (!telegramBtn.dataset.message) return;

    telegramBtn.classList.add("loading");
    telegramBtn.textContent = "Отправка...";

    const url =
        `https://t.me/share/url?text=${encodeURIComponent(
            telegramBtn.dataset.message
        )}`;

    setTimeout(() => {

        window.location.href = url;

        telegramBtn.classList.remove("loading");
        telegramBtn.textContent = "ОФОРМИТЬ В TELEGRAM";

    }, 500);

});

const savedAge =
    localStorage.getItem("blackoud_age");

const savedGender =
    localStorage.getItem("blackoud_gender");

const savedOccasion =
    localStorage.getItem("blackoud_occasion");

const savedVolume =
    localStorage.getItem("blackoud_volume");

const savedFormat =
    localStorage.getItem("blackoud_format");

if (savedAge)
    document.getElementById("age").value = savedAge;

if (savedGender)
    document.getElementById("gender").value = savedGender;

if (savedOccasion)
    document.getElementById("occasion").value = savedOccasion;

if (savedVolume)
    document.getElementById("volume").value = savedVolume;

if (savedFormat)
    document.getElementById("format").value = savedFormat;
});