import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TextStyle, updateTextElement, deleteTextElement, setActiveText, setSelectedTexts } from '@/store/slice/editor.slice';
import { Rnd } from 'react-rnd';
import { Type } from 'lucide-react';

interface TextEditorProps {
  textElement: TextStyle;
  selectedTexts: string[];
}

const TextEditor: React.FC<TextEditorProps> = ({ textElement, selectedTexts }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const activeTextId = useSelector((state: RootState) => state.editor.activeTextId);
  const isActive = activeTextId === textElement.id;
  const isSelected = selectedTexts.includes(textElement.id);

  const handleDoubleClick = () => {
    setIsEditing(true);
    dispatch(setActiveText(textElement.id));
  };

  const handleBlur = () => {
    setIsEditing(false);
    const text = textRef.current?.innerText || textElement.text;
    dispatch(updateTextElement({ 
      id: textElement.id, 
      updates: { text } 
    }));
  };

  const handleDragStop = (e: any, d: any) => {
    dispatch(updateTextElement({
      id: textElement.id,
      updates: { 
        position: { x: d.x, y: d.y }
      }
    }));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If holding shift, add to selection
    if (e.shiftKey) {
      if (selectedTexts.includes(textElement.id)) {
        dispatch(setSelectedTexts(selectedTexts.filter(id => id !== textElement.id)));
      } else {
        dispatch(setSelectedTexts([...selectedTexts, textElement.id]));
      }
    } else {
      // Single click without shift
      dispatch(setActiveText(textElement.id));
      
      // If not already selected, clear other selections and select only this one
      if (!selectedTexts.includes(textElement.id)) {
        dispatch(setSelectedTexts([textElement.id]));
      }
      
      // Double click behavior for editing
      if (isActive) {
        setIsEditing(true);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (textRef.current && !textRef.current.contains(e.target as Node)) {
        setIsEditing(false);
        if (!selectedTexts.includes(textElement.id)) {
          dispatch(setActiveText(null));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedTexts, textElement.id]);

  return (
    <Rnd
      default={{
        x: textElement.position.x,
        y: textElement.position.y,
        width: 'auto',
        height: 'auto',
      }}
      onDragStop={handleDragStop}
      enableResizing={false}
      bounds="parent"
      className={`group ${isActive ? 'z-50' : 'z-0'}`}
    >
      <div
        ref={textRef}
        contentEditable={isEditing}
        onClick={handleClick}
        onBlur={handleBlur}
        className={`relative transition-all duration-200 ${
          isSelected ? 'ring-2 ring-purple-500/50' : ''
        }`}
        style={{
          fontSize: `${textElement.fontSize}px`,
          fontFamily: textElement.fontFamily,
          fontWeight: textElement.fontWeight,
          color: textElement.color,
          backgroundColor: textElement.backgroundColor,
          opacity: textElement.opacity,
          letterSpacing: `${textElement.letterSpacing}px`,
          lineHeight: textElement.lineHeight,
          textAlign: textElement.textAlign,
          textDecoration: textElement.textDecoration,
          fontStyle: textElement.fontStyle,
          textShadow: textElement.textShadow.enabled 
            ? `${textElement.textShadow.offsetX}px ${textElement.textShadow.offsetY}px ${textElement.textShadow.blur}px ${textElement.textShadow.color}`
            : 'none',
          transform: `rotate(${textElement.rotation}deg)`,
          cursor: isEditing ? 'text' : 'move',
          padding: '8px 12px',
          borderRadius: '6px',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          maxWidth: '100%',
          wordBreak: 'break-word',
        }}
      >
        {textElement.text}
        
        {(isActive || isSelected) && !isEditing && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
            flex items-center gap-1 bg-dark-300/90 rounded-md p-1 opacity-0 
            group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
          >
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 hover:bg-dark-400 rounded-md"
            >
              <Type size={12} className="text-zinc-400" />
            </button>
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default TextEditor; 