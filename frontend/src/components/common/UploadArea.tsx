import React, { useState, useRef } from 'react';
import { IoCloudUploadOutline, IoDocumentTextOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import Progress from './Progress';

const UploadArea = ({
  onFileSelect,
  accept = '.pdf,.doc,.docx',
  maxSizeMb = 10,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Check file size
    if (selectedFile.size > maxSizeMb * 1024 * 1024) {
      alert(`File size exceeds the limit of ${maxSizeMb}MB.`);
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          if (onFileSelect) onFileSelect(selectedFile);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setFile(null);
    setProgress(0);
    setUploading(false);
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={file ? null : triggerFileInput}
        className={`
          relative border-2 border-dashed rounded-premium p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all
          ${dragActive ? 'border-primary bg-blue-50/30 dark:bg-blue-950/10' : 'border-customBorder dark:border-slate-800 hover:border-primary/50 bg-slate-50/50 dark:bg-slate-900/20'}
          ${file ? 'cursor-default' : ''}
        `}
      >
        {!file && (
          <>
            <div className="p-3 bg-white dark:bg-slate-850 text-textSecondary dark:text-slate-400 rounded-full border border-customBorder dark:border-slate-800 shadow-sm mb-3">
              <IoCloudUploadOutline size={26} className="text-primary" />
            </div>
            <p className="text-xs font-bold text-textPrimary dark:text-white">
              Drag & drop resume, or <span className="text-primary hover:underline font-bold">browse</span>
            </p>
            <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-1">
              Supports PDF, DOC, DOCX up to {maxSizeMb}MB
            </p>
          </>
        )}

        {file && (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-3 w-full bg-white dark:bg-slate-950 border border-customBorder dark:border-slate-850 p-3 rounded-premium text-left">
              <div className="p-2 bg-blue-50 dark:bg-slate-900 text-primary rounded-lg">
                <IoDocumentTextOutline size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-textPrimary dark:text-white truncate">{file.name}</p>
                <p className="text-[10px] text-textSecondary dark:text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <div>
                {!uploading && (
                  <span className="text-customSuccess"><IoCheckmarkCircleOutline size={20} /></span>
                )}
              </div>
            </div>

            {uploading && (
              <div className="w-full mt-4">
                <Progress value={progress} showLabel size="sm" />
                <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-1">Analyzing resume details via AI Recruiter NLP...</p>
              </div>
            )}

            {!uploading && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 text-xs font-semibold text-customError hover:underline"
              >
                Remove File
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
