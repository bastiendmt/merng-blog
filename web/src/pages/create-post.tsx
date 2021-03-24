import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';


export const CreatePost: React.FC<{}> = ({ }) => {
    const [, createPost] = useCreatePostMutation()
    const router = useRouter()
    useIsAuth()

    return (
        <Layout variant='small'>
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const { error } = await createPost({ input: values })

                    if (!error) {
                        router.push("/");
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='title' label='Title' placeholder='Title' />
                        <Box mt={4}>
                            <InputField name='text' label='Body' placeholder='text...' textarea />
                        </Box>

                        <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Create post</Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost)