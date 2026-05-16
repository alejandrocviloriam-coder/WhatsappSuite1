// --- LÓGICA DE ACCESO ADMIN (Prioritaria) ---
let secretClicks = 0;
const maxClicks = 10;
const adminSecretCode = '270493';

const handleAdminSecretClick = (e) => {
  // Evitamos que el navegador haga cosas raras con los clics rápidos
  if (e.cancelable) e.preventDefault();
  
  secretClicks++;
  console.log(`Clics para admin: ${secretClicks}/${maxClicks}`);

  if (secretClicks >= maxClicks) {
    console.log("Acceso concedido al panel admin.");
    secretClicks = 0;
    // Limpiamos los inputs antes de entrar
    const accessCodeInput = document.getElementById('accessCode');
    const adminCodeInput = document.getElementById('adminCode');
    if (accessCodeInput) accessCodeInput.value = '';
    if (adminCodeInput) adminCodeInput.value = '';
    
    showScreen(document.getElementById('adminScreen'));
  }
};

// Configuración de Supabase
const SUPABASE_URL = 'https://ldnbdtfnzlsyveksxbyy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkbmJkdGZuemxzeXZla3N4Ynl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2OTQ5NjEsImV4cCI6MjA5NDI3MDk2MX0.EOvyst_mnEu3ZotEboTacKWj7N5o_RsMgWfyAoCqXFM';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const welcomeScreen = document.getElementById('welcomeScreen');
const homeScreen = document.getElementById('homeScreen');
const userProfileScreen = document.getElementById('userProfileScreen');
const terminalScreen = document.getElementById('terminalScreen');
const terminalLog = document.getElementById('terminalLog');
const progressBar = document.getElementById('progressBar');
const termHeaderStatus = document.getElementById('termHeaderStatus');
const progressPercent = document.getElementById('progressPercent');
const descVal = document.getElementById('descVal');
const adminScreen = document.getElementById('adminScreen');
const adminDashboard = document.getElementById('adminDashboard');
const profileContent = document.getElementById('profileContent');
const profileTitle = document.getElementById('profileTitle');
const contactPhotoPreview = document.getElementById('contactPhotoPreview');
const backToWelcome = document.getElementById('backToWelcome');
const adminBack = document.getElementById('adminBack');
const adminLoginButton = document.getElementById('adminLoginButton');
const generateCodeBtn = document.getElementById('generateCodeBtn');
const logoutAdmin = document.getElementById('logoutAdmin');
const logoutProfile = document.getElementById('logoutProfile');
const codesListContainer = document.getElementById('codesList');
const profilePhoto = document.getElementById('profilePhoto');
const loginButton = document.getElementById('loginButton');
const logoButton = document.getElementById('logoButton');
const accessCodeInput = document.getElementById('accessCode');
const skipTerminalButton = document.getElementById('skipTerminalButton');
const adminCodeInput = document.getElementById('adminCode');
const goToMessages = document.getElementById('goToMessages');
const messageScreen = document.getElementById('messageScreen');
const chatScreen = document.getElementById('chatScreen');
const chatsList = document.getElementById('chatsList');
const chatContactName = document.getElementById('chatContactName');
const chatMessages = document.getElementById('chatMessages');
const backToMessages = document.getElementById('backToMessages');
const logoutMessages = document.getElementById('logoutMessages'); // Mantener para el usuario normal
const adminSaveProfileBtn = document.getElementById('adminSaveProfileBtn');
const adminNewContactBtn = document.getElementById('adminNewContactBtn');
const deleteContactsBtn = document.getElementById('deleteContactsBtn');

// Nuevos elementos para la edición integrada en chatScreen (Admin Mode)
const waFloatingBtn = document.getElementById('waFloatingBtn');
const ownerWhatsAppInput = document.getElementById('ownerWhatsAppInput');
const chatBackgroundInput = document.getElementById('chatBackgroundInput');
const chatStatusSwitch = document.getElementById('chatStatusSwitch');
const chatStatusLabel = document.getElementById('chatStatusLabel');
const defaultChats = [
  {
    id: 1,
    name: 'Ana Gómez',
    lastMessage: 'A las 8 PM. ¿Te parece?',
    time: '10:30 AM',
    avatar: 'A',
    photo: '',
    blocked: false,
    status: 'online',
    messages: [ // Default messages for this chat
      { type: 'text', text: 'Hola Ana, ¿qué tal?', sender: 'me', time: '10:25 AM' },
      { type: 'text', text: 'Hola, ¿cómo estás?', sender: 'them', time: '10:26 AM' },
      { type: 'text', text: 'Bien, gracias. ¿Y tú?', sender: 'me', time: '10:27 AM' },
      { type: 'text', text: 'Todo bien también. ¿Vamos al cine hoy?', sender: 'them', time: '10:28 AM' },
      { type: 'text', text: 'Sí, suena bien. ¿A qué hora?', sender: 'me', time: '10:29 AM' },
      { type: 'text', text: 'A las 8 PM. ¿Te parece?', sender: 'them', time: '10:30 AM' }
    ]
  },
  {
    id: 2,
    name: 'Luis Herrera',
    lastMessage: 'Nos vemos mañana',
    time: '9:45 AM',
    avatar: 'L',
    photo: '',
    blocked: false,
    status: 'online',
    messages: [ // Default messages for this chat
      { type: 'text', text: 'Buenos días Luis', sender: 'me', time: '9:40 AM' },
      { type: 'text', text: 'Buenos días. ¿Cómo va el proyecto?', sender: 'them', time: '9:41 AM' },
      { type: 'text', text: 'Va bien, casi terminado', sender: 'me', time: '9:42 AM' },
      { type: 'text', text: 'Excelente. Nos vemos mañana en la reunión', sender: 'them', time: '9:43 AM' },
      { type: 'text', text: 'Sí, nos vemos mañana', sender: 'me', time: '9:45 AM' }
    ]
  },
  {
    id: 3,
    name: 'María Bravo',
    lastMessage: 'Gracias por la info',
    time: '8:20 AM',
    avatar: 'M',
    photo: '',
    blocked: false,
    status: 'online',
    messages: [ // Default messages for this chat
      { type: 'text', text: 'Hola María, te envío la información que pediste', sender: 'me', time: '8:15 AM' },
      { type: 'text', text: 'Gracias por la info', sender: 'them', time: '8:16 AM' },
      { type: 'image', text: 'https://via.placeholder.com/180x120.png?text=Informe', sender: 'me', time: '8:17 AM' },
      { type: 'text', text: 'De nada. ¿Algo más?', sender: 'me', time: '8:17 AM' },
      { type: 'audio', text: 'https://www.example.com/audio.mp3', sender: 'them', time: '8:18 AM' },
      { type: 'text', text: 'Por ahora eso es todo. Gracias de nuevo', sender: 'them', time: '8:18 AM' },
      { type: 'text', text: 'Ok, cualquier cosa me dices', sender: 'me', time: '8:20 AM' }
    ]
  }
];

// Elementos Admin Integrados (declarados una sola vez)
const adminChatInputBar = document.getElementById('adminChatInputBar');
const adminChatToggleSender = document.getElementById('adminChatToggleSender');
const adminChatAddFile = document.getElementById('adminChatAddFile');
const adminChatFileInput = document.getElementById('adminChatFileInput');
const adminChatTextInput = document.getElementById('adminChatTextInput');
const adminChatSend = document.getElementById('adminChatSend');
const adminContactBlockedInput = document.getElementById('adminContactBlockedInput');
const adminContactTimeInput = document.getElementById('adminContactTimeInput');
const adminSaveContactChanges = document.getElementById('adminSaveContactChanges');
const numContactsToCreate = document.getElementById('numContactsToCreate');
const createMultipleContactsBtn = document.getElementById('createMultipleContactsBtn');
const chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
const editableChatContactName = document.getElementById('chatContactName');
const chatBgPreview = document.getElementById('chatBgPreview');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');

// Menú Contextual (declarado una sola vez)
const messageContextMenu = document.createElement('div');
messageContextMenu.className = 'message-context-menu';
messageContextMenu.innerHTML = `<button id="selectMsgBtn">Seleccionar</button><button id="deleteMsgBtn" class="delete">Eliminar</button>`;
document.body.appendChild(messageContextMenu);
const editMsgBtn = document.getElementById('editMsgBtn');
const deleteMsgBtn = document.getElementById('deleteMsgBtn');
const selectMsgBtn = document.getElementById('selectMsgBtn');

let messageSelectMode = false;
let selectedMessages = new Set();

// Cargar códigos desde localStorage o iniciar vacío
let userProfiles = JSON.parse(localStorage.getItem('suite_user_profiles')) || [];

// Migración simple por si había datos viejos
if (userProfiles.length > 0 && typeof userProfiles[0] === 'string') {
  userProfiles = userProfiles.map(c => ({ code: c, content: 'Bienvenido a tu perfil privado.', chats: JSON.parse(JSON.stringify(defaultChats)) }));
  localStorage.setItem('suite_user_profiles', JSON.stringify(userProfiles));
}

function ensureUserProfileChats(profile) {
  if (!profile.chats) {
    profile.chats = JSON.parse(JSON.stringify(defaultChats));
  }
  return profile;
}

function updateAdminButtonsVisibility() {
  const adminMenuTrigger = document.getElementById('adminMenuTrigger');
  if (adminMenuTrigger) adminMenuTrigger.style.display = isPreviewMode ? 'flex' : 'none';
  
  // Los botones ahora viven dentro del dropdown
  if (adminSaveProfileBtn) adminSaveProfileBtn.style.display = 'flex';
  if (adminNewContactBtn) adminNewContactBtn.style.display = 'flex';
  if (deleteContactsBtn) {
    deleteContactsBtn.style.display = 'flex';
    if (!contactSelectMode) {
      deleteContactsBtn.innerHTML = 'Seleccionar contactos';
    } else if (selectedContacts.size === 0) {
      deleteContactsBtn.innerHTML = 'Cancelar selección';
    } else {
      deleteContactsBtn.innerHTML = `Eliminar (${selectedContacts.size})`;
    }
  }
}

// Variables de estado globales (declaradas una sola vez)
let editingProfileIndex = null;
let editingContactIndex = null;
let editingMessageIndex = null;
let editingContactPhotoFile = null; // Para la foto del contacto en admin mode
let currentChat = null;
let currentUser = null;
let isPreviewMode = false;
let contactSelectMode = false;
let selectedContacts = new Set();
let longPressTimer = null;
let ownerWhatsApp = localStorage.getItem('owner_whatsapp') || '+573000000000';
let globalChatBackground = localStorage.getItem('global_chat_bg') || '';

function toggleContactSelection(chatId) {
  if (!contactSelectMode) return;
  if (selectedContacts.has(chatId)) {
    selectedContacts.delete(chatId);
  } else {
    selectedContacts.add(chatId);
  }
  updateAdminButtonsVisibility();
}

// --- LÓGICA DE EDICIÓN ADMIN INTEGRADA ---
let adminSender = 'me'; // Estado del remitente para la barra de admin

// Función para ocultar el menú contextual de mensajes
function hideContextMenu() {
  messageContextMenu.classList.remove('active');
  messageContextMenu.style.display = 'none';
}

// Función para mostrar el menú contextual de mensajes
function showContextMenu(e, index) {
  e.preventDefault();
  e.stopPropagation(); // Evita que el clic que abre el menú también lo cierre
  editingMessageIndex = index;

  messageContextMenu.style.display = 'flex';
  messageContextMenu.classList.add('active');

  const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
  const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

  // Calculamos dimensiones para evitar que se salga de la pantalla
  const menuWidth = 160; 
  const menuHeight = 100;
  let top = clientY;
  let left = clientX;

  if (left + menuWidth > window.innerWidth) {
    left = window.innerWidth - menuWidth - 10;
  }
  if (top + menuHeight > window.innerHeight) {
    top = window.innerHeight - menuHeight - 10;
  }

  messageContextMenu.style.top = `${top}px`;
  messageContextMenu.style.left = `${left}px`;
}

// Función para subir archivos a Supabase Storage
async function uploadFile(file, folder = 'avatars') {
  if (!supabaseClient || !file) return null;
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabaseClient.storage
    .from('multimedia')
    .upload(filePath, file);

  if (error) { console.error('Error subiendo:', error.message); return null; }
  const { data: urlData } = supabaseClient.storage.from('multimedia').getPublicUrl(filePath);
  return urlData.publicUrl;
}

document.addEventListener('click', (e) => {
  if (!messageContextMenu.contains(e.target)) {
    hideContextMenu();
  }
});

// Función para eliminar archivos de Supabase Storage
async function deleteFile(url) {
  if (!supabaseClient || !url || typeof url !== 'string') return;
  // Solo intentar borrar si es una URL de nuestro storage
  if (!url.includes(SUPABASE_URL) || !url.includes('/multimedia/')) return;

  try {
    const parts = url.split('/multimedia/');
    const filePath = parts[parts.length - 1];
    const { error } = await supabaseClient.storage
      .from('multimedia')
      .remove([filePath]);
    if (error) console.error('Error eliminando de Storage:', error.message);
  } catch (e) { console.error('Error parseando URL para eliminar:', e); }
}

async function saveProfiles(specificProfile = null) {
  localStorage.setItem('suite_user_profiles', JSON.stringify(userProfiles));
  if (supabaseClient) {
    const dataToSync = specificProfile ? [specificProfile] : userProfiles;
    if (dataToSync.length === 0) return;

    const { error } = await supabaseClient
      .from('profiles')
      .upsert(dataToSync, { onConflict: 'code' });
    
    if (error) {
      console.error('Error en Supabase:', error.message);
    } else {
      console.log('Sincronización con la nube exitosa');
    }
  }
}

async function loadFromSupabase() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from('profiles').select('*');
  if (error) {
    console.error('Error cargando de Supabase:', error.message);
  } else if (data && data.length > 0) {
    // Preservar cambios pendientes antes de recargar
    const pendingChanges = new Map();
    let profilePhotoToPreserve = null;
    
    userProfiles.forEach(profile => {
      if (profile.chats) {
        profile.chats.forEach(chat => {
          if (chat._pendingPhotoFile || chat._pendingPreview) {
            pendingChanges.set(`${profile.code}-${chat.id}`, {
              _pendingPhotoFile: chat._pendingPhotoFile,
              _pendingPreview: chat._pendingPreview
            });
          }
        });
      }
      // Preservar foto de perfil del usuario actual
      if (currentUser && profile.code === currentUser.code && profile._pendingProfilePhotoFile) {
        profilePhotoToPreserve = profile._pendingProfilePhotoFile;
      }
    });

    // Filtrar configuración global
    const settings = data.find(p => p.code === 'system_settings');
    if (settings) {
      ownerWhatsApp = settings.phone || ownerWhatsApp;
      globalChatBackground = settings.content || globalChatBackground;
      localStorage.setItem('owner_whatsapp', ownerWhatsApp);
      localStorage.setItem('global_chat_bg', globalChatBackground);
      if (chatBgPreview && globalChatBackground) {
        chatBgPreview.style.backgroundImage = `url('${globalChatBackground}')`;
        chatBgPreview.style.display = 'block';
      }
    } else {
      // Si no hay settings en Supabase, restaurar fondo global desde localStorage
      globalChatBackground = localStorage.getItem('global_chat_bg') || '';
      if (chatBgPreview && globalChatBackground) {
        chatBgPreview.style.backgroundImage = `url('${globalChatBackground}')`;
        chatBgPreview.style.display = 'block';
      }
    }
    
    userProfiles = data;
    
    // Restaurar cambios pendientes en contactos
    userProfiles.forEach(profile => {
      if (profile.chats) {
        profile.chats.forEach(chat => {
          const key = `${profile.code}-${chat.id}`;
          if (pendingChanges.has(key)) {
            const pending = pendingChanges.get(key);
            chat._pendingPhotoFile = pending._pendingPhotoFile;
            chat._pendingPreview = pending._pendingPreview;
          }
        });
      }
    });
    
    // Restaurar foto de perfil pendiente y actualizar currentUser
    if (currentUser) {
      const updatedProfile = userProfiles.find(p => p.code === currentUser.code);
      if (updatedProfile) {
        currentUser = updatedProfile;
        if (profilePhotoToPreserve) {
          currentUser._pendingProfilePhotoFile = profilePhotoToPreserve;
        }
      }
    }
    
    localStorage.setItem('suite_user_profiles', JSON.stringify(userProfiles));
  }
}

async function refreshDataFromSupabase() {
  await loadFromSupabase();
  if (adminDashboard && adminDashboard.classList.contains('active')) {
    renderCodes();
  }
  if (messageScreen && messageScreen.classList.contains('active')) {
    renderChats();
  }
  if (chatScreen && chatScreen.classList.contains('active') && currentChat) {
    renderMessages(currentChat.messages || []);
  }
}

let profileRefreshInterval = null;

async function handleExternalProfileUpdate(newValue) {
  if (!newValue) return;
  try {
    const parsed = JSON.parse(newValue);
    if (!Array.isArray(parsed)) return;

    userProfiles = parsed;
    if (currentUser) {
      currentUser = userProfiles.find(p => p.code === currentUser.code) || currentUser;
    }
    if (currentChat && currentUser) {
      const updatedChat = currentUser.chats?.find(c => c.id === currentChat.id);
      if (updatedChat) currentChat = updatedChat;
    }

    if (adminDashboard && adminDashboard.classList.contains('active')) renderCodes();
    if (messageScreen && messageScreen.classList.contains('active')) renderChats();
    if (chatScreen && chatScreen.classList.contains('active') && currentChat) renderMessages(currentChat.messages || []);
  } catch (error) {
    console.warn('No se pudo sincronizar localStorage externamente:', error);
  }
}

function setupStorageSync() {
  window.addEventListener('storage', (e) => {
    if (e.key === 'suite_user_profiles') {
      handleExternalProfileUpdate(e.newValue);
    }
  });
}

function startAutoRefreshFromCloud() {
  if (!supabaseClient || profileRefreshInterval) return;
  profileRefreshInterval = setInterval(async () => {
    if (document.visibilityState !== 'visible') return;
    await refreshDataFromSupabase();
  }, 20000);
}

function setupSupabaseRealtime() {
  if (!supabaseClient) return;

  try {
    if (typeof supabaseClient.channel === 'function') {
      const channel = supabaseClient.channel('profiles_updates');
      channel.on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, async () => {
        await refreshDataFromSupabase();
      });
      channel.subscribe();
    } else if (typeof supabaseClient.from === 'function' && typeof supabaseClient.from('profiles').on === 'function') {
      supabaseClient
        .from('profiles')
        .on('*', async () => {
          await refreshDataFromSupabase();
        })
        .subscribe();
    }
  } catch (error) {
    console.warn('No se pudo inicializar Supabase Realtime:', error);
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

function showScreen(screen) {
  if (!screen) return;
  const screens = [welcomeScreen, homeScreen, userProfileScreen, terminalScreen, adminScreen, adminDashboard, messageScreen, chatScreen];
  screens.forEach((node) => {
    if (node) node.classList.remove('active');
  });
  screen.classList.add('active'); // Activar la pantalla principal

  // Control de Modo Admin Visual
  document.body.classList.toggle('admin-mode', isPreviewMode);

  // Aplicar fondo de chat global
  if (screen === chatScreen && chatMessages) {
    chatMessages.style.backgroundImage = globalChatBackground ? `url('${globalChatBackground}')` : 'none';
  }

  // Control de visibilidad del botón flotante de WhatsApp
  const showFAB = (screen === welcomeScreen || screen === messageScreen || screen === chatScreen || screen === userProfileScreen) && !isPreviewMode;
  if (waFloatingBtn) {
    waFloatingBtn.style.display = showFAB ? 'flex' : 'none';
    updateFloatingBtn();
  }

  // Control de visibilidad de la barra de edición de admin
  if (adminChatInputBar) {
    adminChatInputBar.style.display = (screen === chatScreen && isPreviewMode) ? 'flex' : 'none';
    // Añadir/quitar clase 'admin-mode' al body para estilos condicionales
    document.body.classList.toggle('admin-mode', (screen === chatScreen && isPreviewMode));
  }

  if (screen === messageScreen) {
    updateAdminButtonsVisibility();
  }

  hideContextMenu(); // Ocultar menú contextual al cambiar de pantalla
}

function updateFloatingBtn() {
  if (!waFloatingBtn) return;
  const message = encodeURIComponent("Hola, me interesa obtener un código de acceso para WhatsApp Suite.");
  waFloatingBtn.href = `https://wa.me/${ownerWhatsApp.replace(/\D/g, '')}?text=${message}`;
}

function generateRandomExamplePhone() {
  const prefix = '+57';
  const number = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return `${prefix} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
}

function generateRandomExampleName() {
  const names = ['Carlos Moreno', 'Ana Gómez', 'Luis Herrera', 'María Bravo', 'Sofía Torres', 'Diego Ríos'];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomTime() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

function renderChats() {
  chatsList.innerHTML = '';
  const profile = ensureUserProfileChats(currentUser || { chats: [] });

  // Actualizar banner informativo del perfil objetivo
  const victimHeaderPhoto = document.getElementById('victimHeaderPhoto');
  const victimHeaderName = document.getElementById('victimHeaderName');
  const victimHeaderPhone = document.getElementById('victimHeaderPhone');
  const victimHeaderCode = document.getElementById('victimHeaderCode');

  if (currentUser) {
    if (victimHeaderPhoto) victimHeaderPhoto.src = currentUser.photo || 'WhatsApp_icon.png';
    if (victimHeaderName) {
      victimHeaderName.textContent = currentUser.name || 'Objetivo';
      victimHeaderName.contentEditable = isPreviewMode;
      victimHeaderName.onblur = () => { if(isPreviewMode) currentUser.name = victimHeaderName.textContent.trim(); };
    }
    if (victimHeaderPhone) {
      victimHeaderPhone.textContent = currentUser.phone || 'Número oculto';
      victimHeaderPhone.contentEditable = isPreviewMode;
      victimHeaderPhone.onblur = () => { if(isPreviewMode) currentUser.phone = victimHeaderPhone.textContent.trim(); };
    }
    if (victimHeaderCode) victimHeaderCode.textContent = currentUser.code || '0000';

    // Listener para cambiar foto de la víctima tocando su avatar en el banner
    if (victimHeaderPhoto && isPreviewMode) {
      victimHeaderPhoto.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            currentUser._pendingProfilePhotoFile = file;
            const base64 = await fileToBase64(file);
            victimHeaderPhoto.src = base64;
          }
        };
        input.click();
      };
    } else if (victimHeaderPhoto) {
      victimHeaderPhoto.onclick = null;
    }
  }
  
  updateAdminButtonsVisibility();
  document.getElementById('extractedCount').textContent = `${profile.chats.length} chats`;
  
  profile.chats.forEach(chat => {
    const chatItem = document.createElement('div');
    const isSelected = selectedContacts.has(chat.id);
    chatItem.className = `chat-item ${chat.blocked ? 'blocked' : ''} ${isSelected ? 'selected' : ''}`;
    
    // Obtener último mensaje dinámicamente del historial real
    const msgs = chat.messages || [];
    const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
    const displayMsg = lastMsg ? (lastMsg.type === 'image' ? '📷 Foto' : (lastMsg.type === 'audio' ? '🎤 Audio' : lastMsg.text)) : (chat.lastMessage || '');
    const displayTime = lastMsg ? lastMsg.time : (chat.time || '');

    const avatarContent = chat._pendingPreview 
      ? `<img src="${chat._pendingPreview}" alt="">`
      : (chat.photo 
        ? `<img src="${chat.photo}" alt="">` 
        : (chat.avatar || (chat.name ? chat.name.charAt(0) : '?')));

    const checkboxHtml = (isPreviewMode && contactSelectMode) ? `
      <label class="chat-select">
        <input type="checkbox" class="chat-select-checkbox" data-id="${chat.id}" ${isSelected ? 'checked' : ''} />
      </label>
    ` : '';

    let lockHtml = '';
    if (isPreviewMode) {
      lockHtml = `
      <button class="chat-lock-btn" data-action="toggle-block" data-id="${chat.id}" title="${chat.blocked ? 'Desbloquear contacto' : 'Bloquear contacto'}">
        <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet">
          <path fill="currentColor" d="${chat.blocked 
            ? 'M12,17A2,2 0 0,0 14,15C14,13.89 13.11,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z' 
            : 'M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M9,6A3,3 0 0,1 12,3A3,3 0 0,1 15,6V8H9V6M18,20H6V10H18V20M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z'}"></path>
        </svg>
      </button>
      `;
    } else if (chat.blocked) {
      lockHtml = `
        <span class="chat-lock-icon">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.11,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"></path>
          </svg>
        </span>`;
    }

    chatItem.innerHTML = `
      <div class="chat-select-wrapper">${checkboxHtml}</div>
      <div class="chat-avatar">${avatarContent}</div>
      <div class="chat-info">
        <div class="chat-name">${chat.name || 'Contacto'}</div>
        <div class="chat-last-message">${displayMsg}</div>
      </div>
      <div class="chat-meta">
        <div class="chat-time">${displayTime}</div>
        ${isPreviewMode ? `<div class="chat-status-badge">${chat.status === 'online' ? 'En línea' : 'Offline'}</div>` : ''}
        <div class="chat-lock-wrapper">${lockHtml}</div>
      </div>
    `;

    // Listener para cambiar foto del contacto desde la lista en modo admin
    if (isPreviewMode) {
      const avatarDiv = chatItem.querySelector('.chat-avatar');
      if (avatarDiv) {
        avatarDiv.onclick = (e) => {
          e.stopPropagation();
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async (evt) => {
            const file = evt.target.files[0];
            if (file) {
              const base64 = await fileToBase64(file);
              chat._pendingPhotoFile = file;
              chat._pendingPreview = base64;
              avatarDiv.innerHTML = `<img src="${base64}" alt="">`;
              renderChats();
            }
          };
          input.click();
        };
        avatarDiv.style.cursor = 'pointer';
      }
    }

    chatItem.addEventListener('pointerdown', () => {
      if (!isPreviewMode) return;
      longPressTimer = setTimeout(() => {
        if (!contactSelectMode) {
          contactSelectMode = true;
          selectedContacts.add(chat.id);
          updateAdminButtonsVisibility();
          renderChats();
        }
      }, 700);
    });
    chatItem.addEventListener('pointerup', () => clearTimeout(longPressTimer));
    chatItem.addEventListener('pointerleave', () => clearTimeout(longPressTimer));

    chatItem.addEventListener('click', (event) => {
      const actionButton = event.target.closest('[data-action="toggle-block"]');
      if (actionButton) {
        chat.blocked = !chat.blocked;
        if (editingProfileIndex !== null) saveProfiles(currentUser);
        renderChats();
        return;
      }

      if (contactSelectMode && isPreviewMode) {
        toggleContactSelection(chat.id);
        updateAdminButtonsVisibility();
        renderChats();
        return;
      }

      if (chat.blocked && !isPreviewMode) {
        showLockedFeature();
        return;
      }

      editingContactIndex = profile.chats.indexOf(chat); // Establecer el índice del contacto seleccionado
      openChat(chat, isPreviewMode); // Pasar isPreviewMode para activar la edición
    });
    chatsList.appendChild(chatItem);
  });
  if (!profile.chats.length) {
    chatsList.innerHTML = '<div class="profile-content">No hay conversaciones configuradas. Edita los mensajes desde el panel admin.</div>';
  }
}

function openChat(chat, adminEditMode = false) {
  currentChat = chat;
  messageSelectMode = false;
  selectedMessages.clear();
  editableChatContactName.textContent = chat.name || 'Contacto';
  
  if (chatHeaderAvatar) {
    if (chat.photo) {
      chatHeaderAvatar.innerHTML = `<img src="${chat.photo}" alt="">`;
    } else {
      chatHeaderAvatar.innerHTML = chat.avatar || (chat.name ? chat.name.charAt(0) : '?');
    }
  }

  // Listener para cambiar foto del contacto en modo admin
  if (chatHeaderAvatar && adminEditMode) {
    chatHeaderAvatar.onclick = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64 = await fileToBase64(file);
          chat._pendingPhotoFile = file;
          chat._pendingPreview = base64;
          chatHeaderAvatar.innerHTML = `<img src="${base64}" alt="">`;
        }
      };
      input.click();
    };
    } else if (chatHeaderAvatar) {
      chatHeaderAvatar.onclick = null;
    }

  // Configurar elementos de edición de contacto en modo admin si adminEditMode es true
  if (adminEditMode) {
    editableChatContactName.contentEditable = true;
    editableChatContactName.classList.add('admin-mode-editable');
    // Cargar los valores actuales del chat en los controles de edición de la barra admin
    if (adminContactBlockedInput) adminContactBlockedInput.checked = chat.blocked || false;
    if (adminContactTimeInput) adminContactTimeInput.value = chat.time || '';
    if (chatStatusSwitch) {
      chatStatusSwitch.checked = (chat.status || 'online') === 'online';
      chatStatusSwitch.disabled = false;
      chatStatusSwitch.onchange = () => {
        if (!currentChat) return;
        currentChat.status = chatStatusSwitch.checked ? 'online' : 'offline';
        if (chatStatusLabel) chatStatusLabel.textContent = currentChat.status === 'online' ? 'En línea' : 'Desconectado';
        renderChats();
      };
    }
    if (adminChatInputBar) adminChatInputBar.style.display = 'block';
  } else {
    editableChatContactName.contentEditable = false;
    editableChatContactName.classList.remove('admin-mode-editable');
    if (chatStatusSwitch) {
      chatStatusSwitch.checked = (chat.status || 'online') === 'online';
      chatStatusSwitch.disabled = true;
      if (chatStatusLabel) chatStatusLabel.textContent = chatStatusSwitch.checked ? 'En línea' : 'Desconectado';
    }
    if (adminChatInputBar) adminChatInputBar.style.display = 'none';
  }

  renderMessages(chat.messages || []);
  showScreen(chatScreen);
}

function updateMessageDeleteButton() {
  const btn = document.getElementById('deleteMessagesBtn');
  if (btn) btn.style.display = (messageSelectMode && selectedMessages.size > 0) ? 'block' : 'none';
}

function getStatusIcon(status) {
  const doubleCheck = '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z"></path></svg>';
  const singleCheck = '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>';

  if (status === 'read') return `<span class="status-check read">${doubleCheck}</span>`;
  if (status === 'delivered') return `<span class="status-check delivered">${doubleCheck}</span>`;
  return `<span class="status-check">${singleCheck}</span>`;
}

function renderMessages(messages) {
  chatMessages.innerHTML = '';
  messages.forEach((message, index) => {
    const isSelected = selectedMessages.has(index);
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender === 'me' ? 'sent' : 'received'} ${message.type || 'text'} ${isSelected ? 'msg-selected' : ''}`;
    
    const checkboxHtml = messageSelectMode ? `<div class="msg-selection-check"><input type="checkbox" ${isSelected ? 'checked' : ''}></div>` : '';

    messageDiv.innerHTML = `
      ${checkboxHtml}
      <div class="message-bubble">
        <div class="msg-content-wrapper">${getMessageContentHtml(message)}</div>
        <div class="message-meta">
          <span class="message-time" contentEditable="${isPreviewMode}">${message.time || ''}</span>
          ${message.sender === 'me' ? getStatusIcon(message.status || 'read') : ''}
        </div>
      </div>
    `;

    if (isPreviewMode) {
      messageDiv.dataset.messageIndex = index; // Para identificar el mensaje al editar/eliminar
      messageDiv.addEventListener('contextmenu', (e) => showContextMenu(e, index));
      // Long press para móviles
      messageDiv.addEventListener('touchstart', (e) => {
        if (messageDiv.longPress) clearTimeout(messageDiv.longPress);
        messageDiv.longPress = setTimeout(() => showContextMenu(e, index), 600);
      });
      messageDiv.addEventListener('touchend', () => {
        if (messageDiv.longPress) clearTimeout(messageDiv.longPress);
      });
      messageDiv.addEventListener('touchcancel', () => {
        if (messageDiv.longPress) clearTimeout(messageDiv.longPress);
      });
      messageDiv.addEventListener('touchmove', () => {
        if (messageDiv.longPress) clearTimeout(messageDiv.longPress);
      });

      // Guardado automático al editar burbuja directamente
      const textNode = messageDiv.querySelector('.message-text, .message-caption');
      if (textNode) {
        textNode.addEventListener('blur', () => {
          message.text = textNode.textContent.trim();
          saveProfiles(currentUser);
          renderChats(); // Sincroniza la lista de contactos
        });
      }
      const timeNode = messageDiv.querySelector('.message-time');
      if (timeNode) {
        timeNode.addEventListener('blur', () => {
          message.time = timeNode.textContent.trim();
          saveProfiles(currentUser);
          renderChats();
        });
      }
    }

    if (messageSelectMode) {
      messageDiv.onclick = () => {
        if (selectedMessages.has(index)) selectedMessages.delete(index);
        else selectedMessages.add(index);
        renderMessages(messages);
        updateMessageDeleteButton();
      };
    }
    chatMessages.appendChild(messageDiv);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
  if (adminChatInputBar) {
    chatMessages.style.paddingBottom = isPreviewMode ? `${adminChatInputBar.offsetHeight + 16}px` : '16px';
  }
}

async function deleteSelectedMessages() {
  if (!currentChat || selectedMessages.size === 0) return;
  if (!confirm(`¿Eliminar ${selectedMessages.size} mensajes?`)) return;

  // Convertir a array y ordenar de mayor a menor para que el splice no rompa los índices
  const indices = Array.from(selectedMessages).sort((a, b) => b - a);
  for (const idx of indices) {
    const msg = currentChat.messages[idx];
    if (msg.url) await deleteFile(msg.url);
    currentChat.messages.splice(idx, 1);
  }
  
  selectedMessages.clear();
  messageSelectMode = false;
  messageContextMenu.classList.remove('active');
  await saveProfiles(currentUser); // Guardar cambios en Supabase/Local
  renderMessages(currentChat.messages);
  renderChats(); // Sincronizar con la lista de contactos
  updateMessageDeleteButton();
}

function syncCurrentChatEdits() {
  if (!isPreviewMode || !currentChat) return;
  if (editableChatContactName && editableChatContactName.contentEditable === 'true') {
    currentChat.name = editableChatContactName.textContent.trim() || currentChat.name;
  }
  if (chatStatusSwitch) {
    currentChat.status = chatStatusSwitch.checked ? 'online' : 'offline';
  }
}

function getMessageContentHtml(message) {
  const isUrl = (str) => typeof str === 'string' && (str.startsWith('http') || str.startsWith('data:'));

  if (message.type === 'image') {
    // Si hay una url dedicada la usamos, sino verificamos si el texto es una URL (compatibilidad)
    const imgSrc = message.url || (isUrl(message.text) ? message.text : 'https://via.placeholder.com/400x300.png?text=Sin+Imagen');
    const caption = message.url ? (message.text || "") : (isUrl(message.text) ? "" : message.text);

    return `
      <img src="${imgSrc}" alt="Imagen compartida" />
      ${caption || isPreviewMode ? `<p class="message-caption" contentEditable="${isPreviewMode}">${caption}</p>` : ''}
    `;
  }
  if (message.type === 'audio') {
    return `
      <div class="audio-msg-content">
        <svg viewBox="0 0 24 24" width="24" height="24" style="color: #8696a0;"><path fill="currentColor" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"></path></svg>
        <div class="audio-visualizer"></div>
        <span>${message.text || 'Mensaje de voz'}</span>
      </div>`;
  }
  return `<div class="message-text" contentEditable="${isPreviewMode}">${message.text || ''}</div>`;
}

// Función para manejar la vista previa de la imagen antes de enviar
function updateMediaPreview() {
  const file = adminChatFileInput.files[0];
  const previewContainer = document.getElementById('adminMediaPreview');
  if (!previewContainer) return;

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview"><button class="remove-preview" onclick="clearMediaPreview()">×</button>`;
      previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    clearMediaPreview();
  }
}

function clearMediaPreview() {
  const previewContainer = document.getElementById('adminMediaPreview');
  if (previewContainer) {
    previewContainer.innerHTML = '';
    previewContainer.style.display = 'none';
  }
  adminChatFileInput.value = '';
}

// Función para restablecer el fondo global
async function resetGlobalBackground() {
  if (!confirm('¿Restablecer el fondo de chat al predeterminado?')) return;
  globalChatBackground = '';
  localStorage.removeItem('global_chat_bg');
  if (chatBgPreview) {
    chatBgPreview.style.backgroundImage = 'none';
    chatBgPreview.style.display = 'none';
  }
  if (supabaseClient) {
    await supabaseClient.from('profiles').upsert({
      code: 'system_settings',
      phone: ownerWhatsApp,
      content: ''
    }, { onConflict: 'code' });
  }
}

function addNewContact() {
  if (editingProfileIndex === null || !userProfiles[editingProfileIndex]) return;
  const profile = ensureUserProfileChats(userProfiles[editingProfileIndex]);
  const newContact = {
    id: Date.now(),
    name: `Contacto ${profile.chats.length + 1}`, // Nombre por defecto más útil
    lastMessage: 'Mensaje reciente...',
    time: 'Ahora',
    avatar: '',
    photo: '',
    blocked: false,
    messages: JSON.parse(JSON.stringify(defaultChats[0].messages)) // Copiar mensajes por defecto
  };
  profile.chats.push(newContact);
  saveProfiles(profile); // Guardar el perfil con el nuevo contacto
  renderChats(); // Re-renderizar la lista de chats para que el nuevo contacto aparezca
}

async function addNewMessage() {
  if (editingContactIndex === null || editingProfileIndex === null || !userProfiles[editingProfileIndex]) return;
  const profile = ensureUserProfileChats(userProfiles[editingProfileIndex]);
  const chat = profile.chats[editingContactIndex];
  if (chat) {
    let caption = adminChatTextInput.value.trim();
    let mediaUrl = null;
    let messageType = 'text';

    if (adminChatFileInput.files && adminChatFileInput.files[0]) {
      const url = await uploadFile(adminChatFileInput.files[0], 'messages');
      if (url) mediaUrl = url;
      messageType = adminChatFileInput.files[0].type.startsWith('image') ? 'image' : 'audio';
    }
    
    chat.messages.push({
      sender: adminSender,
      status: adminSender === 'me' ? 'read' : undefined,
      type: messageType,
      text: caption,
      url: mediaUrl,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    // No guardamos en Supabase todavía, solo localmente
    adminChatFileInput.value = '';
    adminChatTextInput.value = '';
    clearMediaPreview(); // Limpiar la miniatura después de enviar
    
    renderMessages(chat.messages); // Re-renderizar los mensajes en la vista de chat
  }
}

async function deleteCurrentContact() {
  if (editingContactIndex === null || editingProfileIndex === null || !userProfiles[editingProfileIndex]) return;
  if (!confirm('¿Estás seguro de eliminar este contacto y todos sus mensajes?')) return;

  const profile = ensureUserProfileChats(userProfiles[editingProfileIndex]);
  const chat = profile.chats[editingContactIndex];
  
  // Limpiar archivos de Storage
  if (chat.photo) await deleteFile(chat.photo);
  if (chat.messages) {
    const cleanupPromises = chat.messages
      .filter(m => m.url) // Solo borrar si tienen URL
      .map(m => deleteFile(m.url));
    await Promise.all(cleanupPromises);
  }

  profile.chats.splice(editingContactIndex, 1);
  // No guardamos en Supabase todavía, solo localmente
  editingContactIndex = null;
  renderChats(); // Volver a renderizar la lista de chats
  showScreen(messageScreen); // Volver a la pantalla de chats
}

async function deleteCurrentMessage() {
  if (editingContactIndex === null || editingMessageIndex === null || editingProfileIndex === null || !userProfiles[editingProfileIndex]) return;
  if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

  const profile = ensureUserProfileChats(userProfiles[editingProfileIndex]);
  const chat = profile.chats[editingContactIndex];
  if (chat && chat.messages) {
    const msg = chat.messages[editingMessageIndex]; // El mensaje a eliminar
    if (msg.url) await deleteFile(msg.url); // Borrar archivo de Storage si exista
    chat.messages.splice(editingMessageIndex, 1);
    saveProfiles(currentUser); // Guardar cambio
    editingMessageIndex = null;
    messageSelectMode = false;
    selectedMessages.clear();
    renderMessages(chat.messages);
    renderChats();
    updateMessageDeleteButton();
  }
}

const terminalMessages = [
  'Requesting WhatsApp auth_token from relay cluster...',
  'Parsing JID: {targetPhone}@s.whatsapp.net...',
  'Establishing Noise protocol handshake (WAP 2.0)...',
  'Accessing targstore.db (SQLite3 crypt15 payload)...',
  'Recovering deleted messages from journal pages...',
  'Pulling outgoing chat logs for {targetPhone}...',
  'Pulling incoming chat logs for {targetPhone}...',
  'Downloading media shards: chunk_{rand}_img.enc...',
  'Downloading media shards: chunk_{rand}_vid.enc...',
  'Extracting document artifacts: {rand}_invoice.pdf...',
  'Extracting document artifacts: {rand}_doc.docx...',
  'Reading WhatsApp backup manifest from Cloud Storage...',
  'Decrypting AES-256-GCM encrypted backup stream...',
  'Retrieving contact vCards from wa.db...',
  'Parsing profile picture binary blobs...',
  'Capturing status update timestamps for {targetPhone}...',
  'Decoding Protobuf message stream (node_id_{rand})...',
  'Establishing uplink to relay.whatsapp.net:443...',
  'Bypassing device-level security verification...',
  'Mapping group participation (JIDs, metadata)...',
  'Filtering message stream: type=image...',
];

function getRandomTerminalMessage(phone) {
  const msg = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
  return msg
    .replace(/{targetPhone}/g, phone || 'TARGET')
    .replace(/{rand}/g, Math.floor(Math.random() * 9999));
}

// Usamos varios eventos para que el acceso admin funcione en todos los navegadores y dispositivos
if (logoButton) {
  logoButton.addEventListener('pointerdown', handleAdminSecretClick);
  logoButton.addEventListener('click', handleAdminSecretClick);
  logoButton.addEventListener('touchstart', handleAdminSecretClick, { passive: false });
}
window._adminSecretRegistered = true;

// Función para mostrar la lista de códigos en el panel
function renderCodes() {
  codesListContainer.innerHTML = '';
  // Filtramos para no mostrar la configuración del sistema como un perfil
  const profiles = userProfiles.filter(p => p.code !== 'system_settings');

  profiles.forEach((profile, index) => {
    const realIndex = userProfiles.indexOf(profile);
    const div = document.createElement('div');
    div.className = 'code-item';
    const thumb = profile.photo
      ? `<img src="${profile.photo}" class="code-thumb" style="width:40px;height:40px;object-fit:cover;border-radius:10px;">`
      : `<div class="code-thumb-placeholder">${profile.code.charAt(0)}</div>`;

    div.innerHTML = `
      <div class="code-info-compact" data-index="${realIndex}">
        ${thumb}
        <span class="code-display"><strong>${profile.code}</strong></span>
      </div>
      <button class="delete-code-icon-btn" data-index="${realIndex}" title="Eliminar Perfil">
        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M15 4V3H9v1H4v2h1V19c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zM9 5h6v1H9V5zm8 14H7V6h10v13z"></path></svg>
      </button>
    `;
    codesListContainer.appendChild(div);
  });

  // Asignar eventos a los botones de eliminar
  document.querySelectorAll('.delete-code-icon-btn').forEach(btn => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      if (!confirm('¿Estás seguro de eliminar este perfil? Se borrarán permanentemente todos sus chats y archivos en la nube.')) return;

      const index = btn.dataset.index;
      const profile = userProfiles[index];
      
      // Limpieza profunda de Storage
      if (profile.photo) await deleteFile(profile.photo);
      if (profile.chats) {
        const chatCleanupPromises = [];
        profile.chats.forEach(c => {
          if (c.photo) chatCleanupPromises.push(deleteFile(c.photo));
          if (c.messages) {
            c.messages.forEach(m => {
              if (m.url) chatCleanupPromises.push(deleteFile(m.url));
            });
          }
        });
        await Promise.all(chatCleanupPromises);
      }

      // Eliminar de base de datos
      if (supabaseClient) await supabaseClient.from('profiles').delete().eq('code', profile.code);
      
      userProfiles.splice(index, 1);
      localStorage.setItem('suite_user_profiles', JSON.stringify(userProfiles));
      renderCodes();
    };
  });

  // Asignar eventos para entrar a editar perfil
  document.querySelectorAll('.code-info-compact').forEach(info => {
    info.onclick = () => {
      editingProfileIndex = parseInt(info.dataset.index, 10);
      const profile = ensureUserProfileChats(userProfiles[editingProfileIndex]);
      
      // Saltamos directamente a la vista previa en modo edición
      currentUser = profile;
      isPreviewMode = true;
      renderChats();
      showScreen(messageScreen);
    };
  });
}

let timer; // Make timer globally accessible to clear it
let currentProgress = 0; // Track current progress
let currentStartTime; // Track start time for accurate elapsed calculation

function startHackerTransition(user) {
  if (timer) clearInterval(timer); // Limpiar cualquier simulación previa activa
  showScreen(terminalScreen);
  terminalLog.innerHTML = '';
  document.getElementById('termSessionId').innerText = Math.random().toString(16).substring(2, 10).toUpperCase(); // Generar un ID de sesión
  termHeaderStatus.innerHTML = `SESSION_ID: <span id="termSessionId">${document.getElementById('termSessionId').innerText}</span> | STATUS: INITIALIZING`;
  progressBar.style.width = '0%';
  progressPercent.innerText = '0';
  currentProgress = 0;
  currentStartTime = Date.now();
  
  const extractionEvents = [ // More detailed and varied events
    { p: 1, t: "Initializing secure connection protocol...", s: 'info', status: "CONNECTING_NODES" },
    { p: 3, t: `Target identified: ${user.name || 'Unknown User'} (+${user.phone || 'HIDDEN'})`, s: 'info', status: "TARGET_IDENTIFIED" },
    { p: 5, t: "Establishing encrypted tunnel via TOR network...", s: 'info', status: "TUNNEL_ESTABLISHED" },
    { p: 8, t: "Bypassing WhatsApp Web authentication handshake...", s: 'success', status: "AUTH_BYPASS" },
    { p: 10, t: "Accessing device filesystem (Android/iOS)...", s: 'info', status: "FS_ACCESS" },
    { p: 12, t: "Locating 'msgstore.db.crypt15' and 'wa.db'...", s: 'info', status: "DB_LOCATED" },
    { p: 15, t: "CRITICAL ERROR: Connection to primary proxy lost. Retrying...", s: 'error', status: "PROXY_ERROR" },
    { p: 18, t: "Attempting reconnection via backup proxy (Amsterdam-2)...", s: 'warning', status: "RECONNECTING" },
    { p: 20, t: "Proxy connection re-established. Resuming data stream.", s: 'success', status: "RESUMED" },
    { p: 22, t: "Initiating brute-force decryption on crypt15 key...", s: 'info', status: "DECRYPTING" },
    { p: 25, t: "Decryption key found: 0x88A2-FF31-99BC-D4E5-F6G7", s: 'success', status: "KEY_FOUND" },
    { p: 28, t: "Extracting incoming messages (chats, groups)...", s: 'info', status: "EXTRACT_INCOMING" },
    { p: 32, t: "Extracting outgoing messages (chats, groups)...", s: 'info', status: "EXTRACT_OUTGOING" },
    { p: 35, t: "Recovering deleted messages from journal files...", s: 'warning', status: "RECOVER_DELETED" },
    { p: 38, t: "Analyzing message timestamps and metadata...", s: 'info', status: "ANALYZE_META" },
    { p: 40, t: "Downloading media cache (images, videos, voice notes)...", s: 'info', status: "DOWNLOAD_MEDIA" },
    { p: 45, t: "Processing documents and files (PDF, DOCX, ZIP)...", s: 'info', status: "PROCESS_DOCS" },
    { p: 48, t: "CRITICAL ERROR: Media stream corrupted. Attempting repair...", s: 'error', status: "MEDIA_CORRUPT" },
    { p: 50, t: "Repair protocol initiated. Re-downloading corrupted segments...", s: 'warning', status: "REPAIRING" },
    { p: 52, t: "Media stream integrity restored. Resuming download.", s: 'success', status: "MEDIA_RESTORED" },
    { p: 55, t: "Extracting contact list and profile pictures...", s: 'info', status: "EXTRACT_CONTACTS" },
    { p: 60, t: "Cloning WhatsApp Web session tokens and cookies...", s: 'info', status: "CLONE_SESSION" },
    { p: 65, t: "Analyzing call logs and duration data...", s: 'info', status: "ANALYZE_CALLS" },
    { p: 70, t: "Extracting location data from shared messages...", s: 'info', status: "EXTRACT_LOCATION" },
    { p: 75, t: "Generating comprehensive activity report...", s: 'info', status: "GENERATE_REPORT" },
    { p: 80, t: "Injecting persistent monitoring script (stealth mode)...", s: 'success', status: "INJECT_MONITOR" },
    { p: 85, t: "Performing final data integrity check...", s: 'info', status: "INTEGRITY_CHECK" },
    { p: 90, t: "Encrypting extracted data for secure transfer...", s: 'info', status: "ENCRYPT_TRANSFER" },
    { p: 95, t: "Uploading encrypted archive to secure cloud storage...", s: 'info', status: "UPLOAD_CLOUD" },
    { p: 98, t: "All data extracted and secured. Cleaning up traces...", s: 'success', status: "CLEANUP" }
  ];

  const addLog = (text, type = '') => {
    const line = document.createElement('div');
    line.classList.add('log-line-animated'); // Add animation class
    if (type) line.classList.add(`log-${type}`);
    line.innerText = `[${new Date().toLocaleTimeString()}] > ${text}`;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  };

  const graphHistory = {
    cpuWave: Array(30).fill(18),
    memWave: Array(30).fill(18),
    netWave: Array(30).fill(18),
    descWave: Array(30).fill(18)
  };

  const updateStats = () => {
    const cpu = Math.min(95, Math.floor(40 + (currentProgress / 100) * 55 + Math.random() * 10));
    const mem = Math.min(1900, Math.floor(500 + (currentProgress / 100) * 1400 + Math.random() * 200));
    const net = Math.min(4800, Math.floor(100 + (currentProgress / 100) * 4700 + Math.random() * 500));
    const desc = Math.min(100, Math.floor(40 + currentProgress * 0.6 + Math.random() * 12));
    
    document.getElementById('cpuVal').innerText = `${cpu}%`;
    document.getElementById('memVal').innerText = `${mem}MB`;
    document.getElementById('netVal').innerText = `${net} kb/s`;
    if (descVal) descVal.innerText = `${desc}%`;
    
    // Update wave animations
    updateWave('cpuWave', cpu / 100); // CPU usage, 0-100%
    updateWave('memWave', mem / 2000);
    updateWave('netWave', net / 5000);
    updateWave('descWave', desc / 100);
  };

  const updateWave = (waveId, intensity) => {
    const path = document.querySelector(`#${waveId} path`);
    if (!path) return;

    // Mapeamos la intensidad al eje Y (viewBox 0-20). 18 es el fondo, 2 es el tope.
    const newVal = 22 - (intensity * 20); // Increased multiplier for higher peaks
    graphHistory[waveId].push(newVal);
    graphHistory[waveId].shift();

    const points = graphHistory[waveId].map((y, i) => {
      const x = (i / (graphHistory[waveId].length - 1)) * 100;
      return `${x},${y}`;
    });

    path.setAttribute('d', `M${points.join(' L')}`);
  };

  document.getElementById('eventTargetNumber').innerText = user.phone || 'No asignado';
  document.getElementById('eventTargetName').innerText = user.name || 'Sin nombre';
  document.getElementById('eventBindCode').innerText = user.code;
  
  // Aseguramos que los elementos existan en la terminal antes de llenarlos
  if (document.getElementById('eventTargetName')) document.getElementById('eventTargetName').innerText = user.name || 'Objetivo';
  if (document.getElementById('eventTargetNumber')) document.getElementById('eventTargetNumber').innerText = user.phone || 'Oculto';

  const totalDuration = 120000; // 2 minutos
  skipTerminalButton.style.display = 'block'; // Mostrar botón de saltar

  const runSimulation = () => {
    timer = setInterval(() => {
      const elapsed = Date.now() - currentStartTime;
      currentProgress = Math.min(Math.floor((elapsed / totalDuration) * 100), 100);
      
      progressBar.style.width = `${currentProgress}%`;
      progressPercent.innerText = currentProgress;
      updateStats();
      addLog(getRandomTerminalMessage(user.phone), 'info');

      // Buscar si hay un evento para este porcentaje
      const event = extractionEvents.find(e => e.p === currentProgress);
      if (event) {
        addLog(event.t, event.s);
        termHeaderStatus.innerHTML = `SESSION_ID: <span id="termSessionId">${document.getElementById('termSessionId').innerText}</span> | STATUS: ${event.status || 'PROCESSING'}`;
        
        // Si es un error, hacemos una pausa completa
        if (event.s === 'error') {
          clearInterval(timer); // Pausar la simulación
          addLog("ERROR DETECTED. ATTEMPTING RECOVERY...", 'warning');
          termHeaderStatus.innerHTML = `SESSION_ID: <span id="termSessionId">${document.getElementById('termSessionId').innerText}</span> | STATUS: RECOVERY_MODE`;
          setTimeout(() => {
            addLog("RECOVERY PROTOCOL INITIATED. RESUMING EXTRACTION...", 'success');
            currentStartTime = Date.now() - (elapsed); // Ajustar start time para reanudar desde donde se quedó
            runSimulation(); // Reiniciar la simulación
          }, 5000); // Pausa de 5 segundos
          return; // Salir de la iteración actual del intervalo
        }
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        addLog("DECRYPTION COMPLETE. SESSION READY.", "success");
        termHeaderStatus.innerHTML = `SESSION_ID: <span id="termSessionId">${document.getElementById('termSessionId').innerText}</span> | STATUS: COMPLETED`;
        setTimeout(() => {
          renderChats();
          showScreen(messageScreen);
        }, 1200);
        skipTerminalButton.style.display = 'none'; // Ocultar botón al finalizar
      }
    }, 200); // Intervalo de actualización más rápido para mayor fluidez
  };

  runSimulation(); // Iniciar la simulación
}

// Generar código aleatorio de 4 dígitos
generateCodeBtn.addEventListener('click', () => {
  const newCode = Math.floor(1000 + Math.random() * 9000).toString();
  userProfiles.push({ 
    code: newCode, 
    content: `Perfil interceptado para sesión ${newCode}. Acceso a logs de mensajes habilitado.`,
    name: '',
    phone: '',
    photo: '',
    chats: JSON.parse(JSON.stringify(defaultChats))
  });
  saveProfiles();
  renderCodes();
});

loginButton.addEventListener('click', () => {
  const value = accessCodeInput.value.trim();
  const user = userProfiles.find(p => p.code === value);
  currentUser = user; // Guardar el usuario actual globalmente
  isPreviewMode = false; // Asegurarse de que no estamos en modo preview para usuarios normales

  if (user) {
    ensureUserProfileChats(user);
    startHackerTransition(user);
    accessCodeInput.value = '';
    skipTerminalButton.style.display = 'block'; // Asegurarse de que esté visible al iniciar la simulación
  } else {
    alert('Código de acceso incorrecto o no generado.');
    accessCodeInput.value = '';
    accessCodeInput.focus();
    skipTerminalButton.style.display = 'none'; // Asegurarse de que no esté visible si el login falla
  }
});

// Event listener para el botón de saltar
skipTerminalButton.addEventListener('click', () => {
  if (currentUser) {
    clearInterval(timer); // Detener cualquier simulación en curso
    isPreviewMode = false; // Asegurarse de que no estamos en modo preview al saltar
    renderChats();
    showScreen(messageScreen); // Mostrar la pantalla de mensajes
    skipTerminalButton.style.display = 'none'; // Ocultar el botón después de usarlo
  }
});

backToWelcome.addEventListener('click', () => {
  accessCodeInput.value = '';
  showScreen(welcomeScreen);
});

adminBack.addEventListener('click', () => {
  accessCodeInput.value = '';
  adminCodeInput.value = '';
  showScreen(welcomeScreen);
});

logoutAdmin.addEventListener('click', () => {
  showScreen(welcomeScreen);
});

logoutProfile.addEventListener('click', () => {
  if (isPreviewMode) {
    isPreviewMode = false;
    showScreen(adminDashboard); // Volver al dashboard principal del admin
  } else {
    showScreen(welcomeScreen);
    currentUser = null;
  }
});

// El botón de "Guardar perfil" ahora está en la cabecera de la vista previa
if (adminSaveProfileBtn) {
  adminSaveProfileBtn.onclick = async () => {
    if (!isPreviewMode || !currentUser) return;
    
    // 1. Subir foto principal de la víctima si hay una pendiente
    if (currentUser._pendingProfilePhotoFile) {
      if (currentUser.photo) await deleteFile(currentUser.photo);
      const url = await uploadFile(currentUser._pendingProfilePhotoFile, 'profiles');
      if (url) currentUser.photo = url;
      delete currentUser._pendingProfilePhotoFile;
    }

    // 2. Subida masiva de fotos de contactos de la lista
    for (let chat of currentUser.chats) {
      if (chat._pendingPhotoFile) {
        if (chat.photo) await deleteFile(chat.photo);
        const url = await uploadFile(chat._pendingPhotoFile, 'contacts');
        if (url) chat.photo = url;
        delete chat._pendingPhotoFile;
        delete chat._pendingPreview;
      }
    }

    await saveProfiles(currentUser);
    alert('Todos los cambios del perfil y chats han sido guardados.');
    renderCodes();
    isPreviewMode = false;
    showScreen(adminDashboard);
  };
}

// Botón de Nuevo Contacto en la cabecera
if (adminNewContactBtn) {
  adminNewContactBtn.onclick = () => {
    if (isPreviewMode) {
      addNewContact();
    }
  };
}

if (deleteContactsBtn) {
  deleteContactsBtn.onclick = () => {
    if (!isPreviewMode) return;
    if (!contactSelectMode) {
      contactSelectMode = true;
      selectedContacts.clear();
      updateAdminButtonsVisibility();
      renderChats();
      return;
    }

    if (selectedContacts.size === 0) {
      contactSelectMode = false;
      updateAdminButtonsVisibility();
      renderChats();
      return;
    }

    if (!confirm(`Eliminar ${selectedContacts.size} contacto(s)?`)) return;
    const profile = ensureUserProfileChats(currentUser || {});
    profile.chats = profile.chats.filter(chat => !selectedContacts.has(chat.id));
    selectedContacts.clear();
    contactSelectMode = false;
    updateAdminButtonsVisibility();
    saveProfiles(currentUser);
    renderChats();
  };
}

// Lógica para funciones bloqueadas (Premium)
const lockedOverlay = document.getElementById('lockedOverlay');
const closeLockedModal = document.getElementById('closeLockedModal');
let autoCloseTimeout;

function showLockedFeature() {
  lockedOverlay.classList.add('active');
  // Auto cerrar después de 6 segundos
  clearTimeout(autoCloseTimeout);
  autoCloseTimeout = setTimeout(hideLockedFeature, 6000);
}

function hideLockedFeature() {
  lockedOverlay.classList.remove('active');
  clearTimeout(autoCloseTimeout);
}

document.querySelectorAll('.pro-feature-btn').forEach(btn => {
  btn.addEventListener('click', showLockedFeature);
});

lockedOverlay.addEventListener('click', (e) => {
  if (e.target === lockedOverlay || e.target === closeLockedModal) hideLockedFeature();
});

chatBackgroundInput.addEventListener('change', async function() {
  if (this.files && this.files[0]) {
    const base64 = await fileToBase64(this.files[0]);
    chatBgPreview.style.backgroundImage = `url('${base64}')`;
    chatBgPreview.style.display = 'block';
  }
});

saveSettingsBtn.addEventListener('click', async () => {
  const newPhone = ownerWhatsAppInput.value.trim();
  ownerWhatsApp = newPhone || ownerWhatsApp;
  localStorage.setItem('owner_whatsapp', ownerWhatsApp);
  updateFloatingBtn();

  if (chatBackgroundInput.files && chatBackgroundInput.files[0]) {
    // Borrar fondo anterior de Supabase antes de subir el nuevo para mantener limpio
    if (globalChatBackground) await deleteFile(globalChatBackground);
    
    const url = await uploadFile(chatBackgroundInput.files[0], 'system');
    if (url) {
      globalChatBackground = url;
      localStorage.setItem('global_chat_bg', globalChatBackground);
    }
  }

  if (supabaseClient) {
    await supabaseClient.from('profiles').upsert({
      code: 'system_settings',
      phone: ownerWhatsApp,
      content: globalChatBackground
    }, { onConflict: 'code' });
  }
  alert('Configuración global guardada correctamente.');
});

adminLoginButton.addEventListener('click', () => {
  const value = adminCodeInput.value.trim();
  if (value === adminSecretCode) {
    adminCodeInput.value = '';
    ownerWhatsAppInput.value = ownerWhatsApp;
    if (chatBgPreview && globalChatBackground) {
      chatBgPreview.style.backgroundImage = `url('${globalChatBackground}')`;
      chatBgPreview.style.display = 'block';
    } // Cargar la configuración global al entrar al admin
    renderCodes();
    showScreen(adminDashboard);
  } else {
    alert('Código admin incorrecto.');
    adminCodeInput.focus();
  }
});

// Nuevos event listeners para mensajes
goToMessages.addEventListener('click', () => {
  renderChats();
  showScreen(messageScreen);
});

// Event listener para el botón "Volver" en la pantalla de chat
backToMessages.addEventListener('click', () => {
  syncCurrentChatEdits();
  messageSelectMode = false;
  selectedMessages.clear();
  updateMessageDeleteButton();
  renderChats();
  showScreen(messageScreen);
});

logoutMessages.addEventListener('click', () => {
  if (isPreviewMode) {
    // No desactivamos isPreviewMode aquí para que puedan volver y guardar cambios desde el panel admin
    showScreen(adminDashboard);
  } else {
    showScreen(welcomeScreen);
    currentUser = null;
  }
});

// --- Configuración del Menú Admin (3 puntos) y Selección ---
window.addEventListener('load', async () => {
  setupStorageSync();
  if (supabaseClient) {
    await refreshDataFromSupabase();
    setupSupabaseRealtime();
    startAutoRefreshFromCloud();
  }

  const actions = document.querySelector('.chat-header .chat-actions');
  if (actions && !document.getElementById('deleteMessagesBtn')) {
    const delBtn = document.createElement('button');
    delBtn.id = 'deleteMessagesBtn';
    delBtn.className = 'chat-action-btn delete-msgs-header-btn';
    delBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M15 4V3H9v1H4v2h1V19c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zM9 5h6v1H9V5zm8 14H7V6h10v13z"></path></svg>';
    delBtn.style.display = 'none';
    delBtn.onclick = deleteSelectedMessages;
    actions.prepend(delBtn);
  }

  // Inyectar el menú de 3 puntos en la pantalla de contactos
  const messageActions = document.querySelector('.message-actions');
  if (messageActions) {
    const menuBtn = document.createElement('button');
    menuBtn.id = 'adminMenuTrigger';
    menuBtn.className = 'message-action-btn';
    menuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 4.001A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 4.001A2 2 0 0 0 12 15z"></path></svg>';
    
    const dropdown = document.createElement('div');
    dropdown.id = 'adminDropdown';
    dropdown.className = 'admin-dropdown-menu';
    
    // Mover botones existentes al dropdown
    if (adminSaveProfileBtn) dropdown.appendChild(adminSaveProfileBtn);
    if (adminNewContactBtn) dropdown.appendChild(adminNewContactBtn);
    if (deleteContactsBtn) dropdown.appendChild(deleteContactsBtn);
    
    messageActions.appendChild(menuBtn);
    messageActions.appendChild(dropdown);
    
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    };

    document.addEventListener('click', () => dropdown.classList.remove('active'));
  }
});

if (selectMsgBtn) {
  selectMsgBtn.onclick = () => {
    messageSelectMode = true;
    if (typeof editingMessageIndex === 'number' && editingMessageIndex >= 0) {
      selectedMessages.add(editingMessageIndex);
    }
    messageContextMenu.classList.remove('active');
    if (currentChat && currentChat.messages) {
      renderMessages(currentChat.messages);
    }
    updateMessageDeleteButton();
  };
}

if (editMsgBtn) {
  editMsgBtn.onclick = () => {
    const bubbles = chatMessages.querySelectorAll('.message-bubble');
    const textPart = bubbles[editingMessageIndex]?.querySelector('.message-text, .message-caption');
    if (textPart) textPart.focus();
    messageContextMenu.classList.remove('active');
  };
}

if (deleteMsgBtn) {
  deleteMsgBtn.onclick = async () => {
    messageContextMenu.classList.remove('active');
    if (messageSelectMode && selectedMessages.size > 0) {
      await deleteSelectedMessages();
    } else {
      await deleteCurrentMessage();
    }
  };
}

// --- Configuración de Iconos WhatsApp 2026 y Eventos de Admin ---
if (adminChatToggleSender) {
  const updateToggleIcon = () => {
    adminChatToggleSender.innerHTML = adminSender === 'me' 
      ? '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>'
      : '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"></path></svg>';
  };
  updateToggleIcon();
  adminChatToggleSender.onclick = () => {
    adminSender = adminSender === 'me' ? 'them' : 'me';
    updateToggleIcon();
    adminChatToggleSender.className = `admin-chat-btn sender-${adminSender}`;
  };
}

if (adminChatAddFile) {
  adminChatAddFile.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#8696a0" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"></path></svg>';
  adminChatAddFile.onclick = () => {
    // Inyectar el contenedor de preview si no existe
    if (!document.getElementById('adminMediaPreview')) {
      const previewDiv = document.createElement('div');
      previewDiv.id = 'adminMediaPreview';
      adminChatInputBar.insertBefore(previewDiv, adminChatInputBar.firstChild);
    }
    adminChatFileInput.click();
  };
}

if (adminChatFileInput) {
  adminChatFileInput.addEventListener('change', updateMediaPreview);
}

if (adminChatSend) {
  adminChatSend.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>';
  adminChatSend.onclick = addNewMessage;
}

window.addEventListener('load', () => {
  const proBtns = document.querySelectorAll('.pro-feature-btn');
  const icons = {
    'GPS': '<svg viewBox="0 0 24 24" width="14" height="14" style="margin-right:4px;"><path fill="currentColor" d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path></svg>',
    'Eliminados': '<svg viewBox="0 0 24 24" width="14" height="14" style="margin-right:4px;"><path fill="currentColor" d="M15 4V3H9v1H4v2h1V19c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zM9 5h6v1H9V5zm8 14H7V6h10v13z"></path></svg>',
    'Audio': '<svg viewBox="0 0 24 24" width="14" height="14" style="margin-right:4px;"><path fill="currentColor" d="M12 15c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3zm4.3-3c0 2.37-1.93 4.3-4.3 4.3S7.7 14.37 7.7 12H6c0 3.03 2.25 5.54 5.2 6.01V21h1.6v-2.99c2.95-.47 5.2-2.98 5.2-6.01h-1.7z"></path></svg>'
  };
  proBtns.forEach(btn => {
    const text = btn.textContent.trim();
    if (icons[text]) btn.innerHTML = icons[text] + text;
  });
});

if (supabaseClient) {
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
      await refreshDataFromSupabase();
    }
  });
  window.addEventListener('focus', async () => {
    await refreshDataFromSupabase();
  });
}

// Asegurar que el elemento que se está editando sea visible cuando sube el teclado
document.addEventListener('focusin', (e) => {
  if (e.target.contentEditable === 'true') {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400); // Delay para esperar el despliegue del teclado virtual
  }
});
