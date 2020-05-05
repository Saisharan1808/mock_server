const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
var cars={cars:[
              {id:1,Model:'BMW X3',PassengerAirbag :'one seat',EngineType:"petrol",rupee:'Rs. 56.0 - 60.5 Lakh*',TransmissionType:'Manual'},
              {id:2,Model : 'BMW 5 Series',PassengerAirbag :'two seat',EngineType:"Diesel",rupee : 'Rs. 55.4 - 66.8 Lakh*',TransmissionType:'Manual'},
              {id:3,Model : 'BMW 6 Series',PassengerAirbag :'front seat',EngineType:"petrol",rupee : 'Rs. 64.4 - 74.5 Lakh*',TransmissionType:'Automatic'},
              {id:4,Model : 'BMW M2',PassengerAirbag :'four seat',EngineType:"Diesel",rupee : 'Rs. 83.4 Lakh*',TransmissionType:'Automatic'},
              {id:5,Model : ' BMW 8-Series',PassengerAirbag :'four seat',EngineType:"petrol",rupee : 'Rs. 90.5 Lakh*',TransmissionType:'Manual'}
           ]} ;
const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost'   
    });

    await server.register(Inert);

   server.route({
        method: 'GET',
        path: '/cars',
        handler: (request, h) => {
            return cars;
        }
    });

    server.route({
        method: 'GET',
        path: '/cars/{carId}',
        handler: (request, h) => {
            var carID=request.params.carId;
            var i;
            for (i = 0; i < cars.cars.length; i++) { 
                    if(cars.cars[i].id==carID){
                    return {"cars":cars.cars[i]};
                }
            }
       }
    });

    server.route({
        method: 'POST',
        path: '/cars',
        handler: (request, reply) => {
            const payload=request.payload;
            var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var carID=cars.cars[cars.cars.length-1].id;
            var carsId=parseInt(carID)+1;
            // console.log(carsId);
            var obj = JSON.parse(payload);
            obj.cars.id=carsId;
            cars.cars.push(obj.cars);
            // console.log(obj.cars)
            return {cars:{'id':obj.cars.id,'created_time':time}};
        }
    });

     server.route({
        method: 'PATCH',
        path: '/cars/{carId}',
        handler: (request, h) => {
            var carID=request.params.carId;
            const payload=request.payload;
            var obj = JSON.parse(payload);
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var i;
            for (i = 0; i < cars.cars.length; i++) { 
                  if(cars.cars[i].id==carID){
                        for(var j in obj.cars){
                            if(j == 'id'){
                                cars.cars[i].id = obj.cars[j];
                            }
                            if(j == 'Model'){
                                cars.cars[i].Model = obj.cars[j];
                            }else{
                                cars.cars[i].Model = cars.cars[i].Model;    
                            }
                            if(j == 'PassengerAirbag'){
                                cars.cars[i].PassengerAirbag = obj.cars[j];
                            }else{
                                cars.cars[i].PassengerAirbag = cars.cars[i].PassengerAirbag;    
                            }
                            if(j == 'EngineType'){
                                cars.cars[i].EngineType = obj.cars[j];
                            }else{
                                cars.cars[i].EngineType = cars.cars[i].EngineType;  
                            }
                            if(j == 'rupee'){
                                cars.cars[i].rupee = obj.cars[j];
                            }else{
                                cars.cars[i].rupee = cars.cars[i].rupee;    
                            }
                            if(j == 'TransmissionType'){
                                cars.cars[i].TransmissionType = obj.cars[j];
                            }else{
                                cars.cars[i].TransmissionType = cars.cars[i].TransmissionType;  
                            }
                        }
                  }
            }
            return {cars:{'id':carID,'modified_time':time}};
             }
    });

    server.route({
        method: 'DELETE',
        path: '/cars/{carId}',
        handler: (request, h) => {
           var carID=request.params.carId; 
           var i;
           for (i = 0; i < cars.cars.length; i++) { 
                if(cars.cars[i].id==carID){
                    cars.cars.splice(i,1);
                }
            }
            return {};
        }
    });   

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '/home/local/ZOHOCORP/sharan-zuch804/lyte-siblingAPIs',
                index: ['index.html']
            }
        }
    });    
    
    await server.start();
    console.log('ServerStarted');

};


process.on('unhandledRejection', (err) => {
    process.exit(1);
});


init();


/* var i;
            for (i = 0; i < cars.cars.length; i++) { 
                    if(cars.cars[i].id==carID){
                    cars.cars[i].Model=obj.cars.Model;
                    cars.cars[i].PassengerAirbag=obj.cars.PassengerAirbag;
                    cars.cars[i].EngineType=obj.cars.EngineType;
                    cars.cars[i].rupee=obj.cars.rupee;
                    cars.cars[i].TransmissionType=obj.cars.TransmissionType;
                }
            }*/
