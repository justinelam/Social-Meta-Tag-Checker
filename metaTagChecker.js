var $$;
//initialize page by checking for metatags
function init() {
  $$ = jQuery;

  //create callback to open up a pop-up window or create banner-like element at the top of window with info on what's missing after running missingTags. Maybe a copy & paste area for grabbing meta tags that are missing.

  tagCheck();

}
function prependChild(parent, newChild) {
  parent.insertBefore(newChild, parent.firstChild);
}


function popup(contentCheck, missingContent, errorMessage) {
  var generator = window.open('','name','height=400,width=500');
  generator.document.write('<html><head><title>Meta Tag Checker</title>');
  generator.document.write('<link href="http://fonts.googleapis.com/css?family=Inconsolata:400,700" rel="stylesheet" type="text/css">');
  generator.document.write('<style>@font-face{ font-family: "AvenirLTStd-Medium", sans-serif;src: url("http://www.shareprogress.org/wp-content/themes/shpg_2015theme/dist/fonts/AvenirLTStd-Medium.woff");} h1 { font-size: 20px; border-bottom: 3px solid #003; text-align: center; padding-bottom: 20px;}p { font-family: "AvenirLTStd-Medium", sans-serif; line-height: 1.2em;} span.value { word-wrap: break-word; font-style: italic; line-height: 1.2em; margin-top: 10px; display: block;font-weight: 600; } #error_message { text-align: center;}</style>')
  generator.document.write('</head><body>');
  
  generator.document.write('<h1 style="font-family: AvenirLTStd-Medium,sans-serif;">Meta Tag Checker: '+ $("title").html()+'</h1>');
  generator.document.write('<div id="results" style="width: 300px; margin: 0 auto;">');

  if (missingContent == "") {
    generator.document.write('<p>You aren\'t missing any tags *high five*!</p>');
  }
  generator.document.write('<h2 style="font-family: Inconsolata;">Missing Tags</h2><p>To improve your page\'s shareability add the missing tags to your HEAD section.</p>' + missingContent + '<h2 style="font-family: Inconsolata;">Content Check</h2><p>Check that the other tags contain the right values.</p>' + contentCheck + '</div>');
  generator.document.write('<p id="error_message" >' + errorMessage + '</p>');
  generator.document.write('</body></html>');
  generator.document.close();
}

var metaProperties = ['og:image', 'og:type', 'og:site_name', 'og:description', 'og:title', 'fb:admins'];

var metaTags = {
  "property": {
    "og:image": {
      "description": "image URL"
    },
    "og:type" : {
      "description": "website, article, video."
    },
    "og:site_name": {
      "description": "Name of webpage."
    },
    "og:description": {
      "description": "Description of website. 155 words."
    },
    "og:title": {
      "description": "Title of webpage."
    },
    "fb:admins": {
      "description": "Facebook User ID #"
    }
  },
  "name": {
    "twitter:site": {
      "description": "@username for the website used in the card footer"
    },
    "twitter:creator": {
      "description": "@username for the content creator / author."
    },
    "twitter:card": {
      "description": "Description of content (maximum 200 characters)"
    },
    "twitter:title": {
      "description": "Title of content (max 70 characters)"
    },
    "twitter:image": {
      "description": "URL of image to use in the card. Image must be less than 1MB in size"
    }
  }
}

function getProperty(number) {
  return metaProperties[number];
};
//looping through objects -- TODO: Add to tagCheck function

function tagCheck() {
  var contentPresent = [];
  var missingContent = [];
  var errorMessage = "";
  var num = 0;
  var twitterTags = metaTags['name'];
  var ogTags = metaTags['property'];

  for (var prop in ogTags) {
    description = metaTags["property"][prop]["description"];
    propContent = $$('meta[property="'+ prop +'"]').attr('content');
    if (propContent == undefined || propContent == "") {
      num += 1;
      console.log(num);
      missing = "You are missing the meta tag for <span style='color: red;'>'"+ prop + "'</span>." + "Description: " + description;
      missingContent += "<p>" + num + '. '+ missing + "</p>";
      /* TODO: Update HREF for blog post on metatags*/
      errorMessage = 'Read our <a href="http://shareprogress.org/blog" target="_blank">blog post</a> on how to add meta tags to your site.'
    } else { 
      y = "Your meta tag for "+ prop + " has the value: " + "<span class='value'>"+propContent+"</span>";
      contentPresent += "<p>" + y +"</p>";
      // validateTag(prop,content);
    }
  }
  for (var name in twitterTags) {
    console.log(name);
    description = metaTags["name"][name]["description"];
    nameContent = $$('meta[name="'+ name +'"]').attr('content');
    if (nameContent == undefined || nameContent == "") {
      num += 1;
      console.log(num);
      missing = "You are missing the meta tag for <span style='color: red;'>'"+ name + "'</span>." + "Description: " + description;
      missingContent += "<p>" + num + '. '+ missing + "</p>";
      /* TODO: Update HREF for blog post on metatags*/
      errorMessage = 'Read our <a href="http://shareprogress.org/blog" target="_blank">blog post</a> on how to add meta tags to your site.'
    } else {
      y = "Your meta tag for "+ name + " has the value: " + "<span class='value'>"+nameContent+"</span>";
      contentPresent += "<p>" + y +"</p>";
      // validateTag(prop,content);
    }
  }
  popup(contentPresent, missingContent, errorMessage); 
}
  



// function tagCheck() {
//   var contentPresent = [];
//   var missingContent = [];
//   var errorMessage = "";
//   var num = 0;
//   for (var x = 0; x < metaProperties.length; x++) {
//     prop = getProperty(x);
//     propContent = $$('meta[property="'+ prop +'"]').attr('content');
    
//     if (propContent == undefined || propContent == "") {     
//       num += 1;
//       console.log(num);
//       missing = "You are missing the meta tag for <span style='color: red;'>'"+ prop + "'</span>.";
//       missingContent += "<p>" + num + '. '+ missing + "</p>";
//       /* TODO: Update HREF for blog post on metatags*/
//       errorMessage = 'Read our <a href="http://shareprogress.org/blog" target="_blank">blog post</a> on how to add meta tags to your site.'
//     } else {
//       y = "Your meta tag for "+ prop + " has the value: " + "<span class='value'>"+propContent+"</span>";
//       contentPresent += "<p>" + y +"</p>";
//       // validateTag(prop,content);
//     }
//   }
//   popup(contentPresent, missingContent, errorMessage);
// }


//validate content for each metaTag ??
function validateTag() {
  //check for valid content in tags that are present on site. Need to use an object or switch statement.

}
//Create a pop-up Window for displaying what's missing


init();