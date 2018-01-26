 class Calendar {
    constructor(date) {
        const titleOfMonth = [
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень"
        ];

        const daysList = [
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб",
            "Нд"
        ];

        const container = document.querySelector('.container');

        function monthLength() {
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        }

        function getLastDayMonth(curDate) {
            return new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();
        }

        function getStartWeekday(curDate) {
            return curDate.getDay() == 0 ? 7 : curDate.getDay()
        };

        function firstDayOfMonth() {
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            console.log("First day :" + firstDay);
            return firstDay;
        }

        const emptyBlock = () => {
            let element = document.createElement('div');
            element.className = 'day';
            element.innerHTML = '-';
            return element;
        }

        function buildElem(tag, type, name, value) {
            const elem = document.createElement(tag);

            if (type == 'id') elem.id = name;
            else if (type == 'class') elem.className = name;

            if (value) elem.innerHTML = value;

            return elem;

        }

        //Init day list
        function initDays() {
            let dayList = [],
                dayCounter = 0,
                weekDay = date.getDay(),
                i = 0;


            while (dayCounter < 42) {
                dayCounter++;
                //Init empty blocks
                if (dayCounter < firstDayOfMonth()  || dayCounter > monthLength()) {
                    dayList.push(emptyBlock());
                }

                //init days
                else {
                    dayList.push(buildElem('div', 'class', 'day', ++i));
                }

            }
            return dayList;

        }

        function switchCalendar(next) {
            const calendar = document.getElementById('calendar');
            const year = Number(calendar.getAttribute('data-year'));
            const month = Number(calendar.getAttribute('data-month')) + (next === true ? 1 : -1);

            const nDate = new Date(year, month, 1);
            calendar.setAttribute('data-year', nDate.getFullYear());
            calendar.setAttribute('data-month', nDate.getMonth());
            date.setDate(year, month, 1);
            calendar.parentNode.removeChild(calendar);
            const newCal = new Calendar(nDate).CalendarInit();
        }

        function prevMonth() {
            return switchCalendar(false);
        }

        function nextMonth() {
            return switchCalendar(true);
        }


        this.CalendarInit = function() {

            //init main frame of calendar
            const calendar = buildElem('div', 'id', 'calendar');
            calendar.setAttribute('data-year', date.getFullYear());
            calendar.setAttribute('data-month', date.getMonth());
            console.log(container);
            container.insertBefore(calendar, container.children[0]);

            //init month-header container
            const month_Header_Container = buildElem('div', 'class', 'month-header-container');
            calendar.appendChild(month_Header_Container);

            //init left switch-buttom
            const switch_button_left = buildElem('div', 'class', 'switch_buttom_left', '<');
            switch_button_left.addEventListener('click', prevMonth, false);

            //init month title
            const month_header = buildElem('div', 'class', 'month-header', titleOfMonth[date.getMonth()] + " " + date.getFullYear());

            //init right switch-buttom
            const switch_button_right = buildElem('div', 'class', 'switch_buttom_right', '>');
            switch_button_right.addEventListener('click', nextMonth, false);

            //append elements into month-header
            month_Header_Container.appendChild(switch_button_left);
            month_Header_Container.appendChild(month_header);
            month_Header_Container.appendChild(switch_button_right);

            //init day of week header
            const day_of_week_header = buildElem('div', 'class', 'day_of_week_header');
            calendar.appendChild(day_of_week_header);

            //Fill names of week day
            for (let i in daysList) {
                let dayOfWeek = buildElem('div', 'class', 'day_of_week', daysList[i]);
                day_of_week_header.appendChild(dayOfWeek);
            }

            //Init day list
            const virtual_day_list = initDays();

            //render days list
            virtual_day_list.forEach(element => calendar.appendChild(element));
        };
    }
}


export default Calendar;
