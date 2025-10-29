import React from 'react';

import useCopyToClipboard from '../hooks/useCopyToClipboard';
import {
  Box,
  Button,
  Text,
} from '../index';

export default {
  title: 'Recipes/Copy to Clipboard',
};

export const Default = () => {
  const textToCopy = 'eyJraWQiOiI4YTg5MmY3ZS1iNTk1LTRkYWQtODBlNC0yMzA4ODkyZTczZDQiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2FwaS5waW5nb25lLmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgucGluZ29uZS5jb20iLCJjb25zb2xlVXJsIjoiaHR0cHM6Ly9jb25zb2xlLnBpbmdvbmUuY29tIiwiZW52aXJvbm1lbnROYW1lIjoiTW9udGFuYSIsImVudmlyb25tZW50SWQiOiJhYzc2NWQ0Ny1kMDM2LTQ1MGUtODFjMS1mYjQ1NDMxMjM1NjYiLCJvcmdhbml6YXRpb25OYW1lIjoiaW50ZXJuYWxfZXJpa2FhbGRlYm9yZ2hfMjUyMDc1MDMxIiwib3JnYW5pemF0aW9uSWQiOiJkMDYzMmYwZi03YjQ2LTQ5ZjUtYjgyYS1kZWU5MWQ3MDY3ODYiLCJnYXRld2F5TmFtZSI6ImRzZHMiLCJnYXRld2F5SWQiOiJiMDVmNGU5Yy1jMzRiLTRlZTMtYTYyNS01ZGFiNjlkYTE1YTEiLCJnYXRld2F5VHlwZSI6IlBJTkdfRkVERVJBVEUiLCJ0YXJnZXRDbHVzdGVyRW52aXJvbm1lbnQiOiJQUk9EIiwidGFyZ2V0R2VvZ3JhcGh5IjoiTkEiLCJyZWdpb24iOiJOb3J0aCBBbWVyaWNhIiwianRpIjoiMTUwYTQ0OTktZjIyYi00YWVhLWIzY2UtYWM2YWY1NjVjNjk5IiwiaXNzIjoid3NzOi8vZ2F0ZXdheXMucGluZ29uZS5jb20iLCJpYXQiOjE2MjYyODEyMTZ9.JJ9wwqTxQWUwz2vmU0yE54xuYff51xbirzZuEUxd8GDzV45bnpbmx460CY8g9ccdmOjvfVF4RPPsawpKuMZH271tDlLZl67iknxDVWBZSih9K6v0RAmsmNriR4OyOFOkGrULCIz3ISyPWeItp1AVuue_8guWR63KzYg32aPC4SgmOrc2myq9N6XNU2H1KybETbG_s5-VU_cUqaXn7GUzhL2_W6CSVrrlE1cYfjC7pxMKFm4vvIw_KcNYVGO1K6oYgzRZ4A8toQHIdlGB8L-wkCt442LdC93OjoQdkLuGzmXnO8BUohWea-Dn35gGHoH-H1BRQTya_H9AKyWMxCw-vg';

  const copyToClipboard = useCopyToClipboard(textToCopy);

  return (
    <Box bg="accent.99" py="md" px="xl">
      <Text sx={{ wordBreak: 'break-all' }}>{textToCopy}</Text>
      <Button
        variant="inline"
        my="lg"
        onPress={copyToClipboard}
        aria-label="Copy Text To Clipboard"
      >
        Copy To Clipboard
      </Button>
    </Box>
  );
};
