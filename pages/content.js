import Head from 'next/head'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

export default function Content() {
    return (
        <>
            <Head>
                <title>Content</title>
            </Head>
            <h2 style={{ textAlign: 'center' }}>Яндекс Карта</h2>
            <div style={{ width: '75%', margin: '0 auto' }}>
                <YMaps>
                    <Map
                        defaultState={{ center: [53.182832, 45.000709], zoom: 15 }}
                        width="100%"
                        height="500px"
                    >
                        <Placemark geometry={[53.182832, 45.000709]} />
                    </Map>
                </YMaps>
            </div>
            <p style={{ textAlign: 'center' }}> <a href="">Открыть инф. о бригаде</a> </p>
        </>
    )
}