# Google Stitch: The AI UI Design Guide (Warframes 2026 Edition)

## 🚀 What is Google Stitch?
**Google Stitch** is an experimental AI-powered interface design tool that converts natural language prompts and reference images into fully layered, editable UI designs. It exports directly to **Figma**, making it the perfect "speed-run" tool for our deadline.

---

## 1. The Workflow: From Text to Figma
**Goal:** Generate high-fidelity layouts for the "Forecasting Flood Risks" landing page in under 30 minutes.

### Step A: Access & Setup
1.  Go to **stitch.withgoogle.com**.
2.  Select **"Experimental Mode"** to use the **Gemini 2.5 Pro** model (better for complex, creative layouts).
3.  Set your output format to **Mobile & Desktop** (Responsive).

### Step B: Prompt Engineering for UI
The secret to Stitch is structured prompting. Use this formula:
**[Component/Page Type]** + **[Style/Vibe]** + **[Key Elements]** + **[Color Palette]**

---

## 2. Copy-Paste Prompts for Our Project

### 🌊 The Hero Section (Scrollytelling)
> "A futuristic, immersive landing page hero section for a flood forecasting app named ResQLink. Dark mode background #0A0A0B. Center stage is a 3D visualization of a city terrain map. Large, bold typography says 'FORECASTING FLOOD RISKS'. Accent colors are Safety Orange #FF5F1F and Cyan #00F5FF. Glassmorphism navigation bar at the top."

### 📊 The Bento Grid (Command Center)
> "A data-heavy dashboard section using a bento-box grid layout. Dark theme.
> *   **Box 1 (Large):** Interactive map of the Philippines with heat zones.
> *   **Box 2 (Medium):** A 'Flood Alert Level' card in bright orange with a warning icon.
> *   **Box 3 (Small):** 'AI Confidence Score' radial gauge showing 98%.
> *   **Box 4 (Wide):** A line chart showing 'Water Level Projection' over 24 hours.
> Use rounded corners (24px) and thin 1px white borders with 10% opacity."

### 📱 The "Citizen View" (Mobile Mockup)
> "A mobile app interface for emergency response. Large 'SOS' button at the bottom in red. Top section shows 'Status: Safe' in green. Middle section is a feed of text alerts. Minimalist, high contrast, accessible design."

---

## 3. Advanced Stitch Techniques

### 🖼️ Image-to-Design (The "Vibe" Steal)
1.  Take a screenshot of a website you like (e.g., from AWWWARDS).
2.  Upload it to Stitch.
3.  **Prompt:** "Recreate this layout structure but change the theme to a 'Cyberpunk Disaster Response' style with orange and black colors."
4.  *Why:* This keeps the award-winning layout but applies our unique brand identity.

### 🛠️ The "Iterate" Command
If the first result is too generic:
*   "Make the typography 2x larger and bolder."
*   "Add a glass texture to all card backgrounds."
*   "Replace standard icons with futuristic, abstract geometric shapes."

---

## 4. Exporting to Figma
1.  Click **Export > Figma**.
2.  Open the file. **Stitch separates layers automatically.**
3.  **Cleanup:**
    *   Group elements (Ctrl+G).
    *   Apply our `Space Grotesk` font (Stitch might default to Roboto).
    *   Insert our real `sos_reports.json` data into the text fields to match the case study.

## ⚠️ Warning
*   **Do not use generated text:** Stitch often uses "Lorem Ipsum." Replace it immediately with the copy from `LANDING_PAGE_GUIDE.md`.
*   **Check Contrast:** AI sometimes puts gray text on black backgrounds. Manually adjust to `#E0E0E0` for readability.
