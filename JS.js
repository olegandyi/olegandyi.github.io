let day = 0; // Счётчик дней
let name; // Имя города
let api = "9d21975ac8cd762fe58676804504ba80"; // Впиши сюда API
window.addEventListener('load', ()=> {
    let lat; // широта
    let lon; // долгота
    let vl; // вспомогательная пременная
    if(navigator.geolocation){ // проверка поддержки
        navigator.geolocation.getCurrentPosition(pos => {
            lat = pos.coords.latitude; // переменная широты
            lon = pos.coords.longitude; // переменная долготы
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=ru&units=metric` // Запрос
            fetch(url) //запрос на получение данных
                .then((response) => {
                    return response.json(); //Возвращает базу JSON
                })
                .then((data) => {
                    name = data.name; // Присваевает имя города переменной
                    if(data.main.humidity>80 && data.main.temp<=-10){// Выяснение - туманность сегодня или нет.
                        vl = "туманность"
                    }else if(data.main.humidity>50 && data.main.temp<=-35){
                        vl = "туманность"
                    }else{
                        vl = "нормально"
                    }
                    document.getElementById("text_0").innerHTML = `Город: ${data.name}`// Изменение данных строки
                    document.getElementById("temperature").innerHTML = `Температура сейчас: ${data.main.temp}°C (${data.main.feels_like}°C)`
                    document.getElementById("max_min_temp").innerHTML = `Min-max температура: ${data.main.temp_min}°C ~ ${data.main.temp_max}°C`
                    document.getElementById("wind").innerHTML = `Ветер: ${data.wind.speed} м/с`
                    document.getElementById("pressure").innerHTML = `Давление: ${Math.round(data.main.pressure/1.3)} мм. рт. ст.`
                    document.getElementById("humidity").innerHTML = `Влажность: ${data.main.humidity}%`
                    document.getElementById("visibility").innerHTML = `Видимость: ${vl}/${data.weather[0].description}`
                    const urlIcon = `images/${data.weather[0].description}.png`
                    console.log(data.weather[0].icon);
                    document.getElementById("weather_ico").src=`images/${data.weather[0].icon}.png`; //Формируется и отправляется ссылка на картинку
                });
        })
    }
})
function new_location(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("input").value}&appid=${api}&lang=ru&units=metric` // Всё тоже самое, но тут широта и долгота не берутся, а имя в строке.
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    name = data.name;
                    day = 0;
                    document.getElementById("info").innerHTML = "Сегодня"
                    if(data.main.humidity>80 && data.main.temp<=-10){
                        vl = "туманность"
                    }else if(data.main.humidity>50 && data.main.temp<=-35){
                        vl = "туманность"
                    }else{
                        vl = "нормально"
                    }
                    document.getElementById("text_0").innerHTML = `Город: ${data.name}`
                    document.getElementById("temperature").innerHTML = `Температура сейчас: ${data.main.temp}°C (${data.main.feels_like}°C)`
                    document.getElementById("max_min_temp").innerHTML = `Min-max температура: ${data.main.temp_min}°C ~ ${data.main.temp_max}°C`
                    document.getElementById("wind").innerHTML = `Ветер: ${data.wind.speed} м/с`
                    document.getElementById("pressure").innerHTML = `Давление: ${Math.round(data.main.pressure/1.3)} мм. рт. ст.`
                    document.getElementById("humidity").innerHTML = `Влажность: ${data.main.humidity}%`
                    document.getElementById("visibility").innerHTML = `Видимость: ${vl}/${data.weather[0].description}`
                    //const urlIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                    document.getElementById("weather_ico").src=`images/${data.list[day].weather[0].icon}.png`;
                });
    document.getElementById("input").value = ""; // обнуляет строку

}
function increm(){

    if(day < 39){ // 40 позиций в списке, от 0 до 39
        day++;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${api}&lang=ru&units=metric` //Тут тоже большинство одиннаковы, но вызывается другая база с прогнозом на 5 дней.
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.list[day].main.humidity>80 && data.list[day].main.temp<=-10){
                        vl = "туманность"
                    }else if(data.list[day].main.humidity>50 && data.list[day].main.temp<=-35){
                        vl = "туманность"
                    }else{
                        vl = "нормально"
                    }
                    document.getElementById("text_0").innerHTML = `Город: ${data.city.name}`
                    document.getElementById("temperature").innerHTML = `Температура сейчас: ${data.list[day].main.temp}°C (${data.list[day].main.feels_like}°C)`
                    document.getElementById("max_min_temp").innerHTML = `Min-max температура: ${data.list[day].main.temp_min}°C ~ ${data.list[day].main.temp_max}°C`
                    document.getElementById("wind").innerHTML = `Ветер: ${data.list[day].wind.speed} м/с`
                    document.getElementById("pressure").innerHTML = `Давление: ${Math.round(data.list[day].main.pressure/1.333)} мм. рт. ст.`
                    document.getElementById("humidity").innerHTML = `Влажность: ${data.list[day].main.humidity}%`
                    document.getElementById("visibility").innerHTML = `Видимость: ${vl}/${data.list[day].weather[0].description}/${data.list[day].dt_txt}`
                    //const urlIcon = `C:\\Users\\rufol\\OneDrive\\Рабочий стол\\Owl weathr\\images\\icon.png`
                    console.log(data.list[day].weather[0].icon);
                    document.getElementById("weather_ico").src=`images/${data.list[day].weather[0].icon}.png`;
                });
    }
    if(day == 0){ // Механизм нижней кнопки
        document.getElementById("info").innerHTML = "Сегодня"
    }else{
        document.getElementById("info").innerHTML = `${(day+1)*0.125} д.`
    }
}
function dicrem(){
    if(day != 0){
        day--;
        if(day == 0){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api}&lang=ru&units=metric` // Тут почти всё самое хорошее.
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.main.humidity>80 && data.main.temp<=-10){
                        vl = "туманность"
                    }else if(data.main.humidity>50 && data.main.temp<=-35){
                        vl = "туманность"
                    }else{
                        vl = "нормально"
                    }
                    document.getElementById("text_0").innerHTML = `Город: ${data.name}`
                    document.getElementById("temperature").innerHTML = `Температура сейчас: ${data.main.temp}°C (${data.main.feels_like}°C)`
                    document.getElementById("max_min_temp").innerHTML = `Min-max температура: ${data.main.temp_min}°C ~ ${data.main.temp_max}°C`
                    document.getElementById("wind").innerHTML = `Ветер: ${data.wind.speed} м/с`
                    document.getElementById("pressure").innerHTML = `Давление: ${Math.round(data.list[day].main.pressure/1.333)} мм. рт. ст.`
                    document.getElementById("humidity").innerHTML = `Влажность: ${data.main.humidity}%`
                    document.getElementById("visibility").innerHTML = `Видимость: ${vl}/${data.weather[0].description}`
                    //const urlIcon = `C:\\Users\\rufol\\OneDrive\\Рабочий стол\\Owl weathr\\images\\icon.png`
                    document.getElementById("weather_ico").src=`images/${data.weather[0].icon}.png`;
                });
            if(day == 0){ // Механизм нижней кнопки
                document.getElementById("info").innerHTML = "Сегодня"
            }else{
                document.getElementById("info").innerHTML = `${(day+1)*0.125} д.`
            }

        }else{
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${api}&lang=ru&units=metric`
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.list[day].main.humidity>80 && data.list[day].main.temp<=-10){
                        vl = "туманность"
                    }else if(data.list[day].main.humidity>50 && data.list[day].main.temp<=-35){
                        vl = "туманность"
                    }else{
                        vl = "нормально"
                    }
                    document.getElementById("text_0").innerHTML = `Город: ${data.city.name}`
                    document.getElementById("temperature").innerHTML = `Температура сейчас: ${data.list[day].main.temp}°C (${data.list[day].main.feels_like}°C)`
                    document.getElementById("max_min_temp").innerHTML = `Min-max температура: ${data.list[day].main.temp_min}°C ~ ${data.list[day].main.temp_max}°C`
                    document.getElementById("wind").innerHTML = `Ветер: ${data.list[day].wind.speed} м/с`
                    document.getElementById("pressure").innerHTML = `Давление: ${Math.round(data.list[day].main.pressure/1.333)} мм. рт. ст.`
                    document.getElementById("humidity").innerHTML = `Влажность: ${data.list[day].main.humidity}%`
                    document.getElementById("visibility").innerHTML = `Видимость: ${vl}/${data.list[day].weather[0].description}/${data.list[day].dt_txt}`
                    document.getElementById("weather_ico").src=`images/${data.list[day].weather[0].icon}.png`;
                });
            if(day == 0){ // Механизм нижней кнопки
                document.getElementById("info").innerHTML = "Сегодня"
            }else{
                document.getElementById("info").innerHTML = `${(day+1)*0.125} д.`
            }
        }
    }
}
