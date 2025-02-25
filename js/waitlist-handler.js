import { databases, DATABASE_ID, COLLECTION_ID } from './appwrite-config.js';

class WaitlistHandler {
    constructor() {
        this.form = document.getElementById('waitlistForm');
        this.emailInput = document.querySelector('.waitlist-input');
        this.nameInput = document.querySelector('.waitlist-name-input');
        this.professionInput = document.querySelector('.waitlist-profession-input');
        this.sourceInput = document.querySelector('.waitlist-source-input');
        this.submitButton = document.querySelector('.waitlist-button');
        this.successMessage = document.querySelector('.waitlist-success');
        this.errorMessage = document.querySelector('.waitlist-error');
        
        this.initialize();
    }

    initialize() {
        if (!this.form) {
            console.error('❌ Waitlist form not found');
            return;
        }
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.emailInput?.addEventListener('input', this.handleInput.bind(this));
        this.nameInput?.addEventListener('input', this.handleInput.bind(this));
        this.professionInput?.addEventListener('change', this.handleInput.bind(this));
        this.sourceInput?.addEventListener('change', this.handleInput.bind(this));
        
        console.log('✅ Waitlist form initialized');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        const name = this.nameInput.value.trim();
        const profession = this.professionInput.value;
        const source = this.sourceInput.value;

        // Validate required fields
        if (!email || !this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (!name) {
            this.showError('Please enter your name');
            return;
        }

        if (!profession) {
            this.showError('Please select your profession');
            return;
        }

        if (!source) {
            this.showError('Please tell us how you heard about us');
            return;
        }

        this.setLoading(true);

        try {
            // Create waitlist entry
            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                'unique()',
                {
                    email,
                    name,
                    profession,
                    source,
                    timestamp: new Date().toISOString(),
                    status: 'pending'
                }
            );

            this.showSuccess();
            this.form.reset();
        } catch (error) {
            console.error('Error creating waitlist entry:', error);
            this.showError('Failed to join waitlist. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        if (this.submitButton) {
            if (isLoading) {
                this.submitButton.disabled = true;
                this.submitButton.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                `;
            } else {
                this.submitButton.disabled = false;
                this.submitButton.innerHTML = 'Join Waitlist';
            }
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showSuccess() {
        if (this.successMessage) {
            this.successMessage.style.display = 'block';
            this.successMessage.classList.add('show');
            setTimeout(() => {
                this.successMessage.classList.remove('show');
                setTimeout(() => {
                    this.successMessage.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }

    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
            this.errorMessage.classList.add('show');
            setTimeout(() => {
                this.errorMessage.classList.remove('show');
                setTimeout(() => {
                    this.errorMessage.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }

    handleInput() {
        // Clear error message when user starts typing
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
            this.errorMessage.classList.remove('show');
        }
    }
}

// Initialize handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WaitlistHandler();
});
