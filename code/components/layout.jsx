import { Button } from 'antd';
import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <Link href="/test/a?id=1" as="/test/a/1">
                    <Button>A</Button>
                </Link>
                <Link href="/test/b" as="/test/b">
                    <Button>B</Button>
                </Link>
            </header>
            {children}
        </>
    )
}
export default Layout