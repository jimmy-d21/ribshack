import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  FileText, 
  Download, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Building2,
  Receipt
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { monthlyData, branchFinancials, vatReports } from '../data/finance';

export default function FinanceReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('June 2026');

  const handleExport = (reportType) => {
    toast.success(`Exporting ${reportType}...`);
    // In real app, this would trigger a CSV/PDF download
  };

  const currentMonth = monthlyData[monthlyData.length - 1];
  const totalYTD = monthlyData.reduce((sum, m) => sum + m.grossSales, 0);
  const totalVATYTD = monthlyData.reduce((sum, m) => sum + m.vat, 0);
  const totalProfitYTD = monthlyData.reduce((sum, m) => sum + m.profit, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance & VAT Reports</h1>
          <p className="text-gray-500 mt-1">Sales reports, tax compliance, and financial analytics</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => handleExport('Monthly Sales Report')}
          >
            <Download className="size-4 mr-2" />
            Export Sales
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleExport('VAT Report')}
          >
            <Download className="size-4 mr-2" />
            Export VAT
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              June 2026 Gross Sales
            </CardTitle>
            <DollarSign className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{currentMonth.grossSales.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              +11.8% from May
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              YTD Gross Sales
            </CardTitle>
            <Building2 className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalYTD.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              January - June 2026
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              YTD VAT Collected
            </CardTitle>
            <Receipt className="size-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalVATYTD.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              12% VAT on sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              YTD Net Profit
            </CardTitle>
            <TrendingUp className="size-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₱{totalProfitYTD.toLocaleString()}</div>
            <p className="text-xs text-purple-600 mt-1">
              28.5% profit margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trend (6 Months)</CardTitle>
            <CardDescription>Gross sales vs net profit comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `₱${value.toLocaleString()}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="grossSales" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  name="Gross Sales"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Net Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Breakdown</CardTitle>
            <CardDescription>Sales, expenses, and profit analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData.slice(-3)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `₱${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="grossSales" fill="#3b82f6" name="Gross Sales" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Summary</CardTitle>
          <CardDescription>Detailed breakdown of revenue, VAT, expenses, and profit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Gross Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">VAT (12%)</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Net Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Expenses</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Net Profit</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Margin</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{data.month}</td>
                    <td className="py-3 px-4 text-right">₱{data.grossSales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-orange-600">₱{data.vat.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">₱{data.netSales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-red-600">₱{data.expenses.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">₱{data.profit.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {((data.profit / data.grossSales) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-3 px-4">TOTAL YTD</td>
                  <td className="py-3 px-4 text-right">₱{totalYTD.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-orange-600">₱{totalVATYTD.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    ₱{monthlyData.reduce((sum, m) => sum + m.netSales, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-red-600">
                    ₱{monthlyData.reduce((sum, m) => sum + m.expenses, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-green-600">₱{totalProfitYTD.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    {((totalProfitYTD / totalYTD) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Branch Financials */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Financial Performance (June 2026)</CardTitle>
          <CardDescription>Individual branch revenue and profitability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Gross Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">VAT</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Net Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Expenses</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Profit</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Margin</th>
                </tr>
              </thead>
              <tbody>
                {branchFinancials.map((branch, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{branch.branch}</td>
                    <td className="py-3 px-4 text-right">₱{branch.grossSales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-orange-600">₱{branch.vat.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">₱{branch.netSales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-red-600">₱{branch.expenses.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">₱{branch.profit.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-medium">{branch.margin.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* VAT Compliance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>VAT Compliance Report</CardTitle>
              <CardDescription>12% VAT collection and filing status</CardDescription>
            </div>
            <Button 
              onClick={() => handleExport('BIR VAT Return Form')}
              className="bg-gradient-to-r from-orange-500 to-red-600"
            >
              <FileText className="size-4 mr-2" />
              Generate BIR Form
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Gross Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">VAT Collected</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">VAT Payable</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Filed Date</th>
                </tr>
              </thead>
              <tbody>
                {vatReports.map((report, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{report.period}</td>
                    <td className="py-3 px-4 text-right">₱{report.grossSales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-orange-600">₱{report.vatCollected.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-red-600">₱{report.vatPayable.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        className={report.status === 'Filed' ? 'bg-green-500' : 'bg-yellow-500'}
                      >
                        {report.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">{report.filedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="size-5" />
            Export Options
          </CardTitle>
          <CardDescription>Download reports for accounting and tax compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-start gap-2"
              onClick={() => handleExport('Sales Summary (CSV)')}
            >
              <FileText className="size-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Sales Summary</div>
                <div className="text-xs text-gray-500">CSV format for Excel</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-start gap-2"
              onClick={() => handleExport('VAT Report (PDF)')}
            >
              <Receipt className="size-5 text-orange-600" />
              <div className="text-left">
                <div className="font-medium">VAT Report</div>
                <div className="text-xs text-gray-500">PDF for BIR filing</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-start gap-2"
              onClick={() => handleExport('Financial Statement (PDF)')}
            >
              <Building2 className="size-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Financial Statement</div>
                <div className="text-xs text-gray-500">Complete P&L report</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}