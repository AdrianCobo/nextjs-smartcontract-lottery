import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis() //esto es un Hoock un objeto que nos permite usar las funcionalidades de moralis.
    //gracias a esto va a detectar cuando se cambia de cuenta o se desconecta

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled]) //lo que pongas en el array es lo que el hoock use effect va a estar atento de los cambios de estado
    //para que la pagina web cambie tambien, si no pones el array se va a estar ejecutando cada vez que algo cambie, y si lo pones vacio,
    //indicas que solo se ejecute 1 ven al cargar la pagina, y si pones los objetos de los que va a depender dentro, se va a ejecutar una vez y
    //cada vez que el estado de lo que hay dentro cambie

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                //si se ha desconectado la cuenta
                window.localStorage.removeItem("connected")
                deactivateWeb3() //pone isWeb3Enable to false
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        //las llaves de fuera indican que vamos a usar JS
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
