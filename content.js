// Wait for YouTube page to fully load
function initSideComments() {
  // Check if already initialized
  if (document.querySelector('#video-comments-wrapper')) {
    return;
  }

  // Get the main elements
  const primaryContent = document.querySelector('#primary');
  const commentsSection = document.querySelector('#comments');
  
  if (!primaryContent || !commentsSection) {
    // Retry if elements aren't loaded yet
    setTimeout(initSideComments, 500);
    return;
  }

  // Create a wrapper for video and comments
  const videoCommentsWrapper = document.createElement('div');
  videoCommentsWrapper.id = 'video-comments-wrapper';
  
  // Create container for the video player
  const videoContainer = document.createElement('div');
  videoContainer.id = 'video-container';
  
  // Create container for comments
  const commentsContainer = document.createElement('div');
  commentsContainer.id = 'comments-container';
  
  // Get the video player and related info
  const player = document.querySelector('#player');
  const videoInfo = document.querySelector('#above-the-fold');
  const belowFold = document.querySelector('#below');
  
  if (player && videoInfo) {
    // MOVE (not clone) player and info to video container
    videoContainer.appendChild(player);
    videoContainer.appendChild(videoInfo);
    
    // MOVE (not clone) comments to comments container
    commentsContainer.appendChild(commentsSection);
    
    // Assemble the new layout
    videoCommentsWrapper.appendChild(videoContainer);
    videoCommentsWrapper.appendChild(commentsContainer);
    
    // Insert the new layout at the beginning of primary
    primaryContent.insertBefore(videoCommentsWrapper, primaryContent.firstChild);
    
    // Hide the below fold content (it's now empty anyway)
    if (belowFold) {
      belowFold.style.display = 'none';
    }
    
    // Add class to body for styling
    document.body.classList.add('youtube-side-comments-active');
  }
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSideComments);
} else {
  initSideComments();
}

// Re-run when navigating between videos (YouTube is a SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // Reset the page
    document.body.classList.remove('youtube-side-comments-active');
    const wrapper = document.querySelector('#video-comments-wrapper');
    if (wrapper) {
      wrapper.remove();
    }
    // Reinitialize
    setTimeout(initSideComments, 1000);
  }
}).observe(document, { subtree: true, childList: true });
