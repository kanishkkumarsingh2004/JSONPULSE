"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Save, FileJson, Trash2, FolderOpen, Eye, RefreshCw, Loader2, Plus, Menu, X, ExternalLink, Code2, Table2, Maximize2, Minimize2 } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then(mod => ({ default: mod.Editor })), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading editor...</div>,
});

interface JsonFile {
  id: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export default function EditorPage() {
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("{\n  \n}");
  const [isDeploying, setIsDeploying] = useState(false);
  const [files, setFiles] = useState<JsonFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [fileNameError, setFileNameError] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"code" | "table">("code");
  const [tableData, setTableData] = useState<Array<Record<string, any>>>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update character and line count when content changes
  useEffect(() => {
    setCharCount(content.length);
    setLineCount(content.split('\n').length);
  }, [content]);

  // Sync table data with JSON content only when switching to table mode
  useEffect(() => {
    if (editorMode === "table") {
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTableData(parsed);
          // Collect all unique keys from all rows
          const allKeys = new Set<string>();
          parsed.forEach((row: any) => {
            if (typeof row === "object" && row !== null) {
              Object.keys(row).forEach(key => allKeys.add(key));
            }
          });
          setTableHeaders(Array.from(allKeys));
        } else if (typeof parsed === "object" && parsed !== null) {
          // Convert single object to array
          setTableData([parsed]);
          setTableHeaders(Object.keys(parsed));
        } else {
          setTableData([]);
          setTableHeaders([]);
        }
      } catch (e) {
        // Invalid JSON, keep current table data
      }
    }
  }, [editorMode]); // Only run when mode changes, not on content change

  // Load user data and fetch latest API key from server
  useEffect(() => {
    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
      const user = JSON.parse(userDataStr);
      setUserData(user);
    }
    
    // Fetch latest API key from server
    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/api-key");
        if (response.ok) {
          const data = await response.json();
          if (data.apiKey) {
            setUserApiKey(data.apiKey);
          }
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };
    
    fetchApiKey();
  }, []);

  // Fetch all files
  const fetchFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const response = await fetch(`/api/files`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Check for duplicate file names
  useEffect(() => {
    if (!fileName.trim()) {
      setFileNameError("");
      return;
    }

    // Check if editing existing file
    if (selectedFileId) {
      const currentFile = files.find(f => f.id === selectedFileId);
      if (currentFile && currentFile.fileName === fileName) {
        setFileNameError("");
        return;
      }
    }

    // Check if file name already exists
    const isDuplicate = files.some(file => file.fileName.toLowerCase() === fileName.toLowerCase());
    if (isDuplicate) {
      setFileNameError("A file with this name already exists");
    } else {
      setFileNameError("");
    }
  }, [fileName, files, selectedFileId]);

  const handleDeploy = async () => {
    if (!fileName.trim()) {
      toast.error("Please enter a file name");
      return;
    }

    try {
      JSON.parse(content);
    } catch (e) {
      toast.error("Invalid JSON format");
      return;
    }

    setIsDeploying(true);

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, content }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("File deployed successfully!");
        fetchFiles(); // Refresh file list
      } else {
        toast.error(data.error || "Failed to deploy file");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  };

  const handleLoadFile = async (file: JsonFile) => {
    try {
      const response = await fetch(`/api/files/${file.fileName}`);
      if (response.ok) {
        const data = await response.json();
        setFileName(file.fileName);
        setContent(JSON.stringify(data.content, null, 2));
        setSelectedFileId(file.id);
        setIsMobileMenuOpen(false); // Close mobile menu after loading
        toast.success(`Loaded ${file.fileName}`);
      }
    } catch (error) {
      toast.error("Failed to load file");
    }
  };

  const handleDeleteFile = async (file: JsonFile) => {
    if (!confirm(`Are you sure you want to delete "${file.fileName}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/files/${file.fileName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(`Deleted ${file.fileName}`);
        fetchFiles();
        if (selectedFileId === file.id) {
          setFileName("");
          setContent("{\n  \n}");
          setSelectedFileId(null);
        }
      } else {
        toast.error("Failed to delete file");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleNewFile = () => {
    setFileName("");
    setContent("{\n  \n}");
    setSelectedFileId(null);
    setIsMobileMenuOpen(false); // Close mobile menu after creating new file
  };

  // Table Editor Component
  function TableEditor({ 
    data, 
    headers, 
    onDataChange, 
    onHeadersChange 
  }: { 
    data: Array<Record<string, any>>; 
    headers: string[]; 
    onDataChange: (data: Array<Record<string, any>>) => void;
    onHeadersChange: (headers: string[]) => void;
  }) {
    const [expandedCells, setExpandedCells] = useState<Record<string, boolean>>({});
    const [localData, setLocalData] = useState(data);
    const [localHeaders, setLocalHeaders] = useState(headers);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const initializedRef = useRef(false);

    // Initialize local state only once
    useEffect(() => {
      if (!initializedRef.current) {
        setLocalData(data);
        setLocalHeaders(headers);
        initializedRef.current = true;
      }
    }, []);

    // Parse value from string input
    const parseValue = (value: string): any => {
      if (!value || value.trim() === "") return "";
      
      // Try to parse as JSON for arrays/objects
      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch {
        // Return as string if not valid JSON
        return value;
      }
    };

    // Format value for display
    const formatValue = (value: any): string => {
      if (value === null || value === undefined) return "";
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") return String(value);
      return JSON.stringify(value);
    };

    // Get cell type
    const getCellType = (value: any): "string" | "array" | "object" => {
      if (Array.isArray(value)) return "array";
      if (typeof value === "object" && value !== null) return "object";
      return "string";
    };

    const handleCellChange = (rowIndex: number, header: string, value: string) => {
      const newData = [...localData];
      const parsedValue = parseValue(value);
      newData[rowIndex] = { ...newData[rowIndex], [header]: parsedValue };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleSetCellType = (rowIndex: number, header: string, type: "string" | "array" | "object") => {
      const newData = [...localData];
      if (type === "string") {
        newData[rowIndex] = { ...newData[rowIndex], [header]: "" };
      } else if (type === "array") {
        newData[rowIndex] = { ...newData[rowIndex], [header]: [] };
      } else if (type === "object") {
        newData[rowIndex] = { ...newData[rowIndex], [header]: {} };
      }
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleSaveChanges = () => {
      onDataChange(localData);
      onHeadersChange(localHeaders);
      setHasUnsavedChanges(false);
      toast.success("Changes saved!");
    };

    const handleArrayItemAdd = (rowIndex: number, header: string) => {
      const newData = [...localData];
      const currentValue = newData[rowIndex][header];
      const newArray = Array.isArray(currentValue) ? [...currentValue, ""] : [""];
      newData[rowIndex] = { ...newData[rowIndex], [header]: newArray };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleArrayItemChange = (rowIndex: number, header: string, itemIndex: number, value: string) => {
      const newData = [...localData];
      const currentArray = [...(newData[rowIndex][header] || [])];
      currentArray[itemIndex] = parseValue(value);
      newData[rowIndex] = { ...newData[rowIndex], [header]: currentArray };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleArrayItemDelete = (rowIndex: number, header: string, itemIndex: number) => {
      const newData = [...localData];
      const currentArray = [...(newData[rowIndex][header] || [])];
      currentArray.splice(itemIndex, 1);
      newData[rowIndex] = { ...newData[rowIndex], [header]: currentArray };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleObjectFieldAdd = (rowIndex: number, header: string) => {
      const newData = [...localData];
      const currentValue = newData[rowIndex][header];
      const newObject = typeof currentValue === "object" && !Array.isArray(currentValue) && currentValue !== null
        ? { ...currentValue, [`field${Object.keys(currentValue).length + 1}`]: "" }
        : { field1: "" };
      newData[rowIndex] = { ...newData[rowIndex], [header]: newObject };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleObjectFieldChange = (rowIndex: number, header: string, fieldKey: string, value: string) => {
      const newData = [...localData];
      const currentObject = { ...(newData[rowIndex][header] || {}) };
      currentObject[fieldKey] = parseValue(value);
      newData[rowIndex] = { ...newData[rowIndex], [header]: currentObject };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleObjectFieldDelete = (rowIndex: number, header: string, fieldKey: string) => {
      const newData = [...localData];
      const currentObject = { ...(newData[rowIndex][header] || {}) };
      delete currentObject[fieldKey];
      newData[rowIndex] = { ...newData[rowIndex], [header]: currentObject };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleObjectKeyChange = (rowIndex: number, header: string, oldKey: string, newKey: string) => {
      if (!newKey.trim() || newKey === oldKey) return;
      
      const newData = [...localData];
      const currentObject = { ...(newData[rowIndex][header] || {}) };
      
      // Check if new key already exists
      if (currentObject.hasOwnProperty(newKey)) {
        toast.error("Key already exists in this object");
        return;
      }
      
      // Create new object with renamed key
      const newObject: Record<string, any> = {};
      Object.keys(currentObject).forEach(key => {
        if (key === oldKey) {
          newObject[newKey] = currentObject[key];
        } else {
          newObject[key] = currentObject[key];
        }
      });
      
      newData[rowIndex] = { ...newData[rowIndex], [header]: newObject };
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleAddRow = () => {
      const newRow: Record<string, any> = {};
      localHeaders.forEach(header => {
        newRow[header] = "";
      });
      const newData = [...localData, newRow];
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleDeleteRow = (rowIndex: number) => {
      const newData = localData.filter((_, index) => index !== rowIndex);
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleAddColumn = () => {
      const newHeader = `field${localHeaders.length + 1}`;
      const newHeaders = [...localHeaders, newHeader];
      const newData = localData.map(row => ({ ...row, [newHeader]: "" }));
      setLocalHeaders(newHeaders);
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleDeleteColumn = (header: string) => {
      const newHeaders = localHeaders.filter(h => h !== header);
      const newData = localData.map(row => {
        const newRow = { ...row };
        delete newRow[header];
        return newRow;
      });
      setLocalHeaders(newHeaders);
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const handleHeaderChange = (oldHeader: string, newHeader: string) => {
      if (!newHeader.trim() || newHeader === oldHeader) return;
      if (localHeaders.includes(newHeader)) {
        toast.error("Column name already exists");
        return;
      }
      const newHeaders = localHeaders.map(h => h === oldHeader ? newHeader : h);
      const newData = localData.map(row => {
        const newRow: Record<string, any> = {};
        Object.keys(row).forEach(key => {
          newRow[key === oldHeader ? newHeader : key] = row[key];
        });
        return newRow;
      });
      setLocalHeaders(newHeaders);
      setLocalData(newData);
      setHasUnsavedChanges(true);
    };

    const toggleCellExpansion = (rowIndex: number, header: string) => {
      const key = `${rowIndex}-${header}`;
      setExpandedCells(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (localData.length === 0 || localHeaders.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-black/20 p-8">
          <Table2 className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Table Data</h3>
          <p className="text-gray-400 text-sm mb-6 text-center max-w-md">
            Switch to Code editor and create a JSON array to use the table editor
          </p>
          <button
            onClick={() => {
              const initialData = [{ field1: "", field2: "", field3: "" }];
              const initialHeaders = ["field1", "field2", "field3"];
              setLocalHeaders(initialHeaders);
              setLocalData(initialData);
              onHeadersChange(initialHeaders);
              onDataChange(initialData);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
          >
            Create Table
          </button>
        </div>
      );
    }

    return (
      <div className="h-full overflow-auto bg-black/20 custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-black/60 backdrop-blur-sm z-10">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 border-b border-white/[0.08] w-12">#</th>
              {localHeaders.map((header, index) => (
                <th key={index} className="px-3 py-3 text-left border-b border-white/[0.08] min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <input
                      key={`header-${header}-${index}`}
                      type="text"
                      defaultValue={header}
                      onBlur={(e) => handleHeaderChange(header, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/[0.08] rounded px-2 py-1 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/60"
                    />
                    <button
                      onClick={() => handleDeleteColumn(header)}
                      className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded transition-all"
                      title="Delete column"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-3 py-3 border-b border-white/[0.08] w-20">
                <button
                  onClick={handleAddColumn}
                  className="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-500/10 rounded transition-all"
                  title="Add column"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {localData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="px-3 py-2 text-gray-500 text-xs align-top">{rowIndex + 1}</td>
                {localHeaders.map((header, colIndex) => {
                  const cellValue = row[header];
                  const cellType = getCellType(cellValue);
                  const cellKey = `${rowIndex}-${header}`;
                  const isExpanded = expandedCells[cellKey];

                  return (
                    <td key={colIndex} className="px-3 py-2 align-top">
                      {cellType === "array" ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-purple-400 font-mono">Array [{Array.isArray(cellValue) ? cellValue.length : 0}]</span>
                            <button
                              onClick={() => handleArrayItemAdd(rowIndex, header)}
                              className="text-blue-400 hover:text-blue-300 p-0.5 hover:bg-blue-500/10 rounded transition-all"
                              title="Add item"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          {Array.isArray(cellValue) && cellValue.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{itemIndex}:</span>
                              <input
                                key={`${rowIndex}-${header}-${itemIndex}-${formatValue(item)}`}
                                type="text"
                                defaultValue={formatValue(item)}
                                onBlur={(e) => handleArrayItemChange(rowIndex, header, itemIndex, e.target.value)}
                                className="flex-1 bg-white/5 border border-white/[0.08] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all"
                                placeholder="Value"
                              />
                              <button
                                onClick={() => handleArrayItemDelete(rowIndex, header, itemIndex)}
                                className="text-red-400 hover:text-red-300 p-0.5 hover:bg-red-500/10 rounded transition-all"
                                title="Delete item"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : cellType === "object" ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-green-400 font-mono">Object {`{${Object.keys(cellValue || {}).length}}`}</span>
                            <button
                              onClick={() => handleObjectFieldAdd(rowIndex, header)}
                              className="text-blue-400 hover:text-blue-300 p-0.5 hover:bg-blue-500/10 rounded transition-all"
                              title="Add field"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          {typeof cellValue === "object" && cellValue !== null && Object.entries(cellValue).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2">
                              <input
                                key={`${rowIndex}-${header}-key-${key}`}
                                type="text"
                                defaultValue={key}
                                onBlur={(e) => handleObjectKeyChange(rowIndex, header, key, e.target.value)}
                                className="min-w-[80px] max-w-[120px] bg-white/5 border border-white/[0.08] rounded px-2 py-1 text-xs text-yellow-400 font-mono focus:outline-none focus:border-yellow-500/60 focus:bg-white/10 transition-all"
                                placeholder="Key"
                              />
                              <span className="text-xs text-gray-500 pt-1">:</span>
                              <input
                                key={`${rowIndex}-${header}-val-${key}-${formatValue(value)}`}
                                type="text"
                                defaultValue={formatValue(value)}
                                onBlur={(e) => handleObjectFieldChange(rowIndex, header, key, e.target.value)}
                                className="flex-1 bg-white/5 border border-white/[0.08] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all"
                                placeholder="Value"
                              />
                              <button
                                onClick={() => handleObjectFieldDelete(rowIndex, header, key)}
                                className="text-red-400 hover:text-red-300 p-0.5 hover:bg-red-500/10 rounded transition-all"
                                title="Delete field"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          {cellValue === "" || cellValue === null || cellValue === undefined ? (
                            <div className="flex flex-col gap-2">
                              <input
                                key={`${rowIndex}-${header}-${formatValue(cellValue)}`}
                                type="text"
                                defaultValue={formatValue(cellValue)}
                                onBlur={(e) => handleCellChange(rowIndex, header, e.target.value)}
                                className="w-full bg-white/5 border border-white/[0.08] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all"
                                placeholder={`Enter ${header}`}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSetCellType(rowIndex, header, "array")}
                                  className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 px-3 py-1.5 rounded text-xs font-semibold transition-all"
                                  title="Set as Array"
                                >
                                  Array []
                                </button>
                                <button
                                  onClick={() => handleSetCellType(rowIndex, header, "object")}
                                  className="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded text-xs font-semibold transition-all"
                                  title="Set as Object"
                                >
                                  Object {}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <input
                              key={`${rowIndex}-${header}-${formatValue(cellValue)}`}
                              type="text"
                              defaultValue={formatValue(cellValue)}
                              onBlur={(e) => handleCellChange(rowIndex, header, e.target.value)}
                              className="w-full bg-white/5 border border-white/[0.08] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all"
                              placeholder={`Enter ${header}`}
                            />
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="px-3 py-2 align-top">
                  <button
                    onClick={() => handleDeleteRow(rowIndex)}
                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded transition-all"
                    title="Delete row"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sticky bottom-0 bg-black/60 backdrop-blur-sm border-t border-white/[0.08] p-3">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleAddRow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Row
            </button>
            
            {hasUnsavedChanges && (
              <button
                onClick={handleSaveChanges}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2 rounded-lg text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2 animate-pulse"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedGridBackground />
      <BlurOrbs />
      <div className="relative z-10">
      {/* Header - Hidden in fullscreen */}
      {!isFullscreen && (
        <div className="px-4 md:px-6 py-5 md:py-7 border-b border-white/[0.05] backdrop-blur-sm bg-black/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-1">
                JSON Editor
              </h1>
              <p className="text-gray-400 text-xs md:text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Create and deploy your JSON files
              </p>
            </div>
            
            {/* User Info Card */}
            {userData && (
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-xl px-4 py-3 backdrop-blur-md hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 animate-slide-in-right">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20">
                    <span className="text-white font-bold text-lg">
                      {userData.firstName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">
                      {`${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "User"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {userData.email || ""}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isFullscreen ? 'p-0' : 'container mx-auto px-2 md:px-4 py-4 md:py-6'}`}>
        {/* Mobile Files Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 ${isFullscreen ? 'h-screen' : ''}`} style={{ minHeight: isFullscreen ? '100vh' : 'calc(100vh - 200px)' }}>
          {/* Side Explorer - Hidden on mobile, shown in overlay, hidden in fullscreen */}
          {!isFullscreen && (
            <div className={`lg:col-span-3 animate-slide-in-left ${isMobileMenuOpen ? 'fixed inset-0 z-40 lg:relative' : 'hidden lg:block'}`}>
            {isMobileMenuOpen && (
              <div 
                className="lg:hidden absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}
            <div className={`bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 md:p-5 rounded-2xl border border-white/[0.08] flex flex-col transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-md ${
              isMobileMenuOpen ? 'fixed top-20 left-4 right-4 bottom-20 z-50 lg:relative lg:top-0 lg:left-0 lg:right-0 lg:bottom-0' : ''
            }`} style={{ height: isMobileMenuOpen ? 'auto' : 'calc(100vh - 250px)', minHeight: isMobileMenuOpen ? '0' : '600px' }}>
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h2 className="text-base md:text-lg font-bold flex items-center gap-2 text-white">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg">
                    <FolderOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  </div>
                  <span>Files</span>
                  <span className="text-xs text-gray-500 font-normal">({files.length})</span>
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchFiles}
                    disabled={isLoadingFiles}
                    className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Refresh"
                  >
                    <RefreshCw className={`w-4 h-4 text-gray-400 hover:text-blue-400 ${isLoadingFiles ? "animate-spin" : ""}`} />
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-all duration-300"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleNewFile}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 mb-4 md:mb-5 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>New File</span>
              </button>

              <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                {isLoadingFiles ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500 mb-2" />
                    <span className="text-xs">Loading files...</span>
                  </div>
                ) : files.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white/[0.02] rounded-2xl flex items-center justify-center border border-white/[0.05]">
                      <FileJson className="w-8 h-8 opacity-30" />
                    </div>
                    <p className="font-medium">No files yet</p>
                    <p className="text-xs text-gray-600 mt-1">Create your first JSON file</p>
                  </div>
                ) : (
                  files.map((file, index) => (
                    <div
                      key={file.id}
                      className={`group p-3 rounded-xl border transition-all duration-300 cursor-pointer animate-fade-in ${
                        selectedFileId === file.id
                          ? "bg-gradient-to-br from-blue-600/20 to-blue-700/10 border-blue-500/60 shadow-lg shadow-blue-500/10"
                          : "bg-black/30 border-white/[0.05] hover:border-blue-500/40 hover:bg-black/50"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => handleLoadFile(file)}
                          className="flex-1 text-left"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className={`p-1 rounded-lg ${selectedFileId === file.id ? 'bg-blue-500/20' : 'bg-white/[0.03]'}`}>
                              <FileJson className={`w-3.5 h-3.5 flex-shrink-0 ${selectedFileId === file.id ? 'text-blue-400' : 'text-gray-400'}`} />
                            </div>
                            <span className="text-sm font-medium truncate text-white">{file.fileName}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 ml-7">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{file.views}</span>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg transition-all text-red-400 hover:text-red-300 hover:scale-110 active:scale-95"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          )}

          {/* Editor Section */}
          <div className={`${isFullscreen ? 'col-span-12' : 'lg:col-span-9'} animate-slide-in-right`}>
            <div className={`bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl border border-white/[0.08] flex flex-col backdrop-blur-md hover:border-blue-500/20 transition-all duration-300 shadow-xl`} style={{ height: isFullscreen ? '100vh' : 'calc(100vh - 250px)', minHeight: isFullscreen ? '100vh' : '600px' }}>
              {/* Top Section - File Name */}
              <div className="px-4 md:px-6 pt-5 md:pt-6 pb-4 flex-shrink-0 border-b border-white/[0.05]">
                {/* File Name */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <div className="p-1 bg-blue-500/10 rounded-lg">
                        <FileJson className="w-4 h-4 text-blue-400" />
                      </div>
                      File Name
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30 active:scale-95 flex items-center gap-2"
                        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      >
                        {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
                      </button>
                      <a
                        href="/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95 flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </a>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="my-data"
                    className={`w-full bg-black/40 border rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      fileNameError 
                        ? 'border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20' 
                        : 'border-white/[0.08] focus:border-blue-500/60 focus:ring-blue-500/20 hover:border-white/[0.12]'
                    }`}
                  />
                  {fileNameError && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-xs text-red-400 flex items-center gap-2">
                        <span className="font-semibold">✗</span> {fileNameError}
                      </p>
                    </div>
                  )}
                  {!fileNameError && userApiKey && fileName && (
                    <div className="mt-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                      <p className="text-xs text-gray-400 break-all">
                        <span className="text-green-400 font-semibold">✓</span> Accessible at: <code className="text-blue-400 font-mono bg-black/30 px-2 py-0.5 rounded">/api/data/key/{userApiKey}/{fileName}</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Section - Editor (grows to fill space) */}
              <div className="flex-1 px-4 md:px-6 py-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-white">JSON Content</label>
                  <div className="flex items-center gap-2 md:gap-3">
                    {/* Editor Mode Toggle */}
                    <div className="flex items-center gap-1 bg-black/40 border border-white/[0.08] rounded-lg p-1">
                      <button
                        onClick={() => setEditorMode("code")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                          editorMode === "code"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Code</span>
                      </button>
                      <button
                        onClick={() => setEditorMode("table")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                          editorMode === "table"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Table2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Table</span>
                      </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-2 text-xs">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        <span className="text-gray-400">Lines:</span> <span className="text-blue-400 font-bold ml-1">{lineCount}</span>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        <span className="text-gray-400">Chars:</span> <span className="text-purple-400 font-bold ml-1">{charCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Editor Content */}
                <div className="border border-white/[0.08] rounded-xl overflow-hidden shadow-inner ring-1 ring-white/[0.02] h-[calc(100%-44px)]">
                  {editorMode === "code" ? (
                    <MonacoEditor
                      height="100%"
                      defaultLanguage="json"
                      value={content}
                      onChange={(value: string | undefined) => setContent(value || "")}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    />
                  ) : (
                    <TableEditor
                      data={tableData}
                      headers={tableHeaders}
                      onDataChange={(newData) => {
                        setTableData(newData);
                        setContent(JSON.stringify(newData, null, 2));
                      }}
                      onHeadersChange={(newHeaders) => {
                        setTableHeaders(newHeaders);
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Bottom Section - Deploy Button */}
              <div className="px-4 md:px-6 pb-5 md:pb-6 pt-4 flex-shrink-0 border-t border-white/[0.05]">
                {/* Deploy Button */}
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying || !!fileNameError}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed disabled:opacity-50 text-white px-4 md:px-6 py-3 md:py-3.5 rounded-xl text-sm md:text-base font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 flex items-center justify-center gap-2.5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Save className={`w-4 h-4 md:w-5 md:h-5 relative z-10 ${isDeploying ? 'animate-pulse' : ''}`} />
                  <span className="relative z-10">{isDeploying ? "Deploying..." : "Deploy JSON"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
