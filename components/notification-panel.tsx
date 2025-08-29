"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Bell,
  CheckCircle,
  DollarSign,
  CreditCard,
  AlertCircle,
  Info,
  X,
  KanbanSquareDashed as MarkAsUnread,
} from "lucide-react"

interface NotificationPanelProps {
  memberNumber?: string
}

export function NotificationPanel({ memberNumber = "UT001001" }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "dividend",
      title: "Dividend Payment Received",
      message: "Your quarterly dividend of KSh 2,160 has been credited to your account.",
      timestamp: "2025-01-20 10:30:00",
      read: false,
      priority: "high",
    },
    {
      id: "2",
      type: "loan",
      title: "Loan Payment Reminder",
      message: "Your loan payment of KSh 2,500 is due on February 1st, 2025.",
      timestamp: "2025-01-19 14:15:00",
      read: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance on January 25th from 2:00 AM to 4:00 AM.",
      timestamp: "2025-01-18 09:00:00",
      read: false,
      priority: "low",
    },
    {
      id: "4",
      type: "account",
      title: "Account Statement Ready",
      message: "Your December 2024 account statement is now available for download.",
      timestamp: "2025-01-15 12:00:00",
      read: true,
      priority: "low",
    },
    {
      id: "5",
      type: "promotion",
      title: "New Savings Plan Available",
      message: "Check out our new Gold Plus savings plan with 9% annual returns!",
      timestamp: "2025-01-10 08:30:00",
      read: true,
      priority: "medium",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "dividend":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "loan":
        return <CreditCard className="h-5 w-5 text-blue-500" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "account":
        return <Info className="h-5 w-5 text-purple-500" />
      case "promotion":
        return <CheckCircle className="h-5 w-5 text-indigo-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
    toast({
      title: "Notification Marked as Read",
      description: "The notification has been marked as read.",
    })
  }

  const markAsUnread = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: false } : notification,
      ),
    )
    toast({
      title: "Notification Marked as Unread",
      description: "The notification has been marked as unread.",
    })
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed.",
    })
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read.",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark All Read
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All notifications are read"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  <Card className={`${!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
                                {notification.title}
                              </h4>
                              <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)
                            }
                            className="h-6 w-6 p-0"
                          >
                            {notification.read ? (
                              <MarkAsUnread className="h-3 w-3" />
                            ) : (
                              <CheckCircle className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < notifications.length - 1 && <Separator className="my-2" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Member: {memberNumber}</span>
            <span>{notifications.length} total notifications</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
