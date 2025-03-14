
import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import MobilePreview from '@/components/MobilePreview';

interface PreviewPanelProps {
  selectedSceneId: string | null;
  setSelectedSceneId: (id: string) => void;
}

const PreviewPanel = ({ selectedSceneId, setSelectedSceneId }: PreviewPanelProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="px-3 py-2 border-b bg-muted/20 flex items-center">
        <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
        <h3 className="text-sm font-medium">Mobile Preview</h3>
      </div>
      
      <div className="h-[calc(100%-35px)]">
        {selectedSceneId ? (
          <MobilePreview 
            sceneId={selectedSceneId} 
            onSceneChange={setSelectedSceneId} 
          />
        ) : (
          <div className="h-full flex items-center justify-center p-4 text-center">
            <p className="text-sm text-muted-foreground">Select a scene to preview.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PreviewPanel;
