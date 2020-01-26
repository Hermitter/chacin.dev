<div id="disqus_thread"></div>

<script>
    export let page_url;
    export let page_identifier;

	/**
	*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
	*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
	var disqus_config = function () {
	    this.page.url = page_url;  // Replace page_url with your page's canonical URL variable
	    this.page.identifier = page_identifier; // Replace page_identifier with your page's unique identifier variable
	};

	(function() { // DON'T EDIT BELOW THIS LINE
	var d = document, s = d.createElement('script');
	s.src = 'https://chacin-dev.disqus.com/embed.js';
	s.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s);
	})();
</script>

<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>