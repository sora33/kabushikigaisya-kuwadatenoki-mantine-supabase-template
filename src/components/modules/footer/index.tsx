import { Flex, Text } from '@mantine/core'

// const data = [
//   { link: '/admin/privacy-policy', label: 'プライバシーポリシー' },
//   { link: '/admin/about', label: '会社概要' },
//   { link: '/admin/term-of-service', label: '利用規約' },
// ]

export const Footer = () => {
  return (
    <Flex component="footer" bg="gray" py="sm" justify="center">
      {/* {data.map((item) => (
        <Button key={item.label} component={Link} href={item.link} variant="transparent" c="white">
          {item.label}
        </Button>
      ))} */}
      <Text size="sm" c="white">
        Copyright © 2024 kuwadatenoki., All rights reserved.
      </Text>
    </Flex>
  )
}
