// Wait for YouTube page to fully load
let retryCount = 0;
const MAX_RETRIES = 20;

function initSideComments() {
  // Check if already initialized
  if (document.querySelector('#video-comments-wrapper')) {
    console.log('[YT Side Comments] Already initialized');
    return;
  }

  // Get the main elements
  const primaryContent = document.querySelector('#primary');
  const commentsSection = document.querySelector('ytd-comments#comments');
  
  console.log('[YT Side Comments] Looking for elements...', {
    primary: !!primaryContent,
    comments: !!commentsSection,
    retry: retryCount
  });
  
  if (!primaryContent || !commentsSection) {
    // Retry if elements aren't loaded yet
    retryCount++;
    if (retryCount < MAX_RETRIES) {
      setTimeout(initSideComments, 500);
    } else {
      console.log('[YT Side Comments] Max retries reached, giving up');
    }
    return;
  }

  console.log('[YT Side Comments] Initializing side comments layout...');
  retryCount = 0; // Reset counter

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
    
    console.log('[YT Side Comments] Successfully initialized!');
  } else {
    console.log('[YT Side Comments] Missing player or videoInfo');
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
    console.log('[YT Side Comments] URL changed, reinitializing...');
    // Reset the page
    document.body.classList.remove('youtube-side-comments-active');
    const wrapper = document.querySelector('#video-comments-wrapper');
    if (wrapper) {
      wrapper.remove();
    }
    // Reset retry counter
    retryCount = 0;
    // Reinitialize
    setTimeout(initSideComments, 1000);
  }
}).observe(document, { subtree: true, childList: true });

console.log('[YT Side Comments] Extension loaded');
