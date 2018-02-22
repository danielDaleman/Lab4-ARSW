var table = [{
			    idTable: "1",
				idOrder: "1",	
				order:[
                        {product : "pizza", quantity:"1", price:"123"},
                        {product : "perro", quantity:"1", price:"123"}
                      ]
         	},
			{ 
			    idTable: "2", 
				idOrder: "3", 
				order: [
				        {product : 'lechuga', quantity:'1', price:'123'},
						{product : 'Tomate', quantity:'1', price:'123'}
	  				   ]
            }];

orders = undefined;

addOrder = function(){	
    var datos = {1:{"orderAmountsMap":{"HOTDOG":10,"HAMBURGUER":20,"BEER":40},"tableNumber":2}};
    axios.post('/orders',insert)
            .then(function(){
                $("#tablas").append("<p id='tag"+1+"'>Order 1</p>");
                $("#tablas").append("<table id='Order"+1+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
                for(i in insert[2].orderAmountsMap){		
                    $("#Order"+1).append("<tbody> <tr> <td>"+i+"</td> <td>"+insert[2].orderAmountsMap[i]+"</td> </tr> </tbody>");
                }                    
            })
            .catch(function(error){
                console.log(error);
		errorMessage();
            });
}
    


removeOrderById = function(id){	
    axios.delete('/orders/'+id)
            .then(function(){
                document.getElementById("tag"+id).remove();
                document.getElementById("Order"+id).remove();                               
            })
            .catch(function(error){
                console.log(error);
		errorMessage();
            }
        )  


loadOrdersList = function(){
    orders = [];
	axios.get('/orders')
		.then(function(result){
			orders = result.data;
			$("#tablas").empty();
			for(key in orders){
				//Render the tables
                                $("#tablas").append("<p id='tag"+key+"'>Order "+ key + "</p>");                                
				$("#tablas").append("<table id='Order"+key+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
				for(map in orders[key].orderAmountsMap){					
					$("#Order"+key).append("<tbody> <tr> <td>"+map+"</td> <td>"+orders[key].orderAmountsMap[map]+"</td> </tr> </tbody>");
				}
			}						
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
    
    
        }
}


  
errorMessage = function(){
    alert("There is a problem with our servers. We apologize for the inconvince, please try again later");    
}







