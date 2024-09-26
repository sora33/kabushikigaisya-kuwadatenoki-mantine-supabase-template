import { Flex, Paper, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '~/components/modules'
import { CLIENT_HOME_PAGE } from '~/utils'

export const Header = () => {
  return (
    <Paper shadow="xs">
      <Container pt="xs">
        <Flex justify="space-between" align="center">
          <Link href={CLIENT_HOME_PAGE} className="primary-link">
            <Text fz="xs" fw="bold">
              〇〇アプリ
            </Text>
            <Image src="/logo.png" alt="logo" width={90} height={28} />
          </Link>
        </Flex>
      </Container>
    </Paper>
  )
}
