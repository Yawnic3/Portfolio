# Qingyuan Tian — Portfolio

Static portfolio featuring a KB Signaling-sponsored railway capstone, Victoria Marine internship tools, GatorPlan, and NoteShare, plus lifting and running milestones.

Live portfolio: https://yawnic3-world.skippingoasis1.chatgpt.site/

## Run locally

Use Node.js 18 or newer:

```sh
npm run dev
```

Open the local address printed by the server. No dependencies or build step are required.

## Structure

- `dist/index.html`, `dist/style.css`: portfolio and responsive styling
- `dist/portfolio.js`: illustrated 3D project preview
- `dist/workshop.js`: procedural agent-workflow scene visualization
- `dist/workbook.*`: interactive sample BOM spreadsheet panel
- `dist/cad.*`: CAD-style drafting and nesting visualization
- `dist/assets`: local logos, font, and supplied screenshots

The scene and CAD workshops are browser visualizations of the engineering workflows. The BOM panel uses clearly labeled illustrative data. Live app links open GatorPlan and NoteShare; Instagram embeds show the original training posts.

## Hosting

Serve the `dist` directory as a static website. The `.openai/hosting.json` manifest retains the existing Sites deployment configuration.

Vercel uses `vercel.json` to publish `dist` without an install or build step. Import the repository with its root directory left at the repository root; pushes to `main` trigger deployment.

Technology logos identify their respective products. Devicon and Pixelify font license files are included beside the assets. Company logos and screenshots are used to identify the projects and internship.

## Traffic analytics

Vercel Web Analytics loads only on Vercel and the production domain. View aggregate visits, page views, referrers, countries and devices in the project Analytics dashboard: https://vercel.com/yawnic3s-projects/portfolio/analytics . The embedded tool previews do not inject analytics separately.
