
<script>
    document.addEventListener("DOMContentLoaded", function (event) {
        const showNavbar = (toggleId, navId, bodyId, headerId) => {
            const toggle = document.getElementById(toggleId),
                nav = document.getElementById(navId),
                bodypd = document.getElementById(bodyId),
                headerpd = document.getElementById(headerId)

            if (toggle && nav && bodypd && headerpd) {
                toggle.addEventListener('click', () => {
                    nav.classList.toggle('show')
                    toggle.classList.toggle('bx-x')
                    bodypd.classList.toggle('body-pd')
                    headerpd.classList.toggle('body-pd')

                    // Toggle class to show navigation item names
                    document.body.classList.toggle('show-names');
                })
            }
        }

        showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

        const linkColor = document.querySelectorAll('.nav_link')
        function colorLink() {
            if (linkColor) {
                linkColor.forEach(l => l.classList.remove('active'))
                this.classList.add('active')
            }
        }

        linkColor.forEach(l => l.addEventListener('click', colorLink))

        fetch('/modules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
        }).then(response => response.json())
            .then(data => {
                function generateNavItems() {
                    const navBar = document.getElementById('nav-bar');
                    const navList = document.createElement('div');
                    navList.classList.add('nav', 'flex-column', 'nav-pills');
                    data.forEach(item => {
                        const link = document.createElement('a');
                        link.href = '#';
                        link.classList.add('nav-link');
                        link.id = 'navId'
                        //if (item.active) link.classList.add('active');
                        link.innerHTML = `
                            <span class="nav_name">${item.module}</span>`;
                        navList.appendChild(link);
                    });
                    navBar.appendChild(navList);
                }
                
                generateNavItems();
            })

    });
</script>