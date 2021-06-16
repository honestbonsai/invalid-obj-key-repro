/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Erc20, Erc20__factory } from "../contracts/types";

const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

export default function Home() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Erc20 | null>(null);
  const [name, setName] = useState<string | null>(null);

  const onLoad = async () => {
    if (!window.ethereum?.request) {
      throw new Error("Install metamask");
    }

    // @ts-ignore
    window.ethereum.on("chainIdChanged", () => window.location.reload());
    // @ts-ignore
    window.ethereum.on("chainChanged", () => window.location.reload());
    // @ts-ignore
    window.ethereum.on("accountsChanged", () => window.location.reload());

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) {
      // Init
      const provider_ = new ethers.providers.Web3Provider(window.ethereum);
      const signer_ = await provider_.getSigner();

      // Set state
      setProvider(provider_);
      setSigner(signer_);
      setAccount(ethers.utils.getAddress(accounts[0]));
    }
  };

  useEffect(() => {
    onLoad().catch(console.error);
  }, []);

  useEffect(() => {
    const initContracts = async () => {
      if (signer) {
        const contract_ = Erc20__factory.connect(USDC_ADDRESS, signer)
        const name_ = await contract_.name();
        
        setContract(contract_);
        setName(name_);
      }
    };
    initContracts();
  }, [signer]);

  return <div>
    <div>Account: {account || "--"}</div>
    <div>Contract name: {name}</div>
  </div>;
}
