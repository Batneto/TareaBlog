# TareaBlog

## Multer
​
Multer es un "middleware" de node.js para el manejo de multipart/form-data, el cuál es usado sobre todo para la subida de archivos.
​
**NOTA:** el formulario siempre debe tener el atributo *enctype="multipart/form-data"*.
​
Multer añade un objeto body y un objeto file o files al objeto request. El objeto body contiene los valores correspondientes a los campos de texto del formulario, los objetos file o files contienen los archivos que serán subidos mediante el formulario.
​
**NOTA:** el *value* del input *hidden* de la url siempre tiene que estar vacío cuando se trata de un formulario para crear "algo" nuevo, por ejemplo: *formulario entrada nueva*; sin embargo, cuando se trata de actualizar/editar, el *value* debe cargar la url que ya está guardada en la base de datos **(ver punto controllers)**.
​
---
​
* Instalación:
```js
npm i multer
```
* Middleware:
```js
const multer = require('multer');
​
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images'); // ruta donde queremos guardar las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // de esta forma prevenimos que se reemplacen los archivos que tengan el mismo nombre
    }
  });
  
const upload = multer({ storage }).single('image'); // almacenamos la configuración de la función 'storage' / el atributo name del input 'file' se tiene que llamar igual (image)
​
module.exports = upload;
```
* Importar middlware en la(s) ruta(s) correspondiente(s).
```js
const upload = require('../middlewares/uploadImage');
​
router.post('/', [
    upload,
] controller);
```
* Controllers:
    * **add…:** se pasa el valor directamente a través del *req.body.photo* al fetch:
    ```js
    req.body.photo = `http://localhost:3000/images/${req.file.filename}`; // url del input file (image)
    ```
    * **update…:** se debe hacer una validación previa antes de pasar el valor al fetch:
    ```js
    req.file != undefined ? req.body.photo = `http://localhost:3000/images/${req.file.filename}` : req.body.photo;
    ```
* fs.unlink: eliminar imágenes anteriores de la carpeta.
    * Ejemplo en controller 'update':
    ```js
    const fs = require('fs').promises;
​
    // capturar solo el nombre de la imagen
    let image = req.body.photo.split('/');
    image = image[image.length-1];
​
    try {
        if(req.file != undefined){
            await fs.unlink(`./public/images/${image}`); // elimina la imagen anterior
            req.body.photo = `http://localhost:3000/images/${req.file.filename}`; // guarda la imagen nueva
        } else {
            req.body.photo; // si no hay cambios, se mantiene la url (imagen) que ya está guardada en MongoDB
        };
    } catch (error) {
        console.log(error);
    };
    ```
    * Ejemplo en controller 'delete':
    ```js
    try {
    
    const { response } = await fetchingData(url, method);
​
    let image = response.entry.photo.split('/'); // separo la url de la imagen
    image = image[image.length-1]; // guardo en la variable solo el nombre de la imagen
    await fs.unlink(`./public/images/${image}`); // acción de eliminar la imagen de la carpeta
​
    } catch (error) {
        console.log(error);
    };