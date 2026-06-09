// ============ FILM DATA ============
const FILM_DATA = {
  PNC20: {
    name: 'PNC20',
    brand: 'VEGO',
    type: 'heat', // phim cách nhiệt
    vlt: '20%',
    uv: '99,9%',
    ir: '95%',
    thickness: '2mil',
    image: 'images/pnc-20.png',
    description: 'PNC20 là mã film của thương hiệu VEGO - Malaysia có độ truyền sáng thấp, chống UV và cách nhiệt tốt, chuyên được dùng dán cho các không gian cần sự riêng tư cao.'
  },
  PNC50: {
    name: 'PNC50',
    brand: 'VEGO',
    type: 'heat',
    vlt: '50%',
    uv: '99,9%',
    ir: '93%',
    thickness: '2mil',
    image: 'images/pnc-50.png',
    description: 'PNC50 là mã film của thương hiệu VEGO - Malaysia có độ truyền sáng vừa phải và cách nhiệt tốt, chuyên được dùng dán cho các khách sạn, nhà hàng, không gian triển lãm hoặc các không gian mở...'
  },
  PNC70: {
    name: 'PNC70',
    brand: 'VEGO',
    type: 'heat',
    vlt: '70%',
    uv: '99,9%',
    ir: '95%',
    thickness: '2mil',
    image: 'images/pnc-70.png',
    description: 'PNC70 là mã film của thương hiệu VEGO - Malaysia có độ truyền sáng cao, giữ nguyên ánh sáng tự nhiên và cách nhiệt tốt, thích hợp cho các không gian cần ánh sáng tự nhiên.'
  },
  TOP40: {
    name: 'TOP40',
    brand: 'VEGO',
    type: 'heat',
    vlt: '40%',
    uv: '100%',
    ir: '98 - 99%',
    thickness: '2mil',
    image: 'images/top-40.jpg',
    description: 'TOP40 là mã film cao cấp của thương hiệu VEGO - Malaysia, chống UV 100% và cách nhiệt lên đến 98-99%, đem đến hiệu quả cách nhiệt vượt trội.'
  },
  TOP70: {
    name: 'TOP70',
    brand: 'VEGO',
    type: 'heat',
    vlt: '60%',
    uv: '100%',
    ir: '98 - 99%',
    thickness: '2mil',
    image: 'images/top-70.jpg',
    description: 'TOP70 là mã film cao cấp của thương hiệu VEGO - Malaysia, truyền sáng 60%, chống UV 100% và cách nhiệt 98-99%, phù hợp cho không gian cần ánh sáng và hiệu quả cách nhiệt cao.'
  },
  IR2090: {
    name: 'IR2090',
    brand: 'VEGO',
    type: 'heat',
    vlt: '20%',
    uv: '99,9%',
    ir: '93%',
    thickness: '2mil',
    image: 'images/ir-2090.png',
    description: 'IR2090 là mã film của thương hiệu VEGO - Malaysia có độ truyền sáng thấp, cách nhiệt tốt 93%, phù hợp cho không gian cần sự riêng tư.'
  },
  IR5090: {
    name: 'IR5090',
    brand: 'VEGO',
    type: 'heat',
    vlt: '50%',
    uv: '99,9%',
    ir: '93%',
    thickness: '2mil',
    image: 'images/ir-5090.jpg',
    description: 'IR5090 là mã film của thương hiệu VEGO - Malaysia có độ truyền sáng 50%, cách nhiệt 93%, phù hợp cho nhiều loại không gian.'
  },
  'Silikante Luxury': {
    name: 'Silikante Luxury',
    brand: 'Silikante',
    type: 'ppf', // phim bảo vệ nội thất
    transparency: '99%',
    thickness: '8,5mil',
    heatResistance: '150°C',
    durability: '10 năm',
    features: [
      'Phục hồi, đàn hồi vượt trội các vết xước trong quá trình sử dụng.',
      'Chịu lực tốt, chố hoen ố và trơn trượt cực tốt.',
      'Độ trong và độ bền cao.',
      'Tính thẩm cao trong 10 năm.',
      'Được nghiên cứu chuyên sâu dành riêng cho nội thất.'
    ],
    image: 'images/silikante-luxury.webp',
    description: 'Silikante Luxury là phim bảo vệ nội thất cao cấp nhất, độ trong 99%, phục hồi vết xước vượt trội, độ bền 10 năm, chịu nhiệt 150°C.'
  },
  'Silikante Pro': {
    name: 'Silikante Pro',
    brand: 'Silikante',
    type: 'ppf',
    transparency: '95%',
    thickness: '7,5mil',
    heatResistance: '120°C',
    durability: '8 năm',
    features: [
      'Có tính năng phục hồi tốt các vết xước.',
      'Chống hoen ố, thấm nước, chống trơn trượt và bo được viền.',
      'Tính thẩm mỹ cao.',
      'Được nghiên cứu chuyên sâu cho nội thất.'
    ],
    image: 'images/silikante-pro.webp',
    description: 'Silikante Pro là phim bảo vệ nội thất chuyên nghiệp, độ trong 95%, phục hồi tốt vết xước, độ bền 8 năm, chịu nhiệt 120°C.'
  }
};

// ============ STATE ============
let filmRows = [{ id: 1, filmCode: '', price: '', area: '' }];
let nextRowId = 2;

// ============ HELPERS ============
function formatCurrency(num) {
  if (!num || isNaN(num)) return '0';
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseCurrency(str) {
  if (!str) return 0;
  return parseInt(str.toString().replace(/\./g, ''), 10) || 0;
}

function removeVietnameseTones(str) {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return str;
}

function generateFileName(customerName) {
  if (!customerName) return 'ABFILM_BAO_GIA_KH_KHACH_HANG';
  const cleaned = removeVietnameseTones(customerName.trim())
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, '_');
  return `ABFILM_BAO_GIA_KH_${cleaned}`;
}

function getTodayFormatted() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${year}-${month}-${day}`;
}

function formatDateVN(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  return `Hà Nội, ngày ${parseInt(parts[2])} tháng ${parseInt(parts[1])} năm ${parts[0]}`;
}

// ============ RENDER FILM ROWS ============
function renderFilmRows() {
  const container = document.getElementById('film-rows');
  container.innerHTML = '';

  filmRows.forEach((row, index) => {
    const div = document.createElement('div');
    div.className = 'film-row';
    div.innerHTML = `
      <div class="row-number">${index + 1}</div>
      <div class="form-group">
        <label>Mã Film</label>
        <select id="film-select-${row.id}" onchange="onFilmChange(${row.id}, this.value)">
          <option value="">-- Chọn --</option>
          ${Object.keys(FILM_DATA).map(key => 
            `<option value="${key}" ${row.filmCode === key ? 'selected' : ''}>${FILM_DATA[key].name}</option>`
          ).join('')}
        </select>
        ${row.filmCode ? `
          <div class="film-preview-badge">
            <img src="${FILM_DATA[row.filmCode].image}" alt="${row.filmCode}">
            <span>${FILM_DATA[row.filmCode].brand} - ${FILM_DATA[row.filmCode].type === 'ppf' ? 'Film bảo vệ' : 'Film cách nhiệt'}</span>
          </div>
        ` : ''}
      </div>
      <div class="form-group">
        <label>Đơn giá (VNĐ/m²)</label>
        <input type="text" id="price-${row.id}" placeholder="Ví dụ: 520.000"
          value="${row.price ? formatCurrency(row.price) : ''}"
          oninput="onPriceInput(${row.id}, this)">
      </div>
      <div class="form-group">
        <label>Diện tích (m²)</label>
        <input type="number" id="area-${row.id}" placeholder="Ví dụ: 35"
          value="${row.area || ''}"
          oninput="onAreaInput(${row.id}, this.value)" step="0.1" min="0">
      </div>
      <div class="form-group">
        <label>Thành tiền (chưa VAT)</label>
        <div class="cost-display" id="cost-${row.id}">${
          row.price && row.area 
            ? formatCurrency(row.price * row.area) + ' VNĐ' 
            : '—'
        }</div>
      </div>
      <button class="btn-remove-row" onclick="removeRow(${row.id})" title="Xóa dòng">✕</button>
    `;
    container.appendChild(div);
  });
}

// ============ EVENT HANDLERS ============
function onFilmChange(rowId, value) {
  const row = filmRows.find(r => r.id === rowId);
  if (row) row.filmCode = value;
  renderFilmRows();
}

function onPriceInput(rowId, input) {
  const raw = input.value.replace(/\./g, '');
  const num = parseInt(raw, 10) || 0;
  const row = filmRows.find(r => r.id === rowId);
  if (row) row.price = num;

  // Format with dots while keeping cursor position
  const cursorPos = input.selectionStart;
  const oldLen = input.value.length;
  input.value = num ? formatCurrency(num) : '';
  const newLen = input.value.length;
  const newCursorPos = cursorPos + (newLen - oldLen);
  input.setSelectionRange(newCursorPos, newCursorPos);

  updateCostDisplay(rowId);
}

function onAreaInput(rowId, value) {
  const row = filmRows.find(r => r.id === rowId);
  if (row) row.area = parseFloat(value) || 0;
  updateCostDisplay(rowId);
}

function updateCostDisplay(rowId) {
  const row = filmRows.find(r => r.id === rowId);
  const costEl = document.getElementById(`cost-${rowId}`);
  if (row && costEl) {
    if (row.price && row.area) {
      costEl.textContent = formatCurrency(row.price * row.area) + ' VNĐ';
    } else {
      costEl.textContent = '—';
    }
  }
}

function addRow() {
  filmRows.push({ id: nextRowId++, filmCode: '', price: '', area: '' });
  renderFilmRows();
}

function removeRow(rowId) {
  if (filmRows.length <= 1) return;
  filmRows = filmRows.filter(r => r.id !== rowId);
  renderFilmRows();
}

// ============ GENERATE QUOTE PREVIEW ============
function generateQuote() {
  const customerName = document.getElementById('customer-name').value || 'Quý Khách Hàng';
  const customerPhone = document.getElementById('customer-phone').value || '';
  const customerAddress = document.getElementById('customer-address').value || '';
  const quoteDate = document.getElementById('quote-date').value || getTodayFormatted();
  const vatRate = parseFloat(document.getElementById('vat-rate').value) || 8;
  const customNotes = document.getElementById('custom-notes').value.trim();

  // Filter valid rows
  const validRows = filmRows.filter(r => r.filmCode && r.price && r.area);
  if (validRows.length === 0) {
    alert('Vui lòng chọn ít nhất 1 mã film và điền đơn giá, diện tích!');
    return;
  }

  // Separate heat films and PPF films
  const heatFilms = validRows.filter(r => FILM_DATA[r.filmCode].type === 'heat');
  const ppfFilms = validRows.filter(r => FILM_DATA[r.filmCode].type === 'ppf');

  // Calculate total area
  const totalArea = validRows.reduce((sum, r) => sum + r.area, 0);

  // Build specs table for heat films
  let specsTableHTML = '';
  if (heatFilms.length > 0) {
    specsTableHTML += `
      <h3 class="quote-section-title">Thông Số Các Mã Film Cách Nhiệt</h3>
      <table class="quote-table">
        <thead>
          <tr>
            <th>Mã Film</th>
            <th>Truyền sáng (VLT)</th>
            <th>Chống UV</th>
            <th>Cách nhiệt (IR)</th>
            <th>Độ dày</th>
            <th>Giá thành (VNĐ/m²)</th>
          </tr>
        </thead>
        <tbody>
          ${heatFilms.map(r => {
            const f = FILM_DATA[r.filmCode];
            return `
              <tr>
                <td><strong>${f.name}</strong></td>
                <td>${f.vlt}</td>
                <td>${f.uv}</td>
                <td>${f.ir}</td>
                <td>${f.thickness}</td>
                <td>${formatCurrency(r.price)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  // Build specs table for PPF films (Silikante)
  if (ppfFilms.length > 0) {
    specsTableHTML += `
      <h3 class="quote-section-title">Thông Số Film Bảo Vệ Nội Thất</h3>
      <table class="quote-table">
        <thead>
          <tr>
            <th>Mã Film</th>
            <th>Độ trong</th>
            <th>Độ dày</th>
            <th>Chịu nhiệt</th>
            <th>Tác dụng</th>
            <th>Độ bền</th>
            <th>Giá (VNĐ/m²)</th>
          </tr>
        </thead>
        <tbody>
          ${ppfFilms.map(r => {
            const f = FILM_DATA[r.filmCode];
            return `
              <tr>
                <td><strong>${f.name}</strong></td>
                <td>${f.transparency}</td>
                <td>${f.thickness}</td>
                <td>${f.heatResistance}</td>
                <td class="tac-dung-cell">${f.features.map(feat => '- ' + feat).join('<br>')}</td>
                <td>${f.durability}</td>
                <td>${formatCurrency(r.price)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  // Film images
  const uniqueFilms = [...new Set(validRows.map(r => r.filmCode))];
  const filmImagesHTML = `
    <div class="quote-film-images">
      ${uniqueFilms.map(code => `
        <div class="quote-film-image-card">
          <img src="${FILM_DATA[code].image}" alt="${FILM_DATA[code].name}">
          <div class="film-name">${FILM_DATA[code].name}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Pricing table
  let totalBeforeVAT = 0;
  let totalWithVAT = 0;
  const pricingRowsHTML = validRows.map((r, idx) => {
    const costBeforeVAT = r.price * r.area;
    const costWithVAT = Math.round(costBeforeVAT * (1 + vatRate / 100));
    totalBeforeVAT += costBeforeVAT;
    totalWithVAT += costWithVAT;
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${FILM_DATA[r.filmCode].name}</strong></td>
        <td>${r.area}</td>
        <td class="text-right">${formatCurrency(r.price)}</td>
        <td class="text-right">${formatCurrency(costBeforeVAT)}</td>
        <td class="text-right">${formatCurrency(costWithVAT)}</td>
      </tr>
    `;
  }).join('');

  // Notes
  const descriptions = uniqueFilms.map(code => FILM_DATA[code].description).filter(Boolean);
  // Custom notes from user
  const customNotesItems = customNotes
    ? customNotes.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')
    : '';

  const notesHTML = `
    <div class="quote-notes">
      <h4>Ghi chú:</h4>
      <ul>
        ${descriptions.map(d => `<li>${d}</li>`).join('')}
        <li>Bảo hành 10 năm các vấn đề bong, tróc, nổ, rộp... liên quan tới chất lượng của film.</li>
        <li>Đơn giá đã bao gồm chi phí thi công hoàn thiện tại khu vực Thành phố Hà Nội.</li>
        ${customNotesItems}
      </ul>
    </div>
  `;

  let filmTypeStr = "";
  let titleStr = "";
  if (heatFilms.length > 0 && ppfFilms.length > 0) {
    filmTypeStr = "phim cách nhiệt & phim bảo vệ nội thất";
    titleStr = "BÁO GIÁ PHIM CÁCH NHIỆT & PHIM BẢO VỆ NỘI THẤT";
  } else if (heatFilms.length > 0) {
    filmTypeStr = "phim cách nhiệt";
    titleStr = "BÁO GIÁ PHIM CÁCH NHIỆT NHÀ KÍNH";
  } else if (ppfFilms.length > 0) {
    filmTypeStr = "phim bảo vệ nội thất";
    titleStr = "BÁO GIÁ PHIM BẢO VỆ NỘI THẤT";
  }

  // Assemble full quote
  const quoteHTML = `
    <div class="quote-header">
      <img src="images/Logo-ABfilm.png" alt="AB Films Logo" class="quote-header-logo">
      <div class="quote-header-info">
        <div class="company-name">CÔNG TY TNHH AB Films</div>
        <div class="company-detail">
          Địa chỉ: Số 45 Ngõ 17 Phú Lương, Hà Đông, Hà Nội<br>
          Điện thoại: 0988.191.633 – 0969.006.232<br>
          Email: congtyabfilm@gmail.com - Website: abfilm.com.vn
        </div>
      </div>
    </div>
    <div class="quote-body">
      <h2 class="quote-title">${titleStr}</h2>

      <div class="quote-customer-info">
        <p><strong>Khách hàng:</strong> ${customerName}</p>
        <p><strong>Số điện thoại:</strong> ${customerPhone}</p>
        <p><strong>Địa chỉ công trình:</strong> ${customerAddress}</p>
        <p><strong>Ngày:</strong> ${formatDateVN(quoteDate)}</p>
      </div>

      <p style="font-size: 0.88rem; color: #444; margin-bottom: 16px; line-height: 1.7;">
        Kính gửi Quý khách hàng <strong>${customerName}</strong>,<br><br>
        Lời đầu tiên, xin thay mặt Công ty TNHH AB Films, chúng tôi chân thành gửi đến Quý khách hàng lời chúc sức khỏe, hạnh phúc và lời chào hợp tác trân trọng nhất. Cảm ơn Quý khách đã quan tâm và tin tưởng sử dụng dịch vụ của chúng tôi.<br><br>
        Dựa trên yêu cầu và thực tế khảo sát, chúng tôi xin gửi đến Quý khách bảng báo giá dự kiến cho hạng mục thi công dán <strong>${filmTypeStr}</strong> chi tiết như sau:
      </p>

      ${specsTableHTML}

      <h3 class="quote-section-title">Ảnh Mã Film</h3>
      ${filmImagesHTML}

      <h3 class="quote-section-title">Báo giá theo diện tích khảo sát ${totalArea} m²</h3>
      <table class="quote-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Film</th>
            <th>Diện tích (m²)</th>
            <th>Đơn giá (VNĐ/m²)</th>
            <th>Chi phí chưa VAT (VNĐ)</th>
            <th>Chi phí bao gồm VAT (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          ${pricingRowsHTML}
          <tr class="total-row">
            <td colspan="4"><strong>TỔNG CỘNG</strong></td>
            <td class="text-right">${formatCurrency(totalBeforeVAT)}</td>
            <td class="text-right">${formatCurrency(totalWithVAT)}</td>
          </tr>
        </tbody>
      </table>

      ${notesHTML}

      <div class="quote-footer">
        ${formatDateVN(quoteDate)}
      </div>
    </div>
  `;

  document.getElementById('quote-preview').innerHTML = quoteHTML;

  // Show overlay
  document.getElementById('quote-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuoteOverlay() {
  document.getElementById('quote-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ============ EXPORT PDF ============
async function exportPDF() {
  const customerName = document.getElementById('customer-name').value || 'KHACH_HANG';
  const fileName = generateFileName(customerName);

  const element = document.getElementById('quote-preview');
  const loading = document.getElementById('loading-overlay');

  // Show loading
  loading.classList.add('active');

  // Create a clone to render independently of the scrollable overlay
  // This fixes html2canvas cutting off elements in scrollable divs
  const cloneContainer = document.createElement('div');
  cloneContainer.style.position = 'absolute';
  cloneContainer.style.top = '-9999px';
  cloneContainer.style.left = '0';
  cloneContainer.style.width = '900px';
  cloneContainer.style.background = '#fff';
  
  const clone = element.cloneNode(true);
  clone.removeAttribute('id');
  cloneContainer.appendChild(clone);
  document.body.appendChild(cloneContainer);

  const opt = {
    margin: [10, 5, 10, 5],
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: 0,
      windowWidth: 900
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  try {
    await html2pdf().set(opt).from(cloneContainer).save();
  } catch (err) {
    console.error('PDF export error:', err);
    alert('Có lỗi khi xuất PDF. Vui lòng thử lại!');
  } finally {
    document.body.removeChild(cloneContainer);
    loading.classList.remove('active');
  }
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date
  document.getElementById('quote-date').value = getTodayFormatted();

  // Render initial film row
  renderFilmRows();

  // Close overlay on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuoteOverlay();
  });
});
