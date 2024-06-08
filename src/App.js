import './App.css';
import UserInput from './components/UserInput';
import { useState } from 'react';

function App() {
  const [place, setPlace] = useState()
  const [arrivalDate, setArrivalDate] = useState()
  const [endDate, setEndDate] = useState()

  const handleChangePlace = e => {
    setPlace(e.target.value)
  }

  const handleChangeArrivalDate = e => {
    setArrivalDate(e.target.value)
  }

  const handleChangeEndDate = e => {
    setEndDate(e.target.value)
  }

  const controlDate = (date, nameDate) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

    if (dateRegex.test(date.trim())) {
      const dateSplit = date.split('/')

      if (Number(dateSplit[0]) < 1 || Number(dateSplit[0]) > 12) {
        alert(`The month for ${nameDate} must be between 01 and 12 included`)

        return 
      }

      if (Number(dateSplit[1]) < 1 || Number(dateSplit[1]) > 31) {
        alert(`The day for ${nameDate} must be between 01 and 31 included`)

        return 
      }
    } else {
      alert(nameDate + ' must have the mm/dd/yyyy format')

      return
    }

    return true
  }

  const chronology = (arrivalDate, endDate) => {
    const arrivalDateSplit = arrivalDate.split('/')
    const endDateSplit = endDate.split('/')

    if (Number(endDateSplit[2]) < Number(arrivalDateSplit[2])) {
      alert('The year for the end date can not be anterior to the year for the arrival date')
    }

    if (Number(endDateSplit[2]) === Number(arrivalDateSplit[2])) {
      if (Number(endDateSplit[0]) < Number(arrivalDateSplit[0])) {
        alert('The month for the end date can not be anterior to the month for the arrival date')
      }  
    }
    

    if (Number(endDateSplit[0]) === Number(arrivalDateSplit[0]) && Number(endDateSplit[2]) === Number(arrivalDateSplit[2])) {
      if (Number(endDateSplit[1]) < Number(arrivalDateSplit[1])) {
        alert('The day for the end date can not be anterior to the day for the arrival date')
      }
    }
  }

  const checkForEvents = () => {
    if (controlDate(arrivalDate, 'Arrival date') && controlDate(endDate, 'End date')) {
      chronology(arrivalDate, endDate)
    }
  }

  return (
    <div className="App">
      <div>
        <UserInput name={'place'} 
                   placeholder={'Place you are visiting'} 
                   handleChange={handleChangePlace} />
        <UserInput name={'startDate'} 
                   placeholder={'Arrival date (mm/dd/yyyy)'} 
                   handleChange={handleChangeArrivalDate} />
        <UserInput name={'endDate'} 
                   placeholder={'Departure date(mm/dd/yyyy)'} 
                   handleChange={handleChangeEndDate} />  
      </div>

      <button onClick={() => checkForEvents()}>Check for events</button>
      
    </div>
  );
}

export default App;
