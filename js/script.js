document.addEventListener('alpine:init', () => {
    Alpine.data('siteLogic', () => ({
        mobileMenu: false,
        techModal: false,

        toggleMobileMenu() {
            this.mobileMenu = !this.mobileMenu;
        }
    }))
})
