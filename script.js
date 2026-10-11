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

const categoryNames = {
    'l1-ai-basic': '初級：人工智慧基礎概論',
    'l1-gen-ai': '初級：生成式AI應用與規劃',
    'l1-sec-mgmt': '初級：資訊安全管理概論',
    'l1-sec-tech': '初級：資訊安全技術概論',
    'l2-ml-tech': '中級：機器學習技術與應用',
    'l2-big-data': '中級：大數據處理分析與應用',
    'l2-ai-plan': '中級：人工智慧技術應用規劃',
    'lang-html': 'HTML',
    'lang-css': 'CSS',
    'lang-js': 'JavaScript',
    'lang-python': 'Python',
    'lang-java': 'JAVA'
};

const summernoteOptions = {
    height: 220,
    lang: 'zh-TW',
    toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link']],
        ['view', ['codeview']]
    ]
};

$(document).ready(function() {$('#newEditor').summernote(summernoteOptions);
    $('#editEditor').summernote(summernoteOptions);
    
    initStorage();
    loadNotes();
});

let currentCategory = 'all';
let isAdminUnlocked = false;

const defaultNotes = [
    {
        id: '1',
        category: 'l1-ai-basic',
        title: '初級：鑑別式與生成式 AI 核心概念',
        content: '<p>• <strong>鑑別式AI</strong>：辨識與分類現有資料。</p><p>• <span style="color: rgb(2, 132, 199);">生成式AI</span>：學習資料分佈以創造新資料。</p>'
    },
    {
        id: '2',
        category: 'l1-sec-mgmt',
        title: '初級：資訊安全管理概論 (CIA 三要素)',
        content: '<p>• <strong>機密性 (Confidentiality)</strong>：確保資料僅供授權人員存取。</p><p>• <strong>完整性 (Integrity)</strong>：確保資料未被未授權竄改。</p>'
    },
    {
        id: '3',
        category: 'lang-python',
        title: 'Python 基礎變數與輸出範例',
        content: '<p>變數宣告與字串格式化輸出：</p><pre style="background:#f1f5f9; padding:8px; border-radius:6px;">name = "Chih-Kai"<br>print(f"Hello, {name}")</pre>'
    }
];

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
            alert("解鎖成功！");
            loadNotes(); 
        } else if (pwd !== null) {
            alert("密碼錯誤！");
        }
    }
});

exportJsonBtn.addEventListener('click', () => {
    const notesData = localStorage.getItem('ipas_notes');
    if (!notesData) return;
    const blob = new Blob([notesData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ipas-notes-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

importJsonBtn.addEventListener('click', () => importFile.click());

importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            if (!Array.isArray(importedData)) throw new Error();
            if (confirm(`確定要匯入並覆蓋目前的筆記資料嗎？（共 ${importedData.length} 筆）`)) {
                localStorage.setItem('ipas_notes', JSON.stringify(importedData));
                loadNotes();
                alert("還原成功！");
            }
        } catch {
            alert("匯入失敗：檔案格式錯誤。");
        }
        importFile.value = '';
    };
    reader.readAsText(file);
});

cardContainer.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;
    const id = card.getAttribute('data-id');

    if (target.classList.contains('copy-btn')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = card.getAttribute('data-content');
        const textToCopy = tempDiv.textContent || tempDiv.innerText || "";
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = target.textContent;
            target.textContent = '已複製！';
            setTimeout(() => {
                target.textContent = originalText;
            }, 1500);
        });
    }

    if (target.classList.contains('expand-btn')) {
        card.classList.toggle('expanded');
        target.textContent = card.classList.contains('expanded') ? '收合內容 ▲' : '展開閱讀 ▼';
    }

    if (target.classList.contains('delete-btn')) {
        if (confirm('確定要刪除這筆筆記嗎？')) {
            deleteNote(id);
            loadNotes();
        }
    }

    if (target.classList.contains('edit-btn')) {
        openEditModal(id);
    }
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        filterAndRender();
    });
});

searchInput.addEventListener('input', () => filterAndRender());

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNote = {
        id: Date.now().toString(),
        title: document.getElementById('newTitle').value.trim(),
        category: document.getElementById('newCategory').value,
        content: $('#newEditor').summernote('code')
    };

    saveNote(newNote);
    noteForm.reset();
    $('#newEditor').summernote('code', '');
    document.querySelector('.form-section details').removeAttribute('open');
    loadNotes();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedNote = {
        id: editIdInput.value,
        title: editTitleInput.value.trim(),
        category: editCategorySelect.value,
        content: $('#editEditor').summernote('code')
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
    $('#editEditor').summernote('code', note.content);

    editModal.classList.add('active');
}

function closeEditModal() {
    editModal.classList.remove('active');
}

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

function renderCards(notesToRender) {
    cardContainer.innerHTML = '';
    const term = searchInput.value.toLowerCase().trim();
    
    const filtered = notesToRender.filter(note => {
        const matchCategory = (currentCategory === 'all' || note.category === currentCategory);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = note.content;
        const plainContent = tempDiv.textContent || tempDiv.innerText || "";
        const matchSearch = (note.title.toLowerCase().includes(term) || plainContent.toLowerCase().includes(term));
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        cardContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 50px; font-size: 1.15rem;">沒有找到相關的筆記內容</p>';
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

        const categoryText = categoryNames[note.category] || '綜合筆記';

        card.innerHTML = `
            <div class="card-header">
                <span class="category-badge">${categoryText}</span>
                <h3>${escapeHTML(note.title)}</h3>
            </div>
            <div class="card-body">
                ${note.content}
            </div>
            <button class="expand-btn">展開閱讀 ▼</button>
            <div class="card-footer">
                ${adminActionsHTML}
                <button class="copy-btn">複製內容</button>
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
