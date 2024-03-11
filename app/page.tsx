import Image from "next/image";
import styles from "./page.module.css";
import Heatmap from "./heatmap";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Heatmap />
      </div>
    </main>
  );
}
