# AI Image Detector - PSI
**Użyte technologie/języki:**
* Python
* Javascript
* YOLO
* Tensorflow


Ogólne działanie
-----------------
Użytkownik przesyła zdjęcie poprzez formularz do serwera requestem POST. Serwer przetwarza zdjęcie przy użyciu skryptu napisanego w Pythonie i modelu który był trenowany około 1000 obrazkami owoców przez 4 godziny.

RestAPI
--------
API zostało napisane w Pythonie przy użyciu frameworku Flask. Użytkownik wysyła zdjęcie, API przetwarza, zapisuje do pliku i wysyła go w odpowiedzi wraz z nazwą wykrytego przedmiotu. Zapytanie można wysłać ręcznie pod `http://95.216.210.103:2137/send` (w form-data musi być klucz o nazwie "file" a pod nim jako value nasze zdjęcie).
**Kod**
```python
from flask import Flask, request
from flask_restful import Resource, Api
import os
os.environ['CUDA_VISIBLE_DEVICES'] = '0'
from yolov3.utils import detect_image, detect_realtime, detect_video, Load_Yolo_model, detect_video_realtime_mp, get_name
from yolov3.configs import *
from flask import send_file
from flask_cors import CORS, cross_origin
import base64

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/*": {"origins": "*"}})

class send_image(Resource):
    @app.route("/send")
    @cross_origin()
    def post(self):
        if request.method == 'POST':
            if 'file' not in request.files:
                return {"error": "no file included :("}
            file = request.files['file']
            if file.filename == '':
                return {"error": "no file name"}
            file.save(os.path.join("./uploaded", "uploaded.png"))
        yolo = Load_Yolo_model()
        detect_image(yolo, "./uploaded/uploaded.png", "./results/res.jpg", input_size=YOLO_INPUT_SIZE, show=False, CLASSES=TEST_CLASSES, rectangle_colors=(255, 0, 0))
        with open("./results/res.jpg", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            return {"name": get_name(), "base64": encoded_string.decode("utf-8")}


api.add_resource(send_image, '/send')

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port='2137')
```

YOLOv3 (wykrywanie obiektów)
------------
Do wykrywania obiektów użyłem modelu który wytrenowałem własnoręcznie około tysiącem obrazków. Cały trening trwał 4 godziny. Wszystkie obrazki do treningu zostały wzięte z ```https://storage.googleapis.com/openimages/web/index.html```.