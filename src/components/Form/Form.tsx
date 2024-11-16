import { AddressBalance, Ethereum, Network, TatumSDK } from "@tatumio/tatum";
import { useState } from "react";
import { JSX } from "preact";
import styles from "./Form.module.css";
import { AssetType, getTatumApiKey, isValidEthereumAddress } from "../../utils";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [balanceData, setBalanceData] = useState<AddressBalance>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");

  const apiKey = getTatumApiKey();

  const handleFormSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBalanceData(null);

    // check address before sending request
    // API seems to return non-user friendly error message sometimes
    if (!isValidEthereumAddress(inputValue)) {
      setError("Invalid Ethereum address");
      return;
    }

    setIsBusy(true);
    setError("");

    // todo use call to backend instead, to avoid exposing API key
    // i hope this is outside of the task scope
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: apiKey },
    });

    try {
      const balance = await tatum.address.getBalance({
        addresses: [inputValue],
      });

      if (!balance || !balance.data || !balance.data[0]) {
        let err = balance.error && balance.error.message[0];

        if (typeof err === "object") {
          err = JSON.stringify(err);
        }

        setError(err ?? "Unknown error");
      } else {
        const balanceData = balance.data.filter(
          (asset) => asset.asset === AssetType.ETH,
        )[0];

        setBalanceData(balanceData);
      }

    } catch (e) {
      setError(JSON.stringify(e));
    }

    tatum.destroy();
    setIsBusy(false);
  };

  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <form class={styles.formWrapper}
          onSubmit={handleFormSubmit}>
      <p>
        <input
          type="text"
          value={inputValue}
          onInput={handleInputChange}
          placeholder="Enter ETH wallet address to get balance"
          class={styles.addressInput}
        />
      </p>
      <button type="submit"
              disabled={isBusy || !inputValue}
              class={isBusy ? styles.busy : ""}>
        {isBusy && <div className={styles.spinner}></div>}
        Submit
      </button>
      {balanceData &&
        <p className={styles.addressBalance}>
          {balanceData.balance} {balanceData.asset}
        </p>
      }
      {error && <div class={styles.error}>{error}</div>}
    </form>
  );
}

export default Form;
