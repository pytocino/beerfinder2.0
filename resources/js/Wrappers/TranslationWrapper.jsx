import React, { useEffect, useState } from "react";

// Función para determinar si un texto debe ser traducido o no (evitar rutas y nombres de archivo)
const shouldTranslate = (text) => {
    // Expresión regular para detectar rutas o nombres de archivo (.jsx)
    const fileNamePattern = /([a-zA-Z0-9-_]+)\.jsx$/;
    // Si el texto parece ser una ruta o nombre de archivo, no lo traducimos
    if (fileNamePattern.test(text)) {
        return false;
    }
    return true; // Si no es un archivo o ruta, se traduce
};

const TranslationWrapper = ({ children, language }) => {
    const [translatedChildren, setTranslatedChildren] = useState(children);

    useEffect(() => {
        // Función recursiva para traducir el contenido
        const translateTextRecursively = async (node, index) => {
            // Si el nodo es un string y debe traducirse
            if (typeof node === "string") {
                if (shouldTranslate(node)) {
                    const translatedText = await translateText(node, language);
                    return translatedText;
                }
                return node; // No traducimos el texto si no debería
            }

            // Si el nodo es un componente de React (objeto JSX)
            if (React.isValidElement(node)) {
                // Si el componente es una etiqueta vacía (por ejemplo, <hr>), no puede tener children
                if (
                    ["hr", "img", "input", "br", "meta", "link"].includes(
                        node.type
                    )
                ) {
                    return node; // No traducimos elementos vacíos
                }

                const newProps = { ...node.props };

                // Asegurarnos de que estamos trabajando con un array de children
                const childrenArray = React.Children.toArray(
                    node.props.children
                );

                // Recursivamente traducir cada hijo
                const translatedChildren = await Promise.all(
                    childrenArray.map((child, i) =>
                        translateTextRecursively(child, i)
                    ) // Añadimos `index` para la clave
                );

                newProps.children = translatedChildren; // Asignamos los hijos traducidos

                // Retornar el nuevo componente con los hijos traducidos
                return React.cloneElement(node, { ...newProps, key: index });
            }

            return node;
        };

        // Procesar todos los children
        const processChildren = async () => {
            const translated = await Promise.all(
                React.Children.map(children, (child, index) =>
                    translateTextRecursively(child, index)
                ) // Añadimos `index` para la clave
            );
            setTranslatedChildren(translated);
        };

        processChildren();
    }, [children, language]);

    // Función para traducir un texto
    const translateText = async (text, language) => {
        const response = await fetch(`http://127.0.0.1:8000/api/translate/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: text,
                source: "es", // Idioma original
                target: language, // Idioma de destino
            }),
        });
        const data = await response.json();
        return data.translated_text || text; // Retornamos el texto traducido
    };

    return <>{translatedChildren}</>;
};

export default TranslationWrapper;
