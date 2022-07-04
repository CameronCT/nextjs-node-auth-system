import { ReactNode, CSSProperties, ReactElement } from 'react';
import NextLink from 'next/link';

interface IProps {
  to: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}

const Link = (props: IProps) => {
  return (
    <NextLink href={props.to} passHref>
      <a className={props.className} style={props.style} onClick={props.onClick}>
        {props.children as ReactNode}
      </a>
    </NextLink>
  );
};

export default Link;
