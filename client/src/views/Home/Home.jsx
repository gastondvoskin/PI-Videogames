import Cards from "../../components/Cards/Cards.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import styles from "./Home.module.css";
import { useDispatch } from "react-redux";
import { getAllVg } from "../../redux/actions.js";
import { useEffect } from "react";
import { useSelector } from 'react-redux';


const Home = () => {

    // implement redux to dispatch action through useDispatch (action.type GET_ALL_VG)
    const dispatch = useDispatch();

    // to avoid a dispatch each time the componen mounts
    const allVg = useSelector(state => state.allVg);

    useEffect(() => {
        // to avoid a dispatch each time the componen mounts
        if (!allVg.length) dispatch(getAllVg());
    }, [dispatch, allVg]);

    const currentVg = useSelector(state => state.currentVg);
    
    
    const VG_PER_PAGE = 15;
    const currentVgLength = currentVg.length;       // eg 160
    console.log('currentVgLength: ', currentVgLength);
    const numberOfPages = Math.ceil(currentVgLength / VG_PER_PAGE);     // eg Math.ceil (160 / 15) = 11

    return (
        <div className={styles.mainContainer}>
            <Filters />
            <Pagination numberOfPages={numberOfPages}/>
            <Cards />
        </div>
    );
};

export default Home; 



// 📍 HOME PAGE | la página principal de tu SPA debe contener:
// SearchBar: un input de búsqueda para encontrar videojuegos por nombre.
// Sector en el que se vea un listado de cards con los videojuegos. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /videogames y deberá mostrar su:
// Imagen.
// Nombre.
// Géneros.
// Cuando se le hace click a una Card deberá redirigir al detalle de ese videojuego específico.
// Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating.
// Paginado: el listado de videojuegos se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 15 videojuegos por página.
// ⚠️ IMPORTANTE: se deben mostrar tanto los videojuegos traidos desde la API como así también los de la base de datos, pero NO está permitido almacenar en la base de datos los videojuegos de la API. Solamente se pueden guardar aquellos creados desde el form.

// ⚠️ IMPORTANTE: debido a que en la API existen alrededor de 500.000 videojuegos, por cuestiones de performance puedes tomar la simplificación de obtener y paginar los primeros 100 videojuegos.
