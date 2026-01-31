import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const CARD_CLASS =
  "neumorphic transition-[transform,opacity] duration-200 cursor-pointer hover:scale-[1.02]";
const TITLE_CLASS = "text-sm font-medium text-muted-foreground";
const VALUE_CLASS = "text-3xl font-bold text-foreground font-['Fira_Code']";
const DESC_CLASS = "mt-1 text-xs";

type StatItem = { title: string; value: string | number; description: string }

function StatsCard({ title, value, description }: StatItem) {
  return (
    <Card className={CARD_CLASS}>
      <CardHeader className="pb-3">
        <CardTitle className={TITLE_CLASS}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={VALUE_CLASS}>{value}</div>
        <CardDescription className={DESC_CLASS}>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

const STATS: StatItem[] = [
  { title: "Total Posts", value: "0", description: "Published articles" },
  { title: "Drafts", value: "0", description: "In progress" },
  { title: "Total Views", value: "0", description: "All time" },
  { title: "This Month", value: "0", description: "Page views" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-['Fira_Code']">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm">
          Overview of your blog content and statistics
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ title, value, description }) => (
          <StatsCard
            key={title}
            title={title}
            value={value}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
