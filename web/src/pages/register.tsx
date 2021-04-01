import React from 'react'
import { Form, Formik } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withApollo } from '../utils/withApollo';

interface registerProps { }

export const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [register] = useRegisterMutation()
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({
                        variables: { options: values },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.register.user
                                }
                            })
                        }
                    })

                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        //work         
                        router.push('/')
                    }

                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' label='Username' placeholder='username' />
                        <Box mt={4}>
                            <InputField name='email' label='Email' placeholder='Email' />
                        </Box>
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

export default withApollo({ ssr: false })(Register);