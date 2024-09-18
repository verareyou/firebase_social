import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/Store'
import { coinbaseWallet, metamaskWallet, ThirdwebProvider, walletConnect } from '@thirdweb-dev/react'
import { EtherProvider } from './Context/EtherProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThirdwebProvider
                supportedWallets={[
                    metamaskWallet({
                        recommended: true,
                    }),
                    coinbaseWallet(),
                    walletConnect(),
                ]}
                activeChain="mumbai"
                autoConnect
                secretKey={import.meta.env.VITE_WEB3_SECRET_KEY as string}
                clientId={import.meta.env.VITE_WEB3_CLIENT_ID as string}
                autoConnectTimeout={5000}
            >
                <EtherProvider>
                    <AppRouter />
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                        gutter={8}
                        containerStyle={{}}
                        containerClassName=""
                        toastOptions={{
                            duration: 5000,
                            style: {
                                background: '#000000',
                                color: '#fff',
                            },
                            success: {
                                style: {
                                    background: '#151515',
                                    color: '#fff',
                                },
                            },
                        }}
                    />
                </EtherProvider>
            </ThirdwebProvider>
        </PersistGate>
    </Provider>
)
