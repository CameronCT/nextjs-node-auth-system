import React, { ReactNode, useEffect, useRef, useState } from 'react';
import LoadContent from '../Page/LoadContent';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';
import Navbar from '../Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  isLoaded?: boolean;
  noAnimate?: boolean;
  noNavbar?: boolean;
};

const AppContainer = (props: IMainProps) => {
  useGoogleAnalytics();

  const timer = useRef<NodeJS.Timeout | null>(null);
  const [loaded, setLoaded] = useState<boolean>(props.noAnimate === true);

  const onTimerCalled = () => setLoaded(true);

  useEffect(() => {
    if (!props.noAnimate && (typeof props.isLoaded === 'undefined' || (typeof props.isLoaded !== 'undefined' && props.isLoaded))) timer.current = setTimeout(onTimerCalled, 1);
    else console.error('Failed to queue animation');
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [props.isLoaded, props.noAnimate]);

  return props ? (
    <>
      {props.meta}
      <main>
        {!props.noNavbar ? <Navbar /> : ''}
        <LoadContent isLoaded={loaded}>
          {props.children}
        </LoadContent>
      </main>
    </>
  ) : (
    <></>
  );
};

export default AppContainer;
