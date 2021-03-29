import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })

  let body = null;

  //data is loading
  if (fetching) {

    //user not logged in
  } else if (!data?.me) {
    body = (<>
      <NextLink href='/login'>
        <Link color='white' mr={2} >login</Link>
      </NextLink>
      <NextLink href='/register'>
        <Link color='white'>Register</Link>
      </NextLink>
    </>)
    // user is logged in
  } else {
    body = (
      <Flex align='center'>
        <NextLink href='create-post'>
          <Button as={Link} backgroundColor='whiteAlpha.600' mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          variant='link'
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          logout
          </Button>
      </Flex>
    )
  }

  return (
    <Flex position='sticky' top={0} zIndex={1} bg='tan' p={4} >
      <Flex flex={1} maxW={800} m='auto' align='center'>
        <NextLink href='/'>
          <Link>
            <Heading textColor='white'>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  );
}