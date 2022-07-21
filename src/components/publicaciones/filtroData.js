let marcasMoto = ['bmw', 'honda', 'rouser', 'zanella', 'yamaha'];
let marcasAuto = ['audi', 'bmw', 'honda', 'renault', 'peugeot', 'volkswagen', 'mercedes benz', 'fiat'];
let carroceriaName = ['sedan', 'hatchback', 'deportivo', 'suv', 'tracker', 'minivans', 'convertibles'];
let carroceriaMoto = ['110', 'scooter', 'ciudad', 'deportiva', 'turismo', 'cross', 'chopper'];
let coloresAuto = ['rojo', 'blanco', 'negro', 'azul', 'gris'];
let provincias = ['corrientes', 'bs as', 'misiones', 'neuquen', 'tierra del Fuego', 'etc']

const arrayConvert = (array, search) => {
    let items = [];
    array.forEach(marca => {
        let item = { title: '', search, value: '' }
        item.title = marca;
        item.enlace = marca;
        item.value = marca
        items.push(item);
    })

    return items;
}

export const filtroDataAuto = [
    {
        name: 'departamento',
        items: [
            { title: 'all', search: 'departamento', value: 'all' },
            { title: 'autos', search: 'departamento', value: 'auto' },
            { title: 'motos', search: 'departamento', value: 'moto' },
            { title: 'accesorios', search: 'departamento', value: 'accesorio' },
        ]
    },
    {
        name: 'marca',
        items: arrayConvert(marcasAuto, 'marca')
    },
    {
        name: 'carroceria auto',
        items: arrayConvert(carroceriaName, 'carroceria')
    },
    {
        name: 'estado',
        items: [
            { title: 'nuevo', search: 'kilometros', value: '100' },
            { title: 'usado', search: 'kilometros', value: '1000000' },
        ]
    },
    {
        name: 'ubicacion',
        items: arrayConvert(provincias)
    },
    {
        name: 'kilometros',
        items: [
            { title: 'hasta 25.00km', search: "kilometros", value: '25000' },
            { title: 'hasta 100.000km', search: "kilometros", value: '100000' },
            { title: 'hasta 150.000km', search: "kilometros", value: '150000' },
            { title: 'Sin limites', search: "kilometros", value: '1000000' },
        ]
    },
    {
        name: 'color',
        items: arrayConvert(coloresAuto, "color")
    }
]


export const filtroDataMoto = [
    {
        name: 'departamento',
        items: [
            { title: 'all', search: 'departamento', value: 'all' },
            { title: 'autos', search: 'departamento', value: 'auto' },
            { title: 'motos', search: 'departamento', value: 'moto' },
            { title: 'accesorios', search: 'departamento', value: 'accesorio' },
        ]
    },
    {
        name: 'marca',
        items: arrayConvert(marcasMoto, 'marca')
    },
    {
        name: 'carroceria moto',
        items: arrayConvert(carroceriaMoto, 'carroceria')
    },
    {
        name: 'estado',
        items: [
            { title: 'nuevo', search: 'kilometros', value: '100' },
            { title: 'usado', search: 'kilometros', value: '1000000' },
        ]
    },
    {
        name: 'ubicacion',
        items: arrayConvert(provincias)
    },
    {
        name: 'kilometros',
        items: [
            { title: 'hasta 25.00km', search: "kilometros", value: '25000' },
            { title: 'hasta 100.000km', search: "kilometros", value: '100000' },
            { title: 'hasta 150.000km', search: "kilometros", value: '150000' },
            { title: 'Sin limites', search: "kilometros", value: '1000000' },
        ]
    },
    {
        name: 'color',
        items: arrayConvert(coloresAuto, "color")
    }
]


export const filtroData2 = [
    {
        name: 'departamento',
        items: [
            { title: 'all', search: 'departamento', value: 'all' },
            { title: 'autos', search: 'departamento', value: 'auto' },
            { title: 'motos', search: 'departamento', value: 'moto' },
            { title: 'accesorios', search: 'departamento', value: 'accesorio' },
        ]
    },
    {
        name: 'marcas',
        items: arrayConvert(marcasMoto, 'marca')
    },
    {
        name: 'carroceria auto',
        items: arrayConvert(carroceriaName, 'carroceria')
    },
    {
        name: 'carroceria moto',
        items: arrayConvert(carroceriaMoto, 'carroceria')
    },
    {
        name: 'estado',
        items: [
            { title: 'nuevo', search: 'kilometros', value: '100' },
            { title: 'usado', search: 'kilometros', value: '1000000' },
        ]
    },
    {
        name: 'ubicacion',
        items: arrayConvert(provincias)
    },
    {
        name: 'kilometros',
        items: [
            { title: 'hasta 25.00km', search: "kilometros", value: '25000' },
            { title: 'hasta 100.000km', search: "kilometros", value: '100000' },
            { title: 'hasta 150.000km', search: "kilometros", value: '150000' },
            { title: 'Sin limites', search: "kilometros", value: '1000000' },
        ]
    },
    {
        name: 'color',
        items: arrayConvert(coloresAuto, "color")
    }
]

