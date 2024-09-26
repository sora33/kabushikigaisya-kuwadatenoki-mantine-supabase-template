import { Stack } from '@mantine/core'
import { Footer, Header } from '~/components'
import { Container } from '~/components/modules'

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <Container mt="xl" pb="6rem">
        <Stack gap="sm" flex="1" pt="md">
          {children}
        </Stack>
      </Container>
      <Footer />
    </>
  )
}
