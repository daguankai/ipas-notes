// 🔐 在這裡設定您的管理者密碼（預設為 1234）
const ADMIN_PASSWORD = "1234"; 

const searchInput = document.getElementById('searchInput');
const tabButtons = document.querySelectorAll('.tab-btn');
const cardContainer = document.getElementById('cardContainer');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminStatus = document.getElementById('adminStatus');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const importJsonBtn = document.getElementById('importJsonBtn');
const importFile = document.getElementById('importFile');
const formSection = document.getElementById('formSection');
const noteForm = document.getElementById('noteForm');

// 編輯 Modal 元素
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editIdInput = document.getElementById('editId');
const editTitleInput = document.getElementById('editTitle');
const editCategorySelect = document.getElementById('editCategory');
const editTagInput = document.getElementById('editTag');
const editContentTextarea = document.getElementById('editContent');

let currentCategory = 'all';
let isAdminUnlocked = false;

// 預設示範筆記
const defaultNotes = [
    {
        id: '1',
        category: 'l1-ai-basic',
        title: '初級：鑑別式與生成式AI',
        tag: '#AI基礎',
        content: '• 鑑別式AI：辨識與分類現有資料。\n• 生成式AI：學習資料分佈以創造新資料。\n• 高頻生成式模型包含：GAN、VAE、擴散模型、Transformer。'
    },
    {
        id: '2',
        category: 'lang-python',
        title: 'Python 基礎語法範例',
        tag: '#Python',
        content: '• 變數宣告與輸出：\n  name = "Chih-Kai"\n  print(f"Hello, {name}")'
    }
];

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    loadNotes();
});

// 管理員解鎖按鈕事件
adminLoginBtn.addEventListener('click', () => {
    if (!isAdminUnlocked) {
        const pwd = prompt("請輸入管理者密碼以解鎖編輯/新增與備份還原功能：");
        if (pwd === ADMIN_PASSWORD) {
            isAdminUnlocked = true;
            adminLoginBtn.classList.add('hidden');
            adminStatus.classList.remove('hidden');
            exportJsonBtn.classList.remove('hidden');
            importJsonBtn.classList.remove('hidden');
            formSection.classList.remove('hidden');
            alert("解鎖成功！現在可以新增、編輯、刪除筆記，以及匯出/匯入 JSON 備份。");
            loadNotes(); 
        } else if (pwd !== null) {
            alert("密碼錯誤！");
        }
    }
});

// 📥 匯出 JSON 備份功能
exportJsonBtn.addEventListener('click', () => {
    const notesData = localStorage.getItem('ipas_notes');
    if (!notesData) {
        alert("目前沒有任何筆記資料可以匯出！");
        return;
    }

    const blob = new Blob([notesData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `ipas-notes-backup-${dateStr}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// 📤 匯入還原 JSON 功能（點擊按鈕觸發隱藏的 file input）
importJsonBtn.addEventListener('click', () => {
    importFile.click();
});

// 讀取上傳的 JSON 檔案並覆寫 LocalStorage
importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            
            // 簡易格式檢查：確認是否為陣列且包含必要欄位
            if (!Array.isArray(importedData)) {
                throw new Error("JSON 格式不正確：根結點必須是陣列");
            }

            if (confirm(`確定要匯入並覆蓋目前的筆記資料嗎？（共 ${importedData.length} 筆資料）`)) {
                localStorage.setItem('ipas_notes', JSON.stringify(importedData));
                loadNotes();
                alert("筆記資料還原成功！");
            }
        } catch (error) {
            alert("匯入失敗：檔案格式錯誤或不是有效的 iPAS 備份 JSON 檔。");
            console.error(error);
        }
        // 清空檔案選擇器，確保重複上傳同一個檔案也能觸發 change 事件
        importFile.value = '';
    };
    reader.readAsText(file);
});

// 卡片互動事件委派
cardContainer.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;

    const id = card.getAttribute('data-id');

    // 複製重點
    if (target.classList.contains('copy-btn')) {
        const textToCopy = card.getAttribute('data-content');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = target.textContent;
            target.textContent = '已複製！';
            target.classList.add('copied');
            setTimeout(() => {
                target.textContent = originalText;
                target.classList.remove('copied');
            }, 1500);
        });
    }

    // 展開/收合
    if (target.classList.contains('expand-btn')) {
        card.classList.toggle('expanded');
        target.textContent = card.classList.contains('expanded') ? '收合內容 ▲' : '展開閱讀 ▼';
    }

    // 刪除筆記 (需解鎖)
    if (target.classList.contains('delete-btn')) {
        if (confirm('確定要刪除這筆筆記嗎？')) {
            deleteNote(id);
            loadNotes();
        }
    }

    // 編輯筆記 (需解鎖)
    if (target.classList.contains('edit-btn')) {
        openEditModal(id);
    }
});

// 分類與搜尋篩選
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        filterAndRender();
    });
});

searchInput.addEventListener('input', () => {
    filterAndRender();
});

// 新增筆記表單
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNote = {
        id: Date.now().toString(),
        title: document.getElementById('newTitle').value.trim(),
        category: document.getElementById('newCategory').value,
        tag: document.getElementById('newTag').value.trim(),
        content: document.getElementById('newContent').value.trim()
    };

    saveNote(newNote);
    noteForm.reset();
    document.querySelector('.form-section details').removeAttribute('open');
    loadNotes();
});

// 編輯 Modal 提交
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedNote = {
        id: editIdInput.value,
        title: editTitleInput.value.trim(),
        category: editCategorySelect.value,
        tag: editTagInput.value.trim(),
        content: editContentTextarea.value.trim()
    };

    updateNote(updatedNote);
    closeEditModal();
    loadNotes();
});

cancelEditBtn.addEventListener('click', closeEditModal);

function openEditModal(id) {
    const notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    const note = notes.find(n => n.id === id);
    if (!note) return;

    editIdInput.value = note.id;
    editTitleInput.value = note.title;
    editCategorySelect.value = note.category;
    editTagInput.value = note.tag;
    editContentTextarea.value = note.content;

    editModal.classList.add('active');
}

function closeEditModal() {
    editModal.classList.remove('active');
}

// LocalStorage 資料管理
function initStorage() {
    if (!localStorage.getItem('ipas_notes')) {
        localStorage.setItem('ipas_notes', JSON.stringify(defaultNotes));
    }
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    renderCards(notes);
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    notes.push(note);
    localStorage.setItem('ipas_notes', JSON.stringify(notes));
}

function updateNote(updatedNote) {
    let notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    notes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    localStorage.setItem('ipas_notes', JSON.stringify(notes));
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('ipas_notes', JSON.stringify(notes));
}

// 渲染卡片邏輯
function renderCards(notesToRender) {
    cardContainer.innerHTML = '';
    
    const term = searchInput.value.toLowerCase().trim();
    const filtered = notesToRender.filter(note => {
        const matchCategory = (currentCategory === 'all' || note.category === currentCategory);
        const matchSearch = (note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term));
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        cardContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d; padding: 40px;">沒有找到相關的筆記內容</p>';
        return;
    }

    filtered.forEach(note => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', note.id);
        card.setAttribute('data-category', note.category);
        card.setAttribute('data-title', note.title);
        card.setAttribute('data-content', note.content);

        const adminActionsHTML = isAdminUnlocked ? `
            <div class="card-actions">
                <button class="edit-btn">編輯</button>
                <button class="delete-btn">刪除</button>
            </div>
        ` : '<div></div>';

        card.innerHTML = `
            <div class="card-header">
                <h3>${escapeHTML(note.title)}</h3>
                <span class="tag">${escapeHTML(note.tag)}</span>
            </div>
            <div class="card-body">
                <p>${escapeHTML(note.content)}</p>
            </div>
            <button class="expand-btn">展開閱讀 ▼</button>
            <div class="card-footer">
                ${adminActionsHTML}
                <button class="copy-btn">複製重點</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function filterAndRender() {
    loadNotes();
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}