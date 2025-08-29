"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  Menu,
  X,
  Play,
  ChevronUp,
  ChevronDown,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Calculator,
  FileText,
  CreditCard,
  Building,
  AlertCircle,
  LogIn,
  UserPlus,
  CheckCircle,
} from "lucide-react"

export default function UnityTrustSaccoWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [loanType, setLoanType] = useState("")
  const [showVideo, setShowVideo] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [membershipForm, setMembershipForm] = useState({
    fullName: "",
    idNumber: "",
    phoneNumber: "",
    emailAddress: "",
    initialDeposit: "",
  })

  const [loanApplicationForm, setLoanApplicationForm] = useState({
    fullName: "",
    idNumber: "",
    phoneNumber: "",
    email: "",
    loanType: "",
    requestedAmount: "",
    purpose: "",
    monthlyIncome: "",
  })

  const [calculationResult, setCalculationResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedLoanDetails, setSelectedLoanDetails] = useState<any>(null)
  const [showLoanDetails, setShowLoanDetails] = useState(false)
  const [selectedSavingsPlan, setSelectedSavingsPlan] = useState<any>(null)
  const [showPlanDetails, setShowPlanDetails] = useState(false)

  // Loan Calculator
  const calculateLoan = () => {
    if (!loanAmount || !loanTerm || !loanType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all loan details to calculate.",
        variant: "destructive",
      })
      return
    }

    const principal = Number.parseFloat(loanAmount)
    const months = Number.parseInt(loanTerm)
    let interestRate = 0.12 // Default 12%

    if (loanType === "business") interestRate = 0.1
    if (loanType === "emergency") interestRate = 0.08

    const monthlyRate = interestRate / 12
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    setCalculationResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    })

    toast({
      title: "Loan Calculation Complete",
      description: `Monthly Payment: KSh ${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    })
  }

  const handleMembershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Application Submitted Successfully!",
      description: `Welcome ${membershipForm.fullName}! Your membership application has been received. Check your email for next steps.`,
    })

    // Simulate sending email notification
    setTimeout(() => {
      toast({
        title: "Email Sent!",
        description: "Confirmation email sent to your registered email address.",
      })
    }, 3000)

    setMembershipForm({
      fullName: "",
      idNumber: "",
      phoneNumber: "",
      emailAddress: "",
      initialDeposit: "",
    })

    setIsSubmitting(false)
  }

  const handleLoanApplication = async (type: string) => {
    setLoanApplicationForm({ ...loanApplicationForm, loanType: type })

    toast({
      title: `${type} Loan Application Started`,
      description: "Please complete the application form to proceed.",
    })
  }

  const handleLoanApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Loan Application Submitted!",
      description: `Your ${loanApplicationForm.loanType} loan application for KSh ${Number.parseInt(loanApplicationForm.requestedAmount).toLocaleString()} has been submitted. Our loan officer will review and contact you within 2 business days.`,
    })

    // Simulate email notification
    setTimeout(() => {
      toast({
        title: "Application Under Review",
        description: "Your application has been forwarded to our loan committee for approval.",
      })
    }, 3000)

    setLoanApplicationForm({
      fullName: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      loanType: "",
      requestedAmount: "",
      purpose: "",
      monthlyIncome: "",
    })

    setIsSubmitting(false)
  }

  const handleLearnMore = (loanType: string) => {
    let details = {
      title: "",
      description: "",
      features: [],
      requirements: [],
      process: [],
    }

    switch (loanType) {
      case "Personal":
        details = {
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
        }
        break
      case "Business":
        details = {
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
        }
        break
      case "Emergency":
        details = {
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
        }
        break
    }

    // Show detailed dialog instead of just toast
    setSelectedLoanDetails(details)
    setShowLoanDetails(true)
  }

  // Handle form submissions
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    })

    // Simulate email notification
    setTimeout(() => {
      toast({
        title: "Auto-Reply Sent",
        description: "Confirmation email sent to your inbox.",
      })
    }, 2000)

    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  const handleJoinNow = () => {
    // Open the membership dialog instead of just showing a toast
    const openAccountButton = document.querySelector('[data-testid="open-account-trigger"]') as HTMLElement
    if (openAccountButton) {
      openAccountButton.click()
    } else {
      // Fallback: show toast and scroll to contact
      toast({
        title: "Welcome to Unity Trust SACCO!",
        description: "Please scroll down to open your account or contact us for assistance.",
      })
      scrollToSection("contact")
    }
  }

  const handlePlanSelection = (plan: string) => {
    let planDetails = {
      name: "",
      description: "",
      benefits: [],
      requirements: [],
      fees: [],
      nextSteps: [],
    }

    switch (plan) {
      case "Basic Savings":
        planDetails = {
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
        }
        break
      case "Premium Savings":
        planDetails = {
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
        }
        break
      case "Gold Savings":
        planDetails = {
          name: "Gold Savings Account",
          description:
            "Maximum returns for high-value savers. Exclusive benefits and dedicated relationship management.",
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
        }
        break
    }

    setSelectedSavingsPlan(planDetails)
    setShowPlanDetails(true)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold">
                Unity<span className="text-green-400">Trust</span>SACCO
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("home")} className="hover:text-green-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-green-400 transition-colors">
                About Us
              </button>
              <button onClick={() => scrollToSection("savings")} className="hover:text-green-400 transition-colors">
                Savings Plans
              </button>
              <button onClick={() => scrollToSection("loans")} className="hover:text-green-400 transition-colors">
                Loans
              </button>
              <button onClick={() => scrollToSection("stories")} className="hover:text-green-400 transition-colors">
                Member Stories
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-green-400 transition-colors">
                Contact
              </button>
            </nav>

            {/* Join Now Button & Member Login & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden md:flex border-green-400 text-green-400 hover:bg-green-400 hover:text-black bg-transparent"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Member Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Member Login</DialogTitle>
                    <DialogDescription>Access your Unity Trust SACCO account</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="memberNumber">Member Number</Label>
                      <Input id="memberNumber" placeholder="UT001001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Login Successful!",
                          description: "Welcome back! Redirecting to your member dashboard...",
                        })
                        setTimeout(() => {
                          window.location.href = "/dashboard"
                        }, 2000)
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Login to Dashboard
                    </Button>
                    <div className="text-center">
                      <button className="text-sm text-green-600 hover:underline">Forgot Password?</button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Join Unity Trust SACCO</DialogTitle>
                    <DialogDescription>
                      Start your membership application and begin your journey to financial freedom
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleMembershipSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="joinFullName">Full Name</Label>
                      <Input
                        id="joinFullName"
                        placeholder="Enter your full name"
                        value={membershipForm.fullName}
                        onChange={(e) => setMembershipForm({ ...membershipForm, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinIdNumber">ID Number</Label>
                      <Input
                        id="joinIdNumber"
                        placeholder="Enter your ID number"
                        value={membershipForm.idNumber}
                        onChange={(e) => setMembershipForm({ ...membershipForm, idNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinPhoneNumber">Phone Number</Label>
                      <Input
                        id="joinPhoneNumber"
                        placeholder="+254 700 000 000"
                        value={membershipForm.phoneNumber}
                        onChange={(e) => setMembershipForm({ ...membershipForm, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinEmailAddress">Email Address</Label>
                      <Input
                        id="joinEmailAddress"
                        type="email"
                        placeholder="your@email.com"
                        value={membershipForm.emailAddress}
                        onChange={(e) => setMembershipForm({ ...membershipForm, emailAddress: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinInitialDeposit">Initial Deposit (KSh)</Label>
                      <Input
                        id="joinInitialDeposit"
                        type="number"
                        placeholder="1000"
                        min="1000"
                        value={membershipForm.initialDeposit}
                        onChange={(e) => setMembershipForm({ ...membershipForm, initialDeposit: e.target.value })}
                        required
                      />
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Membership Benefits</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Competitive dividend rates up to 8.5%</li>
                        <li>• Access to affordable loans</li>
                        <li>• Free mobile banking</li>
                        <li>• Financial advisory services</li>
                        <li>• Community investment opportunities</li>
                      </ul>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                      {isSubmitting ? "Processing Application..." : "Join Unity Trust SACCO"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left hover:text-green-400 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left hover:text-green-400 transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("savings")}
                  className="text-left hover:text-green-400 transition-colors"
                >
                  Savings Plans
                </button>
                <button
                  onClick={() => scrollToSection("loans")}
                  className="text-left hover:text-green-400 transition-colors"
                >
                  Loans
                </button>
                <button
                  onClick={() => scrollToSection("stories")}
                  className="text-left hover:text-green-400 transition-colors"
                >
                  Member Stories
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left hover:text-green-400 transition-colors"
                >
                  Contact
                </button>
                <Button
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black bg-transparent"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Member Login
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white min-h-screen flex items-center"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Grow Together.
                <br />
                Prosper Together.
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Affordable savings and loan solutions tailored for your community. Join over 5,000 members building
                financial freedom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild data-testid="open-account-trigger">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4">
                      Open an Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Open Your Account</DialogTitle>
                      <DialogDescription>
                        Start your journey to financial freedom with Unity Trust SACCO
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleMembershipSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={membershipForm.fullName}
                          onChange={(e) => setMembershipForm({ ...membershipForm, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">ID Number</Label>
                        <Input
                          id="idNumber"
                          placeholder="Enter your ID number"
                          value={membershipForm.idNumber}
                          onChange={(e) => setMembershipForm({ ...membershipForm, idNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          placeholder="+254 700 000 000"
                          value={membershipForm.phoneNumber}
                          onChange={(e) => setMembershipForm({ ...membershipForm, phoneNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailAddress">Email Address</Label>
                        <Input
                          id="emailAddress"
                          type="email"
                          placeholder="your@email.com"
                          value={membershipForm.emailAddress}
                          onChange={(e) => setMembershipForm({ ...membershipForm, emailAddress: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="initialDeposit">Initial Deposit (KSh)</Label>
                        <Input
                          id="initialDeposit"
                          type="number"
                          placeholder="1000"
                          min="1000"
                          value={membershipForm.initialDeposit}
                          onChange={(e) => setMembershipForm({ ...membershipForm, initialDeposit: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 bg-transparent"
                    >
                      How It Works
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>How Unity Trust SACCO Works</DialogTitle>
                      <DialogDescription>Learn about our simple 4-step process to financial freedom</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Join as a Member</h4>
                          <p className="text-gray-600">
                            Complete our simple registration process with a minimum deposit of KSh 1,000
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Start Saving</h4>
                          <p className="text-gray-600">
                            Make regular deposits and watch your savings grow with competitive dividends
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Access Loans</h4>
                          <p className="text-gray-600">Apply for affordable loans up to 3 times your savings balance</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Build Wealth</h4>
                          <p className="text-gray-600">Enjoy annual dividends and build long-term financial security</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Dialog open={showVideo} onOpenChange={setShowVideo}>
                  <DialogTrigger asChild>
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                      <Play className="h-12 w-12 text-white ml-2" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Unity Trust SACCO Introduction</DialogTitle>
                      <DialogDescription>
                        Watch our introduction video to learn more about our services
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Video content would be embedded here</p>
                        <p className="text-sm text-gray-500 mt-2">Learn about our 15+ years of serving the community</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection("home")}
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            <ChevronUp className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Unity Trust SACCO?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to empowering our community through accessible financial services and shared prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("stories")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built by the community, for the community. Every member has a voice in our decisions.
                </p>
              </CardContent>
            </Card>

            <Card
              className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("loans")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Low Interest Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Competitive rates on loans and attractive returns on your savings.</p>
              </CardContent>
            </Card>

            <Card
              className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Secure & Trusted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your money is safe with us. Licensed and regulated for your protection.</p>
              </CardContent>
            </Card>

            <Card
              className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("savings")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Financial Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Watch your savings grow with our competitive dividend rates and bonus programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Savings Plans Section */}
      <section id="savings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Savings Plans</h2>
            <p className="text-xl text-gray-600">Choose a savings plan that fits your financial goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-600">Basic Savings</CardTitle>
                <CardDescription className="text-lg">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold">5.5%</span>
                  <span className="text-gray-600"> annual dividend</span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Minimum deposit: KSh 1,000</li>
                  <li>• No monthly fees</li>
                  <li>• Mobile banking access</li>
                  <li>• Quarterly dividends</li>
                </ul>
                <Button
                  onClick={() => handlePlanSelection("Basic Savings")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-blue-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-600">Premium Savings</CardTitle>
                <CardDescription className="text-lg">For serious savers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold">7.2%</span>
                  <span className="text-gray-600"> annual dividend</span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Minimum deposit: KSh 10,000</li>
                  <li>• Priority customer service</li>
                  <li>• Higher loan limits</li>
                  <li>• Monthly dividends</li>
                </ul>
                <Button
                  onClick={() => handlePlanSelection("Premium Savings")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-yellow-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-yellow-600">Gold Savings</CardTitle>
                <CardDescription className="text-lg">Maximum returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold">8.5%</span>
                  <span className="text-gray-600"> annual dividend</span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Minimum deposit: KSh 50,000</li>
                  <li>• Dedicated relationship manager</li>
                  <li>• Premium loan rates</li>
                  <li>• Weekly dividends</li>
                </ul>
                <Button
                  onClick={() => handlePlanSelection("Gold Savings")}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loans Section */}
      <section id="loans" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loan Products</h2>
            <p className="text-xl text-gray-600">Flexible loan solutions for every need</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Loan Calculator */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Loan Calculator
                </CardTitle>
                <CardDescription>Calculate your monthly loan payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select value={loanType} onValueChange={setLoanType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Loan (12%)</SelectItem>
                      <SelectItem value="business">Business Loan (10%)</SelectItem>
                      <SelectItem value="emergency">Emergency Loan (8%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (KSh)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    placeholder="12"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                  />
                </div>
                <Button onClick={calculateLoan} className="w-full">
                  Calculate Payment
                </Button>

                {calculationResult && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border">
                    <h4 className="font-semibold text-green-800 mb-2">Calculation Results:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span className="font-semibold">
                          KSh {calculationResult.monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Payment:</span>
                        <span className="font-semibold">
                          KSh {calculationResult.totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Interest:</span>
                        <span className="font-semibold">
                          KSh {calculationResult.totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Loan Application */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quick Loan Application
                </CardTitle>
                <CardDescription>Apply for a loan in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Personal Loan</h4>
                      <p className="text-sm text-gray-600">Up to KSh 500,000 at 12% interest</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleLoanApplication("Personal")} className="w-full">
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Personal Loan Application</DialogTitle>
                          <DialogDescription>Complete this form to apply for a personal loan</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleLoanApplicationSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="loanFullName">Full Name</Label>
                            <Input
                              id="loanFullName"
                              placeholder="Enter your full name"
                              value={loanApplicationForm.fullName}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, fullName: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="loanIdNumber">ID Number</Label>
                            <Input
                              id="loanIdNumber"
                              placeholder="Enter your ID number"
                              value={loanApplicationForm.idNumber}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, idNumber: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="loanPhone">Phone Number</Label>
                            <Input
                              id="loanPhone"
                              placeholder="+254 700 000 000"
                              value={loanApplicationForm.phoneNumber}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, phoneNumber: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="loanEmail">Email</Label>
                            <Input
                              id="loanEmail"
                              type="email"
                              placeholder="your@email.com"
                              value={loanApplicationForm.email}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, email: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="requestedAmount">Requested Amount (KSh)</Label>
                            <Input
                              id="requestedAmount"
                              type="number"
                              placeholder="50000"
                              max="500000"
                              value={loanApplicationForm.requestedAmount}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, requestedAmount: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyIncome">Monthly Income (KSh)</Label>
                            <Input
                              id="monthlyIncome"
                              type="number"
                              placeholder="30000"
                              value={loanApplicationForm.monthlyIncome}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, monthlyIncome: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="purpose">Loan Purpose</Label>
                            <Textarea
                              id="purpose"
                              placeholder="Describe how you plan to use this loan"
                              value={loanApplicationForm.purpose}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, purpose: e.target.value })
                              }
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>

                  <TabsContent value="business" className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Business Loan</h4>
                      <p className="text-sm text-gray-600">Up to KSh 2,000,000 at 10% interest</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleLoanApplication("Business")} className="w-full">
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Business Loan Application</DialogTitle>
                          <DialogDescription>Complete this form to apply for a business loan</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleLoanApplicationSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input id="businessName" placeholder="Enter your business name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessLoanAmount">Requested Amount (KSh)</Label>
                            <Input
                              id="businessLoanAmount"
                              type="number"
                              placeholder="100000"
                              max="2000000"
                              value={loanApplicationForm.requestedAmount}
                              onChange={(e) =>
                                setLoanApplicationForm({
                                  ...loanApplicationForm,
                                  requestedAmount: e.target.value,
                                  loanType: "Business",
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessType">Business Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                                <SelectItem value="agriculture">Agriculture</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>

                  <TabsContent value="emergency" className="space-y-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Emergency Loan</h4>
                      <p className="text-sm text-gray-600">Up to KSh 100,000 at 8% interest</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleLoanApplication("Emergency")} className="w-full">
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Emergency Loan Application</DialogTitle>
                          <DialogDescription>Quick application for urgent financial needs</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleLoanApplicationSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyAmount">Requested Amount (KSh)</Label>
                            <Input
                              id="emergencyAmount"
                              type="number"
                              placeholder="25000"
                              max="100000"
                              value={loanApplicationForm.requestedAmount}
                              onChange={(e) =>
                                setLoanApplicationForm({
                                  ...loanApplicationForm,
                                  requestedAmount: e.target.value,
                                  loanType: "Emergency",
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyReason">Emergency Reason</Label>
                            <Textarea
                              id="emergencyReason"
                              placeholder="Briefly describe your emergency"
                              value={loanApplicationForm.purpose}
                              onChange={(e) =>
                                setLoanApplicationForm({ ...loanApplicationForm, purpose: e.target.value })
                              }
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Emergency Application"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Personal Loans
                </CardTitle>
                <CardDescription>For personal expenses and emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Up to KSh 500,000</li>
                  <li>• 12% annual interest</li>
                  <li>• 1-36 months repayment</li>
                  <li>• Quick approval</li>
                </ul>
                <Button
                  onClick={() => handleLearnMore("Personal")}
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Loans
                </CardTitle>
                <CardDescription>Grow your business with our support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Up to KSh 2,000,000</li>
                  <li>• 10% annual interest</li>
                  <li>• 6-60 months repayment</li>
                  <li>• Business mentorship</li>
                </ul>
                <Button
                  onClick={() => handleLearnMore("Business")}
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Emergency Loans
                </CardTitle>
                <CardDescription>Quick cash for urgent needs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Up to KSh 100,000</li>
                  <li>• 8% annual interest</li>
                  <li>• 1-12 months repayment</li>
                  <li>• Same day approval</li>
                </ul>
                <Button
                  onClick={() => handleLearnMore("Emergency")}
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Stories Section */}
      <section id="stories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Member Success Stories</h2>
            <p className="text-xl text-gray-600">Real stories from our community members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">MK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mary Kamau</h4>
                    <p className="text-sm text-gray-600">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Unity Trust SACCO helped me start my tailoring business. The low-interest loan and business
                  mentorship made all the difference!"
                </p>
                <Badge className="mt-4">Business Success</Badge>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">JO</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Ochieng</h4>
                    <p className="text-sm text-gray-600">Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "I've been saving with Unity Trust for 3 years. The dividends have helped me build my dream home!"
                </p>
                <Badge className="mt-4" variant="secondary">
                  Savings Growth
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-yellow-600 font-bold">GW</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Grace Wanjiku</h4>
                    <p className="text-sm text-gray-600">Farmer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The agricultural loan helped me expand my farm. Now I'm earning three times more than before!"
                </p>
                <Badge className="mt-4" variant="outline">
                  Agricultural Success
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => scrollToSection("contact")} size="lg" className="bg-green-600 hover:bg-green-700">
              Share Your Story
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to join our community? Contact us today!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 cursor-pointer hover:bg-white p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-600">+254 700 123 456</p>
                  <p className="text-gray-600">+254 733 987 654</p>
                  <p className="text-sm text-green-600 mt-1">Click to call</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 cursor-pointer hover:bg-white p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-600">info@unitytrustsacco.co.ke</p>
                  <p className="text-gray-600">support@unitytrustsacco.co.ke</p>
                  <p className="text-sm text-blue-600 mt-1">Click to email</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 cursor-pointer hover:bg-white p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-gray-600">Unity Trust Building</p>
                  <p className="text-gray-600">Kimathi Street, Nairobi</p>
                  <p className="text-gray-600">P.O. Box 12345-00100</p>
                  <p className="text-sm text-yellow-600 mt-1">Get directions</p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("home")}>
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">U</span>
                </div>
                <span className="text-xl font-bold">
                  Unity<span className="text-green-400">Trust</span>SACCO
                </span>
              </div>
              <p className="text-gray-400">
                Building financial freedom through community cooperation and shared prosperity.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("savings")} className="hover:text-white transition-colors">
                    Savings Accounts
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("loans")} className="hover:text-white transition-colors">
                    Personal Loans
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("loans")} className="hover:text-white transition-colors">
                    Business Loans
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Mobile Banking
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("stories")} className="hover:text-white transition-colors">
                    Leadership
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("stories")} className="hover:text-white transition-colors">
                    News
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Unity Trust SACCO. All rights reserved. Licensed by SASRA.</p>
          </div>
        </div>
      </footer>

      {/* Loan Details Dialog */}
      <Dialog open={showLoanDetails} onOpenChange={setShowLoanDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedLoanDetails?.title}</DialogTitle>
            <DialogDescription className="text-lg">{selectedLoanDetails?.description}</DialogDescription>
          </DialogHeader>

          {selectedLoanDetails && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedLoanDetails.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedLoanDetails.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {selectedLoanDetails.process.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                          </div>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Apply for This Loan</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Start Your Application</DialogTitle>
                      <DialogDescription>
                        Begin your {selectedLoanDetails.title.replace(" Details", "")} application
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        You're about to start an application for a {selectedLoanDetails.title.replace(" Details", "")}.
                        Make sure you have all required documents ready.
                      </p>
                      <Button
                        onClick={() => {
                          setShowLoanDetails(false)
                          handleLoanApplication(selectedLoanDetails.title.split(" ")[0])
                        }}
                        className="w-full"
                      >
                        Continue to Application
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => scrollToSection("contact")}>
                  Contact Loan Officer
                </Button>

                <Button variant="outline" onClick={() => setShowLoanDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Savings Plan Details Dialog */}
      <Dialog open={showPlanDetails} onOpenChange={setShowPlanDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedSavingsPlan?.name}</DialogTitle>
            <DialogDescription className="text-lg">{selectedSavingsPlan?.description}</DialogDescription>
          </DialogHeader>

          {selectedSavingsPlan && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Benefits & Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSavingsPlan.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSavingsPlan.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-600">Fees & Charges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSavingsPlan.fees.map((fee: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{fee}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {selectedSavingsPlan.nextSteps.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                          </div>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Open This Account</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Open Your Account</DialogTitle>
                      <DialogDescription>Start your {selectedSavingsPlan.name} application</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleMembershipSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="planFullName">Full Name</Label>
                        <Input
                          id="planFullName"
                          placeholder="Enter your full name"
                          value={membershipForm.fullName}
                          onChange={(e) => setMembershipForm({ ...membershipForm, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planIdNumber">ID Number</Label>
                        <Input
                          id="planIdNumber"
                          placeholder="Enter your ID number"
                          value={membershipForm.idNumber}
                          onChange={(e) => setMembershipForm({ ...membershipForm, idNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planPhoneNumber">Phone Number</Label>
                        <Input
                          id="planPhoneNumber"
                          placeholder="+254 700 000 000"
                          value={membershipForm.phoneNumber}
                          onChange={(e) => setMembershipForm({ ...membershipForm, phoneNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planEmailAddress">Email Address</Label>
                        <Input
                          id="planEmailAddress"
                          type="email"
                          placeholder="your@email.com"
                          value={membershipForm.emailAddress}
                          onChange={(e) => setMembershipForm({ ...membershipForm, emailAddress: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planInitialDeposit">Initial Deposit (KSh)</Label>
                        <Input
                          id="planInitialDeposit"
                          type="number"
                          placeholder={
                            selectedSavingsPlan.name.includes("Basic")
                              ? "1000"
                              : selectedSavingsPlan.name.includes("Premium")
                                ? "10000"
                                : "50000"
                          }
                          min={
                            selectedSavingsPlan.name.includes("Basic")
                              ? "1000"
                              : selectedSavingsPlan.name.includes("Premium")
                                ? "10000"
                                : "50000"
                          }
                          value={membershipForm.initialDeposit}
                          onChange={(e) => setMembershipForm({ ...membershipForm, initialDeposit: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : `Open ${selectedSavingsPlan.name}`}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => scrollToSection("contact")}>
                  Speak to Advisor
                </Button>

                <Button variant="outline" onClick={() => setShowPlanDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
