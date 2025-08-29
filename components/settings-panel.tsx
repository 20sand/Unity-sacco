"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Settings, User, Bell, Shield, Smartphone, Mail, Lock, Eye, EyeOff, Save } from "lucide-react"

interface SettingsPanelProps {
  memberData?: {
    name: string
    email: string
    phone: string
    memberNumber: string
  }
}

export function SettingsPanel({
  memberData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+254 700 123 456",
    memberNumber: "UT001001",
  },
}: SettingsPanelProps) {
  const [personalInfo, setPersonalInfo] = useState(memberData)
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    marketingEmails: false,
    loanReminders: true,
    dividendAlerts: true,
  })
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoSave = () => {
    toast({
      title: "Personal Information Updated",
      description: "Your personal information has been successfully updated.",
    })
  }

  const handleNotificationsSave = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleSecuritySave = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been updated successfully.",
    })
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation password do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const enableTwoFactor = () => {
    setSecurity((prev) => ({ ...prev, twoFactorEnabled: true }))
    toast({
      title: "Two-Factor Authentication Enabled",
      description: "SMS verification has been set up for your account.",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </DialogTitle>
          <DialogDescription>Manage your account preferences and security settings</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberNumber">Member Number</Label>
                  <Input id="memberNumber" value={personalInfo.memberNumber} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handlePersonalInfoSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Personal Information
              </Button>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">Email Alerts</p>
                      <p className="text-sm text-gray-600">Receive account updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-gray-600">Get transaction alerts via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, smsAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">Browser and mobile app notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Loan Payment Reminders</p>
                    <p className="text-sm text-gray-600">Reminders for upcoming loan payments</p>
                  </div>
                  <Switch
                    checked={notifications.loanReminders}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, loanReminders: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dividend Alerts</p>
                    <p className="text-sm text-gray-600">Notifications for dividend payments</p>
                  </div>
                  <Switch
                    checked={notifications.dividendAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dividendAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-600">Promotional offers and news</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>
              </div>
              <Button onClick={handleNotificationsSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add extra security with SMS verification</p>
                  </div>
                  {security.twoFactorEnabled ? (
                    <Button variant="outline" size="sm" disabled>
                      Enabled
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={enableTwoFactor}>
                      Enable
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, loginAlerts: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity((prev) => ({ ...prev, sessionTimeout: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSecuritySave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>

                <div className="text-sm text-gray-600">
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>At least 8 characters long</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Include at least one number</li>
                    <li>Include at least one special character</li>
                  </ul>
                </div>
              </div>
              <Button onClick={handlePasswordChange} className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
