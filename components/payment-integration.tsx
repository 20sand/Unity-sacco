"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Smartphone, Building2, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface PaymentIntegrationProps {
  onPaymentComplete?: (paymentData: any) => void
}

export function PaymentIntegration({ onPaymentComplete }: PaymentIntegrationProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amount, setAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")

  const handleMpesaPayment = async () => {
    if (!amount || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and phone number.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    // Simulate M-Pesa STK Push
    toast({
      title: "M-Pesa Payment Initiated",
      description: "Please check your phone for the payment prompt.",
    })

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate

      if (success) {
        setPaymentStatus("success")
        toast({
          title: "Payment Successful!",
          description: `KSh ${Number.parseInt(amount).toLocaleString()} has been deposited to your account.`,
        })

        onPaymentComplete?.({
          method: "mpesa",
          amount: Number.parseInt(amount),
          phoneNumber,
          transactionId: `MP${Date.now()}`,
          status: "success",
        })
      } else {
        setPaymentStatus("failed")
        toast({
          title: "Payment Failed",
          description: "Transaction was cancelled or failed. Please try again.",
          variant: "destructive",
        })
      }

      setIsProcessing(false)

      // Reset after 3 seconds
      setTimeout(() => {
        setPaymentStatus("idle")
        setAmount("")
        setPhoneNumber("")
      }, 3000)
    }, 5000)
  }

  const handleBankTransfer = async () => {
    if (!amount || !bankAccount) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and bank account details.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    toast({
      title: "Bank Transfer Initiated",
      description: "Processing your bank transfer request.",
    })

    // Simulate bank transfer processing
    setTimeout(() => {
      setPaymentStatus("success")
      toast({
        title: "Transfer Successful!",
        description: `KSh ${Number.parseInt(amount).toLocaleString()} transfer has been processed.`,
      })

      onPaymentComplete?.({
        method: "bank",
        amount: Number.parseInt(amount),
        bankAccount,
        transactionId: `BT${Date.now()}`,
        status: "success",
      })

      setIsProcessing(false)

      setTimeout(() => {
        setPaymentStatus("idle")
        setAmount("")
        setBankAccount("")
      }, 3000)
    }, 3000)
  }

  const handleCardPayment = async () => {
    if (!amount || !cardNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and card details.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    toast({
      title: "Card Payment Processing",
      description: "Processing your card payment.",
    })

    // Simulate card payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate

      if (success) {
        setPaymentStatus("success")
        toast({
          title: "Payment Successful!",
          description: `KSh ${Number.parseInt(amount).toLocaleString()} has been charged to your card.`,
        })

        onPaymentComplete?.({
          method: "card",
          amount: Number.parseInt(amount),
          cardNumber: `****${cardNumber.slice(-4)}`,
          transactionId: `CD${Date.now()}`,
          status: "success",
        })
      } else {
        setPaymentStatus("failed")
        toast({
          title: "Payment Failed",
          description: "Card payment was declined. Please check your card details.",
          variant: "destructive",
        })
      }

      setIsProcessing(false)

      setTimeout(() => {
        setPaymentStatus("idle")
        setAmount("")
        setCardNumber("")
      }, 3000)
    }, 4000)
  }

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "processing":
        return <Clock className="h-8 w-8 text-blue-500 animate-spin" />
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "failed":
        return <AlertCircle className="h-8 w-8 text-red-500" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "processing":
        return "Processing your payment..."
      case "success":
        return "Payment completed successfully!"
      case "failed":
        return "Payment failed. Please try again."
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Status */}
      {paymentStatus !== "idle" && (
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              {getStatusIcon()}
              <div className="text-center">
                <h3 className="text-lg font-semibold">{getStatusMessage()}</h3>
                {paymentStatus === "processing" && (
                  <p className="text-sm text-gray-600">Please wait while we process your payment</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* M-Pesa Payment */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">M-Pesa</CardTitle>
            <CardDescription>Pay using your M-Pesa mobile money</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mpesa-amount">Amount (KSh)</Label>
              <Input
                id="mpesa-amount"
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mpesa-phone">Phone Number</Label>
              <Input
                id="mpesa-phone"
                placeholder="254700000000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <Button
              onClick={handleMpesaPayment}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isProcessing || paymentStatus === "processing"}
            >
              {isProcessing && paymentMethod === "mpesa" ? "Processing..." : "Pay with M-Pesa"}
            </Button>
            <div className="text-xs text-gray-600 text-center">You will receive an STK push on your phone</div>
          </CardContent>
        </Card>

        {/* Bank Transfer */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl">Bank Transfer</CardTitle>
            <CardDescription>Transfer from your bank account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank-amount">Amount (KSh)</Label>
              <Input
                id="bank-amount"
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank-account">Bank Account</Label>
              <Select value={bankAccount} onValueChange={setBankAccount} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity Bank</SelectItem>
                  <SelectItem value="kcb">KCB Bank</SelectItem>
                  <SelectItem value="coop">Co-operative Bank</SelectItem>
                  <SelectItem value="absa">Absa Bank</SelectItem>
                  <SelectItem value="standard">Standard Chartered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleBankTransfer}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isProcessing || paymentStatus === "processing"}
            >
              {isProcessing && paymentMethod === "bank" ? "Processing..." : "Transfer from Bank"}
            </Button>
            <div className="text-xs text-gray-600 text-center">Secure bank-to-bank transfer</div>
          </CardContent>
        </Card>

        {/* Card Payment */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl">Debit/Credit Card</CardTitle>
            <CardDescription>Pay using your debit or credit card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-amount">Amount (KSh)</Label>
              <Input
                id="card-amount"
                type="number"
                placeholder="2000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" disabled={isProcessing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" disabled={isProcessing} />
              </div>
            </div>
            <Button
              onClick={handleCardPayment}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isProcessing || paymentStatus === "processing"}
            >
              {isProcessing && paymentMethod === "card" ? "Processing..." : "Pay with Card"}
            </Button>
            <div className="text-xs text-gray-600 text-center">Secured by 256-bit SSL encryption</div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Important details about payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Accepted Payment Methods</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• M-Pesa mobile money</li>
                <li>• Bank transfers from major banks</li>
                <li>• Visa and Mastercard</li>
                <li>• Cash deposits at our offices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Processing Times</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• M-Pesa: Instant</li>
                <li>• Bank Transfer: 1-2 business days</li>
                <li>• Card Payment: Instant</li>
                <li>• Cash Deposit: Same day</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
