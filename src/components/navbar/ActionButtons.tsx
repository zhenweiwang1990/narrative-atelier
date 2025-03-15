
import { Download, Upload, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Story } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";

interface ActionButtonsProps {
  story: Story | null;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onExport: () => void;
  isMobile?: boolean;
}

export const ActionButtons = ({ 
  story, 
  onImport, 
  onSave, 
  onExport, 
  isMobile = false 
}: ActionButtonsProps) => {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between pt-3">
        <label htmlFor="mobile-import-file" className="flex-1 mr-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center"
            asChild
          >
            <div>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </div>
          </Button>
          <input
            id="mobile-import-file"
            type="file"
            accept=".json"
            onChange={onImport}
            className="hidden"
          />
        </label>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 mr-2 flex items-center justify-center"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1 flex items-center justify-center"
          onClick={onSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2">
      <label htmlFor="import-file">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          asChild
        >
          <div>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </div>
        </Button>
        <input
          id="import-file"
          type="file"
          accept=".json"
          onChange={onImport}
          className="hidden"
        />
      </label>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={onExport}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button
        variant="default"
        size="sm"
        className="flex items-center"
        onClick={onSave}
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
    </div>
  );
};
