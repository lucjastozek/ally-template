import { useState } from "react";
import { createPortal } from "react-dom";
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
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hexCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <button
        className={`interactive-button ${styles.colorSwatch} ${copied ? "copied" : ""}`}
        onClick={copyToClipboard}
        aria-label="Copy color to clipboard"
        type="button"
      >
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: hexCode }}
          aria-hidden="true"
        ></div>
        <div className={styles.colorInfo}>
          <h4>{name}</h4>
          <code>{hexCode}</code>
          <span className={styles.contrastRatio}>{contrastRatio}</span>
        </div>
      </button>

      {copied &&
        createPortal(
          <div className="notification notification-success" aria-live="polite" role="status">
            Copied color {hexCode} to clipboard
          </div>,
          document.body
        )}
    </>
  );
}
