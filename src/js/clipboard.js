//Clipboard.js integration\\
import ClipboardJS from "clipboard/dist/clipboard.min";
import jQuery from 'jquery';
let jq = jQuery;

export default function clipboardInit() {
    if (ClipboardJS.isSupported()){
        let allCodeBlocksElements = jq("pre");

        // For each element, do the following steps
        allCodeBlocksElements.each(function(ii) {
            // TODO: create parent div through the Remarkable npm package
            jq(this).wrap("<div class='codeblock-wrapper' style='position:relative'> </div>");

            // define a unique id for this element and add it
            let currentId = "codeblock" + (ii + 1);
            jq(this).attr('id', currentId);

            // create the button just after the text in the code block
            let clipButton = '<a class="btn copybtn" data-clipboard-target="#'+currentId+'" allow-copy-notify="true"><img src="/clippy.svg" draggable="false" width="13" alt="Copy to clipboard"></a>';
            jq(this).after(clipButton);
        });

        let clipboard = new ClipboardJS(".btn");

        clipboard.on("success", (event)=> {
            // find button html element
            let buttonIndex = event.trigger.dataset.clipboardTarget.replace(/[^0-9]/g,'')-1;

            let copyButton = jq(".copybtn:eq("+buttonIndex+")");

            // button click animation
            copyButton.addClass("copy-success");
            setTimeout(function(){copyButton.removeClass("copy-success");},100);

            // show copy notification
            if(copyButton.attr("allow-copy-notify") === "true"){
                copyButton.tooltip({trigger: "click"});
                copyButton.attr("allow-copy-notify", false);
                copyButton.tooltip("hide").attr("data-original-title", "copied!").tooltip("show");
                
                // remove copy notification
                setTimeout(function() {
                copyButton.tooltip("hide");
                copyButton.css("background-color","#cccccd");
                copyButton.attr("allow-copy-notify", true);
                }, 1000);
            }
            
            // prevent copy notification spam
            copyButton.tooltip().off();

            // prevent code block from being highlighted
            event.clearSelection();
        });
    }
}