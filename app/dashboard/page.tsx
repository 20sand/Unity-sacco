"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Download,
  Upload,
  Send,
  LogOut,
  Smartphone,
  Building2,
  Receipt,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react"
import { NotificationPanel } from "@/components/notification-panel"
import { SettingsPanel } from "@/components/settings-panel"

export default function MemberDashboard() {
  const [showBalance, setShowBalance] = useState(true)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferRecipient, setTransferRecipient] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  // Mock member data
  const memberData = {
    name: "John Doe",
    memberNumber: "UT001001", // Updated to unique format
    email: "john@example.com",
    phone: "+254 700 123 456",
    joinDate: "2024-01-15",
    totalSavings: 125000,
    availableBalance: 98000,
    totalLoans: 50000,
    loanBalance: 35000,
    dividends: 8500,
    status: "Active",
  }

  // Update all transaction dates and sample data to current timeline (January 2025)

  // Update the transactions array with current dates
  const transactions = [
    {
      id: "1",
      date: "2025-01-20",
      type: "Deposit",
      amount: 5000,
      description: "Monthly savings deposit",
      status: "Completed",
    },
    {
      id: "2",
      date: "2025-01-18",
      type: "Loan Payment",
      amount: -2500,
      description: "Personal loan repayment",
      status: "Completed",
    },
    {
      id: "3",
      date: "2025-01-15",
      type: "Dividend",
      amount: 1200,
      description: "Quarterly dividend payment",
      status: "Completed",
    },
    {
      id: "4",
      date: "2025-01-10",
      type: "Withdrawal",
      amount: -3000,
      description: "Emergency withdrawal",
      status: "Completed",
    },
    {
      id: "5",
      date: "2025-01-08",
      type: "Deposit",
      amount: 2000,
      description: "Weekly savings contribution",
      status: "Completed",
    },
    {
      id: "6",
      date: "2025-01-05",
      type: "Transfer",
      amount: -1500,
      description: "Transfer to member UT045",
      status: "Completed",
    },
  ]

  // Update the loans array with current dates
  const loans = [
    {
      id: "1",
      type: "Personal Loan",
      amount: 50000,
      balance: 35000,
      monthlyPayment: 2500,
      nextPayment: "2025-02-01",
      status: "Active",
      interestRate: 12,
    },
  ]

  const handleDeposit = async () => {
    if (!depositAmount || !paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and select payment method.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Deposit Initiated",
      description: `KSh ${Number.parseInt(depositAmount).toLocaleString()} deposit via ${paymentMethod} is being processed.`,
    })

    // Simulate M-Pesa prompt
    if (paymentMethod === "mpesa") {
      setTimeout(() => {
        toast({
          title: "M-Pesa Prompt Sent",
          description: "Check your phone for M-Pesa payment prompt.",
        })
      }, 2000)
    }

    setDepositAmount("")
    setPaymentMethod("")
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount) {
      toast({
        title: "Missing Information",
        description: "Please enter withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseInt(withdrawAmount)
    if (amount > memberData.availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Withdrawal amount exceeds available balance.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Withdrawal Request Submitted",
      description: `KSh ${amount.toLocaleString()} withdrawal request is being processed.`,
    })

    setWithdrawAmount("")
  }

  const handleTransfer = async () => {
    if (!transferAmount || !transferRecipient) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and recipient details.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Transfer Initiated",
      description: `KSh ${Number.parseInt(transferAmount).toLocaleString()} transfer to ${transferRecipient} is being processed.`,
    })

    setTransferAmount("")
    setTransferRecipient("")
  }

  const handleLoanPayment = (loanId: string, amount: number) => {
    toast({
      title: "Loan Payment Processed",
      description: `Payment of KSh ${amount.toLocaleString()} has been applied to your loan.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">U</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Unity<span className="text-green-600">Trust</span>SACCO
                </span>
              </div>
              <Badge variant="secondary">Member Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <NotificationPanel memberNumber={memberData.memberNumber} />
              <SettingsPanel
                memberData={{
                  name: memberData.name,
                  email: memberData.email,
                  phone: memberData.phone,
                  memberNumber: memberData.memberNumber,
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Logged Out",
                    description: "You have been successfully logged out.",
                  })
                  setTimeout(() => {
                    window.location.href = "/"
                  }, 2000)
                }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {memberData.name}!</h1>
              <p className="text-gray-600">
                Member #{memberData.memberNumber} • {memberData.status}
              </p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={`/abstract-geometric-shapes.png?key=4tf4v&height=64&width=64&query=${memberData.name}`} />
              <AvatarFallback className="text-lg">
                {memberData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)} className="h-8 w-8 p-0">
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `KSh ${memberData.totalSavings.toLocaleString()}` : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground">+8.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `KSh ${memberData.availableBalance.toLocaleString()}` : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground">Available for withdrawal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loan Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `KSh ${memberData.loanBalance.toLocaleString()}` : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground">Next payment: Feb 1</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dividends Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `KSh ${memberData.dividends.toLocaleString()}` : "••••••"}
              </div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="statements">Statements</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.type === "Deposit" || transaction.type === "Dividend"
                                ? "default"
                                : transaction.type === "Withdrawal"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell
                          className={`text-right font-medium ${
                            transaction.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}KSh {Math.abs(transaction.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Deposit Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Deposit Money
                  </CardTitle>
                  <CardDescription>Add money to your savings account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Amount (KSh)</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      placeholder="1000"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpesa">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            M-Pesa
                          </div>
                        </SelectItem>
                        <SelectItem value="bank">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Bank Transfer
                          </div>
                        </SelectItem>
                        <SelectItem value="cash">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Cash Deposit
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleDeposit} className="w-full">
                    Deposit Money
                  </Button>
                </CardContent>
              </Card>

              {/* Withdraw Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Withdraw Money
                  </CardTitle>
                  <CardDescription>Withdraw from your available balance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Amount (KSh)</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      placeholder="5000"
                      max={memberData.availableBalance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    Available: KSh {memberData.availableBalance.toLocaleString()}
                  </div>
                  <Button onClick={handleWithdraw} className="w-full bg-transparent" variant="outline">
                    Request Withdrawal
                  </Button>
                </CardContent>
              </Card>

              {/* Transfer Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Transfer Money
                  </CardTitle>
                  <CardDescription>Send money to another member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transferRecipient">Recipient Member Number</Label>
                    <Input
                      id="transferRecipient"
                      placeholder="UT002"
                      value={transferRecipient}
                      onChange={(e) => setTransferRecipient(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transferAmount">Amount (KSh)</Label>
                    <Input
                      id="transferAmount"
                      type="number"
                      placeholder="2000"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleTransfer} className="w-full" variant="secondary">
                    Send Money
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Loans</CardTitle>
                  <CardDescription>Manage your current loans</CardDescription>
                </CardHeader>
                <CardContent>
                  {loans.map((loan) => (
                    <div key={loan.id} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{loan.type}</h4>
                          <p className="text-sm text-gray-600">Interest Rate: {loan.interestRate}%</p>
                        </div>
                        <Badge>{loan.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Original Amount</p>
                          <p className="font-semibold">KSh {loan.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Balance</p>
                          <p className="font-semibold">KSh {loan.balance.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Monthly Payment</p>
                          <p className="font-semibold">KSh {loan.monthlyPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Payment</p>
                          <p className="font-semibold">{new Date(loan.nextPayment).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleLoanPayment(loan.id, loan.monthlyPayment)}
                        className="w-full"
                        size="sm"
                      >
                        Make Payment
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Apply for New Loan</CardTitle>
                  <CardDescription>Quick loan application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <h4 className="font-semibold text-green-800">Loan Eligibility</h4>
                      <p className="text-sm text-green-600">
                        Based on your savings, you can borrow up to KSh {(memberData.totalSavings * 3).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Loan Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="business">Business Loan</SelectItem>
                          <SelectItem value="emergency">Emergency Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Requested Amount (KSh)</Label>
                      <Input type="number" placeholder="50000" />
                    </div>
                    <Button className="w-full">Apply for Loan</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statements Tab */}
          <TabsContent value="statements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Account Statements
                </CardTitle>
                <CardDescription>Download your account statements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Statement Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Month</SelectItem>
                        <SelectItem value="last">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Statement Generated",
                      description: "Your statement has been generated and will be downloaded shortly.",
                    })
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Statement
                </Button>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Recent Statements</h4>
                  <div className="space-y-2">
                    {[
                      { period: "January 2024", date: "2024-02-01", size: "245 KB" },
                      { period: "December 2023", date: "2024-01-01", size: "198 KB" },
                      { period: "November 2023", date: "2023-12-01", size: "167 KB" },
                    ].map((statement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Receipt className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{statement.period}</p>
                            <p className="text-sm text-gray-600">Generated on {statement.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{statement.size}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={memberData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={memberData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={memberData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" />
                  </div>
                  <Button className="w-full">Update Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive account updates via email</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-gray-600">Get transaction alerts via SMS</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Change Password</h4>
                    <div className="space-y-2">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                      <Button className="w-full" variant="secondary">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Member Information</CardTitle>
                <CardDescription>Your SACCO membership details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Member Number</p>
                    <p className="font-semibold">{memberData.memberNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-semibold">{new Date(memberData.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Status</p>
                    <Badge>{memberData.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Membership Type</p>
                    <p className="font-semibold">Premium</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
