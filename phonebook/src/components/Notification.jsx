const Notification = ({ message, errorMessage }) => {
  console.log(errorMessage)
  const error = errorMessage ? 'error' : ''
  if (message === null && errorMessage === null) {
    return null
  }

  return (
    <div className={`message ${error}`}>
      {message} {errorMessage}
    </div>
  )
}

export default Notification