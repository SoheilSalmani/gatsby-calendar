import * as React from "react"
import Calendar from "../components/calendar"

export default function IndexPage() {
  return (
    <div className="App">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>react<b>calendar</b></span>
        </div>
      </header>
      <main>
        <Calendar />
      </main>
    </div>
  )
}
