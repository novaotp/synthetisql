
import poppins from '@assets/fonts';
import '@assets/styles/globals.scss';
import { ChildrenProps } from './interfaces';

const RootLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

export default RootLayout;
