
import { ChildrenProps } from '../../interfaces';
import {
  Window,
  Nav,
  Main
} from './_components';

const Layout = ({ children }: ChildrenProps) => {
  return (
    <Window>
      <Nav />
      <Main>
        {children}
      </Main>
    </Window>
  )
}

export default Layout;
