import React from 'react';
import { TLayoutProps } from './layout.types';

const styles = {
  main: 'Layout',
  content: 'Layout__content',
  footer: 'Layout__footer',
};

function Layout({ children, footer }: TLayoutProps) {
  return (
    <div className={styles.main}>
      <main className={styles.content}>
        {children}
      </main>
      {
      footer
        ? (<footer className={styles.footer}>{footer}</footer>)
        : null
      }
    </div>
  );
}

export default Layout;
