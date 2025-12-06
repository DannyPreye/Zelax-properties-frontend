export default function HostDashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your host dashboard. Manage your properties, bookings, and more.
        </p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
          <span className="text-muted-foreground">Properties Overview</span>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
          <span className="text-muted-foreground">Bookings Overview</span>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
          <span className="text-muted-foreground">Revenue Overview</span>
        </div>
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">
          Your recent activity will appear here.
        </p>
      </div>
    </div>
  );
}





