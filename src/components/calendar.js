import * as React from "react"
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek, subMonths } from "date-fns"

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const renderHeader= () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {format(currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            chevron_right
          </div>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const dateFormat = "EEEE"
    const days = [];
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    };
    return <div className="days row">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}
