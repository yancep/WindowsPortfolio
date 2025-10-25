import { JSX, useState, useRef, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown, X, Minus, Square, Home, Star, HardDrive, Monitor, ArrowLeft, ArrowRight, ArrowUp, Search, FileImage, Music, Video, FileText, Download, LucideIcon } from 'lucide-react';

// Types
interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon: string;
  size?: string;
  modified: string;
}

interface FolderData {
  type: string;
  contents: FileItem[];
}

interface FileSystemType {
  [key: string]: FolderData;
}

interface SidebarFolder {
  name: string;
  icon: LucideIcon;
}

interface WindowsModalProps {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

interface FileExplorerProps {
  onClose: () => void;
}

// Componente de Ventana de Windows 11
function WindowsModal({ title, icon, onClose, children, className = "" }: WindowsModalProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 700, height: 700 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Centrar la ventana al inicio
    const updatePosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const maxWidth = Math.min(size.width, windowWidth - 100);
      const maxHeight = Math.min(size.height, windowHeight - 150);
      
      setSize({
        width: maxWidth,
        height: maxHeight
      });
      
      setPosition({
        x: (windowWidth - maxWidth) / 2,
        y: (windowHeight - maxHeight) / 2
      });
    };
    updatePosition();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (isMaximized) return;
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
    (e.target as HTMLElement).dataset.direction = direction;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Limitar el movimiento dentro de la ventana
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
      
      if (isResizing && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        const newWidth = Math.max(600, Math.min(resizeStart.width + deltaX, window.innerWidth - position.x));
        const newHeight = Math.max(400, Math.min(resizeStart.height + deltaY, window.innerHeight - position.y));
        
        setSize({
          width: newWidth,
          height: newHeight
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, isMaximized, size, position]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <>
      {/* Backdrop - Click para cerrar */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        style={
          isMaximized 
            ? { width: '100%', height: '100%', top: 0, left: 0 }
            : { 
                width: `${size.width}px`, 
                height: `${size.height}px`,
                top: `${position.y}px`,
                left: `${position.x}px`
              }
        }
        className={`fixed bg-[#202020] shadow-2xl flex flex-col overflow-hidden border border-white/20 transition-none z-50 ${isMaximized ? 'rounded-none' : 'rounded-lg'} ${className}`}
      >
        {/* Title Bar */}
        <div 
          onMouseDown={handleMouseDown}
          className="h-8 bg-[#1e1e1e] flex items-center justify-between px-2 border-b border-white/10 select-none cursor-move"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-xs text-white/90 font-normal">{title}</span>
          </div>
          <div className="flex items-center">
            <button 
              title='Minimize'
              onClick={() => console.log('Minimize')}
              className="w-11 h-8 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3 text-white/90" />
            </button>
            <button 
              title='Maximize'
              onClick={toggleMaximize}
              className="w-11 h-8 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Square className="w-3 h-3 text-white/90" />
            </button>
            <button
              title='Close'
              onClick={onClose}
              className="w-11 h-8 hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white/90" />
            </button>
          </div>
        </div>

        {children}

        {/* Resize Handles */}
        {!isMaximized && (
          <>
            {/* Bottom Right Corner */}
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10"
            />
            {/* Bottom Edge */}
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 's')}
              className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
            />
            {/* Right Edge */}
            <div
              onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
              className="absolute top-0 right-0 bottom-0 w-1 cursor-e-resize"
            />
          </>
        )}
      </div>
    </>
  );
}

// Componente File Explorer
export default function FileExplorer({ onClose }: FileExplorerProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>('Desktop');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['This PC', 'Quick access']);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(['This PC', 'Desktop']);

  const fileSystem: FileSystemType = {
    'Desktop': {
      type: 'folder',
      contents: [
        { name: 'Project Presentation.pptx', type: 'file', icon: 'document', size: '2.4 MB', modified: '10/24/2025 3:42 PM' },
        { name: 'Work Files', type: 'folder', icon: 'folder', modified: '10/23/2025 10:15 AM' },
        { name: 'Budget_Q4_2025.xlsx', type: 'file', icon: 'document', size: '456 KB', modified: '10/22/2025 2:30 PM' },
        { name: 'vacation-photo.jpg', type: 'file', icon: 'image', size: '3.2 MB', modified: '10/20/2025 9:12 AM' },
        { name: 'Meeting Notes.txt', type: 'file', icon: 'text', size: '12 KB', modified: '10/25/2025 8:45 AM' },
      ]
    },
    'Documents': {
      type: 'folder',
      contents: [
        { name: 'Work Projects', type: 'folder', icon: 'folder', modified: '10/19/2025 4:20 PM' },
        { name: 'Personal', type: 'folder', icon: 'folder', modified: '10/15/2025 11:30 AM' },
        { name: 'Resume_2025.pdf', type: 'file', icon: 'document', size: '892 KB', modified: '09/28/2025 1:15 PM' },
        { name: 'Contract_Template.docx', type: 'file', icon: 'document', size: '156 KB', modified: '10/05/2025 3:45 PM' },
        { name: 'Tax_Documents_2024.pdf', type: 'file', icon: 'document', size: '1.8 MB', modified: '08/12/2025 10:00 AM' },
      ]
    },
    'Downloads': {
      type: 'folder',
      contents: [
        { name: 'chrome_installer.exe', type: 'file', icon: 'document', size: '89.2 MB', modified: '10/25/2025 7:23 AM' },
        { name: 'photos_backup.zip', type: 'file', icon: 'document', size: '456 MB', modified: '10/23/2025 5:12 PM' },
        { name: 'invoice_october_2025.pdf', type: 'file', icon: 'document', size: '234 KB', modified: '10/24/2025 2:45 PM' },
        { name: 'song.mp3', type: 'file', icon: 'music', size: '8.4 MB', modified: '10/20/2025 6:30 PM' },
      ]
    },
    'Pictures': {
      type: 'folder',
      contents: [
        { name: 'Summer Vacation 2025', type: 'folder', icon: 'folder', modified: '08/15/2025 3:00 PM' },
        { name: 'Family Photos', type: 'folder', icon: 'folder', modified: '07/20/2025 5:30 PM' },
        { name: 'screenshot_20251024.png', type: 'file', icon: 'image', size: '1.2 MB', modified: '10/24/2025 11:22 AM' },
        { name: 'profile_pic.jpg', type: 'file', icon: 'image', size: '890 KB', modified: '09/10/2025 4:15 PM' },
      ]
    },
    'Music': {
      type: 'folder',
      contents: [
        { name: 'Playlist 2025', type: 'folder', icon: 'folder', modified: '10/10/2025 8:00 PM' },
        { name: 'Favorites.mp3', type: 'file', icon: 'music', size: '6.7 MB', modified: '10/18/2025 9:30 AM' },
      ]
    },
    'Videos': {
      type: 'folder',
      contents: [
        { name: 'Tutorial_Recording.mp4', type: 'file', icon: 'video', size: '124 MB', modified: '10/21/2025 2:00 PM' },
        { name: 'Birthday_Party.mov', type: 'file', icon: 'video', size: '890 MB', modified: '09/15/2025 7:45 PM' },
      ]
    }
  };

  const getIcon = (item: FileItem): JSX.Element => {
    if (item.type === 'folder') {
      return <Folder className="w-5 h-5 text-amber-400" />;
    }
    switch (item.icon) {
      case 'image':
        return <FileImage className="w-5 h-5 text-blue-400" />;
      case 'music':
        return <Music className="w-5 h-5 text-purple-400" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-400" />;
      case 'text':
        return <FileText className="w-5 h-5 text-gray-400" />;
      default:
        return <File className="w-5 h-5 text-blue-300" />;
    }
  };

  const toggleFolder = (folder: string): void => {
    setExpandedFolders(prev =>
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  const handleFolderClick = (folder: string): void => {
    setSelectedFolder(folder);
    setCurrentPath(['This PC', folder]);
    setSelectedItems([]);
  };

  const getCurrentContents = (): FileItem[] => {
    return fileSystem[selectedFolder]?.contents || [];
  };

  const handleItemClick = (item: FileItem, e: React.MouseEvent): void => {
    if (e.ctrlKey) {
      setSelectedItems(prev =>
        prev.includes(item.name)
          ? prev.filter(i => i !== item.name)
          : [...prev, item.name]
      );
    } else {
      setSelectedItems([item.name]);
    }
  };

  const sidebarFolders: SidebarFolder[] = [
    { name: 'Desktop', icon: Monitor },
    { name: 'Documents', icon: FileText },
    { name: 'Downloads', icon: Download },
    { name: 'Music', icon: Music },
    { name: 'Pictures', icon: FileImage },
    { name: 'Videos', icon: Video }
  ];

  return (
    <WindowsModal 
      title={selectedFolder}
      icon={<Folder className="w-4 h-4 text-amber-400" />}
      onClose={onClose}
    >
      {/* Ribbon Menu */}
      <div className="h-8 bg-[#1a1a1a] flex items-center px-3 text-xs text-white/70 border-b border-white/10">
        <span className="hover:bg-white/10 px-3 py-1 cursor-pointer rounded transition-colors">File</span>
        <span className="hover:bg-white/10 px-3 py-1 cursor-pointer rounded transition-colors">Home</span>
        <span className="hover:bg-white/10 px-3 py-1 cursor-pointer rounded transition-colors">Share</span>
        <span className="hover:bg-white/10 px-3 py-1 cursor-pointer rounded transition-colors">View</span>
      </div>

      {/* Navigation Bar */}
      <div className="h-11 bg-[#1e1e1e] flex items-center px-3 gap-2 border-b border-white/10">
        <button title="Go Back" className="p-1.5 hover:bg-white/10 rounded transition-colors disabled:opacity-40 disabled:hover:bg-transparent">
          <ArrowLeft className="w-4 h-4 text-white/70" />
        </button>
        <button title="Go Forward" className="p-1.5 hover:bg-white/10 rounded transition-colors disabled:opacity-40 disabled:hover:bg-transparent">
          <ArrowRight className="w-4 h-4 text-white/70" />
        </button>
        <button title="Go Up" className="p-1.5 hover:bg-white/10 rounded transition-colors">
          <ArrowUp className="w-4 h-4 text-white/70" />
        </button>
        
        {/* Address Bar */}
        <div className="flex-1 bg-[#2d2d2d] rounded h-7 px-3 flex items-center gap-2 hover:bg-[#323232] transition-colors">
          <Home className="w-4 h-4 text-white/50" />
          <span className="text-xs text-white/80 flex items-center gap-1">
            {currentPath.map((path, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3 text-white/40" />}
                <span className="hover:text-white transition-colors">{path}</span>
              </span>
            ))}
          </span>
        </div>

        {/* Search Bar */}
        <div className="w-64 bg-[#2d2d2d] rounded h-7 px-3 flex items-center gap-2 hover:bg-[#323232] transition-colors">
          <Search className="w-3.5 h-3.5 text-white/50" />
          <input
            type="text"
            placeholder="Search in Desktop"
            className="bg-transparent text-xs text-white/80 placeholder:text-white/40 outline-none flex-1"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-[#1a1a1a] border-r border-white/10 overflow-y-auto">
          <div className="py-3">
            {/* Quick Access */}
            <div className="mb-4">
              <div 
                onClick={() => toggleFolder('Quick access')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/70 font-medium cursor-pointer hover:bg-white/5 mx-2 rounded transition-colors"
              >
                {expandedFolders.includes('Quick access') ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
                <Star className="w-3.5 h-3.5" />
                <span>Quick access</span>
              </div>
              {expandedFolders.includes('Quick access') && (
                <div className="mt-1">
                  {sidebarFolders.slice(0, 3).map(folder => {
                    const IconComponent = folder.icon;
                    return (
                      <div
                        key={folder.name}
                        onClick={() => handleFolderClick(folder.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer mx-2 rounded transition-colors ${selectedFolder === folder.name ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/5'}`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{folder.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* This PC */}
            <div>
              <div
                onClick={() => toggleFolder('This PC')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/70 font-medium cursor-pointer hover:bg-white/5 mx-2 rounded transition-colors"
              >
                {expandedFolders.includes('This PC') ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
                <Monitor className="w-3.5 h-3.5" />
                <span>This PC</span>
              </div>
              {expandedFolders.includes('This PC') && (
                <div className="mt-1">
                  {sidebarFolders.map(folder => {
                    const IconComponent = folder.icon;
                    return (
                      <div
                        key={folder.name}
                        onClick={() => handleFolderClick(folder.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer mx-2 rounded transition-colors ${selectedFolder === folder.name ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/5'}`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{folder.name}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-white/10 my-2 mx-2" />
                  <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5 mx-2 rounded cursor-pointer transition-colors">
                    <HardDrive className="w-4 h-4 text-blue-400" />
                    <span>Local Disk (C:)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* File List Area */}
        <div className="flex-1 overflow-auto bg-[#202020]">
          <div className="p-4">
            {getCurrentContents().length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-white/40">
                <Folder className="w-16 h-16 mb-3" />
                <p className="text-sm">This folder is empty</p>
              </div>
            ) : (
              <div className="space-y-0.5">
                {getCurrentContents().map((item, i) => (
                  <div
                    key={i}
                    onClick={(e) => handleItemClick(item, e)}
                    onDoubleClick={() => item.type === 'folder' && handleFolderClick(item.name)}
                    className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-all ${selectedItems.includes(item.name) ? 'bg-blue-600/40 border border-blue-500/60 shadow-sm' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    {getIcon(item)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white/90 truncate">{item.name}</div>
                    </div>
                    <div className="text-xs text-white/50 w-32 text-right hidden md:block">{item.modified}</div>
                    <div className="text-xs text-white/50 w-20 text-right hidden lg:block">{item.size || '—'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-7 bg-[#1a1a1a] border-t border-white/10 flex items-center px-3 text-xs text-white/60">
        <span>{getCurrentContents().length} items</span>
        {selectedItems.length > 0 && (
          <>
            <span className="mx-2 text-white/30">|</span>
            <span>{selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected</span>
          </>
        )}
      </div>
    </WindowsModal>
  );
}