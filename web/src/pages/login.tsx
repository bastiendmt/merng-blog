import React from 'react'
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link";
import { withApollo } from '../utils/withApollo';


export const Login: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [login] = useLoginMutation()
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({
                        variables: values,
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.login.user
                                }
                            }),
                                cache.evict({ fieldName: "posts:{}" });
                        }
                    })

                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next === 'string') {
                            router.push(router.query.next)
                        } else {
                            router.push('/')
                        }
                    }

                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='usernameOrEmail' label='Username or Email' placeholder='username or email' />
                        <Box mt={4}>
                            <InputField name='password' label='Password' placeholder='password' type='password' />
                        </Box>
                        <Flex mt={2}>
                            <NextLink href='/forgot-password'><Link ml='auto'>Forgot password ?</Link></NextLink>
                        </Flex>
                        <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withApollo({ ssr: false })(Login);