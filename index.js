let bot = {
    started: false,
    math: false,
    a: 0,
    b: 0,
    chat: function(input) {
      if (input == "/start") {
        this.started = true;
        return "Привет, меня зовут Чат-бот, а как зовут тебя?";
      }
      if (!this.started) {
        return "Введите команду /start, для начала общения";
      }
      if (input == "/stop") {
        this.started = false;
        return "Всего доброго, если хочешь поговорить пиши /start";
      }
      if (input.startsWith("/name: ")) {
        let name = input.substr(7);
        return "Привет "+name+", приятно познакомится. Я умею считать, введи числа которые надо посчитать";
      }
      if (input.startsWith("/number: ")) {
        let numbers = input.substr(9).split(",");
        if (numbers.length == 2) {
          this.a = Number(numbers[0].trim());
          this.b = Number(numbers[1].trim());
          this.math = true;
          return "Введите одно из действий: -, +, *, /";
        }
        else
        return "Введите 2 числа например /number: 7, 9";
      }
      if (this.math) {
         var result = null;
        switch (input) {
          case "-":
            result = this.a - this.b;
            break;
          case "+":
            result = this.a + this.b;
            break;
          case "*":
            result = this.a * this.b;
            break;
          case "/":
            if (this.b == 0)
            {
              return "На ноль мы не делим, введите другие числа";
              this.math = false;
            }
            result = this.a / this.b;
            break;
        }
        if (result !== null) {
          this.math = false;
          return "Результат равен "+result;
        }
      }
      if (input == "/weather")
      {
        let url = "https://api.openweathermap.org/data/2.5/onecall?lat=55.75396&lon=37.620393&exclude=current,minutely,hourly&lang=ru&units=metric&appid=f7d70d2365450e551f8856b8dc431f90";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        try {
          xhr.send();
          let data = JSON.parse(xhr.response);
          return `Прогноз погоды на завтра:\nтемпература днем ${data.daily[1].temp.day} С \nтемпература ночью ${data.daily[1].temp.night} С \nскорость ветра ${data.daily[1].wind_speed} м/с \nвлажность ${data.daily[1].humidity}%\n${data.daily[1].weather[0].description}\nдавление ${data.daily[1].pressure} hPa`;
        } catch(err) {
          return "Не удалось получить данные о погоде.";
        }
      }
      return "Я не понимаю, введите другую команду!";
    }
};

function addLog(name, message) {
  let messages = document.getElementById("messages");
  let line = document.createElement("li");
  let span = document.createElement("span");
  span.innerText = message;
  line.appendChild(span);
  line.setAttribute("class", name);
  messages.appendChild(line);
  line.scrollIntoView();
}

let inputField = document.getElementById("m");
let button = document.getElementById("b");

function handleChat() {
  if (inputField.value) {
      addLog("msg-me", inputField.value);
      try {
        let result = bot.chat(inputField.value);
        addLog("msg-bot", result);
      }
      catch (e) {
        alert(e.message);
      }
      inputField.value = "";
      button.setAttribute("class","");
  }
  inputField.focus();
}

inputField.oninput = function(){
  button.setAttribute("class", inputField.value ? "active" : "");
}
