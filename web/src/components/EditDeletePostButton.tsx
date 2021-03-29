import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link'

interface EditDeletePostButtonProps {
    id: number,
    creatorId: number;
}

export const EditDeletePostButton: React.FC<EditDeletePostButtonProps> = ({
    id,
    creatorId,
}) => {
    const [, deletePost] = useDeletePostMutation();
    const [{ data: meData }] = useMeQuery()

    if (meData?.me?.id !== creatorId) return null;

    return (
        <Box>
            <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
                <IconButton
                    icon={<EditIcon />}
                    aria-label='Edit post'
                    ml='auto'
                />
            </NextLink>
            <IconButton
                icon={<DeleteIcon />}
                aria-label='Delete post'
                ml='auto'
                onClick={() => {
                    deletePost({ id });
                }}
            />
        </Box>
    );
}