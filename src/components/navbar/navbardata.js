import auto1 from '../../assets/auto1.jpg';
import auto2 from '../../assets/auto-2.jpg';
import auto3 from '../../assets/auto3.jpg';
import auto4 from '../../assets/auto4.jpg';
import moto1 from '../../assets/moto1.jpg';
import moto2 from '../../assets/moto2.png';
import moto3 from '../../assets/moto3.jpg';
import moto4 from '../../assets/moto4.jpg';
import autoparte from '../../assets/autopartes.jpg'
import autoparte2 from '../../assets/autopartes2.jpg'
import motoparte from '../../assets/motopartes.jpg'
import motoparte2 from '../../assets/motopartes1.jpg'

export const navbarData = [
    {
        title: 'auto',
        marcas: ['audi', 'volkswagen', 'fiat', 'renault', 'chevrolet', 'ford'],
        galeria: [
            {urlImage: auto1, url: '/', title: 'Sueña'},
            {urlImage: auto2, url: '/', title: 'Trabaja'},
            {urlImage: auto4, url: '/', title: 'Lucha'},
            {urlImage: auto3, url: '/', title: 'Consíguelo'},
        ]  
    },
    {
        title: 'moto',
        marcas: ['honda', 'rouser', 'yamaha', 'KTM', 'zanella'],
        galeria: [
            {urlImage: moto1, url: '/', title: 'Vive'},
            {urlImage: moto2, url: '/', title: 'Ríe'},
            {urlImage: moto3, url: '/', title: 'Ama'},
            {urlImage: moto4, url: '/', title: 'Agradece'},
        ] 
    },
    {
        title: 'accesorio',
        marcas: ['autoparte', 'motoparte'],
        galeria: [
            {urlImage: autoparte, url: '/', title: 'Levantate'},
            {urlImage: autoparte2, url: '/', title: 'Intentalo'},
            {urlImage: motoparte, url: '/', title: 'Esfuerzate'},
            {urlImage: motoparte2, url: '/', title: 'Triunfa'},
        ] 
    }
]