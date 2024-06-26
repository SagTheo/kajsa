import React from 'react'
import styles from '../css/UserInput.module.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const UserInputDate = ({name, placeholder, handleChange, errorMessage, red}) => {
  const [displayCalendar, setDisplayCalendar] = useState(false)
  const [date, setDate] = useState()

  return (
    <div className={styles.container}>
      <div className={styles.inputAndIcon}>
        <input type='text' 
                name={name} 
                id={name} 
                placeholder={placeholder}
                onChange={handleChange}
                // Triggers warning (see console)
                value={date}
                className={`${red ? styles.outlineRed : styles.noOutline} ${styles.userInput}`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="black" 
            className={styles.calendar} 
            viewBox="0 0 16 16"
            onClick={() => setDisplayCalendar(!displayCalendar)}
        >
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
        </svg>
      </div>
      {/* https://www.npmjs.com/package/react-calendar */}
      {
        displayCalendar ?
        <Calendar onChange={(value) => {
            const dayFormatted = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
            const monthFormatted = value.getMonth() + 1 < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1
            const dateFormatted = `${monthFormatted}/${dayFormatted}/${value.getFullYear()}`
            setDate(dateFormatted)
            }
          }
                  locale='en-US'
        />
        :
        null
      }
      <div className={red ? styles.err : styles.hide}>{errorMessage}</div>
    </div> 
  )
}

export default UserInputDate