
import React from 'react';

const EmptyElementsState: React.FC = () => {
  return (
    <div className="text-center py-6 bg-muted/30 rounded-lg border border-dashed">
      <p className="text-sm text-muted-foreground">No elements yet. Add your first scene element.</p>
    </div>
  );
};

export default EmptyElementsState;
