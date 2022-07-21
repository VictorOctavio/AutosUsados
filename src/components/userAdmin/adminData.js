export const dataFormInput = {    
    inputs: [
        {
            name: 'titulo',
            placeHolder: 'Titulo',
            type: 'text'
        }, {
            name: 'precio',
            placeHolder: 'Precio',
            type: 'number',
            width: '48%'
        }, {
            name: 'color',
            placeHolder: 'Color',
            type: 'text',
            width: '48%'
        }, {
            name: 'kilometros',
            placeHolder: 'Kilometros',
            type: 'number',
            width: '48%',
        }, {
            name: 'modelo',
            placeHolder: 'Modelo/Año',
            type: 'number',
            width: '48%',
        }, {
            name: 'marca',
            placeHolder: 'Marca',
            type: 'text'
        }
    ],

    inputss: (type) => {
        return [
            {
                name: 'titulo',
                placeHolder: 'Titulo',
                type: 'text'
            }, {
                name: 'precio',
                placeHolder: 'Precio',
                type: 'number',
                width: '48%'
            }, {
                name: 'color',
                placeHolder: 'Color',
                type: 'text',
                width: '48%'
            }, {
                name: 'kilometros',
                placeHolder: 'Kilometros',
                type: 'number',
                width: '48%',
                display: type === 'accesorio' ? 'none':'block'
            }, {
                name: 'modelo',
                placeHolder: 'Modelo/Año',
                type: 'number',
                width: '48%',
                display: type  === 'accesorio' ? 'none':'block'
            }, {
                name: 'marca',
                placeHolder: 'Marca',
                type: 'text'
            }
        ]
    },
    
    selectss: (type) => {
        return [
            {
                name: 'unidadPrecio',
                items: ['peso', 'dolar'],
            },{
                name: 'transmision',
                items: ['automatico', 'manual'],
                display: type === 'accesorio' ? 'none':'block'
            }
        ]
    },

    selecets: [
        {
            name: 'unidadPrecio',
            items: ['peso', 'dolar'],
        },{
            name: 'transmision',
            items: ['automatico', 'manual']
        }
    ],

    imagesCard: [
        'https://www.diariomotor.com/imagenes/2020/07/audi-rs6-avant-2020-0620-024-mdm.jpg',
        'https://i.pinimg.com/originals/28/eb/aa/28ebaa96c68900402dea051dfa3cd7b3.jpg',
        'https://p4.wallpaperbetter.com/wallpaper/591/162/473/the-sky-mountains-the-steppe-sport-wallpaper-preview.jpg'
    ],

    auto: ['sedan', 'hatchback', 'deportivo', 'suv', 'tracker', 'minivan', 'convertible'],
    moto: ['110', 'ciudad', 'deportiva', 'cross', 'chopper', 'scooter', 'viaje'],
    accesorio: ['autoparte', 'motoparte']
}
