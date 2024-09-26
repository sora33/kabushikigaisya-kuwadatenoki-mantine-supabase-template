import { Container as MantineContainer, ContainerProps } from '@mantine/core'

type Props = ContainerProps & {
  children: any
}

export const Container = (props: Props) => {
  return (
    <MantineContainer size="md" {...props}>
      {props.children}
    </MantineContainer>
  )
}
