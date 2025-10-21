(function() {
  'use strict';
  
  console.log('[YT Side Comments] 🚀 Extension loaded v2.0');
  
  let isActive = false;
  let observer = null;
  
  // Enhanced element waiter with multiple strategies
  function waitForElement(selectors, timeout = 20000) {
    return new Promise((resolve) => {
      // Try multiple selectors
      const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
      
      // Check immediately
      for (const selector of selectorArray) {
        const element = document.querySelector(selector);
        if (element) {
          console.log(`[YT Side Comments] Found element: ${selector}`);
          return resolve(element);
        }
      }
      
      // Watch for element to appear
      const obs = new MutationObserver(() => {
        for (const selector of selectorArray) {
          const element = document.querySelector(selector);
          if (element) {
            console.log(`[YT Side Comments] Found element: ${selector}`);
            obs.disconnect();
            return resolve(element);
          }
        }
      });
      
      obs.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      
      // Timeout fallback
      setTimeout(() => {
        obs.disconnect();
        console.log('[YT Side Comments] ⚠️ Timeout waiting for elements');
        resolve(null);
      }, timeout);
    });
  }
  
  // Main initialization function
  async function initSideComments() {
    try {
      // Prevent double initialization
      if (isActive || document.querySelector('#yt-side-comments-wrapper')) {
        console.log('[YT Side Comments] ⏭️ Already active');
        return;
      }
      
      console.log('[YT Side Comments] 🔄 Initializing...');
      
      // Wait for critical elements with multiple selector options
      const primary = await waitForElement(['#primary', 'ytd-watch-flexy #primary']);
      const comments = await waitForElement([
        'ytd-comments#comments',
        '#comments',
        'ytd-item-section-renderer#comments'
      ]);
      
      if (!primary) {
        console.error('[YT Side Comments] ❌ Primary container not found');
        return;
      }
      
      if (!comments) {
        console.log('[YT Side Comments] ⚠️ Comments not found (may be disabled)');
        return;
      }
      
      // Get additional elements
      const player = await waitForElement(['#player', '#movie_player']);
      const aboveFold = document.querySelector('#above-the-fold');
      const below = document.querySelector('#below');
      
      if (!player) {
        console.error('[YT Side Comments] ❌ Player not found');
        return;
      }
      
      console.log('[YT Side Comments] ✅ All elements found, building layout...');
      
      // Create main wrapper
      const wrapper = document.createElement('div');
      wrapper.id = 'yt-side-comments-wrapper';
      wrapper.className = 'yt-side-comments-active';
      
      // Create video container
      const videoContainer = document.createElement('div');
      videoContainer.id = 'yt-video-container';
      
      // Create comments container
      const commentsContainer = document.createElement('div');
      commentsContainer.id = 'yt-comments-container';
      
      // Add header to comments
      const commentsHeader = document.createElement('div');
      commentsHeader.id = 'yt-comments-header';
      commentsHeader.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span style="font-weight: 500; font-size: 14px;">💬 Comments</span>
          <button id="yt-toggle-comments" style="background: rgba(255,255,255,0.1); border: none; border-radius: 18px; padding: 6px 12px; cursor: pointer; color: inherit; font-size: 12px;">
            Hide
          </button>
        </div>
      `;
      
      // Build structure
      if (player) videoContainer.appendChild(player);
      if (aboveFold) videoContainer.appendChild(aboveFold);
      
      commentsContainer.appendChild(commentsHeader);
      commentsContainer.appendChild(comments);
      
      wrapper.appendChild(videoContainer);
      wrapper.appendChild(commentsContainer);
      
      // Insert into page
      primary.insertBefore(wrapper, primary.firstChild);
      
      // Hide original below section
      if (below) below.style.display = 'none';
      
      // Add body class
      document.body.classList.add('yt-side-comments-enabled');
      
      // Add toggle functionality
      const toggleBtn = document.getElementById('yt-toggle-comments');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          commentsContainer.classList.toggle('hidden');
          toggleBtn.textContent = commentsContainer.classList.contains('hidden') ? 'Show' : 'Hide';
        });
      }
      
      isActive = true;
      console.log('[YT Side Comments] 🎉 Successfully initialized!');
      
      // Show success notification
      showNotification('✅ Side Comments Active!');
      
    } catch (error) {
      console.error('[YT Side Comments] ❌ Error:', error);
    }
  }
  
  // Cleanup function
  function cleanup() {
    console.log('[YT Side Comments] 🧹 Cleaning up...');
    isActive = false;
    document.body.classList.remove('yt-side-comments-enabled');
    const wrapper = document.querySelector('#yt-side-comments-wrapper');
    if (wrapper) wrapper.remove();
    
    // Restore below section
    const below = document.querySelector('#below');
    if (below) below.style.display = '';
  }
  
  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #065fd4;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Watch for URL changes (YouTube SPA)
  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      
      if (currentUrl.includes('/watch')) {
        console.log('[YT Side Comments] 📺 Video page detected');
        cleanup();
        setTimeout(initSideComments, 2000);
      } else {
        cleanup();
      }
    }
  });
  
  urlObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  // Initial load
  if (location.href.includes('/watch')) {
    console.log('[YT Side Comments] 🎬 Initial video page load');
    // Multiple initialization attempts for reliability
    setTimeout(initSideComments, 1000);
    setTimeout(initSideComments, 3000);
    setTimeout(initSideComments, 5000);
  }
  
  // Add keyboard shortcut (Ctrl+Shift+C to toggle)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      const container = document.querySelector('#yt-comments-container');
      if (container) {
        container.classList.toggle('hidden');
        const toggleBtn = document.getElementById('yt-toggle-comments');
        if (toggleBtn) {
          toggleBtn.textContent = container.classList.contains('hidden') ? 'Show' : 'Hide';
        }
      }
    }
  });
  
})();
