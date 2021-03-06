import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation, VoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment
}

const updateAfterVote = (value: number, postId: number, cache: ApolloCache<VoteMutation>) => {
    const data = cache.readFragment<{
        id: number;
        points: number;
        voteStatus: number | null;
    }>({
        id: 'Post:' + postId,
        fragment: gql`
                fragment _ on Post {
                id
                points
                voteStatus
                }
            `,
    });

    if (data) {
        if (data.voteStatus === value) return; // already up/downvoted
        const newPoints =
            data.points + (!data.voteStatus ? 1 : 2) * value;
        cache.writeFragment({
            id: 'Post:' + postId,
            fragment: gql`
                fragment __ on Post {
                  points
                  voteStatus
                }
              `,
            data: { points: newPoints, voteStatus: value }
        });
    }
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading')
    const [vote] = useVoteMutation()
    return (
        <Flex direction='column' alignItems='center' justifyContent='center' mr={4}>
            <IconButton
                aria-label="Updoot post"
                icon={<ChevronUpIcon />}
                onClick={async () => {
                    if (post.voteStatus === 1) return;
                    setLoadingState('updoot-loading')
                    await vote({
                        variables: {
                            postId: post.id, value: 1
                        },
                        update: (cache) => updateAfterVote(1, post.id, cache)

                    })
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
                    await vote({
                        variables: {
                            postId: post.id,
                            value: -1
                        },
                        update: (cache) => updateAfterVote(-1, post.id, cache)
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'downdoot-loading'}
                colorScheme={post.voteStatus === -1 ? 'red' : undefined}
            />
        </Flex>
    );
}