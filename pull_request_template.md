This PR moves the site entry point (index.html) into the docs/ folder to prepare for GitHub Pages and organizes the site files. Changes include:
- Move docs/index.html (previously .github/workflows/index.html) into docs/
- Normalize canvas blob positions on resize (store normalized coordinates and recompute on resize) to avoid layout artifacts
- Sync URL hash on navigation via history.replaceState so navigation buttons update the URL and deep links work
- Encode file names when building download/iframe URLs (encodeURIComponent) to handle spaces/special chars
- Add basic accessibility improvements: aria-hidden on canvas, aria-labelledby on sections, iframe title, explicit button type attributes
- Fix possible negative coordinates via positiveMod and other small bugfixes
Testing notes: Manually verified navigation, file download/preview behavior, and canvas responsiveness on resize. Please review the changes and let me know if you want further adjustments.