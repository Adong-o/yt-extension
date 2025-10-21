# 🎬 YouTube Side Comments Extension

**Watch YouTube videos and read comments at the same time - no scrolling needed!**

This Chrome/Brave extension displays YouTube comments beside the video player instead of below it, so you can read what others are saying while watching.

![Extension Demo](https://img.shields.io/badge/Status-Working-brightgreen) ![Chrome](https://img.shields.io/badge/Chrome-Compatible-blue) ![Brave](https://img.shields.io/badge/Brave-Compatible-orange)

## ✨ Features

- 📺 **Side-by-side layout** - Comments appear next to the video
- 👀 **No scrolling** - Watch and read simultaneously  
- 🎨 **Matches YouTube theme** - Works with dark/light mode
- 📱 **Responsive** - Adapts to screen size
- ⚡ **Auto-updates** - Works when navigating between videos
- 🔘 **Toggle button** - Show/hide comments with one click
- ⌨️ **Keyboard shortcut** - Press `Ctrl+Shift+C` to toggle
- 🔔 **Visual feedback** - See when extension activates
- 🔄 **Multiple retry attempts** - Ensures reliable loading

---

## 📥 Installation (Chrome & Brave)

### Quick Install from GitHub

1. **Download the extension**
   
   Click here → [**Download ZIP**](https://github.com/Adong-o/yt-extension/archive/refs/heads/main.zip)
   
   Or use this command:
   ```bash
   git clone https://github.com/Adong-o/yt-extension.git
   ```

2. **Extract the ZIP file** (if downloaded as ZIP)
   - Right-click the downloaded file
   - Select "Extract All" or "Unzip"
   - Remember where you extracted it!

3. **Open Extensions page**
   
   **For Chrome:**
   - Go to `chrome://extensions/`
   - Or Menu (⋮) → Extensions → Manage Extensions
   
   **For Brave:**
   - Go to `brave://extensions/`
   - Or Menu (☰) → Extensions → Manage Extensions

4. **Enable Developer Mode**
   - Look for the toggle in the top-right corner
   - Turn it **ON**

5. **Load the extension**
   - Click **"Load unpacked"** button
   - Navigate to the extracted folder (the one with `manifest.json`)
   - Click **"Select Folder"**

6. **Done! 🎉**
   - Go to any YouTube video
   - Comments will appear beside the video!

---

## 🚀 How to Use

1. Open any YouTube video (e.g., `youtube.com/watch?v=...`)
2. The extension automatically reorganizes the layout
3. You'll see a notification: **"✅ Side Comments Active!"**
4. Comments appear on the right side of the video
5. Scroll through comments while watching!

### Controls

- **Toggle comments**: Click the "Hide" button in the comments header
- **Keyboard shortcut**: Press `Ctrl+Shift+C` to show/hide comments
- **Debug mode**: Press `F12` to see console messages:
  ```
  [YT Side Comments] 🚀 Extension loaded v2.0
  [YT Side Comments] 🎉 Successfully initialized!
  ```

---

## 🛠️ Troubleshooting

### Extension not working?

1. **Refresh the YouTube page** (Press F5)
2. **Check if extension is enabled**
   - Go to `chrome://extensions/` or `brave://extensions/`
   - Make sure the toggle is ON
3. **Open Console** (Press F12)
   - Look for messages starting with `[YT Side Comments]`
   - Should see: `✅ Successfully initialized!`

### Comments not appearing?

- **Some videos have comments disabled** - Check if comments work normally
- **Wait a few seconds** - Comments take time to load
- **Try another video** - Test with a popular video

### Layout looks broken?

- **Check your zoom level** - Should be 100% (Ctrl+0)
- **Screen too small?** - Extension works best on screens wider than 1280px
- **Disable other YouTube extensions** - They might conflict

### Still not working?

1. **Remove and reinstall** the extension
2. **Check browser console** for error messages
3. **Try a different browser** (Chrome or Brave)

---

## 📁 File Structure

```
yt-extension/
├── manifest.json      # Extension configuration
├── content.js         # Main logic (moves comments)
├── styles.css         # Styling for side layout
└── README.md          # This file
```

---

## ⚙️ How It Works

1. **Waits for YouTube page to load**
2. **Finds the comments section** using DOM selectors
3. **Moves comments** from below video to beside it
4. **Applies CSS styling** for side-by-side layout
5. **Monitors navigation** and re-applies on new videos

---

## 🎨 Customization

Want to adjust the layout? Edit `styles.css`:

**Change comments width:**
```css
#comments-container {
  width: 420px; /* Change this number */
}
```

**Adjust spacing:**
```css
#video-comments-wrapper {
  gap: 24px; /* Change gap between video and comments */
}
```

After editing, click the refresh icon on the extension in `chrome://extensions/`

---

## 🔮 Future Improvements

- [ ] Toggle button to switch layouts
- [ ] Adjustable panel width via settings
- [ ] Support for live chat
- [ ] Keyboard shortcuts
- [ ] Firefox support

---

## 📜 License

MIT License - Free to use, modify, and distribute

---

## 🤝 Contributing

Found a bug? Have an idea? Feel free to:
- Open an issue on GitHub
- Submit a pull request
- Fork and improve!

---

## ⭐ Support

If this extension helps you, give it a star on GitHub!

**Repository:** https://github.com/Adong-o/yt-extension

---

**Made with ❤️ for better YouTube viewing**