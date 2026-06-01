import qrcode
import json
from urllib.parse import quote_plus

# Example: Create QR codes for different locations
# Format: /locate?x=<x_coord>&y=<y_coord>&floor=<floor>&name=<room_name>

locations_to_encode = [
    {"x": 499.22, "y": 757.31, "floor": 1, "name": "Library"},
    {"x": 161.14, "y": 400.00, "floor": 1, "name": "Crim-2"},
    {"x": 846.12, "y": 300.00, "floor": 1, "name": "S-Lab"},
]

for loc in locations_to_encode:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    # Encode as URL with parameters, using the app's current locate path.
    qr_data = (
        "https://capstonetest-w9am.onrender.com/locate/"
        f"?x={loc['x']}&y={loc['y']}&floor={loc['floor']}&name={quote_plus(loc['name'])}"
    )
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(f"qr_{loc['name'].replace('-', '_').replace(' ', '_')}.png")
    print(f"Generated QR for {loc['name']}: {qr_data}")