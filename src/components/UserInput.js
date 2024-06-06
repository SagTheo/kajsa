import React from 'react'

const UserInput = ({name, placeholder, handleChange}) => {
  return (
      <input type='text' 
              name={name} 
              id={name} 
              placeholder={placeholder}
              onChange={handleChange}
      />
  )
}

export default UserInput