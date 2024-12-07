export default function Credits(){
    const credits = [
        {
            label: 'Lorem ipsum',
            author: 'Dolor sit amet',
            href: 'https://example.com/'
        }
    ]

    return(
        <main>
            <h1 className={'text-6xl'}>Credits</h1>
            <ul className={'ms-8 mt-4 list-disc'}>
                {
                    credits.map((credit, index) => {
                        return <li key={index}><a href={credit.href}>{credit.label} - {credit.author}</a></li>
                    })
                }
            </ul>
        </main>
    )
}