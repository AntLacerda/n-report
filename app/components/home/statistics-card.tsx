
interface StatisticsCardProps {
    title: string;
    Icon: any;
    stats: number | null;
}
  
  export default function StatisticsCard({ title, Icon, stats }: StatisticsCardProps) {
    return (
      <div className="flex flex-col items-center gap-2 p-4 bg-[#464646] rounded-md w-44 border-t-[#3BC9DB] border-t-4">
        <div className="flex flex-row items-center gap-2">
            <div className="p-2 bg-[#3BC9DB] rounded-full">
              <Icon className="w-6 text-white"/>
            </div>
            <p className="text-white">{title}</p>
        </div>
        <p className="text-white font-bold text-3xl">{stats}</p>
      </div>
    );
  }
  