/*  
Nicolas Stanzione
ngstanzione@gmail.com
I am a Senior majoring in Computer Science at UMass Lowell enrolled in 91.461
File:\GuiAssignmnet7\navigation.js
File created: 11/5/2014
This site will serve as the javascript for the single page navigation bar.
 */

(function () {

  //stores values of pages
  var partial_pages = {};

  //gets the content for each page
  function getContent(page_id, callback){

    //gets the page from the cache if its in it
    if(partial_pages[page_id]) {

     
      callback(partial_pages[page_id]);

    } else {
      // gets the page if never loaded
      $.get(page_id + ".html", function (content) {

        
        partial_pages[page_id] = content;

        callback(content);
      });
    }
  }

  // Sets the "active" class on the active navigation link.
  function setActiveLink(page_id){
    $("#navigation a").each(function (i, linkElement) {
      var link = $(linkElement),
          pageName = link.attr("href").substr(1);
      if(pageName === page_id) {
        link.attr("class", "active");
      } else {
        link.removeAttr("class");
      }
    });
  }

  // Navigates the the new page 
  function navigate(){

    //Removes #
    var page_id = location.hash.substr(1);

    //put content in "content" div
    getContent(page_id, function (content) {
      $("#content").html(content);
    });

    setActiveLink(page_id);
  }

  // default to about page
  if(!location.hash) {

    
    location.hash = "#about";
  }
  
  navigate();

  $(window).bind('hashchange', navigate);
}());
