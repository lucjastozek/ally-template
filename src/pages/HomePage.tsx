import { useState } from "react";
import { ColorSwatch } from "@/components/ColorSwatch";
import colorStyles from "@/components/ColorSwatch.module.css";
import styles from "@/pages/HomePage.module.css";

const darkModeColors = [
  { name: "Red", hexCode: "#ee7563", contrastRatio: "7.11:1 AAA" },
  { name: "Orange", hexCode: "#ea8644", contrastRatio: "7.75:1 AAA" },
  { name: "Yellow", hexCode: "#ebcd47", contrastRatio: "12.96:1 AAA" },
  { name: "Green", hexCode: "#56c876", contrastRatio: "9.62:1 AAA" },
  { name: "Dark Green", hexCode: "#4fb561", contrastRatio: "7.87:1 AAA" },
  { name: "Blue", hexCode: "#6dc5e2", contrastRatio: "10.41:1 AAA" },
  { name: "Dark Blue", hexCode: "#3ac2de", contrastRatio: "9.65:1 AAA" },
  { name: "Purple", hexCode: "#a990b6", contrastRatio: "7.13:1 AAA" },
  { name: "Dark Purple", hexCode: "#b186d5", contrastRatio: "7.02:1 AAA" },
  { name: "Cherry", hexCode: "#de7c8e", contrastRatio: "7.16:1 AAA" },
  { name: "Pink", hexCode: "#e47792", contrastRatio: "7.13:1 AAA" },
  { name: "Peach", hexCode: "#e97967", contrastRatio: "7.17:1 AAA" },
];

const lightModeColors = [
  { name: "Red", hexCode: "#992f1e", contrastRatio: "7.26:1 AAA" },
  { name: "Orange", hexCode: "#913c03", contrastRatio: "7.08:1 AAA" },
  { name: "Yellow", hexCode: "#6f5006", contrastRatio: "7.14:1 AAA" },
  { name: "Green", hexCode: "#205b33", contrastRatio: "7.74:1 AAA" },
  { name: "Dark Green", hexCode: "#14591d", contrastRatio: "8.15:1 AAA" },
  { name: "Blue", hexCode: "#0f5a76", contrastRatio: "7.35:1 AAA" },
  { name: "Dark Blue", hexCode: "#1f4e61", contrastRatio: "8.7:1 AAA" },
  { name: "Purple", hexCode: "#644e6e", contrastRatio: "7.06:1 AAA" },
  { name: "Dark Purple", hexCode: "#573280", contrastRatio: "9.29:1 AAA" },
  { name: "Cherry", hexCode: "#832232", contrastRatio: "9.01:1 AAA" },
  { name: "Pink", hexCode: "#891f40", contrastRatio: "8.65:1 AAA" },
  { name: "Peach", hexCode: "#893e2f", contrastRatio: "7.22:1 AAA" },
];

export default function HomePage(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return true;
  });

  const currentColors = isDarkMode ? darkModeColors : lightModeColors;
  const currentLabel = isDarkMode ? "Dark Mode Colors" : "Light Mode Colors";
  const currentDescription = isDarkMode
    ? "Bright colors optimized for dark backgrounds with high contrast ratios"
    : "Darker variants optimized for light backgrounds with AAA compliance";

  return (
    <div className="app">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main-content");
          if (main) {
            main.setAttribute("tabindex", "-1");
            main.focus();
          }
        }}
      >
        Skip to main content
      </a>
      <header className="page-header">
        <h1>Welcome!</h1>
        <p>
          This is a warm and accessible React template built with Vite. It's
          designed with love, using beautiful colors and thoughtful
          accessibility practices.
        </p>
        <p>
          <em>Built with accessibility in mind, designed with heart</em>
        </p>
      </header>
      <main id="main-content" className="page-content" tabIndex={-1}>
        <section aria-labelledby="intro-heading" className="section">
          <h2 id="intro-heading">What makes this template special?</h2>
          <p>
            This template brings together modern web development practices with
            a focus on creating inclusive and delightful experiences for
            everyone. Here's what's included:
          </p>
          <ul>
            <li>
              <strong>Semantic HTML</strong> that screen readers love
            </li>
            <li>
              <strong>Thoughtful color palette</strong> with perfect contrast
              ratios
            </li>
            <li>
              <strong>Smooth interactions</strong> that respect motion
              preferences
            </li>
            <li>
              <strong>Keyboard navigation</strong> that actually works well
            </li>
            <li>
              <strong>ARIA labels</strong> where they add value
            </li>
            <li>
              <strong>Testing tools</strong> to keep accessibility in check
            </li>
          </ul>
        </section>

        <section aria-labelledby="testing-heading" className="section">
          <h2 id="testing-heading">Testing Arsenal</h2>
          <p>
            This template comes with a complete accessibility testing toolkit to
            keep your app inclusive:
          </p>
          <ul>
            <li>
              <strong>axe-core:</strong> Catches accessibility issues
              automatically
            </li>
            <li>
              <strong>pa11y:</strong> Command-line accessibility testing that
              integrates with CI/CD
            </li>
            <li>
              <strong>Lighthouse:</strong> Performance and accessibility audits
              in one place
            </li>
            <li>
              <strong>ESLint JSX a11y:</strong> Linting that teaches
              accessibility best practices
            </li>
          </ul>
          <p>
            <em>
              Run <code>npm run a11y:all</code> to test everything at once!
            </em>
          </p>
        </section>

        <section aria-labelledby="color-heading" className="section">
          <h2 id="color-heading">Complete Color Palette</h2>
          <p>
            This template features a comprehensive color system with 24
            carefully chosen colors that maintain excellent contrast ratios and
            accessibility standards in both light and dark modes.
          </p>

          <div className={styles.colorControls}>
            <h3>{currentLabel}</h3>

            <div className={colorStyles.colorModeToggle}>
              <span className={colorStyles.toggleLabel}>View Mode:</span>
              <button
                className={`${colorStyles.toggleButton} ${isDarkMode ? colorStyles.darkActive : colorStyles.lightActive}`}
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode colors`}
                aria-pressed={isDarkMode}
              >
                <span className={colorStyles.toggleOption}>Dark</span>
                <span className={colorStyles.toggleOption}>Light</span>
                <span className={colorStyles.toggleSlider}></span>
              </button>
            </div>
          </div>

          <p className={styles.colorDescription}>{currentDescription}</p>

          <div
            className={`${colorStyles.colorPaletteGrid} ${isDarkMode ? "" : colorStyles.lightMode}`}
          >
            {currentColors.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                hexCode={color.hexCode}
                contrastRatio={color.contrastRatio}
              />
            ))}
          </div>

          <div className={styles.accessibilityInfo}>
            <p>
              <strong>Accessibility Standards:</strong>
            </p>
            <ul>
              <li>
                <strong>AA:</strong> Minimum contrast ratio of 4.5:1 for normal
                text
              </li>
              <li>
                <strong>AAA:</strong> Enhanced contrast ratio of 7:1 for optimal
                readability
              </li>
              <li>
                Use the toggle above to see how colors perform in different
                contexts
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="journey-heading" className="section">
          <h2 id="journey-heading">Your Accessibility Journey</h2>
          <p>
            This template is just the beginning! As you build your amazing
            projects, remember:
          </p>
          <ul>
            <li>Test early, test often with real assistive technologies</li>
            <li>Include users with disabilities in your design process</li>
            <li>Small details make huge differences in user experience</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
