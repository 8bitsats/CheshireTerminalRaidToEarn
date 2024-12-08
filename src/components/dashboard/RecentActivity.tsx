import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  time: string;
  icon: React.ElementType;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Activity className="h-5 w-5" /> Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-gray-400 text-center">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b border-gray-700 pb-2">
                <div className="flex items-center gap-2">
                  <activity.icon className="h-4 w-4 text-purple-400" />
                  <span className="text-white">{activity.description}</span>
                </div>
                <span className="text-gray-400">{activity.time}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;