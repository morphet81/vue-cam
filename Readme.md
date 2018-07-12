# Vue Cam

Intented to be a simple camera component for VueJS.

Vue Cam allows you to preview the camera stream at the size you need and to make snapshots of it, conserving the same size and ratio as what you see (WYSIWYG).

## Installation

NPM
```bash
npm install vue-cam
```

Yarn
```bash
yarn add vue-cam
```

## Usage

Just import vue-cam in your ```main.js``` file, the component will be automatically loaded in the global scope.

```javascript
...
import 'vue-cam'
...
```

Then put the ```vc-cam``` component wherever you need

```html
<vc-cam></vc-cam>
```

You can make snapshots using the ```snapshot``` method of the component. The method will return a base64 string.

First, give a reference to the component
```html
<vc-cam ref="camera"></vc-cam>
```

Then where you need it
```javascript
let snapBase64 = this.$refs.camera.snapshot()
```

## Attributes

|Attribute   |Role                                                                                                                                   |Default    |
|------------|---------------------------------------------------------------------------------------------------------------------------------------|-----------|
|autoplay    |Indicates if the preview should start once authorization is given by the user. <br>Should generally be set to false for mobile devices |true       |
|width       |The width of the preview area                                                                                                          |640        |
|height      |The height of the preview area                                                                                                         |480        |
|fit         |Indicates how the stream should appear inside the preview area. Uses CSS-like values 'contain' or 'cover'                              |'cover'    |

