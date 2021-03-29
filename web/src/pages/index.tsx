import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack } from "@chakra-ui/layout";
import NextLink from 'next/link'
import React, { useState } from "react";
import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Icon, ChevronUpIcon, ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { UpdootSection } from '../components/UpdootSection';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  })

  const [{ data, fetching }] = usePostsQuery({
    variables
  })

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>you got no posts for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching
        ? <div>loading...</div>
        : (
          <Stack spacing={8}>
            {data!.posts.posts.map(p =>
              !p ? null : (
                <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={p} />
                  <Box flex={1}>
                    <NextLink href='post/[id]' as={`/post/${p.id}`}>
                      <Link><Heading fontSize="xl">{p.title}</Heading></Link>
                    </NextLink>

                    <Text>posted by {p.creator.username}</Text>

                    <Flex align='center'>
                      <Text mt={4} flex={1}>{p.textSnippet}</Text>
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label='Delete post'
                        ml='auto'
                        colorScheme='red'
                        onClick={() => {
                          deletePost({ id: p.id });
                        }}
                      />
                    </Flex>
                  </Box>
                </Flex>
              ))}
          </Stack>
        )
      }
      { data && data.posts.hasMore ?
        <Flex >
          <Button onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
            })
          }} m='auto' my={8} backgroundColor='lightgray' isLoading={fetching}>load more</Button>
        </Flex>
        : null}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
