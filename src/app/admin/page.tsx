import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-['Fira_Code']">Dashboard</h1>
        <p className="text-muted-foreground mt-1.5 text-sm">Overview of your blog content and statistics</p>
      </div>
      
      {/* Stats Grid - Neumorphism Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="neumorphic transition-all duration-200 cursor-pointer hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground font-['Fira_Code']">0</div>
            <CardDescription className="mt-1 text-xs">Published articles</CardDescription>
          </CardContent>
        </Card>
        
        <Card className="neumorphic transition-all duration-200 cursor-pointer hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground font-['Fira_Code']">0</div>
            <CardDescription className="mt-1 text-xs">In progress</CardDescription>
          </CardContent>
        </Card>
        
        <Card className="neumorphic transition-all duration-200 cursor-pointer hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground font-['Fira_Code']">0</div>
            <CardDescription className="mt-1 text-xs">All time</CardDescription>
          </CardContent>
        </Card>
        
        <Card className="neumorphic transition-all duration-200 cursor-pointer hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground font-['Fira_Code']">0</div>
            <CardDescription className="mt-1 text-xs">Page views</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
