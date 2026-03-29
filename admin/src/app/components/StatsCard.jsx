import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function StatsCard({ title, value, icon: Icon, trend, trendLabel, valueColor = "text-gray-900" }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {Icon && <Icon className="size-4 text-gray-400" />}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        {trend && (
          <p className={`text-xs mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel || 'from last period'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
