// Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const navigateBtn = document.querySelector('.action-card.navigate');
    const emergencyBtn = document.querySelector('.action-card.emergency');
    
    if (navigateBtn) {
        navigateBtn.addEventListener('click', () => {
            // Open your floor maps widget
            openWidget();
        });
    }
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', () => {
            // Create emergency popup
            showEmergencyPopup();
        });
    }
});

function showEmergencyPopup() {
    const popupHTML = `
        <div id="emergencyPopup" class="popup-overlay active">
            <div class="popup-container">
                <div class="popup-header" style="background: #e10600; color: white;">
                    <h3><i class="fas fa-exclamation-triangle"></i> Emergency</h3>
                    <button class="close-popup" style="color: white;">&times;</button>
                </div>
                <div class="popup-body">
                    <p>Emergency Contacts:</p>
                    <ul>
                        <li>Security: <strong>123-4567</strong></li>
                        <li>Medical: <strong>765-4321</strong></li>
                        <li>Fire: <strong>911</strong></li>
                    </ul>
                </div>
                <div class="popup-footer">
                    <button class="close-popup-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    const popup = document.getElementById('emergencyPopup');
    const closeBtns = popup.querySelectorAll('.close-popup, .close-popup-btn');
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            popup.remove();
        });
    });
}