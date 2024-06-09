import React from 'react'
import styles from '../css/UserInput.module.css'

const UserInput = ({name, placeholder, handleChange, errorMessage}) => {
  return (
    <div className={styles.container}>
      <input type='text' 
              name={name} 
              id={name} 
              placeholder={placeholder}
              onChange={handleChange}
      />
      <div>{errorMessage}</div>
    </div>
      
  )
}

export default UserInput