/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each student in the list
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

 (function(){

   let searchURL;

   $(function(){

     $("#updateRestaurantForm :input").prop("disabled", true);


     $('#restaurant_id').selectpicker({
       style: 'btn-info',
       size: 4,
       liveSearch: true,
       showTick: true,
       tickIcon: 'glyphicon-star-empty',
       header: "Restaurant search"
      });

     $("#restaurant_id").change(function () {
        $("#updateRestaurantForm :input").prop("disabled", false);

        searchURL = $(this).find("option:selected").val();


        $.get("http://localhost:1337/restaurant/" + searchURL, function (data) {


          $.each(data, function(name, val){

        // find the name attribute of each piece of data in your object
            let el = $('[name="'+name+'"]')
        // find the type of data
            let type = el.attr('type');

// set element equal to to the value that is coming back from the api
            switch(type){
              default:
                el.val(val);
              }

          });

        })

      });

      $("#updateRestaurantForm").validate({
        errorClass: 'text-danger',
        rules: {
          // simple rule, converted to {required:true}
          restaurantName: {
            required: true,
            minlength: 2
          },
          // compound rule
          cuisine: {
            required: true,
            minlength: 2
          },

          expensiveRating: {
            number: true,
            required: true,
            min: 1,
            max: 5
          },

          locationNeighborhood: {
            required: true
          },

          closeToHome: {
            required: true
          },

          website: {
            url: true
          }

        },
        messages: {
          restaurantName: {
            minlength: "Is the name really only 1 letter?"
          },
          expensiveRating: {
            number: "Please enter a number between 1 and 5"
          },
          website: {
            url: "C'mmon. I'm looking for a url!"
          }

        }
      });

      $('#updateRestaurantForm').submit(function () {
        let updateString = $("#updateRestaurantForm").serialize();

        $.ajax({
              url: 'http://localhost:1337/restaurant/' + searchURL,
              type: 'PUT',
              data: updateString,
              success: function(result) {
                alert("This record has been updated");
              }
            })



      })

















   })

 })();
