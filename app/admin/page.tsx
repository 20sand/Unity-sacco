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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  DollarSign,
  CreditCard,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Mail,
  Settings,
  LogOut,
  Filter,
  Download,
  Plus,
  Edit,
} from "lucide-react"

export default function AdminDashboard() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data
  const dashboardStats = {
    totalMembers: 1247,
    totalSavings: 45600000,
    activeLoans: 89,
    pendingApplications: 12,
    monthlyGrowth: 8.5,
  }

  // Update member applications with current dates
  const memberApplications = [
    {
      id: "1",
      name: "Alice Wanjiku",
      email: "alice@example.com",
      phone: "+254 701 234 567",
      idNumber: "12345678",
      initialDeposit: 5000,
      status: "pending",
      applicationDate: "2025-01-20",
      documents: ["ID Copy", "Passport Photo"],
    },
    {
      id: "2",
      name: "Peter Kamau",
      email: "peter@example.com",
      phone: "+254 702 345 678",
      idNumber: "23456789",
      initialDeposit: 10000,
      status: "pending",
      applicationDate: "2025-01-19",
      documents: ["ID Copy", "Passport Photo", "Payslip"],
    },
  ]

  // Update loan applications with current dates
  const loanApplications = [
    {
      id: "1",
      memberName: "John Doe",
      memberNumber: "UT001001", // Updated format
      loanType: "Personal",
      requestedAmount: 50000,
      monthlyIncome: 35000,
      purpose: "Home improvement",
      status: "pending",
      applicationDate: "2025-01-18",
      creditScore: 750,
    },
    {
      id: "2",
      memberName: "Mary Njeri",
      memberNumber: "UT001004", // Updated format
      loanType: "Business",
      requestedAmount: 150000,
      monthlyIncome: 60000,
      purpose: "Business expansion",
      status: "under_review",
      applicationDate: "2025-01-17",
      creditScore: 820,
    },
  ]

  // Update members data with current join dates
  const members = [
    {
      id: "1",
      name: "John Doe",
      memberNumber: "UT001001", // Updated format
      email: "john@example.com",
      phone: "+254 700 123 456",
      totalSavings: 125000,
      activeLoans: 1,
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      memberNumber: "UT001002", // Updated format
      email: "jane@example.com",
      phone: "+254 701 234 567",
      totalSavings: 89000,
      activeLoans: 0,
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Peter Kamau",
      memberNumber: "UT001003", // Updated format
      email: "peter@example.com",
      phone: "+254 702 345 678",
      totalSavings: 156000,
      activeLoans: 1,
      status: "active",
      joinDate: "2024-03-10",
    },
    {
      id: "4",
      name: "Mary Njeri",
      memberNumber: "UT001004", // Updated format
      email: "mary@example.com",
      phone: "+254 703 456 789",
      totalSavings: 78000,
      activeLoans: 1,
      status: "active",
      joinDate: "2024-04-05",
    },
    {
      id: "5",
      name: "David Ochieng",
      memberNumber: "UT001005", // Updated format
      email: "david@example.com",
      phone: "+254 704 567 890",
      totalSavings: 45000,
      activeLoans: 0,
      status: "active",
      joinDate: "2024-05-12",
    },
  ]

  const handleApproveApplication = (applicationId: string, type: "member" | "loan") => {
    toast({
      title: "Application Approved",
      description: `${type === "member" ? "Membership" : "Loan"} application has been approved successfully.`,
    })
  }

  const handleRejectApplication = (applicationId: string, type: "member" | "loan") => {
    toast({
      title: "Application Rejected",
      description: `${type === "member" ? "Membership" : "Loan"} application has been rejected.`,
      variant: "destructive",
    })
  }

  const handleSendEmail = (email: string, subject: string) => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${email} with subject: ${subject}`,
    })
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || member.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
              <Badge variant="destructive">Admin Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Logged Out",
                    description: "Admin session ended successfully.",
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage Unity Trust SACCO operations</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh {(dashboardStats.totalSavings / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">+{dashboardStats.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeLoans}</div>
              <p className="text-xs text-muted-foreground">KSh 12.5M outstanding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">Savings growth rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Member Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Membership Applications</CardTitle>
                  <CardDescription>Review and approve new member applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {memberApplications.map((application) => (
                      <div key={application.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{application.name}</h4>
                            <p className="text-sm text-gray-600">{application.email}</p>
                            <p className="text-sm text-gray-600">{application.phone}</p>
                          </div>
                          <Badge variant="outline">{application.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">ID Number:</span>
                            <p className="font-medium">{application.idNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Initial Deposit:</span>
                            <p className="font-medium">KSh {application.initialDeposit.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveApplication(application.id, "member")}
                            className="flex-1"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectApplication(application.id, "member")}
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loan Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Applications</CardTitle>
                  <CardDescription>Review and process loan applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanApplications.map((application) => (
                      <div key={application.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{application.memberName}</h4>
                            <p className="text-sm text-gray-600">Member #{application.memberNumber}</p>
                            <p className="text-sm text-gray-600">{application.loanType} Loan</p>
                          </div>
                          <Badge variant={application.status === "pending" ? "outline" : "secondary"}>
                            {application.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <p className="font-medium">KSh {application.requestedAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Credit Score:</span>
                            <p className="font-medium">{application.creditScore}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Purpose:</span>
                          <p className="font-medium">{application.purpose}</p>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <FileText className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Loan Application Review</DialogTitle>
                                <DialogDescription>
                                  Detailed review of {application.memberName}'s loan application
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Member Name</Label>
                                    <p className="font-medium">{application.memberName}</p>
                                  </div>
                                  <div>
                                    <Label>Member Number</Label>
                                    <p className="font-medium">{application.memberNumber}</p>
                                  </div>
                                  <div>
                                    <Label>Loan Type</Label>
                                    <p className="font-medium">{application.loanType}</p>
                                  </div>
                                  <div>
                                    <Label>Requested Amount</Label>
                                    <p className="font-medium">KSh {application.requestedAmount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label>Monthly Income</Label>
                                    <p className="font-medium">KSh {application.monthlyIncome.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label>Credit Score</Label>
                                    <p className="font-medium">{application.creditScore}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Purpose</Label>
                                  <p className="font-medium">{application.purpose}</p>
                                </div>
                                <div>
                                  <Label>Admin Notes</Label>
                                  <Textarea placeholder="Add your review notes here..." />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleApproveApplication(application.id, "loan")}
                                    className="flex-1"
                                  >
                                    Approve Loan
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleRejectApplication(application.id, "loan")}
                                    className="flex-1"
                                  >
                                    Reject Loan
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Member Management</CardTitle>
                    <CardDescription>Manage SACCO members and their accounts</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Members</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Member No.</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Total Savings</TableHead>
                      <TableHead>Active Loans</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${member.name}`} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{member.memberNumber}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>KSh {member.totalSavings.toLocaleString()}</TableCell>
                        <TableCell>{member.activeLoans}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendEmail(member.email, "Account Update")}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Management</CardTitle>
                <CardDescription>Monitor and manage all loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Active Loans</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-sm text-muted-foreground">KSh 12.5M outstanding</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Overdue Loans</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600">7</div>
                        <p className="text-sm text-muted-foreground">Requires attention</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Collection Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">94.2%</div>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Generate comprehensive financial reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Statement</SelectItem>
                        <SelectItem value="quarterly">Quarterly Report</SelectItem>
                        <SelectItem value="annual">Annual Report</SelectItem>
                        <SelectItem value="loan_portfolio">Loan Portfolio</SelectItem>
                        <SelectItem value="member_summary">Member Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Month</SelectItem>
                        <SelectItem value="last">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Assets:</span>
                    <span className="font-bold">KSh 58.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Member Equity:</span>
                    <span className="font-bold">KSh 45.6M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Portfolio:</span>
                    <span className="font-bold">KSh 12.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-bold text-green-600">KSh 2.3M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operating Expenses:</span>
                    <span className="font-bold">KSh 1.8M</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Net Profit:</span>
                    <span className="font-bold text-green-600">KSh 500K</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure SACCO system parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Minimum Savings Deposit</Label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Loan Multiplier</Label>
                    <Input type="number" defaultValue="3" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Interest Rate (%)</Label>
                    <Input type="number" defaultValue="12" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Dividend Rate (%)</Label>
                    <Input type="number" defaultValue="8.5" step="0.1" />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Send email alerts for applications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-gray-600">Send SMS for loan payments</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Alerts</p>
                      <p className="text-sm text-gray-600">Internal system notifications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <Button className="w-full">Update Notifications</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
