import tatumLogo from '../../assets/tatum.jpeg';
import Form from '../../components/Form/Form';
import styles from './Home.module.css';

export function Home() {
  return (
    <div class={styles.home}>
      <a href="https://tatum.io/" target="_blank">
        <img src={tatumLogo}
             alt="Tatum logo"
             height="160" width="160" />
      </a>
      <h1>ETH balance checker</h1>
      <Form />
    </div>
  );
}