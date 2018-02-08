//Ett script som möjligör att man tar wordpress data till sin hemsida
(function($) { // Jquery - ready

  $(document).ready(function() { // Get AJAX from wordpress
    var url = "http://mirzah.se/inlamningsjs/index.php/wp-json/wp/v2/posts/?_embed=true";
    $.ajax({
      type: "GET",
      url: url,
      timeout: 2000,
      beforeSend: function() {
        console.log('logga beforeSend');

      },
      // log som dyker upp när data är klar
      complete: function() {
        console.log('logga complete');
      },
      success: function(mindata) {
        //console.log(mindata);
        // return mindata
        displayWP(mindata);

      },
      // log som dyker upp när wp data inte dyker upp
      error: function() {
        console.log('ERROR');
      }
    });

    // EN funktion med loppar som sparar wordpress till variablar
    function displayWP(pData) {
      console.log(pData);

      for (var i = 0; i < pData.length; i++) {

        var wpTitle = pData[i].title.rendered;

        var wpContent = pData[i].content.rendered;

        var wpIds = pData[i].id;

        if (pData[i]._embedded['wp:featuredmedia']) {

          // var emb = pData[i]._embedded['wp:featuredmedia'].length;

          var wpFM = pData[i]._embedded['wp:featuredmedia'];

          console.log('wpFM ', wpFM);


          for (var i2 = 0; i2 < wpFM.length; i2++) {

            var wpBild = wpFM[i2].media_details.sizes.medium.source_url;

            var wpCaption = wpFM[i2].caption.rendered;

            var wpfeaturedmediatitle = wpFM[i2].title.rendered;

            // console.log('test', wpTitle, wpContent, wpBild, wpCaption);

            var navMenu = '';

            // Dynamisk menu som läggs till i sidan
            navMenu += '<a class="aknapp" href="#' + 'articleID' + wpIds + '">';
            navMenu += wpTitle;
            navMenu += '</a>'
            console.log(navMenu);
            $('.knappar').append(navMenu); //append lägger till .knappar i navMenu

            //Variabler som överförs från wordpress till one-pagern
            var wpHTML = '';
            // HTML element som tillsamans med wordpress data skapar variabler
            wpHTML += '<figure>';

            wpHTML += '<img class="wpimg" src="' + wpBild + '">';

            wpHTML += '<figcaption class="wptext">' + '<h2>' + wpfeaturedmediatitle + '</h2>' + wpCaption + '</figcaption>';

            wpHTML += '</figure>';

            wpHTML += '<div id="' + 'articleID' + wpIds + '">';

            wpHTML += '<h1>' + wpTitle + '</h1>';

            wpHTML += wpContent;


            wpHTML += '</section>';

            wpHTML += '</div>';

            $('.content').append(wpHTML);

            //
            // En query med ett event som ger en klick funktion på knappar
            $('nav a').on('click', function(e) {
              e.preventDefault();
              // EN query som animerar sidan att scrolla till respektive post
              $('html, body').animate({
                scrollTop: $(this.hash).offset().top
              });
            });

          }

        }

      }
    }


  });
})(jQuery)
