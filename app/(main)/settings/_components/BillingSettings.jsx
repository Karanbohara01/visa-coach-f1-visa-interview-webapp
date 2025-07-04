import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle, ExternalLink } from "lucide-react"

// This is a display-only component. In a real app, this would integrate
// with a payment provider like Stripe.

export default function BillingSettings() {
    const subscription = {
        plan: 'Premium Plan',
        status: 'Active',
        renewalDate: 'August 1, 2025'
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><CreditCard /> Billing</h2>

            <div className="p-4 border rounded-md dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{subscription.plan}</p>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle size={14} /> {subscription.status}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        Renews on {subscription.renewalDate}
                    </p>
                </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                <Button>
                    Manage Subscription <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}