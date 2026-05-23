// Retrieve current month and year
let date = new Date();

let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDate();


// Loads saved events
let eventsArray = JSON.parse(localStorage.getItem('events')) || [];

function updateHeader() {
    const currentDate = new Date(currentYear, currentMonth);
    // Formatting the date for display
    const formatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

    document.getElementById("month-and-year").innerHTML = formatter.format(currentDate);
}

// Creating the month grid
function renderCalendar() {

    updateHeader();

    // Retrieves first day
    let firstDayofMonth =
        new Date(currentYear, currentMonth, 1).getDay();

    // Converts Sunday-based → Monday-based
    firstDayofMonth =
        (firstDayofMonth === 0) ? 6 : firstDayofMonth - 1;

    // Retrieves number of days
    const numOfDays =
        new Date(currentYear, currentMonth + 1, 0).getDate();

    let renderNum = 1;

    const tableBody = document.querySelector('tbody');

    // Clears previous calendar
    tableBody.innerHTML = "";

    // Loop to generate grid
    for (let i = 0; i < 6; i++) {

        const row = document.createElement('tr');

        for (let count = 0; count < 7; count++) {

            const calendarCell = document.createElement('td');

            calendarCell.classList.add(
                'border',
                'border-gray-300',
                'align-top',
                'p-2',
                'h-32'
            );

            // For inactive days (days from previous month)
            if (i === 0 && count < firstDayofMonth) {

                calendarCell.classList.add(
                    'border',
                    'border-gray-300',
                    'align-top',
                    'bg-gray-100'
                );

            } else if (renderNum > numOfDays) {
            
            // For inactive days (days from next month)
               calendarCell.classList.add(
                    'border',
                    'border-gray-300',
                    'align-top',
                    'bg-gray-100'
                );

            } else {

                // Day number
                const dayNumber = document.createElement('div');
                dayNumber.textContent = renderNum;

                calendarCell.appendChild(dayNumber);

                // Highlight today
                if (
                    currentYear === date.getFullYear() &&
                    currentMonth === date.getMonth() &&
                    renderNum === currentDay
                ) {
                    calendarCell.classList.add(
                        'bg-yellow-100',
                        'font-bold'
                    );
                };

                // Current cell date
                const cellDate =
                    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(renderNum).padStart(2, '0')}`;

                // Render events
                eventsArray.forEach((event, index) => {

                    if (event.date === cellDate) {

                        const eventElement = document.createElement('div');
                        eventElement.classList.add('event-div');

                        if (event.time == null) {
                            eventElement.textContent = event.name;
                        } else {
                            eventElement.innerHTML = `<b>${event.time}</b>  ${event.name}`;
                        }
;
                       eventElement.onclick = (e) => {
                            e.preventDefault();
                            openEditModal(index)
                        };


                        eventElement.classList.add(
                            'bg-green-200',
                            'rounded',
                            'px-1',
                            'mt-1',
                            'text-left',
                            'text-sm'
                        );

                        calendarCell.appendChild(eventElement);
                    }
                });

                renderNum++;
            }

            row.appendChild(calendarCell);
        }

        tableBody.appendChild(row);

        // Stops creating new rows
        if (renderNum > numOfDays) {
            break;
        }
    }
}

renderCalendar();

function openEditModal(index) {

    selectedEventIndex = index;

    const event = eventsArray[index];

    document.getElementById('edit-name').value = event.name;

    document.getElementById('edit-date').value = event.date;

    document.getElementById('edit-event-modal').showModal();
}


// Previous button logic
function previous() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }

    renderCalendar();
}

// Next button logic
function next(){
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }

    renderCalendar();
}

// Adding an event to the calendar
function add() {
    const nameInput = document.getElementById('event-name');

    const dateInput = document.getElementById('event-date');

    const timeInput = document.getElementById('event-time');

    const event = {name: nameInput.value, date: dateInput.value, time: timeInput.value};

    eventsArray.push(event);

    localStorage.setItem(
        'events',
        JSON.stringify(eventsArray)
    );

    renderCalendar();

    nameInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

let selectedEventIndex = null;

// For editing an event
function edit() {

    const updatedName = document.getElementById("edit-name").value;

    const updatedDate = document.getElementById("edit-date").value;

    const updatedTime = document.getElementById("edit-time").value;
        
    eventsArray[selectedEventIndex] = {
        name: updatedName,
        date: updatedDate,
        time: updatedTime
    };

    localStorage.setItem("events", JSON.stringify(eventsArray));

    renderCalendar();

    document.getElementById('edit-event-modal').close();
}

function deleteEvent() {
    eventsArray.splice(selectedEventIndex, 1);
    
    localStorage.setItem("events", JSON.stringify(eventsArray));

    renderCalendar();

    document.getElementById('delete-event-modal').close();

    document.getElementById('edit-event-modal').close();
}