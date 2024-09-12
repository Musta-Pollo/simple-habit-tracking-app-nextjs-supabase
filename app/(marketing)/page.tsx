import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PointTile } from "./_components/point-tile";

const mainPoints = [
  "Break down your projects into actionable steps",
  "Create teams and share your tasks with your collegues",
  "Generase free trial for almost everything you need",
];
export default function MarketingPage() {
  return (
    <div className="bg-cover mb-40 h-full px-10  min-h-screen pt-20 bg-no-repeat flex items-center justify-center flex-col bg-center bg-[url('/marketing-background.svg')]">
      <p className="bg-slate-100 px-4 py-1 rounded-md ">
        The number one planning app by New Your Times! 🚀
      </p>
      <div className="h-4" />
      {/* <Card>
        <CardContent>
          The number one planning app by New Your Times!
        </CardContent>
      </Card> */}
      <div className="font-extrabold text-8xl">Get Things Done</div>
      <div className="h-8" />
      <div className="font-normal text-2xl">
        Break your goals into actionable steps and get started!
      </div>
      <div className="h-12" />
      <div>
        {mainPoints.map((name) => (
          <PointTile key={name} name={name} />
        ))}
      </div>
      <div className="h-12" />
      <Button asChild size="lg" className="text-xl font-bold py-6 px-12">
        <Link href="/sign-up">Start Free</Link>
      </Button>
    </div>
  );
}
