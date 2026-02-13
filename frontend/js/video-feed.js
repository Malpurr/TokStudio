/* ===== Video Feed ===== */
const VideoFeed = {
  videos: [
    {id:1,user:'Laurehvk',initial:'L',desc:'Journée incroyable à Paris 🗼✨ #paris #vibes #aesthetic',music:'Save the world - Obama',likes:'9.3K',comments:'1.2K',shares:'231',gradient:'linear-gradient(135deg, #0a3a2a 0%, #1a5a3a 30%, #2a1a3a 70%, #3a0a2a 100%)'},
    {id:2,user:'sophia_art',initial:'S',desc:'Peinture en live 🎨 technique aquarelle pour débutants #art #painting',music:'Lofi Dreams - ChillBeats',likes:'42.1K',comments:'1.2K',shares:'892',gradient:'linear-gradient(135deg, #2a0a3a 0%, #3a1a4a 50%, #1a2a3a 100%)'},
    {id:3,user:'alex.dev',initial:'A',desc:'J\'ai codé cette app en 48h 🚀 Qu\'est-ce que vous en pensez? #coding #dev',music:'Midnight City - M83',likes:'18.7K',comments:'567',shares:'2.1K',gradient:'linear-gradient(135deg, #0a1a3a 0%, #1a2a4a 50%, #0a3a3a 100%)'},
    {id:4,user:'luna.creates',initial:'L',desc:'POV: Tu découvres un café caché à Tokyo 🗼☕ #tokyo #travel',music:'Sakura - Japanese Lofi',likes:'89.3K',comments:'3.4K',shares:'12.4K',gradient:'linear-gradient(135deg, #3a1a2a 0%, #4a0a3a 40%, #2a0a1a 100%)'},
    {id:5,user:'marcox',initial:'M',desc:'Ce coucher de soleil était irréel 🌅 #sunset #nature',music:'Golden Hour - JVKE',likes:'156K',comments:'5.6K',shares:'23.1K',gradient:'linear-gradient(135deg, #3a2a0a 0%, #4a3a1a 50%, #2a1a0a 100%)'},
    {id:6,user:'design.daily',initial:'D',desc:'Process de design UI du début à la fin ✦ #design #ux',music:'Blinding Lights - The Weeknd',likes:'34.5K',comments:'892',shares:'4.3K',gradient:'linear-gradient(135deg, #1a0a3a 0%, #2a1a4a 50%, #3a0a2a 100%)'},
    {id:7,user:'jay_music',initial:'J',desc:'Beat produit sur mon téléphone 🎵 Full track bientôt',music:'Original Sound - jay_music',likes:'67.8K',comments:'2.1K',shares:'8.9K',gradient:'linear-gradient(135deg, #0a2a2a 0%, #1a3a3a 50%, #0a1a2a 100%)'},
    {id:8,user:'emma.vibes',initial:'E',desc:'Outfit check 💫 Tout thrifté pour moins de 30€',music:'Levitating - Dua Lipa',likes:'23.4K',comments:'743',shares:'1.8K',gradient:'linear-gradient(135deg, #3a0a1a 0%, #4a1a2a 50%, #2a0a1a 100%)'},
    {id:9,user:'tech.wizard',initial:'T',desc:'L\'informatique quantique en 60 secondes ⚛️ #tech #science',music:'Interstellar Theme - Zimmer',likes:'112K',comments:'8.9K',shares:'34.5K',gradient:'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 50%, #0a2a1a 100%)'},
    {id:10,user:'neon.dreams',initial:'N',desc:'Ville cyberpunk la nuit 🌃 Shot on iPhone',music:'Synthwave Nights - RetroBeats',likes:'78.9K',comments:'2.8K',shares:'15.3K',gradient:'linear-gradient(135deg, #1a0a2a 0%, #2a0a3a 40%, #0a1a3a 100%)'},
    {id:11,user:'creative.hub',initial:'C',desc:'Stop motion frame par frame 🎬 #animation #art',music:'Electric Feel - MGMT',likes:'56.7K',comments:'1.5K',shares:'6.7K',gradient:'linear-gradient(135deg, #2a1a0a 0%, #3a2a1a 50%, #1a0a1a 100%)'},
    {id:12,user:'cook.master',initial:'K',desc:'Le ramen parfait fait maison 🍜 #cuisine #ramen',music:'lo-fi cooking vibes',likes:'91.3K',comments:'4.5K',shares:'18.2K',gradient:'linear-gradient(135deg, #0a2a1a 0%, #1a3a2a 40%, #2a1a2a 100%)'},
  ],

  liked: new Set(),
  saved: new Set(),
  followed: new Set(),
  lastTap: 0,

  init() {
    this.render();
    this.initDoubleTap();
    this.initVideoProgress();
    this.initParallax();
    this.initPullToRefresh();
  },

  render() {
    const c = document.getElementById('video-feed');
    c.innerHTML = '';
    this.videos.forEach(v => {
      const s = document.createElement('div');
      s.className = 'video-slide';
      s.dataset.id = v.id;
      const isLiked = this.liked.has(v.id);
      const isSaved = this.saved.has(v.id);
      const isFollowed = this.followed.has(v.user);
      s.innerHTML = `
        <div class="video-progress-bar"><div class="video-progress-fill"></div></div>
        <div class="video-bg" style="background:${v.gradient}"></div>
        <div class="video-gradient-top"></div>
        <div class="video-gradient-bottom"></div>
        <div class="video-info">
          <div class="video-user-row">
            <div class="video-avatar">${v.initial}
              <div class="follow-badge${isFollowed?' followed':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
            </div>
            <span class="video-username">@${v.user}</span>
          </div>
          <div class="video-desc">${v.desc}</div>
          <div class="video-music">
            <svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/></svg>
            <div class="music-scroll"><span>${v.music} \u00a0\u00a0\u00a0 ${v.music} \u00a0\u00a0\u00a0 </span></div>
          </div>
        </div>
        <div class="video-actions">
          <button class="action-btn${isLiked?' liked':''}" data-action="like" data-id="${v.id}">
            <svg viewBox="0 0 24 24" fill="${isLiked?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span class="action-count">${v.likes}</span>
          </button>
          <button class="action-btn" data-action="comment" data-video-id="${v.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span class="action-count">${v.comments}</span>
          </button>
          <button class="action-btn" data-action="share">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span class="action-count">${v.shares}</span>
          </button>
          <button class="action-btn${isSaved?' saved':''}" data-action="save" data-id="${v.id}">
            <svg viewBox="0 0 24 24" fill="${isSaved?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            <span class="action-count">Sauv.</span>
          </button>
          <div class="music-disc">${v.initial}</div>
        </div>`;
      c.appendChild(s);
    });
    this.bind();
  },

  bind() {
    // Like buttons
    document.querySelectorAll('[data-action="like"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.toggleLike(+btn.dataset.id, btn);
      });
    });

    // Follow badges
    document.querySelectorAll('.follow-badge').forEach(badge => {
      badge.addEventListener('click', e => {
        e.stopPropagation();
        const username = badge.closest('.video-user-row').querySelector('.video-username').textContent.slice(1);
        if (this.followed.has(username)) {
          this.followed.delete(username);
          badge.classList.remove('followed');
        } else {
          this.followed.add(username);
          badge.classList.add('followed');
          badge.style.animation = 'likeBurst 0.3s var(--spring)';
          setTimeout(() => badge.style.animation = '', 300);
        }
      });
    });

    // Comment buttons
    document.querySelectorAll('[data-action="comment"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const videoId = +btn.dataset.videoId;
        const video = this.videos.find(v => v.id === videoId) || this.videos[0];
        App.openCommentsSheet(video);
      });
    });

    // Share buttons
    document.querySelectorAll('[data-action="share"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        App.openShareSheet();
      });
    });

    // Save/Bookmark buttons
    document.querySelectorAll('[data-action="save"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.toggleSave(+btn.dataset.id, btn);
      });
    });
  },

  toggleLike(id, btn) {
    const svg = btn.querySelector('svg');
    if(this.liked.has(id)){
      this.liked.delete(id);
      btn.classList.remove('liked');
      svg.setAttribute('fill','none');
    } else {
      this.liked.add(id);
      btn.classList.add('liked','burst');
      svg.setAttribute('fill','currentColor');
      // Particle burst
      this.createParticles(btn);
      setTimeout(() => btn.classList.remove('burst'), 400);
    }
  },

  toggleSave(id, btn) {
    const svg = btn.querySelector('svg');
    if(this.saved.has(id)){
      this.saved.delete(id);
      btn.classList.remove('saved');
      svg.setAttribute('fill','none');
    } else {
      this.saved.add(id);
      btn.classList.add('saved');
      svg.setAttribute('fill','currentColor');
      btn.style.animation = 'saveBounce 0.4s var(--spring)';
      setTimeout(() => btn.style.animation = '', 400);
    }
  },

  createParticles(btn) {
    const count = 6;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'like-particle';
      const angle = (360 / count) * i;
      const distance = 25 + Math.random() * 15;
      const px = Math.cos(angle * Math.PI / 180) * distance;
      const py = Math.sin(angle * Math.PI / 180) * distance;
      particle.style.setProperty('--px', px + 'px');
      particle.style.setProperty('--py', py + 'px');
      particle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      btn.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  },

  initDoubleTap() {
    const feed = document.getElementById('video-feed');
    const heart = document.getElementById('double-tap-heart');
    feed.addEventListener('click', e => {
      if(e.target.closest('.action-btn,.follow-badge,.video-follow-btn')) return;
      const now = Date.now();
      if(now - this.lastTap < 300){
        const slide = e.target.closest('.video-slide');
        if(!slide) return;
        const id = +slide.dataset.id;
        if(!this.liked.has(id)){
          const btn = slide.querySelector('[data-action="like"]');
          if(btn) this.toggleLike(id, btn);
        }
        heart.classList.remove('show');
        void heart.offsetWidth;
        heart.classList.add('show');
        setTimeout(() => heart.classList.remove('show'), 800);
      }
      this.lastTap = now;
    });
  },

  // Video progress bar — activate on visible slide
  initVideoProgress() {
    const feed = document.getElementById('video-feed');
    let currentActive = null;

    const updateActive = () => {
      const slides = feed.querySelectorAll('.video-slide');
      const viewportH = window.innerHeight;
      slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        const visible = rect.top < viewportH * 0.5 && rect.bottom > viewportH * 0.5;
        if (visible && slide !== currentActive) {
          if (currentActive) {
            currentActive.classList.remove('active-video');
            const fill = currentActive.querySelector('.video-progress-fill');
            if (fill) { fill.style.animation = 'none'; fill.style.width = '0'; }
          }
          slide.classList.add('active-video');
          const fill = slide.querySelector('.video-progress-fill');
          if (fill) {
            fill.style.animation = 'none';
            void fill.offsetHeight;
            fill.style.animation = 'videoProgress 8s linear infinite';
          }
          currentActive = slide;
        }
      });
    };

    feed.addEventListener('scroll', () => requestAnimationFrame(updateActive));
    setTimeout(updateActive, 100);
  },

  // Parallax on gradients
  initParallax() {
    const feed = document.getElementById('video-feed');
    feed.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const slides = feed.querySelectorAll('.video-slide');
        const viewportH = window.innerHeight;
        slides.forEach(slide => {
          const rect = slide.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < viewportH) {
            const progress = (rect.top / viewportH);
            const gradient = slide.querySelector('.video-gradient-bottom');
            if (gradient) {
              gradient.style.transform = `translateY(${progress * 15}px)`;
            }
          }
        });
      });
    });
  },

  // Pull to refresh
  initPullToRefresh() {
    const feed = document.getElementById('video-feed');
    const ptr = document.getElementById('pull-to-refresh');
    let startY = 0, pulling = false;

    feed.addEventListener('touchstart', e => {
      if (feed.scrollTop <= 0) {
        startY = e.touches[0].clientY;
        pulling = true;
      }
    }, { passive: true });

    feed.addEventListener('touchmove', e => {
      if (!pulling) return;
      const dy = e.touches[0].clientY - startY;
      if (dy > 20 && dy < 120) {
        ptr.classList.add('visible');
      }
    }, { passive: true });

    feed.addEventListener('touchend', () => {
      if (!pulling) return;
      pulling = false;
      if (ptr.classList.contains('visible')) {
        ptr.classList.add('refreshing');
        setTimeout(() => {
          ptr.classList.remove('visible', 'refreshing');
        }, 1500);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => VideoFeed.init());
