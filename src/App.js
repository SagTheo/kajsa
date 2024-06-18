import './App.css';
import UserInput from './components/UserInput';
import { useState } from 'react';
import database from './database';

function App() {
  const [place, setPlace] = useState()
  const [arrivalDate, setArrivalDate] = useState()
  const [endDate, setEndDate] = useState()
  const [errorPlace, setErrorPlace] = useState()
  const [errorArrivalDate, setErrorArrivalDate] = useState()
  const [errorEndDate, setErrorEndDate] = useState()
  const [redPlace, setRedPlace] = useState(false)
  const [redArrDate, setRedArrDate] = useState(false)
  const [redEndDate, setRedEndDate] = useState(false)
  const [eventsAvailable, setEventsAvailable] = useState([])

  const handleChangePlace = e => {
    setPlace(e.target.value)
  }

  const handleChangeArrivalDate = e => {
    setArrivalDate(e.target.value)
  }

  const handleChangeEndDate = e => {
    setEndDate(e.target.value)
  }

  const controlInput = (input, inputName, setErrorMessage, setRed) => {
    const regex = /^\s*$/
    
    if (input === undefined || regex.test(input)) {
      setErrorMessage(inputName + ' can not be empty')
      setRed(true)

      return
    }

    setErrorMessage('')
    setRed(false)

    return true
  }

  const controlDate = (date, setErrorMessage, setRed) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

    if (dateRegex.test(date.trim())) {
      const dateSplit = date.split('/')

      if (Number(dateSplit[0]) < 1 || Number(dateSplit[0]) > 12) {
        setErrorMessage('Month must be between 01 and 12 included')
        setRed(true)

        return 
      }

      if (Number(dateSplit[1]) < 1 || Number(dateSplit[1]) > 31) {
        setErrorMessage('Day must be between 01 and 31 included')
        setRed(true)

        return 
      }
    } else {
      setErrorMessage('Date must have the mm/dd/yyyy format')
      setRed(true)

      return
    }

    setErrorMessage('')
    setRed(false)

    return true
  }

  const chronology = (arrivalDate, endDate, setEndDateErrMessage, setRed) => {
    const arrivalDateSplit = arrivalDate.split('/')
    const endDateSplit = endDate.split('/')

    if (Number(endDateSplit[2]) < Number(arrivalDateSplit[2])) {
      setEndDateErrMessage('The year for the end date can not be anterior to the year for the arrival date')
      setRed(true)

      return
    }

    if (Number(endDateSplit[2]) === Number(arrivalDateSplit[2])) {
      if (Number(endDateSplit[0]) < Number(arrivalDateSplit[0])) {
        setEndDateErrMessage('The month for the end date can not be anterior to the month for the arrival date')
        setRed(true)

        return
      }  
    }
    

    if (Number(endDateSplit[0]) === Number(arrivalDateSplit[0]) && Number(endDateSplit[2]) === Number(arrivalDateSplit[2])) {
      if (Number(endDateSplit[1]) < Number(arrivalDateSplit[1])) {
        setEndDateErrMessage('The day for the end date can not be anterior to the day for the arrival date')
        setRed(true)

        return
      } 
    }

    return true
  }

  const checkEvents = (place, arrivalDate, endDate) => {
    const placeLowerCase = place.toLowerCase()
    const events = []

    if (Object.hasOwn(database, placeLowerCase)) {
      const arrivalDateFormatted = new Date(arrivalDate)
      const endDateFormatted = new Date(endDate)
      const arrivalDateTimestamp = arrivalDateFormatted.getTime()
      const endDateTimestamp = endDateFormatted.getTime()
 
      database[placeLowerCase].forEach(event => {
        const eventStartDateFormatted = new Date(event['startDate'])
        const eventEndDateFormatted = new Date(event['endDate'])
        const eventStartDateTimestamp = eventStartDateFormatted.getTime()
        const eventEndDateTimestamp = eventEndDateFormatted.getTime()

        if (eventStartDateTimestamp >= arrivalDateTimestamp && eventStartDateTimestamp <= endDateTimestamp) {
          events.push(event)
        } else if (eventEndDateTimestamp >= arrivalDateTimestamp && eventEndDateTimestamp <= endDateTimestamp) {
          events.push(event)
        } else if (arrivalDateTimestamp >= eventStartDateTimestamp && arrivalDateTimestamp <= eventEndDateTimestamp) {
          events.push(event)
        }
      })
    }

    setEventsAvailable(events)
  }

  const checkForEvents = () => {
    const checkPlace = controlInput(place, 'Place', setErrorPlace, setRedPlace)
    const checkArrivalDate = controlInput(arrivalDate, 'Arrival date', setErrorArrivalDate, setRedArrDate)
    const checkEndDate = controlInput(endDate, 'End date', setErrorEndDate, setRedEndDate)

    if (checkPlace && checkArrivalDate && checkEndDate) {
      const checkArrivalDateBis = controlDate(arrivalDate, setErrorArrivalDate, setRedArrDate)
      const checkEndDateBis = controlDate(endDate, setErrorEndDate, setRedEndDate)

      if (checkArrivalDateBis && checkEndDateBis) {
        if (chronology(arrivalDate, endDate, setErrorEndDate, setRedEndDate)) {
          checkEvents(place, arrivalDate, endDate)
        }
      }
    }
  }

  return (
    <div className="App">
      <div>
        <UserInput name={'place'} 
                   placeholder={'Place you are visiting'} 
                   handleChange={handleChangePlace}
                   errorMessage={errorPlace}
                   red={redPlace} />
        <UserInput name={'startDate'} 
                   placeholder={'Arrival date (mm/dd/yyyy)'} 
                   handleChange={handleChangeArrivalDate}
                   errorMessage={errorArrivalDate}
                   red={redArrDate} />
        <UserInput name={'endDate'} 
                   placeholder={'Departure date(mm/dd/yyyy)'} 
                   handleChange={handleChangeEndDate}
                   errorMessage={errorEndDate}
                   red={redEndDate} />  
      </div>

      <button onClick={() => checkForEvents()}>Check for events</button>
      
      <div className='displayedEvents'>
        {
          eventsAvailable.length === 0 ?
          <div>No events</div>
          :
          eventsAvailable.map((event, index) => {
            return (
              <div key={index}>{event.event} from {event.startDate} until {event.endDate}</div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
