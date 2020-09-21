import React from 'react';

import { Box, Icon, Stack, Text } from '@chakra-ui/core';

function Footer() {
  return (
    <Box backgroundColor="white" color="gray.400" gridArea="footer" zIndex={2}>
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
