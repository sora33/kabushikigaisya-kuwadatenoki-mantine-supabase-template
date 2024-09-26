'use client'

import { Notification, createTheme, rem } from '@mantine/core'

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: 'primary',
  focusRing: 'auto',
  colors: {
    primary: [
      '#ebefff',
      '#d5dafc',
      '#a9b1f1',
      '#7b87e9',
      '#5362e1',
      '#3a4bdd',
      '#2d3fdc',
      '#1f32c4',
      '#182cb0',
      '#0b259c',
    ],
  },
  components: {
    Notification: Notification.extend({
      defaultProps: {
        color: 'blue',
      },
    }),
  },
  headings: {
    fontWeight: '600',
    sizes: {
      h1: { fontSize: rem(24) },
      h2: { fontSize: rem(16) },
    },
  },
})
