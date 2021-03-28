import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading')
    const [, vote] = useVoteMutation()
    return (
        <Flex direction='column' alignItems='center' justifyContent='center' mr={4}>
            <IconButton
                aria-label="Updoot post"
                icon={<ChevronUpIcon />}
                onClick={async () => {
                    if (post.voteStatus === 1) return;
                    setLoadingState('updoot-loading')
                    await vote({ postId: post.id, value: 1 })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'updoot-loading'}
                colorScheme={post.voteStatus === 1 ? 'green' : 'light-grey'}
            />
            {post.points}
            <IconButton
                aria-label="Downdoot post"
                icon={<ChevronDownIcon />}
                onClick={async () => {
                    if (post.voteStatus === -1) return;
                    setLoadingState('downdoot-loading')
                    await vote({ postId: post.id, value: -1 })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'downdoot-loading'}
                colorScheme={post.voteStatus === -1 ? 'red' : undefined}
            />
        </Flex>
    );
}