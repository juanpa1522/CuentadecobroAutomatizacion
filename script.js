var selectedDays = [];
    var selectedTimes = [];

    var calendar = document.getElementById("calendar");
    var selectedDaysDiv = document.getElementById("selectedDays");
    var selectedTimesList = document.getElementById("selectedTimes");

    var today = new Date();
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();

    var monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    generateCalendar(currentMonth, currentYear);

    function generateCalendar(month, year) {
      calendar.innerHTML = "";

      var table = document.createElement("table");

      var caption = document.createElement("caption");
      caption.textContent = monthNames[month] + " " + year;
      table.appendChild(caption);

      var daysOfWeek = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"];
      var thead = document.createElement("thead");
      var tr = document.createElement("tr");
      for (var i = 0; i < 7; i++) {
        var th = document.createElement("th");
        th.textContent = daysOfWeek[i];
        tr.appendChild(th);
      }
      thead.appendChild(tr);
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      var firstDay = new Date(year, month, 1).getDay();
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var dayCounter = 1;
      for (var row = 0; row < 6; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < 7; col++) {
          var td = document.createElement("td");
          if (row === 0 && col < firstDay) {
            td.textContent = "";
          } else if (dayCounter > daysInMonth) {
            break;
          } else {
            td.textContent = dayCounter;
            td.addEventListener("click", selectDay);
            dayCounter++;
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);

      calendar.appendChild(table);
    }

    function selectDay() {
      var selectedDay = parseInt(this.textContent);
      var selectedMonth = currentMonth;
      var selectedYear = currentYear;

      var selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

      var selectedIndex = selectedDays.findIndex(function(date) {
        return (
          date.getFullYear() === selectedYear &&
          date.getMonth() === selectedMonth &&
          date.getDate() === selectedDay
        );
      });

      if (selectedIndex > -1) {
        selectedDays.splice(selectedIndex, 1);
        this.classList.remove("selected");
      } else {
        selectedDays.push(selectedDate);
        this.classList.add("selected");
      }

      renderSelectedDays();
    }

    function renderSelectedDays() {
      selectedDaysDiv.innerHTML = "";

      var table = document.createElement("table");

      selectedDays.forEach(function(date) {
        var dayContainer = document.createElement("tr");
        dayContainer.className = "selected-day";

        var dayInfo = document.createElement("td");
        dayInfo.textContent = getFormattedDate(date);

        var timeButtonsCell = document.createElement("td");
        timeButtonsCell.className = "time-buttons";
        var timeButtonsHTML = getTimeButtonsHTML(date);
        timeButtonsCell.innerHTML = timeButtonsHTML;

        dayContainer.appendChild(dayInfo);
        dayContainer.appendChild(timeButtonsCell);

        table.appendChild(dayContainer);
      });

      selectedDaysDiv.appendChild(table);
    }

    function getFormattedDate(date) {
      var dayOfWeek = date.getDay();
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();

      var formattedDate = "";

      switch (dayOfWeek) {
        case 0:
          formattedDate = "Domingo";
          break;
        case 1:
          formattedDate = "Lunes";
          break;
        case 2:
          formattedDate = "Martes";
          break;
        case 3:
          formattedDate = "Miercoles";
          break;
        case 4:
          formattedDate = "Jueves";
          break;
        case 5:
          formattedDate = "Viernes";
          break;
        case 6:
          formattedDate = "Sabado";
          break;
      }

      formattedDate += " " + day + " de " + monthNames[month] + " " + year;

      return formattedDate;
    }

    function getTimeButtonsHTML(date) {
      var dayOfWeek = date.getDay();
      var timeButtonsHTML = "";

      switch (dayOfWeek) {
        case 0: // Domingo
          timeButtonsHTML = `
            <button onclick="selectTime('${formatDateTime(date, '8:00 AM')}')">8:00 AM</button>
            <button onclick="selectTime('${formatDateTime(date, '10:00 AM')}')">10:00 AM</button>
            <button onclick="selectTime('${formatDateTime(date, '5:00 PM')}')">5:00 PM</button>
          `;
          break;
        case 1: // Lunes
        case 2: // Martes
        case 3: // Miércoles
        case 5: // Viernes
        case 6: // Sábado
          timeButtonsHTML = `
            <button onclick="selectTime('${formatDateTime(date, '7:30 AM')}')">7:30 AM</button>
            <button onclick="selectTime('${formatDateTime(date, '12:30 PM')}')">12:30 PM</button>
          `;
          break;
        case 4: // Jueves
          timeButtonsHTML = `
            <button onclick="selectTime('${formatDateTime(date, '7:30 AM')}')">7:30 AM</button>
            <button onclick="selectTime('${formatDateTime(date, '9:00 AM')}')">9:00 AM</button>
            <button onclick="selectTime('${formatDateTime(date, '12:30 PM')}')">12:30 PM</button>
          `;
          break;
      }

      return timeButtonsHTML;
    }

    function selectTime(dateTime) {
      var selectedIndex = selectedTimes.indexOf(dateTime);

      if (selectedIndex > -1) {
        selectedTimes.splice(selectedIndex, 1);
      } else {
        selectedTimes.push(dateTime);
      }

      renderSelectedTimes();
    }

    function renderSelectedTimes() {
      selectedTimesList.innerHTML = "";

      selectedTimes.forEach(function(dateTime) {
        var listItem = document.createElement("li");
        listItem.textContent = dateTime;
        selectedTimesList.appendChild(listItem);
      });
    }

    function formatDateTime(date, time) {
      var dayOfWeek = date.getDay();
      var formattedTime = "";

      switch (dayOfWeek) {
        case 0: // Domingo
          formattedTime = "8:00 AM, 10:00 AM, 5:00 PM";
          break;
        case 1: // Lunes
        case 2: // Martes
        case 3: // Miércoles
        case 5: // Viernes
        case 6: // Sábado
          formattedTime = "7:30 AM, 12:30 PM";
          break;
        case 4: // Jueves
          formattedTime = "7:30 AM, 9:00 AM, 12:30 PM";
          break;
      }

      var formattedDate = getFormattedDate(date);
      var dateTime = formattedDate + " " + time;

      return dateTime;
    }