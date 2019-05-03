var $ =  jQuery.noConflict(); //Wordpress by default uses jQuery instead of $

jQuery(document).ready(function(){
	/**
	 * Detect Delete action and prompt message
	 */
	 jQuery('.js-delete-item').on('click', function(e) {
	 	e.preventDefault();

	 	confirmation =  window.confirm( $messages.delete_confirm + ' ' + jQuery(this).data('name') + '?' );

	 	if( confirmation ) {
	 		window.location = jQuery(this).attr('href');
	 	}

	 });

});