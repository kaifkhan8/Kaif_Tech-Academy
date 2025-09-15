'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

interface PaymentModalProps {
  course: {
    id: string
    title: string
    price: number
    originalPrice?: number
  }
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function PaymentModal({ course, isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handlePayment = async () => {
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      onSuccess()
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
          <p className="text-gray-600">{course.title}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Course Price:</span>
            <div className="flex items-center space-x-2">
              {course.originalPrice && (
                <span className="text-gray-500 line-through">₹{course.originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-blue-600">₹{course.price}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-blue-600"
              />
              <CreditCardIcon className="h-5 w-5 text-gray-400" />
              <span>Credit/Debit Card</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-blue-600"
              />
              <span>UPI Payment</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
          <ShieldCheckIcon className="h-4 w-4 mr-1" />
          Secure payment powered by Razorpay
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Processing...' : `Pay ₹${course.price}`}
          </button>
        </div>
      </motion.div>
    </div>
  )
}