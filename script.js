// Global variables
let currentLoanTab = "personal"
let isSubmitting = false

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners()
  initializeScrollEffects()
})

// Initialize event listeners
function initializeEventListeners() {
  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target.id)
    }
  })

  // Handle escape key for modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals()
    }
  })

  // Handle form submissions
  document.getElementById("contactForm").addEventListener("submit", submitContactForm)
  document.getElementById("loginForm").addEventListener("submit", submitLogin)
  document.getElementById("joinForm").addEventListener("submit", submitJoinForm)
}

// Initialize scroll effects
function initializeScrollEffects() {
  // Add scroll event listener for header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#000"
      header.style.backdropFilter = "none"
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".feature-card, .savings-card, .loan-card, .story-card")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Navigation functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
  closeMobileMenu()
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const menuToggle = document.querySelector(".mobile-menu-toggle i")

  if (mobileNav.classList.contains("show")) {
    closeMobileMenu()
  } else {
    mobileNav.classList.add("show")
    mobileNav.style.display = "flex"
    menuToggle.className = "fas fa-times"
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const menuToggle = document.querySelector(".mobile-menu-toggle i")

  mobileNav.classList.remove("show")
  mobileNav.style.display = "none"
  menuToggle.className = "fas fa-bars"
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"

    // Special handling for video modal
    if (modalId === "videoModal") {
      // Video will auto-load when modal opens
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"

    // Reset forms when closing modals
    const forms = modal.querySelectorAll("form")
    forms.forEach((form) => form.reset())
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.style.display = "none"
  })
  document.body.style.overflow = "auto"
}

// Loan calculator functions
function calculateLoan() {
  const loanType = document.getElementById("loanType").value
  const loanAmount = Number.parseFloat(document.getElementById("loanAmount").value)
  const loanTerm = Number.parseInt(document.getElementById("loanTerm").value)

  if (!loanType || !loanAmount || !loanTerm) {
    showToast("Please fill in all loan details to calculate.", "error")
    return
  }

  let interestRate = 0.12 // Default 12%
  if (loanType === "business") interestRate = 0.1
  if (loanType === "emergency") interestRate = 0.08

  const monthlyRate = interestRate / 12
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)

  const totalPayment = monthlyPayment * loanTerm
  const totalInterest = totalPayment - loanAmount

  // Display results
  document.getElementById("monthlyPayment").textContent =
    "KSh " + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  document.getElementById("totalPayment").textContent =
    "KSh " + totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  document.getElementById("totalInterest").textContent =
    "KSh " + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  document.getElementById("calculationResult").style.display = "block"

  showToast(`Monthly Payment: KSh ${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, "success")
}

// Loan tab functions
function switchLoanTab(tabName) {
  // Remove active class from all tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))

  // Add active class to selected tab
  event.target.classList.add("active")
  document.getElementById(tabName + "Tab").classList.add("active")

  currentLoanTab = tabName
}

// Loan application functions
function openLoanApplication(loanType) {
  showToast(`${loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan Application Started`, "info")

  // Create and show loan application modal
  createLoanApplicationModal(loanType)
}

function createLoanApplicationModal(loanType) {
  const modalHtml = `
        <div id="loanApplicationModal" class="modal" style="display: block;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan Application</h2>
                    <span class="close" onclick="closeModal('loanApplicationModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Complete this form to apply for a ${loanType} loan</p>
                    <form id="loanApplicationForm" onsubmit="submitLoanApplication(event, '${loanType}')">
                        <div class="form-group">
                            <label for="loanFullName">Full Name</label>
                            <input type="text" id="loanFullName" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="loanIdNumber">ID Number</label>
                            <input type="text" id="loanIdNumber" name="idNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="loanPhone">Phone Number</label>
                            <input type="tel" id="loanPhone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="loanEmail">Email</label>
                            <input type="email" id="loanEmail" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="requestedAmount">Requested Amount (KSh)</label>
                            <input type="number" id="requestedAmount" name="amount" 
                                   max="${loanType === "personal" ? "500000" : loanType === "business" ? "2000000" : "100000"}" required>
                        </div>
                        <div class="form-group">
                            <label for="monthlyIncome">Monthly Income (KSh)</label>
                            <input type="number" id="monthlyIncome" name="income" required>
                        </div>
                        <div class="form-group">
                            <label for="loanPurpose">Loan Purpose</label>
                            <textarea id="loanPurpose" name="purpose" rows="3" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-success btn-full">
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `

  // Remove existing loan application modal if any
  const existingModal = document.getElementById("loanApplicationModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add new modal to body
  document.body.insertAdjacentHTML("beforeend", modalHtml)
  document.body.style.overflow = "hidden"
}

function submitLoanApplication(event, loanType) {
  event.preventDefault()

  if (isSubmitting) return
  isSubmitting = true

  const form = event.target
  const formData = new FormData(form)
  const amount = Number.parseInt(formData.get("amount"))

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Submitting..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    showToast(
      `Your ${loanType} loan application for KSh ${amount.toLocaleString()} has been submitted. Our loan officer will review and contact you within 2 business days.`,
      "success",
    )

    // Show follow-up notification
    setTimeout(() => {
      showToast("Your application has been forwarded to our loan committee for approval.", "info")
    }, 3000)

    closeModal("loanApplicationModal")

    // Reset form and button
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    isSubmitting = false
  }, 2000)
}

// Loan details functions
function openLoanDetails(loanType) {
  const details = getLoanDetails(loanType)
  createLoanDetailsModal(details)
}

function getLoanDetails(loanType) {
  const loanDetails = {
    personal: {
      title: "Personal Loan Details",
      description:
        "Personal loans are perfect for emergencies, education, medical expenses, or any personal need. Quick approval process with flexible repayment terms.",
      features: [
        "Up to KSh 500,000 loan amount",
        "12% competitive interest rate",
        "1-36 months flexible repayment",
        "Quick approval within 24 hours",
        "No collateral required for amounts under KSh 100,000",
        "Early repayment allowed without penalties",
      ],
      requirements: [
        "Active SACCO membership for at least 3 months",
        "Minimum savings balance of KSh 10,000",
        "Valid national ID and KRA PIN",
        "Proof of income (payslip or business records)",
        "Two guarantors for amounts above KSh 100,000",
      ],
      process: [
        "Submit online application with required documents",
        "Credit assessment and verification (1-2 days)",
        "Loan committee review and approval",
        "Sign loan agreement and disbursement",
        "Begin monthly repayments as scheduled",
      ],
    },
    business: {
      title: "Business Loan Details",
      description:
        "Business loans help entrepreneurs start or expand their businesses. Includes business mentorship and competitive rates for registered businesses.",
      features: [
        "Up to KSh 2,000,000 loan amount",
        "10% competitive interest rate",
        "6-60 months flexible repayment",
        "Free business mentorship program",
        "Grace period for seasonal businesses",
        "Asset-based lending available",
      ],
      requirements: [
        "Active SACCO membership for at least 6 months",
        "Business registration certificate",
        "Business plan and financial projections",
        "Bank statements for last 6 months",
        "Collateral for amounts above KSh 500,000",
        "Business permit and licenses",
      ],
      process: [
        "Submit detailed business loan application",
        "Business plan review and site visit",
        "Financial analysis and risk assessment",
        "Loan committee approval and terms negotiation",
        "Legal documentation and disbursement",
        "Ongoing business support and monitoring",
      ],
    },
    emergency: {
      title: "Emergency Loan Details",
      description:
        "Emergency loans provide quick access to funds for urgent situations. Same-day approval for existing members with good standing.",
      features: [
        "Up to KSh 100,000 loan amount",
        "8% low interest rate",
        "1-12 months quick repayment",
        "Same-day approval and disbursement",
        "Minimal documentation required",
        "Available 24/7 through mobile app",
      ],
      requirements: [
        "Active SACCO membership in good standing",
        "Minimum savings balance of KSh 5,000",
        "Valid national ID",
        "Emergency documentation (medical bills, etc.)",
        "No existing loan defaults",
      ],
      process: [
        "Submit emergency loan request online",
        "Instant eligibility check and pre-approval",
        "Upload emergency documentation",
        "Final approval within 2 hours",
        "Immediate disbursement to M-Pesa or bank",
      ],
    },
  }

  return loanDetails[loanType]
}

function createLoanDetailsModal(details) {
  const modalHtml = `
        <div id="loanDetailsModal" class="modal" style="display: block;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>${details.title}</h2>
                    <span class="close" onclick="closeModal('loanDetailsModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <p>${details.description}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-top: 24px;">
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #10b981;"><i class="fas fa-check-circle"></i> Key Features</h3>
                            </div>
                            <div class="card-content">
                                <ul style="list-style: none; padding: 0;">
                                    ${details.features.map((feature) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #10b981; margin-top: 4px; flex-shrink: 0;"></i><span style="font-size: 14px;">${feature}</span></li>`).join("")}
                                </ul>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #3b82f6;"><i class="fas fa-file-alt"></i> Requirements</h3>
                            </div>
                            <div class="card-content">
                                <ul style="list-style: none; padding: 0;">
                                    ${details.requirements.map((req) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-file-alt" style="color: #3b82f6; margin-top: 4px; flex-shrink: 0;"></i><span style="font-size: 14px;">${req}</span></li>`).join("")}
                                </ul>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #8b5cf6;"><i class="fas fa-list-ol"></i> Application Process</h3>
                            </div>
                            <div class="card-content">
                                <ol style="list-style: none; padding: 0;">
                                    ${details.process.map((step, index) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><div style="width: 20px; height: 20px; background: #e9d5ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;"><span style="font-size: 12px; font-weight: bold; color: #8b5cf6;">${index + 1}</span></div><span style="font-size: 14px;">${step}</span></li>`).join("")}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                        <button class="btn btn-success" onclick="openLoanApplication('${details.title.split(" ")[0].toLowerCase()}'); closeModal('loanDetailsModal');" style="flex: 1;">
                            Apply for This Loan
                        </button>
                        <button class="btn btn-outline" onclick="scrollToSection('contact'); closeModal('loanDetailsModal');" style="flex: 1;">
                            Contact Loan Officer
                        </button>
                        <button class="btn btn-outline" onclick="closeModal('loanDetailsModal')">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

  // Remove existing modal if any
  const existingModal = document.getElementById("loanDetailsModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add new modal to body
  document.body.insertAdjacentHTML("beforeend", modalHtml)
  document.body.style.overflow = "hidden"
}

// Savings plan functions
function openPlanDetails(planType) {
  const details = getPlanDetails(planType)
  createPlanDetailsModal(details)
}

function getPlanDetails(planType) {
  const planDetails = {
    basic: {
      name: "Basic Savings Account",
      description:
        "Perfect for getting started with your savings journey. Low minimum balance with competitive returns.",
      benefits: [
        "5.5% annual dividend rate",
        "No monthly maintenance fees",
        "Free mobile banking access",
        "Quarterly dividend payments",
        "Free ATM card",
        "SMS transaction alerts",
      ],
      requirements: [
        "Minimum opening deposit: KSh 1,000",
        "Minimum monthly deposit: KSh 500",
        "Valid national ID",
        "Passport-size photographs (2)",
        "Completed membership application",
      ],
      fees: [
        "Account opening: Free",
        "Monthly maintenance: Free",
        "ATM withdrawals: KSh 35 per transaction",
        "Over-the-counter withdrawals: KSh 100",
        "Statement requests: KSh 50",
      ],
      nextSteps: [
        "Complete online application form",
        "Upload required documents",
        "Make initial deposit via M-Pesa or bank",
        "Visit nearest branch for verification",
        "Receive account details and ATM card",
      ],
    },
    premium: {
      name: "Premium Savings Account",
      description:
        "For serious savers who want higher returns and premium services. Enhanced benefits and priority support.",
      benefits: [
        "7.2% annual dividend rate",
        "Priority customer service",
        "Higher loan limits (up to 4x savings)",
        "Monthly dividend payments",
        "Free premium ATM card",
        "Free financial advisory services",
      ],
      requirements: [
        "Minimum opening deposit: KSh 10,000",
        "Minimum monthly deposit: KSh 2,000",
        "Valid national ID and KRA PIN",
        "Proof of income",
        "Completed membership application",
      ],
      fees: [
        "Account opening: Free",
        "Monthly maintenance: Free",
        "Unlimited ATM withdrawals",
        "Free over-the-counter services",
        "Free monthly statements",
      ],
      nextSteps: [
        "Complete premium application form",
        "Upload income verification documents",
        "Make initial deposit",
        "Schedule appointment with relationship manager",
        "Activate premium services and benefits",
      ],
    },
    gold: {
      name: "Gold Savings Account",
      description: "Maximum returns for high-value savers. Exclusive benefits and dedicated relationship management.",
      benefits: [
        "8.5% annual dividend rate",
        "Dedicated relationship manager",
        "Premium loan rates (2% discount)",
        "Weekly dividend payments",
        "Gold ATM card with global access",
        "Exclusive investment opportunities",
      ],
      requirements: [
        "Minimum opening deposit: KSh 50,000",
        "Minimum monthly deposit: KSh 5,000",
        "Valid national ID and KRA PIN",
        "Proof of income and assets",
        "Bank statements (6 months)",
      ],
      fees: [
        "Account opening: Free",
        "All banking services: Free",
        "Global ATM access: Free",
        "Concierge services: Included",
        "Investment advisory: Free",
      ],
      nextSteps: [
        "Schedule consultation with wealth manager",
        "Complete comprehensive application",
        "Provide financial documentation",
        "Make initial deposit and verification",
        "Activate gold-tier services and benefits",
      ],
    },
  }

  return planDetails[planType]
}

function createPlanDetailsModal(details) {
  const modalHtml = `
        <div id="planDetailsModal" class="modal" style="display: block;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>${details.name}</h2>
                    <span class="close" onclick="closeModal('planDetailsModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <p>${details.description}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-top: 24px;">
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #10b981;"><i class="fas fa-chart-line"></i> Benefits & Features</h3>
                            </div>
                            <div class="card-content">
                                <ul style="list-style: none; padding: 0;">
                                    ${details.benefits.map((benefit) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-chart-line" style="color: #10b981; margin-top: 4px; flex-shrink: 0;"></i><span style="font-size: 14px;">${benefit}</span></li>`).join("")}
                                </ul>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #3b82f6;"><i class="fas fa-file-alt"></i> Requirements</h3>
                            </div>
                            <div class="card-content">
                                <ul style="list-style: none; padding: 0;">
                                    ${details.requirements.map((req) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-file-alt" style="color: #3b82f6; margin-top: 4px; flex-shrink: 0;"></i><span style="font-size: 14px;">${req}</span></li>`).join("")}
                                </ul>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #f59e0b;"><i class="fas fa-dollar-sign"></i> Fees & Charges</h3>
                            </div>
                            <div class="card-content">
                                <ul style="list-style: none; padding: 0;">
                                    ${details.fees.map((fee) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-dollar-sign" style="color: #f59e0b; margin-top: 4px; flex-shrink: 0;"></i><span style="font-size: 14px;">${fee}</span></li>`).join("")}
                                </ul>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 style="color: #8b5cf6;"><i class="fas fa-list-ol"></i> Next Steps</h3>
                            </div>
                            <div class="card-content">
                                <ol style="list-style: none; padding: 0;">
                                    ${details.nextSteps.map((step, index) => `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px;"><div style="width: 20px; height: 20px; background: #e9d5ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;"><span style="font-size: 12px; font-weight: bold; color: #8b5cf6;">${index + 1}</span></div><span style="font-size: 14px;">${step}</span></li>`).join("")}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                        <button class="btn btn-success" onclick="openModal('joinModal'); closeModal('planDetailsModal');" style="flex: 1;">
                            Open This Account
                        </button>
                        <button class="btn btn-outline" onclick="scrollToSection('contact'); closeModal('planDetailsModal');" style="flex: 1;">
                            Speak to Advisor
                        </button>
                        <button class="btn btn-outline" onclick="closeModal('planDetailsModal')">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

  // Remove existing modal if any
  const existingModal = document.getElementById("planDetailsModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add new modal to body
  document.body.insertAdjacentHTML("beforeend", modalHtml)
  document.body.style.overflow = "hidden"
}

// Form submission functions
function submitContactForm(event) {
  event.preventDefault()

  if (isSubmitting) return
  isSubmitting = true

  const form = event.target
  const formData = new FormData(form)

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    showToast("Thank you for contacting us. We'll get back to you within 24 hours.", "success")

    // Show follow-up notification
    setTimeout(() => {
      showToast("Confirmation email sent to your inbox.", "info")
    }, 2000)

    // Reset form and button
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    isSubmitting = false
  }, 1500)
}

function submitLogin(event) {
  event.preventDefault()

  if (isSubmitting) return
  isSubmitting = true

  const form = event.target
  const formData = new FormData(form)

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Logging in..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    showToast("Login Successful! Welcome back! Redirecting to your member dashboard...", "success")

    // Simulate redirect to dashboard
    setTimeout(() => {
      // In a real application, this would redirect to the actual dashboard
      showToast("", "info")
      closeModal("loginModal")
    }, 2000)

    // Reset form and button
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    isSubmitting = false
  }, 2000)
}

function submitJoinForm(event) {
  event.preventDefault()

  if (isSubmitting) return
  isSubmitting = true

  const form = event.target
  const formData = new FormData(form)
  const fullName = formData.get("fullName")

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Processing Application..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    showToast(
      `Welcome ${fullName}! Your membership application has been received. Check your email for next steps.`,
      "success",
    )

    // Show follow-up notification
    setTimeout(() => {
      showToast("Confirmation email sent to your registered email address.", "info")
    }, 3000)

    closeModal("joinModal")

    // Reset form and button
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    isSubmitting = false
  }, 2000)
}

// Toast notification function
function showToast(message, type = "info") {
  const toast = document.getElementById("toast")
  const toastIcon = toast.querySelector(".toast-icon")
  const toastMessage = toast.querySelector(".toast-message")

  // Set icon based on type
  let iconClass = "fas fa-info-circle"
  if (type === "success") iconClass = "fas fa-check-circle"
  if (type === "error") iconClass = "fas fa-exclamation-circle"
  if (type === "warning") iconClass = "fas fa-exclamation-triangle"

  toastIcon.className = `toast-icon ${type} ${iconClass}`
  toastMessage.textContent = message

  // Show toast
  toast.classList.add("show")

  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 5000)
}

// Utility functions
function formatCurrency(amount) {
  return "KSh " + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^(\+254|0)[17]\d{8}$/
  return re.test(phone)
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Initialize loan calculator with default values
  document.getElementById("loanType").addEventListener("change", () => {
    const resultDiv = document.getElementById("calculationResult")
    if (resultDiv.style.display === "block") {
      calculateLoan()
    }
  })

  // Add input event listeners for real-time calculation
  document.getElementById("loanAmount").addEventListener("input", () => {
    const resultDiv = document.getElementById("calculationResult")
    if (resultDiv.style.display === "block") {
      calculateLoan()
    }
  })

  document.getElementById("loanTerm").addEventListener("input", () => {
    const resultDiv = document.getElementById("calculationResult")
    if (resultDiv.style.display === "block") {
      calculateLoan()
    }
  })

  // Show welcome message
  setTimeout(() => {
    showToast("Welcome to Unity Trust SACCO! Explore our services and join our community.", "success")
  }, 1000)
})
