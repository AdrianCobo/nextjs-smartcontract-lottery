//imports work with our front end
//require does not
//nodes != ecmascript / javascript
//backend Js is a little different from front end JS

import Head from "next/head"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader"//boton de conectar hecho a mano
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Smart contract loterry" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*<ManualHeader></ManualHeader>*/}
            <Header />
            <LotteryEntrance />
        </div>
    )
}
