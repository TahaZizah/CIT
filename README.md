# HOODIE_DROP

A minimal, high-aesthetic website for selling a single hoodie product. Built with React, Vite, Tailwind CSS, and React Three Fiber.

## Features

- **3D Product Showcase**: Interactive 3D model with smooth controls and dynamic lighting.
- **Futuristic Design**: Blue/Cyan palette with deep dark backgrounds and subtle glows.
- **Professional Checkout**: "Amazon-style" order page with clear summary and shipping details.
- **Order System**: Simple form integration with Google Forms (no backend required).
- **Archive Gallery**: Showcase previous sold-out drops.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Add 3D Model**:
    - Place your `hoodie.glb` file in the `public/` folder.
    - If you don't have one, a placeholder geometry will be shown.

3.  **Configure Google Form**:
    - Create a Google Form with fields for Name, Email, Phone, Address, and Size.
    - Get the "pre-filled link" to find the entry IDs (e.g., `entry.123456`).
    - Update `src/pages/OrderPage.jsx` with your Form Action URL and Entry IDs.

4.  **Run Locally**:
    ```bash
    npm run dev
    ```

5.  **Build for Production**:
    ```bash
    npm run build
    ```

## Customization

- **Colors**: Edit `tailwind.config.js` or `src/index.css`.
- **Past Drops**: Update the `PAST_DROPS` array in `src/components/SoldOutGallery.jsx`.
- **Text**: Update `src/pages/LandingPage.jsx`.

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
