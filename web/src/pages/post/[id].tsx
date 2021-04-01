import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { EditDeletePostButton } from '../../components/EditDeletePostButton';
import { withApollo } from '../../utils/withApollo';

const Post = ({ }) => {
    const { data, error, loading } = useGetPostFromUrl();

    if (loading) {
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

export default withApollo({ ssr: true })(Post);
