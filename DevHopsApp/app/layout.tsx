import React from 'react'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = async ({ children }: LayoutProps): Promise<React.ReactElement> => {

    return (
        <html lang="en">
            <body>
                <div className='w-vw h-vh'>
                    {children}
                </div>
            </body>
        </html>

    )
}

export default Layout