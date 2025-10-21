(function() {
  'use strict';
  
  console.log('[YT Side Comments] Extension script loaded');
  
  let isInitialized = false;
  let retryCount = 0;
  const MAX_RETRIES = 30;
  
  function waitForElement(selector, timeout = 15000) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
      
      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    });
  }
  
  async function initSideComments() {
    // Check if already initialized
    if (isInitialized || document.querySelector('#video-comments-wrapper')) {
      console.log('[YT Side Comments] Already initialized');
      return;
    }
    
    console.log('[YT Side Comments] Starting initialization...');
    
    // Wait for key elements
    const primary = await waitForElement('#primary');
    const comments = await waitForElement('ytd-comments#comments, #comments');
    
    if (!primary) {
      console.log('[YT Side Comments] Could not find #primary element');
      return;
    }
    
    if (!comments) {
      console.log('[YT Side Comments] Could not find comments section');
      return;
    }
    
    console.log('[YT Side Comments] Found all required elements');
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'video-comments-wrapper';
    wrapper.style.cssText = 'display: flex; gap: 24px; width: 100%;';
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.id = 'video-container';
    videoContainer.style.cssText = 'flex: 1; min-width: 0;';
    
    // Create comments container
    const commentsContainer = document.createElement('div');
    commentsContainer.id = 'comments-container';
    
    // Get elements to move
    const player = document.querySelector('#player');
    const aboveFold = document.querySelector('#above-the-fold');
    const below = document.querySelector('#below');
    
    if (!player) {
      console.log('[YT Side Comments] Player not found');
      return;
    }
    
    // Move elements
    if (player) videoContainer.appendChild(player);
    if (aboveFold) videoContainer.appendChild(aboveFold);
    commentsContainer.appendChild(comments);
    
    // Assemble
    wrapper.appendChild(videoContainer);
    wrapper.appendChild(commentsContainer);
    
    // Insert into page
    primary.insertBefore(wrapper, primary.firstChild);
    
    // Hide below section
    if (below) below.style.display = 'none';
    
    // Add active class
    document.body.classList.add('youtube-side-comments-active');
    
    isInitialized = true;
    console.log('[YT Side Comments] ✅ Successfully initialized!');
  }
  
  function cleanup() {
    console.log('[YT Side Comments] Cleaning up...');
    isInitialized = false;
    document.body.classList.remove('youtube-side-comments-active');
    const wrapper = document.querySelector('#video-comments-wrapper');
    if (wrapper) wrapper.remove();
  }
  
  // Watch for URL changes (YouTube SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (url.includes('/watch')) {
        console.log('[YT Side Comments] Video page detected, initializing...');
        cleanup();
        setTimeout(initSideComments, 1500);
      } else {
        cleanup();
      }
    }
  }).observe(document, { subtree: true, childList: true });
  
  // Initial run
  if (location.href.includes('/watch')) {
    setTimeout(initSideComments, 2000);
  }
})();
