

const handleNetworkError = (msg) => {
  console.log(msg)
  alert('Connection lost or error: see logs')
}

export default {
  handleNetworkError,
  // some other error helpers
}