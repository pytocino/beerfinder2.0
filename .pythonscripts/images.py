from PIL import Image
import os

# Lista de extensiones de imagen comunes
extensiones_imagen = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']

def redimensionar_imagenes(ruta_de_carpeta, tamano_deseado=(400, 400)):
    # Verificar si la carpeta existe
    if not os.path.exists(ruta_de_carpeta):
        print("La carpeta no existe.")
        return

    # Listar archivos en la carpeta
    archivos = os.listdir(ruta_de_carpeta)

    for archivo in archivos:
        ruta_completa = os.path.join(ruta_de_carpeta, archivo)

        # Verificar si el archivo es una imagen por su extensión
        if any(archivo.lower().endswith(ext) for ext in extensiones_imagen):
            try:
                with Image.open(ruta_completa) as img:
                    img = img.resize(tamano_deseado)
                    img.save(ruta_completa)
                    print(f"Imagen {archivo} redimensionada con éxito.")
            except Exception as e:
                print(f"Error al procesar {archivo}: {e}")
        else:
            print(f"El archivo {archivo} no es una imagen válida y se omite.")

# Ruta de la carpeta que contiene las imágenes a redimensionar
ruta_de_carpeta = input("Ingrese la ruta de la carpeta que contiene las imágenes: ")

# Llamada a la función para redimensionar las imágenes en la carpeta especificada
redimensionar_imagenes(ruta_de_carpeta)
