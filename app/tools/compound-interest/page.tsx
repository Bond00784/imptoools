"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(10000)
  const [rate, setRate] = useState<number>(8)
  const [time, setTime] = useState<number>(5)
  const [compoundFrequency, setCompoundFrequency] = useState<number>(1)
  const [result, setResult] = useState<number | null>(null)

  const calculateCompoundInterest = () => {
    // A = P(1 + r/n)^(nt)
    const p = principal
    const r = rate / 100
    const n = compoundFrequency
    const t = time

    const amount = p * Math.pow(1 + r / n, n * t)
    setResult(amount)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Compound Interest Calculator</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        Calculate how your investments will grow over time with our free compound interest calculator. See the power of
        compound interest and plan your financial future.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Compound Interest</CardTitle>
              <CardDescription>Enter your investment details to calculate the future value</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="principal">Initial Investment ($)</Label>
                      <Input
                        id="principal"
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                      <Input
                        id="rate"
                        type="number"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time Period (years)</Label>
                      <Input id="time" type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compound">Compound Frequency</Label>
                      <select
                        id="compound"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={compoundFrequency}
                        onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                      >
                        <option value="1">Annually (1/year)</option>
                        <option value="2">Semi-Annually (2/year)</option>
                        <option value="4">Quarterly (4/year)</option>
                        <option value="12">Monthly (12/year)</option>
                        <option value="365">Daily (365/year)</option>
                      </select>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
                    onClick={calculateCompoundInterest}
                  >
                    Calculate
                  </Button>
                </TabsContent>
                <TabsContent value="advanced" className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500">
                      Advanced options include additional contributions, inflation adjustment, and tax considerations.
                      These features will be available soon.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-md">
                      <p className="text-emerald-800 text-sm">
                        Coming soon: Regular contributions, inflation adjustment, and tax calculations.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your investment growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-emerald-50 p-6 rounded-lg text-center">
                <Calculator className="h-10 w-10 mx-auto mb-4 text-emerald-700" />
                {result ? (
                  <>
                    <h3 className="text-lg font-medium text-slate-700 mb-2">Future Value</h3>
                    <p className="text-3xl font-bold text-emerald-700 mb-4">${result.toFixed(2)}</p>
                    <div className="text-sm text-slate-600">
                      <p>Initial Investment: ${principal.toFixed(2)}</p>
                      <p>Interest Earned: ${(result - principal).toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-600">Enter your investment details and click Calculate to see results</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">About Compound Interest</h2>
        <p className="text-slate-700 mb-4">
          Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words,
          interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in
          the next period is earned on the principal sum plus previously accumulated interest.
        </p>
        <h3 className="text-lg font-medium text-emerald-800 mb-2">The Formula</h3>
        <p className="text-slate-700 mb-2">The compound interest formula is:</p>
        <div className="bg-white p-4 rounded-md text-center mb-4">
          <p className="font-mono">A = P(1 + r/n)^(nt)</p>
        </div>
        <p className="text-slate-700">
          Where:
          <br />A = Final amount
          <br />P = Principal (initial investment)
          <br />r = Annual interest rate (decimal)
          <br />n = Number of times interest is compounded per year
          <br />t = Time (in years)
        </p>
      </div>
    </div>
  )
}

