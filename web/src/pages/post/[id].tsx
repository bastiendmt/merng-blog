import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { EditDeletePostButton } from '../../components/EditDeletePostButton';

const Post = ({ }) => {
    const [{ data, error, fetching }] = useGetPostFromUrl();

    if (fetching) {
        return <Layout><div>loading...</div></Layout>
    }

    if (error) {
        return <Layout>error.message</Layout>
    }

    if (!data?.post) {
        return <Layout><Box>Could not find post</Box></Layout>
    }

    return (
        <Layout>
            <Heading mb={4}>{data.post.title}</Heading>
            <Box mb={4}>{data.post.text}</Box>
            <EditDeletePostButton id={data.post.id} creatorId={data.post.creator.id} />
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)