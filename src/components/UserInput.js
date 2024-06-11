import React from 'react'
import styles from '../css/UserInput.module.css'

const UserInput = ({name, placeholder, handleChange, errorMessage, red}) => {
  return (
    <div className={styles.container}>
      <input type='text' 
              name={name} 
              id={name} 
              placeholder={placeholder}
              onChange={handleChange}
              className={red ? styles.outlineRed : styles.noOutline}
      />
      <div className={styles.err}>{errorMessage}</div>
    </div>
      
  )
}

export default UserInput