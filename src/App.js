import './App.css';
import UserInput from './components/UserInput';
import { useState } from 'react';

function App() {
  const [place, setPlace] = useState()
  const [arrivalDate, setArrivalDate] = useState()
  const [endDate, setEndDate] = useState()
  const [errorPlace, setErrorPlace] = useState()
  const [errorArrivalDate, setErrorArrivalDate] = useState()
  const [errorEndDate, setErrorEndDate] = useState()

  const handleChangePlace = e => {
    setPlace(e.target.value)
  }

  const handleChangeArrivalDate = e => {
    setArrivalDate(e.target.value)
  }

  const handleChangeEndDate = e => {
    setEndDate(e.target.value)
  }

  const controlInput = (input, inputName, setInputName) => {
    const regex = /^\s*$/
    
    if (input === undefined || regex.test(input)) {
      console.log('hey')
      setInputName(inputName + ' can not be empty')

      return
    }

    setInputName('')

    return true
  }

  const controlDate = (date, setErrorMessage) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

    if (dateRegex.test(date.trim())) {
      const dateSplit = date.split('/')

      if (Number(dateSplit[0]) < 1 || Number(dateSplit[0]) > 12) {
        setErrorMessage('Month must be between 01 and 12 included')

        return 
      }

      if (Number(dateSplit[1]) < 1 || Number(dateSplit[1]) > 31) {
        setErrorMessage('Day must be between 01 and 31 included')

        return 
      }
    } else {
      setErrorMessage('Date must have the mm/dd/yyyy format')

      return
    }

    setErrorMessage('')

    return true
  }

  const chronology = (arrivalDate, endDate, setEndDateErrMessage) => {
    const arrivalDateSplit = arrivalDate.split('/')
    const endDateSplit = endDate.split('/')

    if (Number(endDateSplit[2]) < Number(arrivalDateSplit[2])) {
      setEndDateErrMessage('The year for the end date can not be anterior to the year for the arrival date')
    }

    if (Number(endDateSplit[2]) === Number(arrivalDateSplit[2])) {
      if (Number(endDateSplit[0]) < Number(arrivalDateSplit[0])) {
        setEndDateErrMessage('The month for the end date can not be anterior to the month for the arrival date')
      }  
    }
    

    if (Number(endDateSplit[0]) === Number(arrivalDateSplit[0]) && Number(endDateSplit[2]) === Number(arrivalDateSplit[2])) {
      if (Number(endDateSplit[1]) < Number(arrivalDateSplit[1])) {
        setEndDateErrMessage('The day for the end date can not be anterior to the day for the arrival date')
      }
    }
  }

  const checkForEvents = () => {
    const checkPlace = controlInput(place, 'Place', setErrorPlace)
    const checkArrivalDate = controlInput(arrivalDate, 'Arrival date', setErrorArrivalDate)
    const checkEndDate = controlInput(endDate, 'End date', setErrorEndDate)

    if (checkPlace && checkArrivalDate && checkEndDate) {
      const checkArrivalDateBis = controlDate(arrivalDate, setErrorArrivalDate)
      const checkEndDateBis = controlDate(endDate, setErrorEndDate)

      if (checkArrivalDateBis && checkEndDateBis) {
        chronology(arrivalDate, endDate, setErrorEndDate)
      }
    }
  }

  return (
    <div className="App">
      <div>
        <UserInput name={'place'} 
                   placeholder={'Place you are visiting'} 
                   handleChange={handleChangePlace}
                   errorMessage={errorPlace} />
        <UserInput name={'startDate'} 
                   placeholder={'Arrival date (mm/dd/yyyy)'} 
                   handleChange={handleChangeArrivalDate}
                   errorMessage={errorArrivalDate} />
        <UserInput name={'endDate'} 
                   placeholder={'Departure date(mm/dd/yyyy)'} 
                   handleChange={handleChangeEndDate}
                   errorMessage={errorEndDate} />  
      </div>

      <button onClick={() => checkForEvents()}>Check for events</button>
      
    </div>
  );
}

export default App;
