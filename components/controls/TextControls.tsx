import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateTextElement, addTextElement, deleteTextElement, TextStyle, setActiveText, setSelectedTexts } from '@/store/slice/editor.slice';
import CustomSlider from '../slider/customSlider';
import { HexColorPicker } from 'react-colorful';
import { Switch } from '../ui/switch';
import { Trash2, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Check, GripVertical, ChevronDown, Layers } from 'lucide-react';

// Predefined text templates
const textTemplates = [
  {
    name: 'Heading',
    text: 'Add Your Heading',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  {
    name: 'Subheading',
    text: 'Add Your Subheading',
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#E5E5E5',
  },
  {
    name: 'Body Text',
    text: 'Add your description text here',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#D1D1D1',
  },
  {
    name: 'Caption',
    text: 'Add caption text',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#A3A3A3',
  },
];

const fontFamilies = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Roboto',
  'Montserrat',
  'Open Sans',
];

interface GlobalStylesProps {
  name: string;
  styles: Partial<TextStyle>;
}

const globalStyles: GlobalStylesProps[] = [
  {
    name: 'Modern Clean',
    styles: {
      fontFamily: 'Inter',
      color: '#FFFFFF',
      textShadow: {
        enabled: true,
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        color: 'rgba(0,0,0,0.3)',
      },
    },
  },
  {
    name: 'Minimal Dark',
    styles: {
      fontFamily: 'Helvetica',
      color: '#E5E5E5',
      textShadow: {
        enabled: false,
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        color: 'rgba(0,0,0,0)',
      },
    },
  },
  // Add more global styles...
];

const TextControls = () => {
  const dispatch = useDispatch();
  const activeTextId = useSelector((state: RootState) => state.editor.activeTextId);
  const textElements = useSelector((state: RootState) => state.editor.textElements);
  const activeText = textElements.find(el => el.id === activeTextId);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showGlobalControls, setShowGlobalControls] = useState(false);
  const selectedTexts = useSelector((state: RootState) => state.editor.selectedTexts);

  const handleAddTemplate = (template: typeof textTemplates[0]) => {
    dispatch(addTextElement(template));
  };

  const handleDeleteText = () => {
    if (activeTextId) {
      dispatch(deleteTextElement(activeTextId));
    }
  };

  const handleUpdateStyle = (updates: Partial<TextStyle>) => {
    if (activeTextId && activeText) {
      dispatch(updateTextElement({
        id: activeTextId,
        updates,
      }));
    }
  };

  const handleSelectAll = () => {
    dispatch(setSelectedTexts(textElements.map(el => el.id)));
  };

  const handleDeselectAll = () => {
    dispatch(setSelectedTexts([]));
  };

  const handleUpdateMultiple = (updates: Partial<TextStyle>) => {
    const textsToUpdate = selectedTexts.length > 0 ? selectedTexts : [activeTextId!];
    textsToUpdate.forEach(id => {
      if (id) {
        dispatch(updateTextElement({ id, updates }));
      }
    });
  };

  const handleApplyGlobalStyle = (styles: Partial<TextStyle>) => {
    handleUpdateMultiple(styles);
  };

  const handleTextSelection = (textId: string) => {
    if (selectedTexts.includes(textId)) {
      dispatch(setSelectedTexts(selectedTexts.filter(id => id !== textId)));
    } else {
      dispatch(setSelectedTexts([...selectedTexts, textId]));
    }
  };

  // Add selection indicator at the top
  const selectionIndicator = selectedTexts.length > 0 && (
    <div className="flex items-center justify-between py-2 px-3 bg-purple-500/20 
      border border-purple-500/30 rounded-md text-xs text-purple-200"
    >
      <span>{selectedTexts.length} text{selectedTexts.length > 1 ? 's' : ''} selected</span>
      <button
        onClick={handleDeselectAll}
        className="text-purple-300 hover:text-purple-100 transition-colors"
      >
        Clear
      </button>
    </div>
  );

  return (
    <div className="space-y-4 rounded-lg">
      {/* Add selection indicator at the top */}
      {selectionIndicator}

      {/* Text Management Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <h3 className="text-sm font-medium text-zinc-300">Text Management</h3>
        <button
          onClick={() => setShowGlobalControls(!showGlobalControls)}
          className="p-1.5 hover:bg-dark-400 rounded-md transition-colors"
        >
          <ChevronDown
            size={16}
            className={`transform transition-transform text-zinc-400 ${showGlobalControls ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Batch Selection Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSelectAll}
            className="flex-1 py-2 px-3 text-xs bg-dark-300/50 hover:bg-dark-400/50 
              rounded-md transition-colors text-zinc-400 hover:text-zinc-300
              border border-white/5 hover:border-white/10"
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className="flex-1 py-2 px-3 text-xs bg-dark-300/50 hover:bg-dark-400/50 
              rounded-md transition-colors text-zinc-400 hover:text-zinc-300
              border border-white/5 hover:border-white/10"
          >
            Deselect All
          </button>
        </div>

        {/* Batch Actions - Show when texts are selected */}
        {selectedTexts.length > 0 && (
          <div className="space-y-2 p-3 bg-dark-300/30 rounded-md border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                {selectedTexts.length} text{selectedTexts.length > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={handleDeselectAll}
                className="text-xs text-zinc-500 hover:text-zinc-400"
              >
                Clear
              </button>
            </div>
            
            {/* Batch Style Controls */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleUpdateMultiple({ fontWeight: 'bold' })}
                className="p-2 bg-dark-400/50 hover:bg-dark-500/50 rounded-md"
              >
                <Bold size={14} className="text-zinc-400" />
              </button>
              <button
                onClick={() => handleUpdateMultiple({ fontStyle: 'italic' })}
                className="p-2 bg-dark-400/50 hover:bg-dark-500/50 rounded-md"
              >
                <Italic size={14} className="text-zinc-400" />
              </button>
              <button
                onClick={() => handleUpdateMultiple({ textAlign: 'left' })}
                className="p-2 bg-dark-400/50 hover:bg-dark-500/50 rounded-md"
              >
                <AlignLeft size={14} className="text-zinc-400" />
              </button>
              <button
                onClick={() => handleUpdateMultiple({ textAlign: 'center' })}
                className="p-2 bg-dark-400/50 hover:bg-dark-500/50 rounded-md"
              >
                <AlignCenter size={14} className="text-zinc-400" />
              </button>
            </div>

            {/* Batch Color Picker */}
            <div className="space-y-2">
              <span className="text-xs text-zinc-400">Set Color for All</span>
              <div className="flex gap-2">
                {['#FFFFFF', '#E5E5E5', '#A3A3A3', '#3B82F6'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleUpdateMultiple({ color })}
                    className="w-6 h-6 rounded-md border border-white/10 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Text Templates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400">Quick Add</span>
          <div className="h-px flex-1 mx-3 bg-white/5" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {textTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleAddTemplate(template)}
              className="group flex items-center justify-center p-2.5 bg-dark-300/50 
                rounded-md hover:bg-dark-400/50 transition-all duration-200
                text-xs text-zinc-400 hover:text-zinc-300 border border-white/5
                hover:border-white/10 hover:shadow-lg hover:shadow-black/20"
            >
              <Type size={14} className="mr-2 opacity-50 group-hover:opacity-100" />
              {template.name}
            </button>
          ))}
        </div>
      </div>

      {/* Text List and Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400">Text Elements</span>
          <div className="h-px flex-1 mx-3 bg-white/5" />
        </div>
        <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
          {textElements.length === 0 ? (
            <div className="text-center py-4 text-zinc-500 text-sm bg-dark-300/30 rounded-md">
              No text elements added yet
            </div>
          ) : (
            textElements.map((text) => (
              <div
                key={text.id}
                onClick={() => handleTextSelection(text.id)}
                className={`group flex items-center gap-3 p-3 rounded-md cursor-pointer 
                  transition-all duration-200 border border-transparent
                  ${selectedTexts.includes(text.id) 
                    ? 'bg-blue-500/20 border-blue-500/30' 
                    : 'hover:bg-dark-400/50 hover:border-white/10'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTexts.includes(text.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (e.target.checked) {
                      dispatch(setSelectedTexts([...selectedTexts, text.id]));
                    } else {
                      dispatch(setSelectedTexts(selectedTexts.filter(id => id !== text.id)));
                    }
                  }}
                  className="w-4 h-4 rounded border-white/10"
                />
                <GripVertical size={14} className="text-zinc-500 group-hover:text-zinc-400" />
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-sm text-zinc-300 truncate"
                    style={{
                      fontFamily: text.fontFamily,
                      fontWeight: text.fontWeight,
                      fontStyle: text.fontStyle,
                    }}
                  >
                    {text.text}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {text.fontSize}px • {text.fontFamily}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteTextElement(text.id));
                    }}
                    className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Text Style Controls */}
      {activeText && (
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Style Controls</span>
            <div className="h-px flex-1 mx-3 bg-white/5" />
          </div>
          
          {/* Font Family Selector */}
          <select
            value={activeText.fontFamily}
            onChange={(e) => handleUpdateStyle({ fontFamily: e.target.value })}
            className="w-full bg-dark-300/50 text-zinc-300 rounded-md p-2.5 text-sm
              border border-white/5 hover:border-white/10 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>

          {/* Style Controls Grid */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleUpdateStyle({ 
                fontWeight: activeText.fontWeight === 'bold' ? 'normal' : 'bold' 
              })}
              className={`p-2.5 rounded-md transition-all duration-200 ${
                activeText.fontWeight === 'bold' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-dark-300/50 text-zinc-400 hover:bg-dark-400/50'
              }`}
            >
              <Bold size={16} />
            </button>
            {/* ... similar styling for Italic and Underline buttons */}
          </div>

          {/* Color and Shadow controls with similar styling improvements */}
        </div>
      )}
    </div>
  );
};

// Add this CSS to your global styles
`
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
`

export default TextControls; 