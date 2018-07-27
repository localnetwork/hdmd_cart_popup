(function($, Drupal) {
	Drupal.behaviors.ajaxMenuLink = {
	  attach: function (context, settings) {
	  	$('.quantity').parent().addClass('my-cart');
		getCartNumItems(); 
		
	  }
	};
	Drupal.ajax.prototype.commands.ajx_cart_handler = function(ajax, response, status) {
		// console.log(response.show_error); 
		if(response.show_error == null) {
			 swal("Added to cart!", response.product_title + " has been added to your cart!", "success");
		}else {
			if(response.show_error.stock_error) {
				swal("Cannot add to cart!", response.show_error.stock_error, "error"); 
				
			}else if (response.show_error.quantity) {
				swal("Cannot add to cart!", response.show_error.quantity, "error"); 
			}
		}  
    };  
    
    // replace the cart item quantitry with html markup
	 function getCartNumItems() { 
	    $('.my-cart').html(function() { 
	      // separate the text by spaces
	      var text = $(this).text().split(' ');
	      // drop the last word and store it in a variable
	      var lastText = text.pop();
	      // join the text back and if it has more than 1 word add the span tag to the last word
	      return text.join('') + (text.length > 0 ? ' <span class="quantity">' + lastText + '</span>' : lastText);
	    });
	  }
        
      
})(jQuery, Drupal);  
  