import React from 'react';

import { Box, Divider, Stack, Text } from '@chakra-ui/core';

function Footer() {
  return (
    <Box backgroundColor="white" gridArea="footer" zIndex={2}>
      <Divider m="0" borderColor="blue.300" />
      <Stack
        color="blue.300"
        spacing={[8, 12]}
        mx="auto"
        maxW="720px"
        align="center"
      >
        <Text fontSize="xl" fontWeight="medium">
          {'Website by Chuey Israel'}
        </Text>
      </Stack>
    </Box>
  );
}

export default Footer;
