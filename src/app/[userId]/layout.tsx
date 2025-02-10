import components from '@/components';

const { appComponents } = components;

const { layouts } = appComponents;

const { ActionBar, Sidebar, Header } = layouts;

export default async function RootAppLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}>) {
  const userId = (await params).userId;

  console.log('userId', userId);

  return (
    <div className='h-screen w-screen'>
      <div className='flex h-10 w-full flex-1'>
        <ActionBar />
      </div>
      <div className='flex h-[calc(100vh-40px)] w-full bg-background'>
        <Sidebar />
        <div className='relative h-full min-h-0 w-auto flex-1'>
          <div>
            <Header />
          </div>
          <div>{children}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
