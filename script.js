// File: script.js

// --- DATA DUMMY ---

// Data summary untuk Dashboard
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

// Data produk untuk List Data Produk (Menggunakan nama 'products' sesuai spesifikasi yang umum digunakan)
const products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 }, // Harga disesuaikan agar lebih realistis untuk IDR
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];


// --- FUNGSI UMUM ---

function formatRupiah(number) {
    // Fungsi ini relevan di dashboard dan products
    if (!document.getElementById('summaryContainer') && !document.getElementById('productTableBody')) return number;
    
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}


// --- LOGIKA HALAMAN LOGIN (index.html) ---

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const messageArea = document.getElementById('message');

    messageArea.style.display = 'none';
    messageArea.className = 'message-area';
    messageArea.innerHTML = '';

    if (emailInput === '' || passwordInput === '') {
        messageArea.classList.add('message-error');
        messageArea.innerHTML = 'Email Address dan Password (NIM) tidak boleh kosong!';
        messageArea.style.display = 'block';
        return;
    }

    messageArea.classList.add('message-success');
    messageArea.innerHTML = 'Login berhasil! Anda akan dialihkan ke Dashboard...';
    messageArea.style.display = 'block';

    setTimeout(function() {
        window.location.href = "dashboard.html"; 
    }, 2000);
});


// --- LOGIKA HALAMAN DASHBOARD (dashboard.html) ---

function renderSummaryCards() {
    const container = document.getElementById('summaryContainer');
    if (!container) return; 
    
    const cardData = [
        { title: "Total Produk", value: summary.totalProducts, icon: "fas fa-shopping-bag" },
        { title: "Total Penjualan", value: summary.totalSales, icon: "fas fa-shopping-bag" },
        { title: "Total Revenue", value: formatRupiah(summary.totalRevenue), icon: "fas fa-dollar-sign" }
    ];

    let html = '';
    cardData.forEach(card => {
        html += `
            <div class="summary-card">
                <div class="icon-box">
                    <i class="${card.icon}"></i>
                </div>
                <p class="title">${card.title}</p>
                <p class="value">${card.value}</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function setupProductButton() {
    const button = document.getElementById('viewProductsButton');
    if (button) {
        button.addEventListener('click', function() {
            window.location.href = "products.html";
        });
    }
}


// --- LOGIKA HALAMAN PRODUCTS (products.html) ---

// Fungsi untuk merender tabel produk
function renderProductTable() {
    const tableBody = document.getElementById('productTableBody');
    if (!tableBody) return;

    let rowsHtml = '';
    // Menggunakan variabel 'products' yang didefinisikan di awal file
    products.forEach((product, index) => {
        rowsHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${formatRupiah(product.price)}</td>
                <td>${product.stock}</td>
                <td class="action-buttons">
                    <button class="edit-button" onclick="editProduct('${product.name}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-button" onclick="deleteProduct(this)">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHtml;
}

// Fungsi Edit Produk (Diperbaiki agar menerima nama produk)
function editProduct(productName) {
    alert('Edit produk: ' + productName + ' (Simulasi)');
}

// Fungsi Delete Produk (Diperbaiki agar menerima elemen tombol, memunculkan konfirmasi, dan menghapus baris)
function deleteProduct(buttonElement) {
    // Tambahkan konfirmasi hapus
    if (confirm("Yakin hapus produk ini?")) {
        // Ambil elemen baris (<tr>) terdekat dari tombol yang diklik
        const row = buttonElement.closest('tr');
        
        // Hapus baris dari DOM menggunakan remove() method
        if (row) {
            row.remove();
            alert('Produk berhasil dihapus dari tampilan.');
        }
    } else {
        // Jika pengguna memilih 'Cancel'
        alert('Penghapusan dibatalkan.');
    }
}


// --- INISIALISASI ---
// Panggil fungsi render ketika DOM sudah siap (untuk memastikan elemen ada)

document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi logika dashboard
    if (document.getElementById('summaryContainer')) {
        renderSummaryCards();
        setupProductButton();
    }
    
    // Inisialisasi logika produk
    if (document.getElementById('productTableBody')) {
        renderProductTable();
    }
});