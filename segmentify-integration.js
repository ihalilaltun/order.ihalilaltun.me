   /* CUSTOMER_NAME */
   /* Do not load Segmentify more than one to prevent potential error occurrence */
   if (window['SegmentifyTrackingObject']) {
    throw new Error("Segmentify is already loaded!");
  }

  (function(url, namespace, config) {
    window['SegmentifyTrackingObject'] = namespace;
    window[namespace] = window[namespace] || function() {
      (window[namespace].q = window[namespace].q || []).push(arguments);
    };
    window.sgfLayer = {};
    window[namespace].config = config || {};
    if (!document.getElementById('__segmentify_script__')) {
      var wa = document.createElement('script');
      wa.id = '__segmentify_script__';
      wa.async = 1;
      wa.src = url;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wa, s);
    }
  })('//cdn.segmentify.com/v3/dev/segmentify.debug.js', 'Segmentify', {
    segmentifyApiUrl: '//gandalf-dev.segmentify.com/',
    segmentifyPushUrl: '//gimli-dev.segmentify.com/',	  
    categoryHierarchy: true,
    currency: 'TRY'
  });

  Segmentify('apiKey', 'ae272bfb-214b-4cdd-b5c4-1dddde09e95e', true,false);

  function waitSegmentifyAndjQuery() {
    if (window["_SgmntfY_"] && window["_SgmntfY_"]._getJq()) {
      window.segJquery = window["_SgmntfY_"]._getJq();

      segJquery(document).ready(function() {
        SegmentifyIntegration(window.segJquery).init();
      });
    } else {
      setTimeout(waitSegmentifyAndjQuery, 100);
    }
  }

  var SegmentifyIntegration = function(jQuery) {
    var segmentifyEvents = {
      viewPage: function(category, subCategory, params) {
        /* console.log("Pageview Event is going", category, subCategory, params); */
        Segmentify('view:page', {
          'category': category,
          'subCategory': subCategory,
          'params': params
        });
      },
      viewProduct: function(productObj) {
        /* console.log("Product View Event is going", productObj); */
        Segmentify('view:product', productObj);
      },
      checkoutBasket: function(basketObj) {
        /* console.log("Checkout Basket event is going", basketObj); */
        Segmentify('checkout:basket', basketObj);
      },
      checkoutPurchase: function(purchaseObj) {
        /* console.log("Checkout Purchase event is going", purchaseObj); */
        Segmentify('checkout:purchase', purchaseObj);
      },
      basketAdd: function(basketObj) {
        /* console.log("Basket Add Event is going", basketObj); */
        Segmentify('basket:add', basketObj);
      },
      basketRemove: function(basketObj) {
        /* console.log("Basket Remove Event is going", basketObj); */
        Segmentify('basket:remove', basketObj);
      },
      basketClear: function(basketObj) {
        /* console.log("Basket Clear Event is going", basketObj); */
        Segmentify('basket:clear', basketObj);
      },
      userUpdate: function(userObj) {
        /* console.log("User Update Event is going", userObj); */
        Segmentify('user:update', userObj);
      },
      userId: function(id) {
        /* console.log("User ID is going to be changed", id); */
        Segmentify('userid', id);
      },
      custom: function(customObj) {
        /* console.log("Custom Event is going", customObj); */
        Segmentify('event:custom', customObj);
      }
    };

    var helperFunctions = {
      "setCookie": function(cname, cvalue, exdays) {
        window["_SgmntfY_"]._storePersistentData(cname, cvalue, exdays, false);
      },
      "getCookie": function(cname) {
        return window["_SgmntfY_"]._getPersistentData(cname, false);
      },
      "getQueryParameter": function(pname, url) {
        return window["_SgmntfY_"]._getQueryParameter(pname, url);
      }
    };


    var pageVariables = {
      category: "",
      subCategory: ""
    };




    var findPageType = function() {
      try {
        /* Home Page, Category Page, Product Page, Basket Page, Search Page, Checkout Success Page */
        /*if (document.location.pathname.split("/").slice(-1) == "") {
          pageVariables.category = "Home Page";
          return;
        }*/

        if (jQuery("body").hasClass("template-collection")) {
          pageVariables.category = "Category Page";
          pageVariables.subCategory = "";
          return;
        }

        if (jQuery("body").hasClass("template-product")) {
          pageVariables.category = "Product Page";
          pageVariables.subCategory = "";
          return;
        }

        if (jQuery("body").hasClass("template-cart")) {
          pageVariables.category = "Basket Page";
          return;
        }

        if (jQuery("body").hasClass("template-search")) {
          pageVariables.category = "Search Page";
          pageVariables.subCategory = "";
          return;
        }

        if (jQuery("body").hasClass("template-password")) {
          pageVariables.category = "404 Page";
          return;
        }
        if(document.location.pathname === '/pages/custom'){
        	pageVariables.category  = "Custom Page";
          	return;
        }

        if (0) {
          pageVariables.category = "Purchase Success Page";
          return;
        }
        if (jQuery("body").hasClass("template-404")) {
          pageVariables.category = "404 Page";
          return;
        }


      } catch (err) {
        window.segErr = err;
      }
    };


    var triggerPageFunction = function(category) {
      try {
        if (category && pageFunctions.hasOwnProperty(category)) {
          pageFunctions[category]();
        }

        pageFunctions["All Pages"]();
      } catch (err) {
        window.segErr = err;
      }
    };

    var init = function() {
      findPageType();
      triggerPageFunction(pageVariables.category);
    };



    var pageFunctions = {
      "All Pages": function() {
        Segmentify('view:page',{'category':pageVariables.category,'lang':'EN',subCategory:'Shirt'})
        //segmentifyEvents.viewPage(pageVariables.category, pageVariables.subCategory, pageVariables.params);

     
     
        try{
        	        
        var register = helperFunctions.getQueryParameter("_user_register")
        var update = helperFunctions.getQueryParameter("_user_update")
        var login = helperFunctions.getQueryParameter("_user_login")
        var logout = helperFunctions.getQueryParameter("_user_logout")
        
        
        
       users = []
      
       if(register!=""){
       Segmentify('user:signup',{
           "email": users[parseInt(register)].email,
           "username" : users[parseInt(register)].username,
           "fullName" : users[parseInt(register)].fullName
			}) 
       
       
       
        }
          
          

        if(update!=""){
        
       Segmentify('user:update',{
           "email": users[parseInt(update)].email,
           "username" : users[parseInt(update)].username,
           "fullName" : users[parseInt(update)].fullName,
         "birthDate": users[parseInt(update)].birthDate
			}) 
        }
          
          
      if(login!=""){
        
       Segmentify('user:signin',{
           "email": users[parseInt(signin)].email,
           "username" : users[parseInt(signin)].username,
           "fullName" : users[parseInt(signin)].fullName
			}) 
        }   
          
        
     if(logout!=""){
        
       Segmentify('user:signout',{
           "email": users[parseInt(logout)].email,
           "username" : users[parseInt(logout)].username,
           "fullName" : users[parseInt(logout)].fullName
			}) 
        } 
          
          
        }
        catch(e){
          window.error =e
        
        
        }
      },

      "Home Page": function() {


        try {
          var bannerify = BannerifyIntegration(jQuery);
          var bannerContainer = jQuery("#shopify-section-slideshow").first();;
          var bannerItems = bannerContainer.find(".slick-slide");
          var bannerifies = {
            "group": "Anasayfa Slider",
            "banners": []
          };

          jQuery.each(bannerItems, function(index, item) {

            var currentItem = jQuery(this);
            var bannerAnchor = currentItem.find(".slideshow__title");
            var bannerLink = currentItem.find(".slideshow__link");
            var bannerImage = currentItem.find(".slideshow__image").attr("data-bgset").split(",")[5].trim().split(" ");

            var myself = {
              "title": bannerAnchor.text().trim() + (index + 1) || "",
              "order": (index + 1),
              "image": "http:" + bannerImage[0],
              "urls": [bannerLink.attr("href")]
            };

            var params = {
              "banner": currentItem,
              "bannerAnchor": bannerLink,
              "bannerGroup": bannerifies.group,
              "bannerOrder": myself.order,
              "bannerUrl": myself.urls[0] || "",
              "bannerTitle": myself.title
            };

            bannerifies.banners.push(myself);



            bannerify.executer(params, function() {
              var currentSlider = jQuery(currentItem);

              if (currentSlider.hasClass("slick-active")) {
                return true;
              }

              return false;

            });

          });







          if (bannerifies.banners.length > 0) {
            bannerify.groupView(bannerifies);
          }
        } catch (e) {
          window.err = e
        }





      },


      "Product Page": function() {

                jQuery("#AddToCartText-product-template").on("click", function() {
          Segmentify('basket:add', {
            productId: window.product.id,
            quantity: 1,
          });
        })


                
                
                if(window.product.id =="356667359268" ){
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

		  productObj.groupId = "denemegrubu"
 

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title + "é!''''''+^&%é" + "\n" +"degisenurun";
          productObj["productId"] = window.product.id.toString().substring(0,window.product.id.toString().length/2) + " " + window.product.id.toString().substring(window.product.id.toString().length/2,window.product.id.toString().length)
		  productObj["image"] = window.product.featured_image;
          productObj["oldPrice"] = "300.0";
          productObj["price"] = "20.0";
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href;
          productObj["url"] = document.location.href;
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["test"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   }
        
        
        else if (window.product.id =="853449080868")
        {
          
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

   		  productObj.groupId = "denemegrubu"


          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title+ "é!''''''+^&%é" + "\n" +"braunyuztemizleme"
          productObj["productId"] = window.product.id.toString().substring(0,window.product.id.toString().length/2) + " " + window.product.id.toString().substring(window.product.id.toString().length/2,window.product.id.toString().length)
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["test"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   
         
        }
        
          else if (window.product.id =="854709764132")
        {
          
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

  		  productObj.groupId = "denemegrubu"
	

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title+ "é!''''''+^&/&())=/%&%^+%^+%&%é" + "\n" +"denemesiyahtshirt"
          productObj["productId"] = window.product.id;
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["test"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   
         
        }
        
        
        
           else if (window.product.id =="356667195428")
        {
          
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

  		  productObj.groupId = "denemegrubu"
	

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title+ "é!''''''+^&/&())=/%&%^+%^+%&%é" + "\n" +"denemesiyahtshirt"
          productObj["productId"] = window.product.id;
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["talya"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en",
              "labels_map" : "talya"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   
         
        }
        
        
             
           else if (window.product.id =="356667260964")
        {
          
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

  		  productObj.groupId = "denemegrubu"
	

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title+ "é!''''''+^&/&())=/%&%^+%^+%&%é" + "\n" +"denemesiyahtshirt"
          productObj["productId"] = window.product.id;
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["talya"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en",
              "labels_map" : "talya"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   
         
        }
        
        
        
                   
           else if (window.product.id =="847941042212")
        {
          
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

  		  productObj.groupId = "denemegrubu"
	

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title+ "é!''''''+^&/&())=/%&%^+%^+%&%é" + "\n" +"denemesiyahtshirt"
          productObj["productId"] = window.product.id;
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["talya"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en",
          //    "labels_map" : "talya"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   
         
        }
        
        
        
              else if (window.product.id =="356666703908")
        {
          
                   
                   
                        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

          
          		  productObj.groupId = "denemegrubu"

 

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title;
          productObj["productId"] = window.product.id;
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          //productObj["lang"] = "DE";
          //productObj["currency"] = "EUR";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["test"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
                   
                   
         
        }
     
               
        
        
        
        
        
        
        
        
        
        
        
        
        
              
              else if (window.product.id =="356666441764")
        {
          
                   
                   
        var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};

          
 

 

          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title;
          productObj["productId"] = window.product.id + "123124345473645345325436425343245354525643523432354345y3464u64576231y345263547632365636524635745365375486573743t426357";
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href.replace("https:","");
          productObj["url"] = document.location.href.replace("https:","");
          //productObj["lang"] = "DE";
          //productObj["currency"] = "EUR";
          productObj["gender"]  = "F"       
          productObj["stockStatus"] = 75
          productObj["stockCount"] = 15
          productObj["stockRatio"] = 79
          productObj["category"] = window.product.type;
		  productObj["labels"] = ["test"]
          productObj["colors"] = ["pembe"]
          productObj["sizes"] = ["large"]
          console.log(productObj)

            productObj["params"] = {
              "new_params" : "en"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

                   
        var bannerify = BannerifyIntegration(jQuery);
        bannerify.relationship( window.product.id + "123124345473645345325436425343245354525643523432354345y3464u64576231y345263547632365636524635745365375486573743t426357", "product");
                   
                   
         
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
                  
     
      else 
      {
      
      
      
      
      
             var price = jQuery("#ProductPrice-product-template").text()

        var productObj = {};


          productObj["brand"] = window.product.vendor;
          productObj["title"] = window.product.title;
          productObj["productId"] = window.product.id;
          productObj["image"] = window.product.featured_image;
          //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
          productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
          productObj["inStock"] = window.product.available;
          productObj["productUrl"] = document.location.href;
           productObj["url"] = document.location.href;
          productObj["lang"] = "EN";
          productObj["currency"] = "USD";
          //productObj["stockStatus"] = 60
          productObj["category"] = window.product.type;
        

          console.log(productObj)

            productObj["params"] = {
              "new_params" : "tr"
            }
          
  

          segmentifyEvents.viewProduct(productObj);

      
     }
                
                
                
                
                
          
          

          
      

      },
      "Basket Page": function() {
        var basketAmount = "";
        if (jQuery(".cart__subtotal").length > 0) {
          basketAmount = jQuery(".cart__subtotal")[0].innerText.replace("TL", "").replace("$", "").replace(",", "")
        }
        var basketProducts = [];
        if (window.productList != undefined) {
          for (i = 0; i < window.productList.length; i++) {
            basketProducts.push({
              "productId": window.productList[i].product_id.toString(),
              "quantity": window.productList[i].quantity,
              "productPrice": jQuery("td.text-right.small--hide")[i].innerText.replace("TL", "").replace("TL", "").replace("$", "").replace(",", "").trim()
            });
          }
        }
        var basketInfo = {
          "totalPrice": basketAmount,
          "productList": basketProducts
        };


        segmentifyEvents.checkoutBasket(basketInfo);



      },
      "Purchase Success Page": function() {
        var purchase = Shopify.checkout || "";

        if (purchase) {
          var purchaseAmount = purchase["total_price"] || "";
          var purchaseProducts = [];
          var orderNo = purchase["order_id"] || "";

          for (var i = 0; i < purchase["line_items"].length; i++) {
            var item = purchase["line_items"][i];

            purchaseProducts.push({
              "productId": item["product_id"],
              "quantity": item["quantity"] || "1",
              "price": item["price"] || ""
            });
          }

          // Put basket event information into a variable
          var purchaseInfo = {
            "orderNo": orderNo,
            "totalPrice": purchaseAmount,
            "productList": purchaseProducts
          };

          // Send checkout basket event
          segmentifyEvents.checkoutPurchase(purchaseInfo);
        }
      }
    };

    return {
      init: init
    };
  };




  function PrepareBannerifyUrl(bannerUrl) {
    var prefix = document.location.origin;

    // if bannerUrl is not valid or empty return empty string or bannerUrl type is not string
    // return empty string
    if (!bannerUrl || typeof bannerUrl !== "string") {
      return "";
    }

    // check if banner url is relative (if it has two slahes "//" it is not relative it just has not protocol prefix)
    // but acceptable
    if (bannerUrl.indexOf("/") == 0 && bannerUrl.indexOf("//") < 0) {
      return (prefix + bannerUrl);
    } else if (bannerUrl.indexOf("//") == 0) {
      return ("http:" + bannerUrl);
    } else {
      // bannerUrl is valid return it
      return bannerUrl;
    }
  }



  var BannerifyIntegration = function(jQuery) {
    var bannerifyEvents = {
      impression: function(impressionObj) {
        /* console.log("Impression Event is going", impressionObj); */
        Segmentify('banner:impression', impressionObj)
      },
      click: function(clickObj) {
        /* console.log("Click Event is going", clickObj); */
        Segmentify('banner:click', clickObj)
      },
      update: function(updateObj) {
        /* console.log("Update Event is going", updateObj); */
        Segmentify('banner:update', updateObj)
      },
      groupView: function(viewObj) {
        /* console.log("Group View Event is going", viewObj); */
        Segmentify('bannergroup:view', viewObj)
      },
      groupDetail: function(detailObj) {
        /* console.log("Group Detail Event is going", detailObj); */
        Segmentify('bannergroup:detail', detailObj)
      }
    };

    var helperFunctions = {
      "propertiesHasValue": function(target, exceptions) {
        // check javascript object if it's properties has any value (all of them)
        // get all member in the target object
        for (var member in target) {
          // check if member value is not null or not defined
          if (!target.hasOwnProperty(member) || (!target[member] && (exceptions || []).indexOf(member) < 0)) {
            // return false means at least one member has no value
            // so all members of the object have no value, maybe some
            return false;
          }
        }

        // return true means all members of the object have a value
        return true;
      },
      "isScrolledIntoView": function(element) {
        // if the given element is shown in the browser (should meet some required conditions described below)
        // conditions:
        // 1. element top offset can be equal or greater to browser inner window top offset
        // 2. element middle offset can be equal or smaller to browser inner window bottom offset
        try {
          var $element = jQuery(element);
          var $window = jQuery(window);

          var documentTopOffset = $window.scrollTop();
          var documentBottomOffset = documentTopOffset + document.body.clientHeight;

          var elementTopOffset = $element.offset().top;
          var elementMiddleOffset = elementTopOffset + Math.floor($element.height() / 2);

          return ((elementMiddleOffset <= documentBottomOffset) && (elementTopOffset >= documentTopOffset));
        } catch (err) {
          // if any error occur, put it into a global variable
          window.bannerifyErr = err;

          // if any error occurs return false (means: object not scrolled into view)
          return false;
        }
      },
      "makeUrlAbsolute": function(url) {
        // prepare banner's urls. sometimes they have relative paths (anchor link or image source path) however we need to make it complete
        // by adding path origin as prefix front of the given url and return the output
        var prefix = document.location.origin;

        // if url is not valid or empty return empty string or url type is not string
        // return empty string
        if (typeof url != "string" || !url) return "";

        // check if banner url is relative (if it has two slahes "//" it is not relative it just has not protocol prefix)
        // but acceptable
        if (url.indexOf("/") == 0 && url.indexOf("//") < 0) {
          return (prefix + url);
        } else if (url.indexOf("//") == 0) {
          return (document.location.protocol + url);
        } else if (url.indexOf("/") != 0 && url.indexOf("//") != 0 && url.indexOf(prefix) < 0) {
          return (prefix + "/" + url);
        } else {
          // url is valid return it
          return url;
        }
      },
      "sendBannerImpression": function(params, optCheck) {
        try {
          // impression event sender to Segmentify with some parameters
          var $this = this;

          if (!$this.propertiesHasValue(params)) return;

          var optional_checker = true;

          if (typeof optCheck == "function" && optCheck) optional_checker = optCheck();

          // set a timer which will run after 250ms
          setTimeout(function() {
            // if the banner is appeared in the window and visible send impression event to Segmentify
            if ($this.isScrolledIntoView(jQuery(params.banner)) &&
              jQuery(params.banner).css("display") != "none" &&
              jQuery(params.banner).css("opacity") != 0 &&
              jQuery(params.banner).css("visibility") != "hidden" &&
              optional_checker) {
              // send impression event
              bannerifyEvents.impression({
                "group": params.bannerGroup,
                "order": params.bannerOrder,
                "title": params.bannerTitle
              });
            } else {
              // do it again for the specific slider until the impression is sent
              $this.sendBannerImpression(params, optCheck);
            }
          }, 250);
        } catch (err) {
          // if any error occur, put it into a global variable
          window.bannerifyErr = err;
        }
      },
      "sendBannerClick": function(params) {
        try {
          // click event sender to Segmentify with some parameters
          var $this = this;

          if (!$this.propertiesHasValue(params)) return;

          var banner = jQuery(params.bannerAnchor);

          // if the banner is appeared in the window and visible send impression event to Segmentify
          banner.click(function() {
            bannerifyEvents.click({
              "url": $this.makeUrlAbsolute(params.bannerUrl),
              "group": params.bannerGroup,
              "order": params.bannerOrder,
              "title": params.bannerTitle
            });
          });
        } catch (err) {
          // if any error occur, put it into a global variable
          window.bannerifyErr = err;
        }
      },
      "bannerRelationship": function(value, type) {
        try {
          // first of all, the function checks landed page url if it matches with a clicked banner url
          // if parameters are valid, it sends banner:update event to make a relationship for the banner
          // value: must be a text
          // type: this identifies the banner type and can be -> label, product, category or brand
          setTimeout(function() {
            // check if value and type are valid
            // otherwise exit function
            if (!value || !type) return;

            // check if Segmentify object is loaded successfully
            if (window["_SgmntfY_"]) {
              // get all clicked bannerify list from Segmentify
              var bannerifies = window["_SgmntfY_"]._getClickedBanners();

              for (var i = 0; i < bannerifies.length; i++) {
                var bannerifyProps = window["_SgmntfY_"]._split(bannerifies[i], ":", 4);

                // if clicked banner url equals the current url, so it is which we are looking for
                if (bannerifyProps[3] == document.URL) {
                  var data = {
                    "group": bannerifyProps[1],
                    "title": bannerifyProps[0],
                    "order": parseInt(bannerifyProps[2])
                  };

                  // if it is a known type banner, make a relationship between banner and product by id/category/label or brand
                  if (type.toLowerCase() == "product") {
                    data["productId"] = value;
                  } else if (type.toLowerCase() == "category") {
                    data["category"] = value;
                  } else if (type.toLowerCase() == "label") {
                    data["label"] = value;
                  } else if (type.toLowerCase() == "brand") {
                    data["brand"] = value;
                  }

                  // send banner:update to make aware Segmentify about the relationship
                  bannerifyEvents.update(data);
                }
              }
            } else {
              this.bannerRelationship(value, type);
            }
          }, 150);
        } catch (err) {
          // if any error occur, put it into a global variable
          window.bannerifyErr = err;
        }
      }
    };

    var exec = function(params, optCheck) {
      // try to send click by binding click event of the banner
      helperFunctions.sendBannerClick(params);

      // try to send impression
      helperFunctions.sendBannerImpression(params, optCheck);
    };

    return {
      "executer": exec,
      "groupView": bannerifyEvents.groupView,
      "relationship": helperFunctions.bannerRelationship,
      "urlAbsoluter": helperFunctions.makeUrlAbsolute
    };
  };




  waitSegmentifyAndjQuery();
