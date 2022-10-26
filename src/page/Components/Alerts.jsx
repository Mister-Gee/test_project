import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SweetAlert = withReactContent(Swal)

export const successAlert = (message) =>  SweetAlert.fire({
    icon: 'success',
    title: 'Success',
    text: message,
})

export const errorAlert = (message) => SweetAlert.fire({
    icon: 'error',
    title: 'Error',
    text: message,
})

export const plainAlert = (message) => SweetAlert.fire(message)
    