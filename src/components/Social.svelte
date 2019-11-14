<script>
    import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
    import Icon from 'svelte-awesome/components/Icon.svelte'

    let socials = [
        {icon: faLinkedin, color: "#007bb5", link: "https://www.linkedin.com/in/carlos-a-chacin/"},
        {icon: faGithub,   color: "black", link: "https://github.com/Hermitter"},
        {icon: faTwitter,  color: "#55ACEE", link: "https://twitter.com/HermitterC"},
    ];
</script>

<style>
    div {
        margin-top: 20px;
        display: block;
        text-align: center;
    }

    a {
        display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
        text-decoration: none;
        margin: 9px 9px;
    }

    a:hover {
        opacity: 0.2;
    }

</style>

<div>
    {#each socials as social}
        <a target="_blank" class="social-button" href="{social.link}">
            <Icon class="icon" data={social.icon} scale=2 style="color: white; border-radius: 8%; padding: 5px; background:{social.color};"/>
        </a>
    {/each}
</div>
