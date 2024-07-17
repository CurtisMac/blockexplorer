import { ReactNode } from "react";

interface DetailsListProps {
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
  children?: ReactNode;
}

export function DetailsList({ icon: Icon, children }: DetailsListProps) {
  return (
    <div className="flex flex-row border-t-2 items-center border-lime-600 h-16 p-2">
      {Icon && <Icon className="h-7 w-7 text-lime-600 mr-2" />}
      {children ? <>{children}</> : <div>Loading...</div>}
    </div>
  );
}
