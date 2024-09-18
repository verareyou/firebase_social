import { createContext, useContext, useEffect } from "react";
import {
    metamaskWallet,
    useAddress,
    useConnect,
    useDisconnect,
    useContract,
    useContractWrite,
    useSwitchAccount,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

export const EtherContext = createContext<any>(false);

type Response = {
    data: any,
    address: string
}

export const EtherProvider = ({ children }: any) => {

    const { contract } = useContract(import.meta.env.VITE_SC_ADDRESS as string);
    const { switchAccount } = useSwitchAccount();

    const { mutateAsync: registerUser } = useContractWrite(contract, "registerUser")
    const { mutateAsync: subscribe } = useContractWrite(contract, "subscribe")
    const { mutateAsync: unsubscribe } = useContractWrite(contract, "unsubscribe")

    const userAddress = useAddress();

    const metamaskConfig = metamaskWallet({ connectionMethod: 'walletConnect' });
    const connect = useConnect();
    const disconnect = useDisconnect();

    const handleSwitchAccount = async (address: string) => {
        await switchAccount(address);
    };

    const ConnectWallet = async () => {
        await connect(metamaskConfig)
    }

    const DisconnectWallet = async () => {
        await disconnect()
    }

    const userRegister = async () => {

        // connect to wallet

        try {

            const res = await registerUser({ args: [] })
            console.log(res, 'successfuly registered user')

            return {
                data: res,
                address: userAddress
            }
        } catch (err) {
            console.log(err, 'error registering user')
            return false
        }
    }

    const userSubscribe = async (address: string) => {


        console.log('subscribing to', address)
        const to = address
        const amount = "0.01"
        try {
            const res = await contract?.call("subscribe", [to],{
                value: ethers.utils.parseEther(amount)
              })
            console.log(res, 'successfuly subscribed')
            return {
                data: res,
                address: userAddress
            }
        } catch (err) {
            console.log(err, 'error subscribing')
            return false
        }
    }

    const userUnsubscribe = async (address: string) => {
        const user = address
        try {
            const res = await contract?.call("unsubscribe", [user])
            console.log(res, 'successfuly unsubscribed')
            return {
                data: res,
                address: userAddress
            }
        } catch (err) {
            console.log(err, 'error unsubscribing')
            return false
        }
    }

    return (
        <EtherContext.Provider value={{
            userRegister,
            userSubscribe,
            userUnsubscribe,
            userAddress,
            ConnectWallet,
            DisconnectWallet,
            handleSwitchAccount
        }}>
            {children}
        </EtherContext.Provider>
    );
}

export const useEther = () => useContext(EtherContext) as EtherContextType;

export type EtherContextType = {
    userRegister: () => Promise<Response>,
    userSubscribe: (address: string) => Promise<Response>,
    userUnsubscribe: (address: string) => Promise<Response>,
    userAddress: string,
    ConnectWallet: () => Promise<void>,
    DisconnectWallet: () => Promise<void>,
    handleSwitchAccount: (address: string) => Promise<void>
}
