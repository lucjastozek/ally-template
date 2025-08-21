import styles from "@/components/ColorSwatch.module.css";

interface ColorSwatchProps {
  name: string;
  hexCode: string;
  contrastRatio: string;
}

export function ColorSwatch({
  name,
  hexCode,
  contrastRatio,
}: ColorSwatchProps) {
  return (
    <div className={styles.colorSwatch}>
      <div
        className={styles.colorPreview}
        style={{ backgroundColor: hexCode }}
      ></div>
      <div className={styles.colorInfo}>
        <h4>{name}</h4>
        <code>{hexCode}</code>
        <span className={styles.contrastRatio}>{contrastRatio}</span>
      </div>
    </div>
  );
}
