# YouTube Side Comments - Chrome Extension

A Chrome extension that redesigns YouTube's layout to display comments alongside the video, allowing you to read comments while watching.

## Features

- 📺 **Side-by-side layout**: Comments appear next to the video instead of below
- 🎬 **Uninterrupted viewing**: Watch videos while reading comments
- 📱 **Responsive design**: Automatically adjusts for different screen sizes
- 🌙 **Dark mode support**: Works with YouTube's dark theme
- 🔄 **SPA navigation**: Works seamlessly when navigating between videos

## Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download or clone this repository** to your local machine

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the folder containing this extension (`bz` folder)

5. **Done!** The extension is now active

### Method 2: Create Icons (Optional)

The extension requires icon files. You can:
- Create your own icons (16x16, 48x48, 128x128 PNG files)
- Or temporarily remove the `icons` section from `manifest.json`

## Usage

1. Navigate to any YouTube video (e.g., `https://www.youtube.com/watch?v=...`)
2. The extension will automatically reorganize the layout
3. Comments will appear on the right side of the video
4. Scroll through comments while the video plays

## File Structure

```
bz/
├── manifest.json      # Extension configuration
├── content.js         # JavaScript to modify YouTube layout
├── styles.css         # CSS for the new layout
└── README.md          # This file
```

## How It Works

1. **Content Script**: Runs on YouTube watch pages
2. **DOM Manipulation**: Moves the comments section to a side panel
3. **CSS Styling**: Positions elements side-by-side with proper spacing
4. **SPA Handling**: Detects navigation and reapplies layout changes

## Customization

You can modify the extension to suit your preferences:

### Adjust Comments Panel Width
Edit `styles.css`, line 13:
```css
#comments-container {
  width: 400px; /* Change this value */
}
```

### Change Gap Between Video and Comments
Edit `styles.css`, line 3:
```css
#video-comments-wrapper {
  gap: 24px; /* Change this value */
}
```

## Troubleshooting

**Extension not working?**
- Refresh the YouTube page after installing
- Check that the extension is enabled in `chrome://extensions/`
- Open DevTools Console (F12) to check for errors

**Layout looks broken?**
- Try refreshing the page
- Check your browser zoom level (should be 100%)
- Ensure you're on a video page, not the homepage

**Comments not showing?**
- Some videos have comments disabled
- Wait a moment for comments to load
- Check if comments are visible in normal YouTube layout

## Future Improvements

- Add toggle button to switch between layouts
- Customizable panel width via popup settings
- Support for live chat in live streams
- Keyboard shortcuts

## License

MIT License - Feel free to modify and distribute

## Contributing

Found a bug or have a feature request? Feel free to iterate and improve this extension!
