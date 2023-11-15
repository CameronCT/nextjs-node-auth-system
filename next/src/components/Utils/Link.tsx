import { ReactNode, CSSProperties } from 'react'
import NextLink from 'next/link'

interface IProps {
    to: string
    className?: string
    onClick?: () => void
    children?: ReactNode
    style?: CSSProperties
}

const Link = (props: IProps) => {
    return (
        <NextLink style={props.style} className={props.className} href={props.to} onClick={props.onClick} passHref>
            {props.children as ReactNode}
        </NextLink>
    )
}

export default Link
