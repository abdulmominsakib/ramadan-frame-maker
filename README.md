# Ramadan Frame Maker 🌙

A web application that allows users to create custom Ramadan-themed profile pictures by overlaying their photos with beautiful frames.

![Ramadan Frame Maker Preview](/public/frame_1.png)

## ✨ Features

- **Upload & Customization**: Upload your photo and easily drag, zoom, and position it within the frame.
- **Multiple Frame Styles**: Choose from a variety of distinct Ramadan-themed frame designs.
- **Real-time Preview**: See exactly how your profile picture will look before downloading.
- **High-Quality Export**: Download the final image as a high-resolution PNG file.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Privacy Focused**: All image processing happens directly in your browser using the HTML5 Canvas API; no images are uploaded to a server.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Hugeicons](https://hugeicons.com/)
- **Logic**: React Hooks & HTML5 Canvas API
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ramadan-frame-maker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ramadan-frame-maker
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖼️ Adding New Frames

To add new frames:

1. Add your frame images (PNG format with transparency) to the `public/` folder.
2. Update the `FRAMES` array in `app/components/FrameMaker.tsx` with the new file paths.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Created with ❤️ for Ramadan by [Momin](https://momin.pro).
