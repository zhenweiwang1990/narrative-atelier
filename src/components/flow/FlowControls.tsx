
import { MinusIcon, PlusIcon } from "lucide-react";
import { useReactFlow, Panel } from "reactflow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FlowControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="bottom-right" className="flex gap-1">
      <Button
        size="icon"
        variant="outline"
        className="size-8 bg-background border-border shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
        onClick={() => zoomOut()}
      >
        <MinusIcon className="size-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="size-8 bg-background border-border shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
        onClick={() => zoomIn()}
      >
        <PlusIcon className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "h-8 bg-background border-border shadow-sm dark:bg-zinc-900 dark:border-zinc-800",
          "hover:bg-background/80 dark:hover:bg-zinc-900/80"
        )}
        onClick={() => fitView({ padding: 0.1 })}
      >
        自适应
      </Button>
    </Panel>
  );
};
