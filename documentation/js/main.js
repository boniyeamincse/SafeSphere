// SafeSphere Documentation JavaScript

// Sidebar navigation
document.addEventListener('DOMContentLoaded', function () {
    // Highlight active page in sidebar
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Copy code button for code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.25rem 0.75rem; background: var(--primary-color); color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.75rem;';

        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
    });

    // Search functionality (basic client-side)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const contentSections = document.querySelectorAll('.content-section');

            contentSections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Table of contents generator
    function generateTOC() {
        const toc = document.getElementById('toc');
        if (!toc) return;

        const headings = document.querySelectorAll('.main-content h2, .main-content h3');
        const tocList = document.createElement('ul');
        tocList.style.listStyle = 'none';
        tocList.style.marginLeft = '0';

        headings.forEach((heading, index) => {
            // Add ID if not present
            if (!heading.id) {
                heading.id = 'section-' + index;
            }

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + heading.id;
            a.textContent = heading.textContent;
            a.style.marginLeft = heading.tagName === 'H3' ? '1rem' : '0';

            li.appendChild(a);
            tocList.appendChild(li);
        });

        toc.appendChild(tocList);
    }

    generateTOC();
});

// Dark mode toggle (optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
