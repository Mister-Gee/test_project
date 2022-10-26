export function serviceError(err, setErrorMessage) {
    if (err.response && err.response.data) {
      setErrorMessage(err.response.data.message);
    } else {
      setErrorMessage("An exception occured!");
    }
  }