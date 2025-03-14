
import React from 'react';
import { Controls, ControlButton } from 'reactflow';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface FlowControlsProps {
  showInteractive?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const FlowControls: React.FC<FlowControlsProps> = ({ 
  showInteractive = false, 
  position = 'bottom-right' 
}) => {
  return (
    <Controls 
      position={position} 
      showInteractive={showInteractive}
    >
      <ControlButton onClick={() => {}} title="Zoom In">
        <ZoomIn size={14} />
      </ControlButton>
      <ControlButton onClick={() => {}} title="Zoom Out">
        <ZoomOut size={14} />
      </ControlButton>
      <ControlButton onClick={() => {}} title="Fit View">
        <Maximize size={14} />
      </ControlButton>
    </Controls>
  );
};

export default FlowControls;
