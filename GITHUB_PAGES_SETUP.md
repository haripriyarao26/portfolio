# GitHub Pages Deployment Setup

## Steps to Enable GitHub Pages:

1. **Push the code to GitHub** (already done)
   ```bash
   git push -u origin main
   ```

2. **Enable GitHub Pages in Repository Settings:**
   - Go to: https://github.com/haripriyarao26/portfolio/settings/pages
   - Under "Source", select: **"GitHub Actions"**
   - Save the settings

3. **The GitHub Action will automatically deploy:**
   - Every push to `main` branch will trigger a deployment
   - You can also manually trigger it from the "Actions" tab

4. **Your portfolio will be live at:**
   - **https://haripriyarao26.github.io/portfolio/**

## Note:
The workflow is already configured. Just enable GitHub Pages in your repository settings and the deployment will happen automatically!

