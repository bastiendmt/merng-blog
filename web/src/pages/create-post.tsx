import { Box, Button, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';


export const CreatePost: React.FC<{}> = ({ }) => {
    const [createPost] = useCreatePostMutation()
    const router = useRouter()
    useIsAuth()

    return (
        <Layout variant='small'>
            <Heading as="h2" size="lg" mb={4}>Create post</Heading>
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const { errors } = await createPost({
                        variables: { input: values },
                        update: (cache) => {
                            cache.evict({ fieldName: 'posts:{}' })
                        }
                    })

                    if (!errors) {
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

export default withApollo({ ssr: false })(CreatePost);
