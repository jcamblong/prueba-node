const inquirer = require('inquirer')

let opciones = [
    {
        name:'clienteHabitual',
        type:'confirm',
        message:'¿Sos cliente habitual?',
        default:false,
    },

    {
        name:'nombre',
        type:'input',
        message:'Ingresa tu nombre',
    },
    
    {
        name:'telefono',
        type:'input',
        message:'Ingresa tu numero de telefono',
    },
    
    {
        name:'gusto',
        type:'rawlist',
        message:'Ingresa el gusto de la pizza',
        choices:['Muzzarella','Jamon y Morron','Calabresa','4 Quesos'],
    },

    {
        name:'tamanio',
        type:'list',
        message:'Elegi el tamaño de la pizza',
        choices:['Personal','Mediana','Grande'],
    },

    {
        name:'conBebida',
        type:'confirm',
        message:'¿Queres agregar una bebida?',
        default:false,
    },

    {
        name:'bebida',
        type:'list',
        message:'Elegi el gusto de la bebida',
        choices:['Coca-Cola','7up','Pepsi','Fernet'],
        when: function (respuestas){
            return respuestas.conBebida
        },
        validate: function(respuestas){
            
        }
    },

    {
        name:'empanadas',
        type:'checkbox',
        message:'¿Que gusto de empanadas queres?',
        choices:['JyQ','Carne','Calabresa','4 Quesos'],
        when: function (respuestas){
            return respuestas.clienteHabitual
        },
        validate: function(respuestas){
            if(respuestas.length < 3){
                return 'Elegi al menos 3 sabores de empanadas'
            }
            return true
        }
    },

    {
        name:'delivery',
        type:'confirm',
        message:'¿La pizza es para llevar?',
        default:false,
    },

    {
        name:'direccion',
        type:'input',
        message:'Ingresa tu direccion',
        when: function (respuestas){
            return respuestas.delivery
        },
        validate: function (respuestas){
            if (respuestas.length < 5) {
                return 'Dejanos saber tu direccion para enviarte la pizza'
            }
            return true
        }
    },

]

inquirer.prompt(opciones)

.then(function(respuestas) {
    console.log('=== Resumen de tu pedido ===')
    console.log('Tus datos son - Nombre: ' + respuestas.nombre + ' / Teléfono: ' + respuestas.telefono)
    if (respuestas.delivery == true){
            console.log('Tu pedido será entregado en: ' + respuestas.direccion)
        } else {console.log('Nos indicaste que pasarás a retirar tu pedido')}
    console.log('=== Productos solicitados ===')
    console.log('Pizza: ' +  respuestas.gusto)
    console.log('Tamaño: ' + respuestas.tamanio)
    if(respuestas.conBebida == true){
        console.log('Bebida: ' + respuestas.bebida)
    }
    if(respuestas.clienteHabitual == true){
        console.log('Tus tres empanadas de regalo serán de:')
        console.log('• ' + respuestas.empanadas[0])
        console.log('• ' + respuestas.empanadas[1])
        console.log('• ' + respuestas.empanadas[2])
    }
    console.log('===============================')
    
    var productos = 1
    var precio = 0
    if(respuestas.clienteHabitual == true){
        ++productos
        if(respuestas.conBebida == true){
            ++productos
        }
    }
    console.log('Total productos: ' + productos)

    if(respuestas.delivery == true){
        console.log('Total delivery: $80')
    } else { console.log('Total delivery: $0') }

    
    

    switch (respuestas.tamanio){
        case 'Personal':
            precio = 430
        break;
        case 'Mediana':
            precio = 560
        break;
        case 'Grande':
            precio = 650
        break;
    }
    if(respuestas.delivery == true){
        precio = precio + 20
    }

    if(respuestas.conBebida == true && respuestas.tamanio == 'Personal'){
        console.log('Descuentos: ' + precio * 0.03)
        precio = precio - (precio * 0.03) + 80
        ++productos
    } else if(respuestas.conBebida == true && respuestas.tamanio == 'Mediana'){
        console.log('Descuentos: ' + precio * 0.05)
        precio = precio - (precio * 0.05) + 80
        ++productos
    } else if(respuestas.conBebida == true && respuestas.tamanio == 'Grande'){
        console.log('Descuentos: ' + precio * 0.08)
        precio = precio - (precio * 0.08) + 80
        ++productos
    } else { console.log('Descuentos: $0') }

    console.log('TOTAL: ' + precio)
    console.log('===============================')
    var fechaActual = new Date()
    console.log('Fecha: ' + fechaActual.getFullYear() + '/' + fechaActual.getMonth() + '/' + fechaActual.getDay())
    console.log('Hora: ' + fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds())
    }
)
