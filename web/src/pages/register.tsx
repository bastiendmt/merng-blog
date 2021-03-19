import React from 'react'
import { Form, Formik } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
  `

export const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(REGISTER_MUTATION)
    return (
        <Wrapper variant='small'>
            <Formik 
            initialValues={{ username: '', password: '' }} 
            onSubmit={async(values) => {
               const response = await  register(values)

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