import { Box, Button, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../../utils/useGetPostFromUrl';
import { withApollo } from '../../../utils/withApollo';

export const EditPost = ({ }) => {
    const router = useRouter();
    const { data, loading } = useGetPostFromUrl();
    const [updatePost] = useUpdatePostMutation()

    if (loading) {
        return <Layout><div>loading...</div></Layout>
    }

    if (!data?.post) {
        return <Layout><Box>Could not find post</Box></Layout>
    }

    return (
        <Layout variant='small'>
            <Heading as="h2" size="lg" mb={4}>Edit post</Heading>
            <Formik
                initialValues={{ title: data.post.title, text: data.post.text }}
                onSubmit={async (values, { setErrors }) => {
                    await updatePost({ variables: { id: data!.post!.id, ...values } })
                    router.back()
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='title' label='Title' placeholder='Title' />
                        <Box mt={4}>
                            <InputField name='text' label='Body' placeholder='text...' textarea />
                        </Box>

                        <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Update post</Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
}

export default withApollo({ ssr: false })(EditPost);
