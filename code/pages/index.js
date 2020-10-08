import {Button} from 'antd';
import Link from 'next/link';
const index = () => (
    <Link href='/test/a?id=1' title="AAA">
        <Button>Page: index</Button>
    </Link>
)

export default index