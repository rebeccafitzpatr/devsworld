import styles from "../styles/infoPages.module.css";

export default function Privacy() {
    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Privacy Policy</h1>
            <p className={styles.pageText}>
                This is the privacy policy page. Here you can find information about how we handle your data.
            </p>
        </div>
    );
}
