<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Próximamente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        body {
            background-color: #ffcc00; /* Fondo amarillo */
            color: #000000; /* Texto negro */
            margin: 0; /* Elimina el margen predeterminado */
            height: 100vh; /* Asegura que el body ocupe toda la altura de la pantalla */
        }

        header {
            text-align: center;
            margin-top: 50px; /* Espaciado superior */
        }

        header img {
            max-width: 90%; /* Hace que la imagen sea responsiva */
            height: auto; /* Mantiene la proporción de la imagen */
            max-height: 200px; /* Limita la altura máxima */
        }

        .content {
            text-align: center;
            margin-top: 30px; /* Espaciado superior para el contenido */
        }

        h1 {
            font-weight: bold;
        }

        .lead {
            font-size: 1.25rem; /* Aumenta un poco el tamaño del texto */
        }
    </style>
</head>

<body class="d-flex flex-column align-items-center justify-content-center">
    <header>
        <!-- Cambia la ruta de la imagen según sea necesario -->
        <img src="./beerfinder.svg" alt="Logo de BeerFinder">
    </header>

    <div class="content">
        <h1 class="display-1">Próximamente.</h1>
        <p class="lead">Estamos trabajando en algo increíble. Volveremos pronto.</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
</body>
</html>
