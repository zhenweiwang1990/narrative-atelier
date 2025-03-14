
import { ChoiceElement, ChoiceOption } from '@/utils/types';
import { generateId } from '@/utils/storage';

// Create a new choice option
export const createChoiceOption = (element: ChoiceElement): ChoiceOption => {
  return {
    id: generateId('option'),
    text: `Option ${element.options.length + 1}`,
    nextSceneId: ''
  };
};

// Add a new option to a choice element
export const addOptionToChoice = (element: ChoiceElement): ChoiceElement => {
  const newOption = createChoiceOption(element);
  
  return {
    ...element,
    options: [...element.options, newOption]
  };
};

// Delete an option from a choice element
export const deleteOptionFromChoice = (element: ChoiceElement, optionId: string): ChoiceElement => {
  if (element.options.length <= 1) return element;
  
  return {
    ...element,
    options: element.options.filter(opt => opt.id !== optionId)
  };
};

// Update a specific option in a choice element
export const updateOptionInChoice = (
  element: ChoiceElement, 
  optionId: string, 
  updates: Partial<ChoiceOption>
): ChoiceElement => {
  return {
    ...element,
    options: element.options.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, ...updates };
      }
      return opt;
    })
  };
};
