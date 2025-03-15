
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import MobilePreview from '@/components/MobilePreview';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import FloatingElementEditor from './FloatingElementEditor';
import { useStory } from '@/components/Layout';
import { useElementManagement } from '@/hooks/useElementManagement';

interface PreviewPanelProps {
  selectedSceneId: string | null;
  setSelectedSceneId: (id: string) => void;
}

const PreviewPanel = ({ selectedSceneId, setSelectedSceneId }: PreviewPanelProps) => {
  const [currentElementId, setCurrentElementId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { story } = useStory();

  const { validateTimeLimit, validateKeySequence } = useElementManagement(
    selectedSceneId || "", 
    story, 
    null
  );

  const handleElementSelect = (elementId: string) => {
    setCurrentElementId(elementId);
    setIsEditorOpen(true);
  };

  return (
    <>
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
              onElementSelect={handleElementSelect}
            />
          ) : (
            <div className="h-full flex items-center justify-center p-4 text-center">
              <p className="text-sm text-muted-foreground">Select a scene to preview.</p>
            </div>
          )}
        </div>
      </Card>

      {selectedSceneId && (
        <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <SheetContent side="right" className="w-[450px] sm:w-[450px] p-0 overflow-y-auto">
            {currentElementId && (
              <div className="h-full p-0">
                <div className="px-3 py-2 border-b bg-muted/20 flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <h3 className="text-sm font-medium">编辑元素</h3>
                </div>
                <div className="p-4">
                  <FloatingElementEditor
                    sceneId={selectedSceneId}
                    currentElementId={currentElementId}
                    position={{ x: 0, y: 0 }}
                    onClose={() => setIsEditorOpen(false)}
                    isOpen={true}
                    validateTimeLimit={validateTimeLimit}
                    validateKeySequence={validateKeySequence}
                  />
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default PreviewPanel;
