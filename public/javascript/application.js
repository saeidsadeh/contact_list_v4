$(document).ready(function() {
  $('#result').hide();

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  $('#getAllContacts').on('click', handler)

  $('#search').on('keyup', searchResult)

  $('#newContact').on('submit', newContact)

  function newContact(event){
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    if(name == '' || email == ''){
      alert("Your form in not properly filled!");
    }
    else{
      $.post('/contacts', {name: name, email: email}, postContact, 'json');
    }
  }
  function postContact(results){
    if (results.result){
      alert("Congrats " + results.name + "was saved!");
      $("#newContact")[0].reset();
    } else {
      alert("Your contact could not be added!")
      }
    }

   function searchResult(event){
    if (event.keyCode == 13){
      var search = $("#search").val();
      if (search == '') {
        return false;
      }
      $.getJSON('/search/'+search, processContact);
      $('#result').show();
    }
  };


   function handler(e){
    e.preventDefault();
    $.getJSON('/api/contacts', processContact)
    $('#result').show();
    // $.ajax({
    //   method: 'GET',
    //   dataType: 'json',
    //   url: '/api/contacts',
    //   success: function(data){
    //     console.log(data);
    //     data.forEach(function(d){
    //         console.log(d.name);
    //         console.log(d.email);
    //     });
    //   },
    //   error: function(err){
    //     alert("something errored out. "+err);
    //   }

    // }); //ajax call

  }; //This is for getallcontacts

  function processContact(data) {
    var resultTable = $('.contactInfo').find('tbody');
    resultTable.html("");
    // console.log(data);
        data.forEach(function(d){
          var tr = $("<tr>").appendTo(resultTable);
          $("<td>").text(d.name).appendTo(tr);
          $("<td>").text(d.email).appendTo(tr);
            // console.log(d.name);
            // console.log(d.email);
    // body...
    });
  };

}); //document Ready
