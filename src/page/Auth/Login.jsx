import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {login} from '../../services/postService';
import { serviceError } from '../../utility/functions';
import { errorAlert, successAlert } from '../Components/Alerts';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const onSubmit = async (value) => {
        try{
            setIsSubmitting(true)
            let res = await login(value)
            if(res.status === 200){
                setIsSubmitting(false)
                successAlert("Login Successful")
            }
            else{
                errorAlert("An Error Occured")
            }
        }
        catch(err){
            serviceError(err, setErrorMessage)
            errorAlert(errorMessage)
            setIsSubmitting(false)
        }
    }

  return (
    <>
         <div className='social-btn-group'>
                <Button  className='fb-btn'>
                    <iconify-icon icon="brandico:facebook"></iconify-icon>
                </Button>
            <Button className='google-btn'>
                <iconify-icon icon="akar-icons:google-fill"></iconify-icon>
            </Button>
        </div>
        <div className="auth-form">
            <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        isSubmitting,
                        handleBlur,
                        handleSubmit,
                        
                        /* and other goodies */
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control 
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className="form-control"
                                />
                                <Form.Text className="text-danger">
                                {errors.email && touched.email && errors.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control 
                                    type="password" 
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className="form-control"
                                />
                                <Form.Text className="text-danger">
                                {errors.password && touched.password && errors.password}
                                </Form.Text>
                            </Form.Group>
                            <Button 
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting 
                                ?
                                    <Spinner animation="border" size="md" />
                                :
                                "Sign In"
                                }
                            </Button>
                        </Form>
                    )}
            </Formik>
        </div>
    </>    
  )
}

export default Login