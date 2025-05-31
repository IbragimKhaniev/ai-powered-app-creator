
import React from 'react';

interface DiffViewerProps {
  oldContent: string;
  newContent: string;
}

interface DiffLine {
  type: 'add' | 'remove' | 'context';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ oldContent, newContent }) => {
  const formatContent = (content: string): string => {
    try {
      const jsonData = JSON.parse(content);
      return JSON.stringify(jsonData, null, 2);
    } catch (error) {
      return content;
    }
  };

  const generateDiff = (oldText: string, newText: string): DiffLine[] => {
    const oldLines = formatContent(oldText).split('\n');
    const newLines = formatContent(newText).split('\n');
    const diff: DiffLine[] = [];
    
    let oldIndex = 0;
    let newIndex = 0;
    
    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      const oldLine = oldLines[oldIndex];
      const newLine = newLines[newIndex];
      
      if (oldIndex >= oldLines.length) {
        // Только новые строки остались
        diff.push({
          type: 'add',
          content: newLine,
          newLineNumber: newIndex + 1
        });
        newIndex++;
      } else if (newIndex >= newLines.length) {
        // Только старые строки остались
        diff.push({
          type: 'remove',
          content: oldLine,
          oldLineNumber: oldIndex + 1
        });
        oldIndex++;
      } else if (oldLine === newLine) {
        // Строки одинаковые
        diff.push({
          type: 'context',
          content: oldLine,
          oldLineNumber: oldIndex + 1,
          newLineNumber: newIndex + 1
        });
        oldIndex++;
        newIndex++;
      } else {
        // Строки разные - найдем следующее совпадение
        let foundMatch = false;
        
        // Ищем совпадение в ближайших строках
        for (let i = 1; i <= 3; i++) {
          if (oldIndex + i < oldLines.length && oldLines[oldIndex + i] === newLine) {
            // Удаляем старые строки до совпадения
            for (let j = 0; j < i; j++) {
              diff.push({
                type: 'remove',
                content: oldLines[oldIndex + j],
                oldLineNumber: oldIndex + j + 1
              });
            }
            oldIndex += i;
            foundMatch = true;
            break;
          }
          
          if (newIndex + i < newLines.length && newLines[newIndex + i] === oldLine) {
            // Добавляем новые строки до совпадения
            for (let j = 0; j < i; j++) {
              diff.push({
                type: 'add',
                content: newLines[newIndex + j],
                newLineNumber: newIndex + j + 1
              });
            }
            newIndex += i;
            foundMatch = true;
            break;
          }
        }
        
        if (!foundMatch) {
          // Нет близких совпадений - считаем строки замененными
          diff.push({
            type: 'remove',
            content: oldLine,
            oldLineNumber: oldIndex + 1
          });
          diff.push({
            type: 'add',
            content: newLine,
            newLineNumber: newIndex + 1
          });
          oldIndex++;
          newIndex++;
        }
      }
    }
    
    return diff;
  };

  const diffLines = generateDiff(oldContent, newContent);

  const getLineClassName = (type: string): string => {
    switch (type) {
      case 'add':
        return 'bg-green-50 border-l-4 border-green-500 text-green-800';
      case 'remove':
        return 'bg-red-50 border-l-4 border-red-500 text-red-800';
      default:
        return 'bg-gray-50';
    }
  };

  const getLinePrefix = (type: string): string => {
    switch (type) {
      case 'add':
        return '+';
      case 'remove':
        return '-';
      default:
        return ' ';
    }
  };

  if (!oldContent) {
    // Если нет предыдущего контента, показываем как новый файл
    return (
      <div className="bg-slate-50 rounded-lg">
        <div className="bg-green-100 px-4 py-2 border-b border-green-200">
          <span className="text-green-800 font-medium">Новый файл</span>
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap break-words p-4">
          {formatContent(newContent)}
        </pre>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-lg">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <span className="text-gray-800 font-medium">Изменения файла</span>
      </div>
      <div className="overflow-x-auto">
        {diffLines.map((line, index) => (
          <div
            key={index}
            className={`flex ${getLineClassName(line.type)} min-h-[1.5rem]`}
          >
            <div className="flex-shrink-0 w-16 px-2 py-1 text-xs text-gray-500 bg-gray-100 border-r">
              {line.oldLineNumber || ''}
            </div>
            <div className="flex-shrink-0 w-16 px-2 py-1 text-xs text-gray-500 bg-gray-100 border-r">
              {line.newLineNumber || ''}
            </div>
            <div className="flex-shrink-0 w-6 px-1 py-1 text-center font-mono text-xs">
              {getLinePrefix(line.type)}
            </div>
            <pre className="flex-1 px-2 py-1 text-sm font-mono whitespace-pre-wrap break-words">
              {line.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiffViewer;
