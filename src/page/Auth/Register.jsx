import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {register} from '../../services/postService';
import { serviceError } from '../../utility/functions';
import { errorAlert, successAlert } from '../Components/Alerts';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialValues = {
        username: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const onSubmit = async (value) => {
        try{
            setIsSubmitting(true)
            let res = await register(value)
            if(res.status === 200){
                setIsSubmitting(false)
                successAlert("Signup Successful")
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
                                    type="username" 
                                    name="username"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    className="form-control"
                                />
                                <Form.Text className="text-danger">
                                {errors.username && touched.username && errors.username}
                                </Form.Text>
                            </Form.Group>
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
                                "Sign Up"
                                }
                            </Button>
                        </Form>
                    )}
            </Formik>
        </div>
  )
}

export default Register