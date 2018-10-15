InboxSDK.load(2, "sdk_helloworldqhat_1124b44efd").then(function(sdk){
logo = chrome.runtime.getURL('img/icon32.png');
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler(function(composeView) {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Switcheroo",
      
      iconUrl: logo,
      onClick: function(event) {
        
        to = composeView.getToRecipients(event);
        cc = composeView.getCcRecipients(event);

        var to_arr = [];
        var cc_arr = [];

        // Convert JSON obj to array
        for(var t in to)
          to_arr.push([t, to [t]]);
        for(var c in cc)
          cc_arr.push([c, cc [c]]);

        // Remove person who made intro from To field.
        composeView.setToRecipients([]);
        
        // Move the original sender to the BCC field
          // @TODO: try/catch if not null
          var bccs = [];
          
          // Should be 1 and only 1 sender @TODO: This should be try/catch. Also, iterator should match for loop below. 
          if(typeof to_arr != undefined) {
            for(var t in to_arr) {
              var to_name = to_arr[t][1]["name"]; 
              var to_email = to_arr[t][1]["emailAddress"];
              // @TODO: try/catch
              if (to_name == null) {to_name = to_email;}
              to_field = [to_name + ' <'+ to_email + '>'];
              if(to_name != undefined && to_email != undefined) {
                bccs.push(to_field);
              }
            }
          }
          composeView.setBccRecipients([bccs][0]);

        // Clear Cc: addresses
        composeView.setCcRecipients([]);

        // Move CC's to To field
        var ccs = [];
        // NB: [0] = added [1] = removed
        // for(var t in cc_arr[0]) {
        if(typeof cc_arr != undefined) {  
          // @FIXME: Because, why would this for loop logic match the previous one? 
          for (var t = 0; t < cc_arr.length; t++) {

            var cc_name = cc_arr[t][1]["name"]; 
            var cc_email = cc_arr[t][1]["emailAddress"];

          // @TODO: try/catch
            if (cc_name == null || name == undefined) { 
              email_name = cc_email.substring(0, cc_email.indexOf('@'));
              cc_name = email_name; 
              }
            cc_field = [cc_name + ' <'+ cc_email + '>'];
            ccs.push(cc_field);
          //ccs.push(cc_name + ' <' + cc_email + '>');
          }
        }  
        composeView.setToRecipients(ccs);

      },  // onClick
      
    }); // composeView.addButton

  }); // register handler 

}); // load SDK
