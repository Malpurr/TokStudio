/* ===== TokStudio App Core ===== */
const App = {
  currentScreen: 'home',

  init() {
    this.initNav();
    this.initFeedTabs();
    this.initDiscover();
    this.initMessages();
    this.initNotifications();
    this.initProfile();
    this.initCreate();
    this.initSettings();
    this.initEditProfile();
    this.initSheets();
    this.initStoryViewer();
    this.initSettingsSubScreens();
    this.initProfileBack();
    this.initProfileShare();
    this.initNewMessage();
  },

  // ===== NAVIGATION =====
  initNav() {
    document.querySelectorAll('#bottom-nav [data-screen]').forEach(btn => {
      btn.addEventListener('click', () => this.navigate(btn.dataset.screen));
    });
  },

  navigate(screen) {
    if (this.currentScreen === screen) return;
    this.currentScreen = screen;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screen}`);
    target.classList.add('active');
    this.staggerScreen(target);
    document.querySelectorAll('#bottom-nav [data-screen]').forEach(b => {
      b.classList.toggle('active', b.dataset.screen === screen);
    });
    const nav = document.getElementById('bottom-nav');
    nav.style.transform = screen === 'create' ? 'translateY(100%)' : 'translateY(0)';
  },

  staggerScreen(el) {
    const items = el.querySelectorAll('.stagger-item');
    items.forEach((item, i) => {
      item.style.animation = 'none';
      item.offsetHeight;
      item.style.animation = '';
      item.style.animationDelay = `${i * 50}ms`;
    });
  },

  // ===== FEED TABS =====
  initFeedTabs() {
    document.querySelectorAll('.feed-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  },

  // ===== DISCOVER =====
  initDiscover() {
    const tags = [
      {l:'🔥 Trending',a:true},{l:'Dance'},{l:'Comedy'},{l:'Gaming'},
      {l:'Cooking'},{l:'Fashion'},{l:'Music'},{l:'Art'},{l:'Tech'},{l:'Travel'}
    ];
    const tagsEl = document.getElementById('trending-tags');
    tags.forEach(t => {
      const el = document.createElement('span');
      el.className = `tag${t.a?' active':''}`;
      el.textContent = t.l;
      el.addEventListener('click', () => {
        tagsEl.querySelectorAll('.tag').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
      });
      tagsEl.appendChild(el);
    });

    const grads = [
      'linear-gradient(135deg,#1a3a2a,#0a2a1a,#2a1a3a)',
      'linear-gradient(135deg,#3a1a2a,#2a0a1a)',
      'linear-gradient(135deg,#1a2a3a,#0a1a2a)',
      'linear-gradient(135deg,#2a1a1a,#3a2a1a)',
      'linear-gradient(135deg,#1a1a3a,#2a0a3a)',
      'linear-gradient(135deg,#3a2a1a,#2a1a0a)',
      'linear-gradient(135deg,#1a3a3a,#0a2a2a)',
      'linear-gradient(135deg,#2a0a2a,#3a1a3a)',
      'linear-gradient(135deg,#0a2a1a,#1a3a2a)',
      'linear-gradient(135deg,#2a1a2a,#1a0a1a)',
      'linear-gradient(135deg,#1a2a1a,#2a3a2a)',
      'linear-gradient(135deg,#3a0a1a,#2a1a2a)',
    ];
    const views = ['1.2M','892K','2.1M','456K','3.4M','128K','567K','1.8M','234K','945K','678K','1.1M'];
    const grid = document.getElementById('discover-grid');
    for(let i=0;i<12;i++){
      const item = document.createElement('div');
      item.className = 'discover-item';
      item.style.setProperty('--i', i);
      item.innerHTML = `
        <div class="thumb" style="background:${grads[i]}"></div>
        <div class="thumb-overlay"><div class="thumb-views">
          <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>${views[i]}
        </div></div>`;
      item.addEventListener('click', () => {
        this.navigate('home');
        const feed = document.getElementById('video-feed');
        const targetSlide = feed.children[Math.min(i, feed.children.length - 1)];
        if (targetSlide) {
          targetSlide.scrollIntoView({ behavior: 'smooth' });
        }
      });
      grid.appendChild(item);
    }
  },

  // ===== MESSAGES =====
  initMessages() {
    document.querySelectorAll('.messages-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.messages-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const isChats = tab.dataset.msgTab === 'chats';
        document.getElementById('chat-list-container').classList.toggle('hidden', !isChats);
        document.getElementById('notifications-container').classList.toggle('active', !isChats);
        document.getElementById('stories-row').style.display = isChats ? 'flex' : 'none';
      });
    });

    // Stories
    const stories = [
      {name:'You',initial:'M',ring:false},
      {name:'sophia_art',initial:'S',ring:true},
      {name:'alex.dev',initial:'A',ring:true},
      {name:'luna',initial:'L',ring:true},
      {name:'marcox',initial:'M',ring:false},
      {name:'jay_music',initial:'J',ring:true},
      {name:'emma',initial:'E',ring:false},
      {name:'neon',initial:'N',ring:true},
    ];
    const storiesRow = document.getElementById('stories-row');
    stories.forEach((s, idx) => {
      const el = document.createElement('div');
      el.className = 'story-item';
      el.innerHTML = `
        <div class="story-ring${s.ring?' has-story':''}">
          <div class="story-avatar">${s.initial}</div>
        </div>
        <span class="story-name">${s.name}</span>`;
      el.addEventListener('click', () => {
        if (s.ring) this.openStoryViewer(s, idx);
      });
      storiesRow.appendChild(el);
    });

    // Chat list
    this.chats = [
      {name:'sophia_art',initial:'S',msg:'Your last post is so beautiful! 😍','time':'2m',unread:2},
      {name:'alex.dev',initial:'A',msg:'The code is ready, check the repo','time':'15m',unread:1},
      {name:'luna.creates',initial:'L',msg:'Want to do a collab?','time':'1h',unread:0},
      {name:'marcox',initial:'M',msg:'Thanks for the follow!','time':'3h',unread:0},
      {name:'design.daily',initial:'D',msg:'Amazing design 🔥','time':'5h',unread:0},
      {name:'jay_music',initial:'J',msg:'The beat is ready','time':'8h',unread:0},
      {name:'emma.vibes',initial:'E',msg:'Have you seen the latest trend?','time':'1d',unread:0},
      {name:'neon.dreams',initial:'N',msg:'Photo sent','time':'2d',unread:0},
    ];
    this.renderChatList();

    // Chat overlay
    document.getElementById('btn-back-chat').addEventListener('click', () => {
      document.getElementById('chat-overlay').classList.remove('open');
    });
    document.getElementById('btn-send-msg').addEventListener('click', () => this.sendMessage());
    document.getElementById('chat-input-field').addEventListener('keydown', e => {
      if(e.key === 'Enter') this.sendMessage();
    });
  },

  renderChatList() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = '';
    this.chats.forEach(c => {
      const el = document.createElement('div');
      el.className = 'chat-item';
      el.innerHTML = `
        <div class="chat-swipe-actions">
          <button class="chat-swipe-btn archive-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 8-2-3H5L3 8"/><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M10 12h4"/></svg>Archive</button>
          <button class="chat-swipe-btn delete-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete</button>
        </div>
        <div class="chat-item-content">
          <div class="chat-avatar">${c.initial}</div>
          <div class="chat-content">
            <div class="chat-name">${c.name}</div>
            <div class="chat-preview">${c.msg}</div>
          </div>
          <div class="chat-meta">
            <span class="chat-time">${c.time}</span>
            ${c.unread ? `<div class="chat-unread">${c.unread}</div>` : ''}
          </div>
        </div>`;
      this.initSwipeGesture(el);
      el.querySelector('.chat-item-content').addEventListener('click', () => this.openChat(c));
      chatList.appendChild(el);
    });
  },

  initSwipeGesture(el) {
    let startX = 0, currentX = 0, swiping = false;
    const content = el.querySelector('.chat-item-content');
    const threshold = 80;
    
    el.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      swiping = true;
    }, { passive: true });
    
    el.addEventListener('touchmove', e => {
      if (!swiping) return;
      currentX = e.touches[0].clientX;
      const dx = startX - currentX;
      if (dx > 0 && dx < 160) {
        content.style.transform = `translateX(-${dx}px)`;
        content.style.transition = 'none';
      }
    }, { passive: true });
    
    el.addEventListener('touchend', () => {
      swiping = false;
      const dx = startX - currentX;
      content.style.transition = 'transform 0.3s var(--ease)';
      if (dx > threshold) {
        content.style.transform = 'translateX(-144px)';
      } else {
        content.style.transform = 'translateX(0)';
      }
    });

    el.querySelectorAll('.chat-swipe-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        content.style.transition = 'transform 0.3s var(--ease)';
        content.style.transform = 'translateX(0)';
      });
    });
  },

  openChat(chat) {
    const overlay = document.getElementById('chat-overlay');
    document.getElementById('chat-avatar').textContent = chat.initial;
    document.getElementById('chat-name').textContent = chat.name;
    const msgs = document.getElementById('chat-messages');
    const conv = [
      {text:'Hey! How are you? 😊',sent:false,time:'14:20'},
      {text:'Hey! I\'m doing great, and you?',sent:true,time:'14:21'},
      {text:'Great! I saw your latest video',sent:false,time:'14:22'},
      {text:'It\'s incredible 🔥',sent:false,time:'14:22'},
      {text:'Thank you so much! It took me 3 hours 😅',sent:true,time:'14:25'},
      {text:chat.msg,sent:false,time:'now'},
    ];
    msgs.innerHTML = '';
    conv.forEach(m => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${m.sent?'sent':'received'}`;
      bubble.textContent = m.text;
      msgs.appendChild(bubble);
      const time = document.createElement('div');
      time.className = `chat-bubble-time${m.sent?' sent-time':''}`;
      time.textContent = m.time;
      msgs.appendChild(time);
    });
    overlay.classList.add('open');
    msgs.scrollTop = msgs.scrollHeight;
  },

  openChatByName(name) {
    const chat = this.chats.find(c => c.name === name) || this.chats[0];
    this.navigate('messages');
    setTimeout(() => this.openChat(chat), 100);
  },

  sendMessage() {
    const input = document.getElementById('chat-input-field');
    const text = input.value.trim();
    if(!text) return;
    const msgs = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble sent';
    bubble.textContent = text;
    bubble.style.animation = 'slideUp 0.2s var(--ease)';
    msgs.appendChild(bubble);
    const time = document.createElement('div');
    time.className = 'chat-bubble-time sent-time';
    time.textContent = 'now';
    msgs.appendChild(time);
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      const replies = ['Awesome! 😊', 'Oh I see!', 'So cool 🔥', 'Haha 😂', 'Got it!', 'Thanks! 💕'];
      const reply = document.createElement('div');
      reply.className = 'chat-bubble received';
      reply.textContent = replies[Math.floor(Math.random() * replies.length)];
      reply.style.animation = 'slideUp 0.2s var(--ease)';
      msgs.appendChild(reply);
      const rt = document.createElement('div');
      rt.className = 'chat-bubble-time';
      rt.textContent = 'now';
      msgs.appendChild(rt);
      msgs.scrollTop = msgs.scrollHeight;
    }, 1200);
  },

  // ===== NEW MESSAGE BUTTON =====
  initNewMessage() {
    document.getElementById('btn-new-msg').addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.className = 'new-msg-toast';
      toast.textContent = '✏️ New conversation';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  },

  // ===== NOTIFICATIONS =====
  initNotifications() {
    const notifications = [
      {type:'like',user:'sophia_art',initial:'S',text:'<strong>sophia_art</strong> liked your video',time:'2m',unread:true},
      {type:'follow',user:'new.user42',initial:'N',text:'<strong>new.user42</strong> started following you',time:'5m',unread:true},
      {type:'comment',user:'alex.dev',initial:'A',text:'<strong>alex.dev</strong> commented: "Amazing design!"',time:'15m',unread:true},
      {type:'like',user:'luna.creates',initial:'L',text:'<strong>luna.creates</strong> liked your video',time:'30m',unread:true},
      {type:'mention',user:'jay_music',initial:'J',text:'<strong>jay_music</strong> mentioned you in a comment',time:'1h',unread:true},
      {type:'follow',user:'design.daily',initial:'D',text:'<strong>design.daily</strong> started following you',time:'2h',unread:false},
      {type:'comment',user:'marcox',initial:'M',text:'<strong>marcox</strong> commented: "Top! 🔥"',time:'3h',unread:false},
      {type:'like',user:'emma.vibes',initial:'E',text:'<strong>emma.vibes</strong> and 12 others liked your video',time:'5h',unread:false},
      {type:'follow',user:'neon.dreams',initial:'N',text:'<strong>neon.dreams</strong> started following you',time:'8h',unread:false},
      {type:'comment',user:'cook.master',initial:'K',text:'<strong>cook.master</strong> commented: "Recipe? 🍜"',time:'12h',unread:false},
      {type:'mention',user:'tech.wizard',initial:'T',text:'<strong>tech.wizard</strong> mentioned you in a video',time:'1d',unread:false},
      {type:'like',user:'creative.hub',initial:'C',text:'<strong>creative.hub</strong> liked 3 of your videos',time:'1d',unread:false},
      {type:'follow',user:'artsy.life',initial:'A',text:'<strong>artsy.life</strong> who you might know started following you',time:'2d',unread:false},
      {type:'like',user:'photography',initial:'P',text:'<strong>photography</strong> liked your video',time:'2d',unread:false},
      {type:'comment',user:'travel.bug',initial:'T',text:'<strong>travel.bug</strong> commented: "Where is this? 😍"',time:'3d',unread:false},
    ];

    const container = document.getElementById('notifications-container');
    container.innerHTML = '<div class="notification-section-title">New</div>';
    
    const typeIcons = {
      like: '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
      comment: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      follow: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
      mention: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>',
    };

    let addedOlder = false;
    notifications.forEach(n => {
      if (!n.unread && !addedOlder) {
        container.innerHTML += '<div class="notification-section-title">Earlier</div>';
        addedOlder = true;
      }
      const item = document.createElement('div');
      item.className = `notification-item${n.unread ? ' unread' : ''}`;
      item.innerHTML = `
        <div class="notification-avatar">${n.initial}
          <div class="notification-type-icon ${n.type}">${typeIcons[n.type]}</div>
        </div>
        <div class="notification-content">
          <div class="notification-text">${n.text}</div>
          <div class="notification-time">${n.time}</div>
        </div>
        <div class="notification-thumb"></div>`;
      container.appendChild(item);
    });
  },

  // ===== PROFILE =====
  initProfile() {
    const grads = [
      'linear-gradient(135deg,#3a1a2a,#2a0a1a,#1a0a2a)',
      'linear-gradient(135deg,#2a0a2a,#3a1a3a)',
      'linear-gradient(135deg,#1a0a1a,#2a1a3a)',
      'linear-gradient(135deg,#3a0a1a,#2a1a0a)',
      'linear-gradient(135deg,#2a1a2a,#1a2a3a)',
      'linear-gradient(135deg,#3a1a1a,#2a0a2a)',
      'linear-gradient(135deg,#1a1a3a,#3a0a2a)',
      'linear-gradient(135deg,#2a2a1a,#1a0a3a)',
      'linear-gradient(135deg,#3a0a2a,#1a1a2a)',
      'linear-gradient(135deg,#2a1a1a,#3a2a2a)',
      'linear-gradient(135deg,#0a2a3a,#1a1a2a)',
      'linear-gradient(135deg,#3a2a0a,#1a2a1a)',
    ];
    const views = ['10.2K','5.8K','23.1K','1.9K','15.4K','8.7K','32.6K','4.2K','12.8K','7.3K','18.5K','2.1K'];
    const grid = document.getElementById('profile-grid');
    for(let i=0;i<12;i++){
      const item = document.createElement('div');
      item.className = 'profile-grid-item';
      item.style.background = grads[i];
      item.innerHTML = `<div class="views-overlay"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>${views[i]}</div>`;
      grid.appendChild(item);
    }
    // Profile tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
    // Settings trigger
    document.getElementById('btn-profile-more').addEventListener('click', () => {
      document.getElementById('settings-overlay').classList.add('open');
    });
    // Message button -> navigate to messages and open a chat
    document.getElementById('btn-profile-message').addEventListener('click', () => {
      this.openChatByName('sophia_art');
    });
  },

  // ===== PROFILE BACK =====
  initProfileBack() {
    document.getElementById('btn-profile-back').addEventListener('click', () => {
      this.navigate('home');
    });
  },

  // ===== PROFILE SHARE =====
  initProfileShare() {
    document.getElementById('btn-profile-share').addEventListener('click', () => {
      this.openShareSheet();
    });
  },

  // ===== EDIT PROFILE =====
  initEditProfile() {
    document.getElementById('btn-edit-profile').addEventListener('click', () => {
      document.getElementById('edit-profile-overlay').classList.add('open');
    });
    document.getElementById('edit-cancel').addEventListener('click', () => {
      document.getElementById('edit-profile-overlay').classList.remove('open');
    });
    document.getElementById('edit-save').addEventListener('click', () => {
      const username = document.getElementById('edit-username').value;
      const displayname = document.getElementById('edit-displayname').value;
      const bio = document.getElementById('edit-bio').value;
      document.querySelector('.profile-handle').textContent = username;
      document.querySelector('.profile-display-name').textContent = displayname;
      const bioEl = document.querySelector('.profile-bio');
      if (bioEl) bioEl.textContent = bio;
      document.getElementById('edit-profile-overlay').classList.remove('open');
    });
  },

  // ===== CREATE =====
  initCreate() {
    const recordBtn = document.getElementById('record-btn');
    let recording = false, progress = 0, interval;
    recordBtn.addEventListener('click', () => {
      recording = !recording;
      recordBtn.classList.toggle('recording', recording);
      const circle = recordBtn.querySelector('.record-progress');
      if(recording){
        progress = 0;
        interval = setInterval(() => {
          progress += 1;
          circle.style.strokeDashoffset = 289 - (289 * progress / 100);
          if(progress >= 100){
            clearInterval(interval);
            recording = false;
            recordBtn.classList.remove('recording');
          }
        }, 600);
      } else {
        clearInterval(interval);
        circle.style.strokeDashoffset = 289;
      }
    });
    document.getElementById('btn-close-camera').addEventListener('click', () => this.navigate('home'));
    document.querySelectorAll('.cam-mode').forEach(m => {
      m.addEventListener('click', () => {
        document.querySelectorAll('.cam-mode').forEach(x => x.classList.remove('active'));
        m.classList.add('active');
      });
    });
    document.querySelectorAll('.cam-type').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.cam-type').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
  },

  // ===== SETTINGS =====
  initSettings() {
    document.getElementById('btn-close-settings').addEventListener('click', () => {
      document.getElementById('settings-overlay').classList.remove('open');
    });
    document.getElementById('settings-overlay').addEventListener('click', e => {
      if(e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });
    document.querySelectorAll('.toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    });
  },

  // ===== SETTINGS SUB-SCREENS =====
  initSettingsSubScreens() {
    const subScreens = {
      notifications: {
        title: 'Notifications',
        content: `
          <div class="settings-card">
            <div class="settings-item"><span>Likes</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Comments</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>New followers</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Mentions</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Direct messages</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Live videos</span><div class="toggle"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Reminders</span><div class="toggle"><div class="toggle-knob"></div></div></div>
          </div>`
      },
      language: {
        title: 'Language',
        content: `
          <div class="settings-card">
            <div class="settings-item"><span>English</span><span style="color:var(--accent)">✓</span></div>
            <div class="settings-item"><span>Français</span></div>
            <div class="settings-item"><span>Español</span></div>
            <div class="settings-item"><span>Deutsch</span></div>
            <div class="settings-item"><span>日本語</span></div>
            <div class="settings-item"><span>한국어</span></div>
            <div class="settings-item"><span>中文</span></div>
            <div class="settings-item"><span>Português</span></div>
          </div>`
      },
      privacy: {
        title: 'Privacy',
        content: `
          <div class="settings-card">
            <div class="settings-item"><span>Private account</span><div class="toggle"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Who can message me</span><span class="settings-value">Everyone</span></div>
            <div class="settings-item"><span>Who can see my likes</span><span class="settings-value">Only me</span></div>
            <div class="settings-item"><span>Allow duets</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Allow stitch</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Allow downloads</span><div class="toggle"><div class="toggle-knob"></div></div></div>
          </div>`
      },
      security: {
        title: 'Security',
        content: `
          <div class="settings-card">
            <div class="settings-item"><span>2-step verification</span><div class="toggle active"><div class="toggle-knob"></div></div></div>
            <div class="settings-item"><span>Connected devices</span><span class="settings-value">2</span></div>
            <div class="settings-item"><span>Change password</span><svg class="settings-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
            <div class="settings-item"><span>Face ID / Touch ID</span><div class="toggle"><div class="toggle-knob"></div></div></div>
          </div>`
      },
      about: {
        title: 'About',
        content: `
          <div style="text-align:center;padding:40px 20px;">
            <div style="font-size:48px;margin-bottom:16px;">✦</div>
            <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">TokStudio</h2>
            <p style="color:var(--text-3);font-size:13px;margin-bottom:24px;">Version 1.0.0</p>
            <p style="color:var(--text-2);font-size:13px;line-height:1.6;">
              TokStudio is the next-generation video creation platform. 
              Create, share and discover incredible content.
            </p>
          </div>`
      }
    };

    document.querySelectorAll('[data-settings-sub]').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.dataset.settingsSub;
        const sub = subScreens[key];
        if (!sub) return;
        document.getElementById('sub-settings-title').textContent = sub.title;
        document.getElementById('sub-settings-content').innerHTML = sub.content;
        document.getElementById('settings-sub-screen').classList.add('open');
        document.querySelectorAll('#sub-settings-content .toggle').forEach(t => {
          t.addEventListener('click', function() { this.classList.toggle('active'); });
        });
        document.querySelectorAll('#sub-settings-content .settings-item').forEach(langItem => {
          langItem.addEventListener('click', () => {
            langItem.style.background = 'var(--glass)';
            setTimeout(() => langItem.style.background = '', 300);
          });
        });
      });
    });

    document.getElementById('btn-close-sub-settings').addEventListener('click', () => {
      document.getElementById('settings-sub-screen').classList.remove('open');
    });
  },

  // ===== BOTTOM SHEETS =====
  initSheets() {
    // Comments sheet
    document.getElementById('comments-close').addEventListener('click', () => {
      document.getElementById('comments-sheet').classList.remove('open');
    });
    document.getElementById('comments-sheet').addEventListener('click', e => {
      if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });

    // Comment input
    const commentInput = document.getElementById('comment-input');
    const commentPost = document.getElementById('comment-post');
    commentInput.addEventListener('input', () => {
      commentPost.classList.toggle('active', commentInput.value.trim().length > 0);
    });
    commentPost.addEventListener('click', () => {
      const text = commentInput.value.trim();
      if (!text) return;
      const list = document.getElementById('comments-list');
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.style.animation = 'slideUp 0.3s var(--ease)';
      item.innerHTML = `
        <div class="comment-avatar">M</div>
        <div class="comment-body">
          <span class="comment-user">me</span>
          <p class="comment-text">${text}</p>
          <div class="comment-meta"><span>now</span><button>Reply</button></div>
        </div>
        <div class="comment-like"><button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button><span>0</span></div>`;
      list.insertBefore(item, list.firstChild);
      commentInput.value = '';
      commentPost.classList.remove('active');
    });

    // Share sheet  
    document.getElementById('share-close').addEventListener('click', () => {
      document.getElementById('share-sheet').classList.remove('open');
    });
    document.getElementById('share-sheet').addEventListener('click', e => {
      if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
    });
    document.getElementById('share-copy-link').addEventListener('click', () => {
      const btn = document.getElementById('share-copy-link');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Copy link';
      }, 2000);
    });

    // Populate share grid
    const shareItems = [
      {icon:'💬',label:'WhatsApp',bg:'#25D366'},
      {icon:'📸',label:'Instagram',bg:'linear-gradient(135deg,#833AB4,#FD1D1D,#F77737)'},
      {icon:'🐦',label:'Twitter',bg:'#1DA1F2'},
      {icon:'📘',label:'Facebook',bg:'#1877F2'},
      {icon:'💌',label:'Message',bg:'#34C759'},
      {icon:'📧',label:'Email',bg:'#8B5CF6'},
      {icon:'📱',label:'Snapchat',bg:'#FFFC00'},
      {icon:'🔗',label:'Other',bg:'var(--surface-3)'},
    ];
    const shareGrid = document.getElementById('share-grid');
    shareItems.forEach(s => {
      const el = document.createElement('div');
      el.className = 'share-item';
      el.innerHTML = `<div class="share-icon" style="background:${s.bg}">${s.icon}</div><span class="share-label">${s.label}</span>`;
      el.addEventListener('click', () => {
        el.style.transform = 'scale(0.9)';
        setTimeout(() => el.style.transform = '', 200);
      });
      shareGrid.appendChild(el);
    });
  },

  // ===== STORY VIEWER =====
  initStoryViewer() {
    document.getElementById('story-viewer-close').addEventListener('click', () => {
      this.closeStoryViewer();
    });
    document.getElementById('story-viewer-content').addEventListener('click', e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x > rect.width / 2) {
        this.nextStory();
      } else {
        this.prevStory();
      }
    });
  },

  storyViewerData: null,
  storyIndex: 0,
  storyTimer: null,

  openStoryViewer(story, idx) {
    const storyContents = [
      {bg:'linear-gradient(135deg,#3a1a4a,#1a0a3a)',text:'New post coming soon! 🔥'},
      {bg:'linear-gradient(135deg,#0a3a2a,#1a4a3a)',text:'Studio session 🎵'},
      {bg:'linear-gradient(135deg,#3a2a0a,#4a3a1a)',text:'Golden hour vibes ✨'},
    ];
    this.storyViewerData = { story, contents: storyContents };
    this.storyIndex = 0;
    document.getElementById('story-viewer-avatar').textContent = story.initial;
    document.getElementById('story-viewer-name').textContent = story.name;
    this.renderStoryContent();
    document.getElementById('story-viewer').classList.add('open');
  },

  renderStoryContent() {
    if (!this.storyViewerData) return;
    const { contents } = this.storyViewerData;
    const content = contents[this.storyIndex];
    const el = document.getElementById('story-viewer-content');
    el.style.background = content.bg;
    el.textContent = content.text;

    const bar = document.getElementById('story-progress-bar');
    bar.innerHTML = '';
    contents.forEach((_, i) => {
      const seg = document.createElement('div');
      seg.className = 'story-progress-seg';
      if (i < this.storyIndex) seg.classList.add('done');
      if (i === this.storyIndex) seg.classList.add('active');
      seg.innerHTML = '<div class="fill"></div>';
      bar.appendChild(seg);
    });

    clearTimeout(this.storyTimer);
    this.storyTimer = setTimeout(() => this.nextStory(), 5000);
  },

  nextStory() {
    if (!this.storyViewerData) return;
    this.storyIndex++;
    if (this.storyIndex >= this.storyViewerData.contents.length) {
      this.closeStoryViewer();
      return;
    }
    this.renderStoryContent();
  },

  prevStory() {
    if (this.storyIndex > 0) {
      this.storyIndex--;
      this.renderStoryContent();
    }
  },

  closeStoryViewer() {
    clearTimeout(this.storyTimer);
    document.getElementById('story-viewer').classList.remove('open');
    this.storyViewerData = null;
  },

  // ===== COMMENTS SHEET OPEN =====
  openCommentsSheet(videoData) {
    const sheet = document.getElementById('comments-sheet');
    const list = document.getElementById('comments-list');
    document.getElementById('comments-count').textContent = `${videoData.comments} comments`;
    
    const mockComments = [
      {user:'sophia_art',initial:'S',text:'Omg so beautiful! 😍😍😍',likes:234,time:'2h'},
      {user:'alex.dev',initial:'A',text:'The level is rising 🔥',likes:89,time:'3h'},
      {user:'luna.creates',initial:'L',text:'Collab when? 👀',likes:156,time:'4h'},
      {user:'marcox',initial:'M',text:'First! 🥇',likes:12,time:'5h'},
      {user:'design.daily',initial:'D',text:'The colors are incredible, where was this shot?',likes:67,time:'5h'},
      {user:'jay_music',initial:'J',text:'The sound is perfect 🎵',likes:45,time:'6h'},
      {user:'emma.vibes',initial:'E',text:'Obsessed with this video 💫',likes:198,time:'7h'},
      {user:'neon.dreams',initial:'N',text:'Quality content as always 🌟',likes:78,time:'8h'},
      {user:'cook.master',initial:'K',text:'I love the vibe!',likes:23,time:'9h'},
      {user:'tech.wizard',initial:'T',text:'How do you do the editing? 🤔',likes:34,time:'10h'},
      {user:'creative.hub',initial:'C',text:'Makes me want to go there 😭',likes:112,time:'11h'},
      {user:'photo.life',initial:'P',text:'The composition is perfect 📸',likes:56,time:'12h'},
      {user:'art.zone',initial:'A',text:'Stunning! 🎨',likes:89,time:'13h'},
      {user:'vibes.only',initial:'V',text:'Aesthetic goals fr fr',likes:167,time:'14h'},
      {user:'daily.inspo',initial:'D',text:'Saving this immediately 🔖',likes:45,time:'15h'},
      {user:'mood.board',initial:'M',text:'The energy of this video 💥',likes:78,time:'16h'},
      {user:'style.zone',initial:'S',text:'Outfit check??? 👀',likes:34,time:'17h'},
      {user:'chill.vibes',initial:'C',text:'So relaxing I love it ☁️',likes:23,time:'18h'},
      {user:'night.owl',initial:'N',text:'Watching this at 3am and no regrets 😂',likes:234,time:'19h'},
      {user:'sunrise.co',initial:'S',text:'We need a part 2! 🙏',likes:145,time:'20h'},
      {user:'dream.team',initial:'D',text:'The talent is REAL',likes:67,time:'21h'},
      {user:'pixel.art',initial:'P',text:'Every frame is a painting 🖼️',likes:89,time:'1d'},
    ];

    list.innerHTML = '';
    mockComments.forEach(c => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <div class="comment-avatar">${c.initial}</div>
        <div class="comment-body">
          <span class="comment-user">@${c.user}</span>
          <p class="comment-text">${c.text}</p>
          <div class="comment-meta"><span>${c.time}</span><button>Reply</button></div>
        </div>
        <div class="comment-like">
          <button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
          <span>${c.likes}</span>
        </div>`;
      const likeBtn = item.querySelector('.comment-like button');
      likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        const countEl = item.querySelector('.comment-like span');
        const count = parseInt(countEl.textContent);
        countEl.textContent = likeBtn.classList.contains('liked') ? count + 1 : count - 1;
      });
      list.appendChild(item);
    });
    sheet.classList.add('open');
  },

  openShareSheet() {
    document.getElementById('share-sheet').classList.add('open');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
