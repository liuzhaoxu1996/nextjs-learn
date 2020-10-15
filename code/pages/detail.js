import Link from 'next/link';
const Detail = () => {
    return (
        <Link href="/">
            <a>goToIndex</a>
        </Link>
    )
}
Detail.getInitialProps = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({})
        }, 1000)
    })
}

export default Detail