import React from 'react'
import { Form, Formik } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {

}

export const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => {
                console.log(values);

            }}>
                {({ values, handleChange, isSubmitting }) => (
                    <Form>
                        <InputField name='username' label='Username' placeholder='username' />
                        <Box mt={4}>
                            <InputField name='password' label='Password' placeholder='password' type='password' />
                        </Box>
                        <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Register</Button>
                    </Form>
                )}

            </Formik>
        </Wrapper>
    );
}

export default Register;