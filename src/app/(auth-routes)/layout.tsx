import { Suspense } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto w-5/6">
        <Suspense>{children}</Suspense>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
