import type { CoachListing } from '@/lib/coaches';
import CoachCard from '@/components/coaches/CoachCard';

type CoachGridProps = {
  coaches: CoachListing[];
  emptyMessage?: string;
};

export default function CoachGrid({
  coaches,
  emptyMessage = 'Coach profiles will appear here once published in the admin.',
}: CoachGridProps) {
  if (coaches.length === 0) {
    return (
      <p className="text-muted text-body text-center py-8">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {coaches.map((coach) => (
        <CoachCard key={coach.id} coach={coach} />
      ))}
    </div>
  );
}
